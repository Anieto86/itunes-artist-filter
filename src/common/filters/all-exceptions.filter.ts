import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ErrorResponseDto } from "src/artists/dto/error-response.dto";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status: number;
    let message: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();
      message =
        typeof errorResponse === "string"
          ? errorResponse
          : (errorResponse as { message?: string }).message || "Unknown error";
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = "Internal server error";
    }

    const errorText = exception instanceof HttpException ? exception.name : "InternalServerError";
    const errorResponse = new ErrorResponseDto(
      message,
      status,
      new Date().toISOString(),
      request.url,
      errorText,
    );

    console.error(`Error ${status} on ${request.method} ${request.url}:`, exception);

    response.status(status).json(errorResponse);
  }
}
