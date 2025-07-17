import { ArticlePreview, CreateArticleDto, IArticle } from "../model/types";

class ArticleService {
  private baseURL = "";
  public limit = 5;

  constructor(initBaseURL?: string) {
    initBaseURL
      ? (this.baseURL = initBaseURL)
      : (this.baseURL =
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/article` ||
          "http://localhost:5000/article");
  }

  public async getAllArticles(): Promise<IArticle[] | null> {
    try {
      const res = await fetch(this.baseURL, {
        headers: this.getHeaders(),
      });

      return this.handleResponse<IArticle[]>(res);
    } catch (e) {
      console.error(`Failed fetch: ${e}`);
      return [];
    }
  }

  public async getArticles(
    page: number = 1,
    limit: number = this.limit
  ): Promise<IArticle[]> {
    try {
      const skip = (page - 1) * limit;
      const res = await fetch(`${this.baseURL}?skip=${skip}&limit=${limit}`, {
        headers: this.getHeaders(),
      });

      return this.handleResponse<IArticle[]>(res);
    } catch (e) {
      console.error(`Failed fetch: ${e}`);
      return [];
    }
  }

  public async getReadNowArticles(): Promise<IArticle[]> {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/viewers`,
        {
          headers: this.getHeaders(),
        }
      );

      return this.handleResponse<IArticle[]>(res);
    } catch (e) {
      console.error(`Failed fetch: ${e}`);
      return [];
    }
  }

  public async createArticle(data: any): Promise<IArticle | null> {
    try {
      const res = await fetch(`${this.baseURL}/create`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });

      return this.handleResponse<IArticle>(res);
    } catch (e) {
      console.error(`Failed fetch: ${e}`);
      return null;
    }
  }

  public async getArticleById(id: string): Promise<IArticle | null> {
    try {
      const res = await fetch(`${this.baseURL}/${id}`, {
        headers: this.getHeaders(),
      });

      return this.handleResponse<IArticle | null>(res);
    } catch (e) {
      console.error(`Failed fetch: ${e}`);
      return null;
    }
  }

  public async getArticleByKeywords(keyword: string): Promise<IArticle[]> {
    try {
      const res = await fetch(`${this.baseURL}/search?q=${keyword}`, {
        headers: this.getHeaders(),
      });

      return this.handleResponse<IArticle[]>(res);
    } catch (e) {
      console.error(`Failed fetch: ${e}`);
      return [];
    }
  }

  public async getUnpublishedArticles(
    query: string,
    accessToken: string
  ): Promise<ArticlePreview[]> {
    try {
      const res = await fetch(`${this.baseURL}/unpublished?${query}`, {
        headers: this.getHeaders(accessToken),
        credentials: "include",
      });

      return this.handleResponse<IArticle[]>(res);
    } catch (e) {
      console.error(`Failed fetch: ${e}`);
      return [];
    }
  }

  public async updateArticle(
    id: string,
    data: Partial<CreateArticleDto>
  ): Promise<IArticle | null> {
    try {
      const res = await fetch(`${this.baseURL}/${id}`, {
        method: "PATCH",
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });

      return this.handleResponse<IArticle>(res);
    } catch (e) {
      console.error(`Failed fetch: ${e}`);
      return null;
    }
  }

  public async deleteArticle(id: string): Promise<any> {
    try {
      const res = await fetch(`${this.baseURL}/${id}`, {
        method: "DELETE",
        headers: this.getHeaders(),
      });
      if (!res.ok) {
        await this.handleResponse<void>(res);
      }
    } catch (e) {
      console.error(`Failed fetch: ${e}`);
      return null;
    }
  }

  public async getCount(): Promise<number> {
    try {
      const res = await fetch(`${this.baseURL}/count`, {
        headers: this.getHeaders(),
      });

      return this.handleResponse<number>(res);
    } catch (e) {
      console.error(`Failed fetch: ${e}`);
      return 0;
    }
  }

  private async handleResponse<T>(res: Response): Promise<T> {
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

  private getHeaders(token?: string): HeadersInit {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }
}

export const articleService = new ArticleService();
