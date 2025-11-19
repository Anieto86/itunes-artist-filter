import { HttpException, HttpStatus } from '@nestjs/common';

export class ItunesApiException extends HttpException {
  constructor(message: string = 'iTunes API error') {
    super(
      {
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message,
        error: 'iTunes API Service Unavailable',
      },
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}
