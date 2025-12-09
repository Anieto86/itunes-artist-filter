//DTO for filtered artists response
export class ArtistDto {
  artistId!: number;
  artistName!: string;
  artistLinkUrl?: string;
  artistType?: string;
  primaryGenreName?: string;
  primaryGenreId?: number;
  amgArtistId?: number;
}

//DTO for filtered artists response with metadata
export class FilteredArtistsResponseDto {
  success!: boolean;
  message!: string;
  currentDay!: string;
  filterLetter!: string;
  totalArtistsFound!: number;
  artists!: ArtistDto[];
  timestamp!: string;
  page!: number;
  limit!: number;
}
