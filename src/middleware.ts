// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const response = NextResponse.next();

  // try refresh token
  if (!accessToken && refreshToken) {
    try {
      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/auth/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
          credentials: "include",
          body: JSON.stringify({ refreshToken }),
        }
      );

      if (!refreshResponse.ok) {
        const res = NextResponse.next();
        res.cookies.delete("refresh_token");

        return res;
      }
      const setCookieHeader = refreshResponse.headers.get("Set-Cookie");
      if (setCookieHeader) {
        response.headers.set("Set-Cookie", setCookieHeader);
      }

      return response;
    } catch (error) {
      console.error("Refresh token failed:", error);
    }
  }

  if (accessToken && pathname.startsWith("/auth")) {
    try {
      const verifyResponse = await verifyToken(accessToken);

      if (verifyResponse.ok) {
        const profileUrl = new URL("/profile", request.url);
        return NextResponse.redirect(profileUrl);
      } else {
        response.cookies.delete("access_token");
      }
    } catch (error) {
      console.error("Token verification failed:", error);
    }
  }

  if (pathname.startsWith("/profile")) {
    if (!accessToken) {
      // Если нет access token, перенаправляем на страницу входа
      const authUrl = new URL("/auth/login", request.url);
      return NextResponse.redirect(authUrl);
    }

    try {
      const verifyResponse = await verifyToken(accessToken);

      if (!verifyResponse.ok) {
        // Если токен невалиден, перенаправляем на страницу входа
        const authUrl = new URL("/auth", request.url);
        response.cookies.delete("access_token");
        return NextResponse.redirect(authUrl);
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      const authUrl = new URL("/auth/login", request.url);
      return NextResponse.redirect(authUrl);
    }
  }

  async function verifyToken(token: string) {
    return await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/auth/verify`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  // public roytes
  const isPublicRoute = ["/auth"].includes(pathname);
  if (isPublicRoute) {
    return response;
  }

  if (accessToken) {
    return response;
  }

  // redirect
  const loginUrl = new URL("/auth", request.url);
  loginUrl.searchParams.set("from", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api/auth).*)",
  ],
};
