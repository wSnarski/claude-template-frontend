export interface ApiError {
  error: {
    message: string;
    statusCode: number;
    stack?: string;
  };
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  uptime: number;
}