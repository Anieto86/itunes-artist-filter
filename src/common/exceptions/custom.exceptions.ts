import { HttpException, HttpStatus } from "@nestjs/common";

export class ArtistNotFoundException extends HttpException {
  constructor(letter: string) {
    super(
      `No artists found for letter '${letter}' on ${new Date().toLocaleDateString()}`,
      HttpStatus.NOT_FOUND,
    );
  }
}
