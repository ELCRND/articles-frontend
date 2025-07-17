// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/auth"];
const ADMIN_ROUTE = "/admin/dashboard";
const PROFILE_ROUTE = "/profile";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  // 1. Пропускаем публичные маршруты для неавторизованных
  if (PUBLIC_ROUTES.includes(pathname)) {
    // Если пользователь авторизован и пытается зайти на /auth - редиректим
    if (pathname === "/auth" && accessToken) {
      return await handleAuthUserRedirect(request, accessToken);
    }
    return NextResponse.next();
  }

  // 2. Если нет access токена, но есть refresh - пробуем обновить
  if (!accessToken && refreshToken) {
    const refreshResponse = await tryRefreshToken(refreshToken, request);
    if (refreshResponse) {
      return refreshResponse;
    }
  }

  // 3. Если после обновления (или если не было refresh) всё равно нет access токена - на auth
  if (!accessToken) {
    return redirectToAuth(request);
  }

  // 4. Проверяем доступ для защищенных маршрутов
  return await handleAuthUserRedirect(request, accessToken);
}

async function handleAuthUserRedirect(
  request: NextRequest,
  accessToken: string
): Promise<NextResponse> {
  try {
    const { user } = await verifyToken(accessToken);
    const targetUrl = user.role === "ADMIN" ? ADMIN_ROUTE : PROFILE_ROUTE;

    // Если пользователь уже на нужной странице - пропускаем
    if (request.nextUrl.pathname.startsWith(targetUrl)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL(targetUrl, request.url));
  } catch (error) {
    return redirectToAuth(request);
  }
}

async function tryRefreshToken(
  refreshToken: string,
  request: NextRequest
): Promise<NextResponse | null> {
  try {
    const refreshResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/auth/refresh`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (refreshResponse.ok) {
      const setCookie = refreshResponse.headers.get("Set-Cookie");
      if (setCookie) {
        const response = NextResponse.redirect(request.url);
        response.headers.set("Set-Cookie", setCookie);

        return response;
      }
    }
  } catch (error) {
    console.error("Refresh token error:", error);
  }
  return null;
}

async function verifyToken(token: string): Promise<{ user: { role: string } }> {
  const verifyResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/auth/verify`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!verifyResponse.ok) {
    throw new Error("Invalid token");
  }

  return await verifyResponse.json();
}

function redirectToAuth(request: NextRequest): NextResponse {
  const authUrl = new URL("/auth", request.url);
  authUrl.searchParams.set("from", request.nextUrl.pathname);
  return NextResponse.redirect(authUrl);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api).*)",
  ],
};
