// Interfaces for Itunes API responses and filtered artist data
export interface ItunesSearchResponse {
  resultCount: number;
  results: ItunesArtist[];
}

export interface ItunesArtist {
  wrapperType: string;
  artistType: string;
  artistId: number;
  artistName: string;
  artistLinkUrl: string;
  artistViewUrl?: string;
  amgArtistId?: number;
  primaryGenreName: string;
  primaryGenreId: number;
  radioStationUrl?: string;
}

export interface FilteredArtist {
  id: number;
  name: string;
  genre: string;
}

export interface DayFilterService {
  getCurrentDayLetter(): string;
  getCurrentDayName(): string;
  filterArtistsByLetter(artists: FilteredArtist[], letter: string): FilteredArtist[];
}
