export class ErrorResponseDto {
  constructor(
    public message: string,
    public statusCode: number,
    public timestamp: string,
    public path: string,
    public error?: string, //  "Bad Request", "Internal Server Error"
  ) {}
}
