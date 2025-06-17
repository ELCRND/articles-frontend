import { IUser } from "../model/types";

class UserService {
  private baseURL = "";

  constructor(initBaseURL?: string) {
    initBaseURL
      ? (this.baseURL = initBaseURL)
      : (this.baseURL =
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/users` ||
          "http://localhost:5000/users");
  }

  public async getMe(token: string): Promise<IUser | null> {
    try {
      const res = await fetch(`${this.baseURL}/me`, {
        headers: this.getHeaders(token),
      });

      return this.handleResponse<IUser>(res);
    } catch (e) {
      console.error(`Failed fetch: ${e}`);
      return null;
    }
  }

  private async handleResponse<T>(res: Response): Promise<T> {
    console.log(res);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.log(
        errorData.message || `HTTP Error: ${res.status} ${res.statusText}`
      );
      // throw new Error(
      //   errorData.message || `HTTP Error: ${res.status} ${res.statusText}`
      // );

      return null as unknown as T;
    }
    return res.json();
  }

  private getHeaders(token: string): HeadersInit {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }
}

export const userService = new UserService();
