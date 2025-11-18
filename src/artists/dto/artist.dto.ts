//DTO contracts for Artist data and responses

export class ArtistDto {
  readonly id: number;
  readonly name: string;
  readonly genre: string;
  readonly primaryGenreName?: string;
  readonly artistName?: string;

  constructor(id: number, name: string, genre: string, primaryGenreName?: string, artistName?: string) {
    this.id = id;
    this.name = name;
    this.genre = genre;
    this.primaryGenreName = primaryGenreName;
    this.artistName = artistName;
  }
}

export class ArtistResponseDto {
  readonly success: boolean;
  readonly message: string;
  readonly dayOfWeek: string;
  readonly filterLetter: string;
  readonly totalArtists: number;
  readonly artists: ArtistDto[];

  constructor(
    success: boolean,
    message: string,
    dayOfWeek: string,
    filterLetter: string,
    artists: ArtistDto[]
  ) {
    this.success = success;
    this.message = message;
    this.dayOfWeek = dayOfWeek;
    this.filterLetter = filterLetter;
    this.totalArtists = artists.length;
    this.artists = artists;
  }
}

export class ErrorResponseDto {
  readonly success: false;
  readonly error: string;
  readonly statusCode: number;
  readonly timestamp: string;

  constructor(error: string, statusCode: number) {
    this.success = false;
    this.error = error;
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
  }
}
