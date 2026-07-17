export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  json?: any;
  body?: BodyInit | null;
}

async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { json, headers = {}, ...rest } = options;
  
  const configHeaders: Record<string, string> = {
    ...((headers as Record<string, string>) || {}),
  };

  if (json) {
    configHeaders["Content-Type"] = "application/json";
  }

  const response = await fetch(url, {
    ...rest,
    headers: configHeaders,
    body: json ? JSON.stringify(json) : rest.body,
  });

  let data: any;
  const contentType = response.headers.get("content-type");
  
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const errorMsg = (data && typeof data === "object" && data.error) || response.statusText || "Request failed";
    throw new ApiError(errorMsg, response.status, data);
  }

  return data as T;
}

export const api = {
  get: <T>(url: string, options?: Omit<RequestOptions, "method" | "body">) => 
    request<T>(url, { ...options, method: "GET" }),
  post: <T>(url: string, json?: any, options?: Omit<RequestOptions, "method" | "body" | "json">) => 
    request<T>(url, { ...options, method: "POST", json }),
  put: <T>(url: string, json?: any, options?: Omit<RequestOptions, "method" | "body" | "json">) => 
    request<T>(url, { ...options, method: "PUT", json }),
  patch: <T>(url: string, json?: any, options?: Omit<RequestOptions, "method" | "body" | "json">) => 
    request<T>(url, { ...options, method: "PATCH", json }),
  delete: <T>(url: string, options?: Omit<RequestOptions, "method" | "body">) => 
    request<T>(url, { ...options, method: "DELETE" }),
};
