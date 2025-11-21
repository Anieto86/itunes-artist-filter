import { HttpException, HttpStatus } from "@nestjs/common";

export class ItunesApiException extends HttpException {
  constructor(
    message: string = "iTunes API error",
    status: number = HttpStatus.SERVICE_UNAVAILABLE,
  ) {
    super(
      {
        statusCode: status,
        message,
        error: "iTunes API Service Unavailable",
      },
      status,
    );
  }
}
