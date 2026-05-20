export class ApiResponse<T = unknown> {
  public success: boolean;

  constructor(
    public readonly statusCode: number,
    public readonly message: string,
    public readonly data?: T,
    public readonly meta?: unknown
  ) {
    this.success = statusCode >= 200 && statusCode < 300;
  }

  static success<T>(message: string, data?: T, meta?: unknown, statusCode = 200) {
    return new ApiResponse(statusCode, message, data, meta);
  }

  static created<T>(message: string, data?: T) {
    return new ApiResponse(201, message, data);
  }
}
