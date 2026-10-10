import type { HttpResponse } from "./http-response";

export interface HttpClient {
  get<TBody = void>(path: string): Promise<HttpResponse<TBody>>;
  post<TBody = void>(path: string, body: any): Promise<HttpResponse<TBody>>;
  put<TBody = void>(path: string, body: any): Promise<HttpResponse<TBody>>;
  delete<TBody = void>(path: string): Promise<HttpResponse<TBody>>;
}

export class FetchAdapter implements HttpClient {
  constructor(private readonly baseUrl: string) {}

  async get<TResBody = null>(path: string): Promise<HttpResponse<TResBody>> {
    return this.makeRequest<TResBody>(path, "GET", undefined);
  }

  async post<TResBody = null, TBody = void>(
    path: string,
    body: TBody,
  ): Promise<HttpResponse<TResBody>> {
    return this.makeRequest<TResBody>(path, "POST", body);
  }

  async put<TResBody = null>(
    path: string,
    body: any,
  ): Promise<HttpResponse<TResBody>> {
    return this.makeRequest<TResBody>(path, "PUT", body);
  }

  async delete<TResBody>(path: string): Promise<HttpResponse<TResBody>> {
    return this.makeRequest<TResBody>(path, "DELETE", undefined);
  }

  private async makeRequest<TResBody = null>(
    path: string,
    method: HttpMethod,
    body: any,
  ): Promise<HttpResponse<TResBody>> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method,
      body: JSON.stringify(body),
    });
    return {
      status: response.status,
      body: await response.json(),
    };
  }
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
