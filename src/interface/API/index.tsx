interface ApiOptions {
  body?: any;
  method?: string;
  headers?: any;
}

interface ResponseData {
  [key: string]: unknown;
}

interface BaseResponse {
  message?: string;
}

interface ApiResponse<T = unknown> extends BaseResponse {
  data?: T;
  error?: string;
  status: number;
}

export type { ApiOptions, ResponseData, ApiResponse, BaseResponse };
