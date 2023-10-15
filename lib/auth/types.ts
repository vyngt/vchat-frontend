export interface BackendRequest {
  method: "GET" | "POST";
  endpoint: string;
  /**
   * JSON
   */
  body?: string;
}
