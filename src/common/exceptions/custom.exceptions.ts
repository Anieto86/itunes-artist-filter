import { HttpException, HttpStatus } from '@nestjs/common';

export class ItunesApiException extends HttpException {
  constructor(message = 'iTunes API is temporarily unavailable') {
    super(message, HttpStatus.BAD_GATEWAY);
  }
}

export class ArtistNotFoundException extends HttpException {
  constructor(letter: string) {
    super(
      `No artists found for letter '${letter}' on ${new Date().toLocaleDateString()}`,
      HttpStatus.NOT_FOUND
    );
  }
}

export class InvalidDayException extends HttpException {
  constructor(day: string) {
    super(`Invalid day format: ${day}`, HttpStatus.BAD_REQUEST);
  }
}
