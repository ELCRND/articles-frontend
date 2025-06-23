// src/services/middleware.service.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export class AuthMiddlewareService {
  private readonly PUBLIC_ROUTES = ["/", "/auth"];
  private readonly PROTECTED_ROUTES = ["/profile"];
  private readonly BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

  constructor(public request: NextRequest) {}

  public isPublicRoute(pathname: string): boolean {
    return this.PUBLIC_ROUTES.includes(pathname);
  }

  public isProtectedRoute(pathname: string): boolean {
    console.log(pathname);
    return this.PROTECTED_ROUTES.includes(pathname);
  }

  public async handlePublicRoute(
    accessToken: string | undefined,
    response: NextResponse
  ): Promise<NextResponse> {
    if (accessToken && this.request.nextUrl.pathname.includes("/auth")) {
      console.log("!!!");
      console.log(this.request.nextUrl.pathname);
      const isTokenValid = await this.verifyToken(accessToken);
      if (isTokenValid) {
        return NextResponse.redirect(new URL("/profile", this.request.url));
      } else {
        response.cookies.delete("access_token");
      }
    }

    console.log("pub res", this.request.nextUrl.pathname);
    return response;
  }

  public async handleProtectedRoute(
    accessToken: string | undefined,
    response: NextResponse
  ): Promise<NextResponse> {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/auth", this.request.url));
    }

    try {
      const isTokenValid = await this.verifyToken(accessToken);
      if (!isTokenValid) {
        response.cookies.delete("access_token");
        return NextResponse.redirect(new URL("/auth", this.request.url));
      }
      return response;
    } catch (error) {
      console.error("Token verification failed:", error);
      return NextResponse.redirect(new URL("/auth", this.request.url));
    }
  }

  public async tryRefreshToken(
    refreshToken: string,
    response: NextResponse
  ): Promise<NextResponse | null> {
    try {
      const refreshResponse = await fetch(`${this.BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
        credentials: "include",
        body: JSON.stringify({ refreshToken }),
      });

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
      return null;
    }
  }

  public redirectToAuthPage(): NextResponse {
    const loginUrl = new URL("/auth", this.request.url);
    loginUrl.searchParams.set("from", this.request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  public getCookie(name: string): string | undefined {
    return this.request.cookies.get(name)?.value;
  }

  private async verifyToken(token: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.BASE_URL}/auth/verify`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.ok;
    } catch (error) {
      console.error("Token verification error:", error);
      return false;
    }
  }
}
