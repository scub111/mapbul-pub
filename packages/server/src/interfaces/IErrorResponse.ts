export interface IErrorResponse {
  statusCode?: number;
  error?: string;
  message?: string;
  stack?: string;
  rawError?: object;
}