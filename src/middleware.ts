// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const response = NextResponse.next();

  console.log("middleware start", pathname);

  // try refresh token
  if (!accessToken && refreshToken) {
    console.log("has refresh, no access");
    try {
      console.log("try refresh");
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
        console.log("delete refresh");
        const res = NextResponse.next();
        res.cookies.delete("refresh_token");

        return res;
      }
      const setCookieHeader = refreshResponse.headers.get("Set-Cookie");
      if (setCookieHeader) {
        console.log("refresh success, set refresh");
        response.headers.set("Set-Cookie", setCookieHeader);
      }

      return response;
    } catch (error) {
      console.error("Refresh token failed:", error);
    }
  }

  //  redirect from /auth if has access && access verify
  if (accessToken && pathname.startsWith("/auth")) {
    console.log("get ./auth, access has");
    try {
      const verifyResponse = await verifyToken(accessToken);

      if (verifyResponse.ok) {
        console.log("access true, redirect to profile");
        const profileUrl = new URL("/profile", request.url);
        return NextResponse.redirect(profileUrl);
      } else {
        console.log("access false, access and refressh delete");
        response.cookies.delete("access_token");
        response.cookies.delete("refresh_token");
      }
    } catch (error) {
      console.error("Token verification failed:", error);
    }
  }

  // protected
  if (pathname.startsWith("/profile")) {
    console.log("try get protected /profile");
    if (!accessToken) {
      console.log("no access, redirect to auth");
      const authUrl = new URL("/auth", request.url);
      return NextResponse.redirect(authUrl);
    }

    try {
      console.log("has access, try verify");
      const verifyResponse = await verifyToken(accessToken);

      if (!verifyResponse.ok) {
        console.log("verify false, redirect to auth");
        // Если токен невалиден, перенаправляем на страницу входа
        const authUrl = new URL("/auth", request.url);
        response.cookies.delete("access_token");
        return NextResponse.redirect(authUrl);
      }

      console.log("access verify true");
      return response;
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
  const isPublicRoute = ["/auth", "/"].includes(pathname);
  if (isPublicRoute) {
    console.log("is public", pathname);
    return response;
  }

  if (accessToken) {
    console.log("has access, verify not required");
    return response;
  }

  // redirect
  const loginUrl = new URL("/auth", request.url);
  loginUrl.searchParams.set("from", request.nextUrl.pathname);

  console.log("final redirect, no tokens");
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
