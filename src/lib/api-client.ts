import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

const API_BASE_URL = "/api";

class ApiClient {
  private client: AxiosInstance;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor for auth token
    this.client.interceptors.request.use((config) => {
      if (this.token) {
        const authHeader = this.token.startsWith("Bearer ")
          ? this.token
          : `Bearer ${this.token}`;
        config.headers.Authorization = authHeader;
      }
      return config;
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        const message =
          error.response?.data?.message ||
          error.message ||
          "API request failed";
        return Promise.reject(new Error(message));
      },
    );
  }

  setToken(token: string | null) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  // Generic request wrapper
  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await this.client.request<T>(config);
    return response.data;
  }

  get<T>(endpoint: string, options?: AxiosRequestConfig) {
    return this.request<T>({ ...options, url: endpoint, method: "GET" });
  }

  post<T>(endpoint: string, data?: any, options?: AxiosRequestConfig) {
    return this.request<T>({
      ...options,
      url: endpoint,
      method: "POST",
      data,
    });
  }

  put<T>(endpoint: string, data?: any, options?: AxiosRequestConfig) {
    return this.request<T>({
      ...options,
      url: endpoint,
      method: "PUT",
      data,
    });
  }

  delete<T>(endpoint: string, options?: AxiosRequestConfig) {
    return this.request<T>({ ...options, url: endpoint, method: "DELETE" });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
