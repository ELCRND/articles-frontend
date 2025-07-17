import { toast } from "react-toastify";
import { IUser, LoginDto, RegisterDto, Tokens } from "../model/types";

class AuthService {
  private baseURL = "";

  constructor(initBaseURL?: string) {
    initBaseURL
      ? (this.baseURL = initBaseURL)
      : (this.baseURL =
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/auth` ||
          "http://localhost:5000/auth");
  }

  public async login(data: LoginDto): Promise<IUser | null> {
    try {
      const res = await fetch(`${this.baseURL}/login`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(data),
        credentials: "include",
      });

      return this.handleResponse<IUser>(res);
    } catch (e) {
      console.error(`Failed to login: ${e}`);
      return null;
    }
  }

  public async register(data: RegisterDto): Promise<IUser | null> {
    try {
      const res = await fetch(`${this.baseURL}/register`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });

      return this.handleResponse<IUser>(res);
    } catch (e) {
      console.error(`Failed to register: ${e}`);
      return null;
    }
  }

  // public async logout(refreshToken: string): Promise<boolean> {
  //   try {
  //     const res = await fetch(`${this.baseURL}/logout`, {
  //       method: "POST",
  //       headers: this.getHeaders(refreshToken),
  //       body: JSON.stringify({ refreshToken }),
  //     });

  //     const cookieStore = await cookies();

  //     cookieStore.set("access_token", "", {
  //       expires: new Date(0),
  //       path: "/",
  //       httpOnly: true,
  //     });

  //     cookieStore.set("refresh_token", "", {
  //       expires: new Date(0),
  //       path: "/",
  //       httpOnly: true,
  //     });

  //     return res.ok;
  //   } catch (error) {
  //     console.error(`Failed to logout: ${error}`);
  //     return false;
  //   }
  // }

  public async refreshTokens(refreshToken: string): Promise<Tokens | null> {
    try {
      const res = await fetch(`${this.baseURL}/refresh`, {
        method: "POST",
        headers: this.getHeaders(refreshToken),
        body: JSON.stringify({ refreshToken }),
        credentials: "include",
      });

      return this.handleResponse<Tokens>(res);
    } catch (e) {
      console.error(`Failed to refresh tokens: ${e}`);
      return null;
    }
  }

  public async getMe(accessToken: string): Promise<IUser | null> {
    try {
      const res = await fetch(`${this.baseURL}/me`, {
        headers: this.getHeaders(accessToken),
      });

      return this.handleResponse<IUser>(res);
    } catch (e) {
      console.error(`Failed to get user: ${e}`);
      return null;
    }
  }

  public async googleAuth(code: string): Promise<Tokens | null> {
    try {
      const res = await fetch(`${this.baseURL}/google`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({ code }),
      });

      return this.handleResponse<Tokens>(res);
    } catch (e) {
      console.error(`Failed to authenticate with Google: ${e}`);
      return null;
    }
  }

  public async yandexAuth(code: string): Promise<Tokens | null> {
    try {
      const res = await fetch(`${this.baseURL}/yandex`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({ code }),
      });

      return this.handleResponse<Tokens>(res);
    } catch (e) {
      console.error(`Failed to authenticate with Yandex: ${e}`);
      return null;
    }
  }

  private async handleResponse<T>(res: Response): Promise<T | null> {
    try {
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        if (errorData.message && typeof window != undefined) {
          toast.error(errorData.message, {
            hideProgressBar: true,
            position: "bottom-right",
          });
        }

        throw new Error(errorData.message || `HTTP Error: ${res.status}`);
      }
      return await res.json();
    } catch (e) {
      console.error("Response handling failed:", e);
      return null;
    }
  }

  private getHeaders(token?: string): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }
}

export const authService = new AuthService();
