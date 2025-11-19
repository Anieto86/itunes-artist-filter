export class ArtistDto {
  artistId!: number;
  artistName!: string;
  artistLinkUrl?: string;
  artistType?: string;
  primaryGenreName?: string;
  primaryGenreId?: number;
  amgArtistId?: number;
}

export class FilteredArtistsResponseDto {
  success!: boolean;
  message!: string;
  currentDay!: string;
  filterLetter!: string;
  totalArtistsFound!: number;
  artists!: ArtistDto[];
  timestamp!: string;
}
