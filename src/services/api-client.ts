import { GetBooksParams } from "@/types/book.type";
import { ApiClientConfig, ApiResponse, ApiError } from "@/types/common.type";

export class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private timeout: number;

  constructor(config: ApiClientConfig) {
    this.baseURL = config.baseURL;
    this.timeout = config.timeout || 5000;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...config.headers,
    };
  }

  async get<T>(
    endpoint: string,
    params?: GetBooksParams
  ): Promise<ApiResponse<T>> {
    try {
      console.log(
        "URL",
        `${this.baseURL}${endpoint}${
          params
            ? `?${new URLSearchParams(
                params as Record<string, string>
              ).toString()}`
            : ""
        }`
      );
      const response = await fetch(
        `${this.baseURL}${endpoint}${
          params
            ? `?${new URLSearchParams(
                params as Record<string, string>
              ).toString()}`
            : ""
        }`,
        {
          method: "GET",
          headers: this.defaultHeaders,
        }
      );

      if (!response.ok) {
        throw await this.handleError(response);
      }

      const data = await response.json();
      return {
        data,
        status: response.status,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post<T, U = unknown>(
    endpoint: string,
    body: U
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "POST",
        headers: this.defaultHeaders,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw await this.handleError(response);
      }

      const data = await response.json();
      return {
        data,
        status: response.status,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async put<T, U = unknown>(
    endpoint: string,
    body: U,
    params?: GetBooksParams
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(
        `${this.baseURL}${endpoint}${
          params
            ? `?${new URLSearchParams(
                params as Record<string, string>
              ).toString()}`
            : ""
        }`,
        {
          method: "PUT",
          headers: this.defaultHeaders,
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw await this.handleError(response);
      }

      const data = await response.json();
      return {
        data,
        status: response.status,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "DELETE",
        headers: this.defaultHeaders,
      });

      if (!response.ok) {
        throw await this.handleError(response);
      }

      const data = await response.json();
      return {
        data,
        status: response.status,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private async handleError(error: unknown): Promise<ApiError> {
    if (error instanceof Response) {
      const errorData = await error.json();
      return {
        message: errorData.message || "서버 에러가 발생했습니다",
        status: error.status,
        code: errorData.code,
      };
    }

    return {
      message: "네트워크 에러가 발생했습니다",
      status: 500,
    };
  }
}

// API 클라이언트 인스턴스 생성
export const apiClient = new ApiClient({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/api"
      : process.env.NEXT_PUBLIC_API_URL || "",
  headers: {},
});
