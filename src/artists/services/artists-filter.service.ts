import { Injectable } from '@nestjs/common';
import { DateService } from '../../shared/services/date.service';
import { ArtistDto, FilteredArtistsResponseDto } from '../dto/artists-response.dto';
import { ItunesApiService } from './itunes-api.service';

@Injectable()
export class ArtistsFilterService {
  constructor(
    private itunesApiService: ItunesApiService,
    private dateService: DateService,
  ) {}

  async getFilteredArtists() {
    const artistsData = await this.itunesApiService.fetchArtists();
    const currentDayLetter = this.dateService.getCurrentDayLetter();

    // Filter artists whose name starts with the current day's letter
    const filteredArtists = artistsData.results.filter((artist: any) =>
      artist.artistName.startsWith(currentDayLetter),
    );

    console.log(`🎯 Filtering for day letter: "${currentDayLetter}"`);
    console.log(`📊 Total artists: ${artistsData.results.length}`);
    console.log(`✅ Filtered artists: ${filteredArtists.length}`);
    console.log('🎵 Artists found:', filteredArtists.map(a => a.artistName));

    return filteredArtists;
  }

  async getFilteredArtistsWithMetadata(): Promise<FilteredArtistsResponseDto> {
    const artistsData = await this.itunesApiService.fetchArtists();
    const currentDay = this.dateService.getCurrentDay();
    const currentDayLetter = this.dateService.getCurrentDayLetter();

    // Filter artists whose name starts with the current day's letter
    const filteredArtists = artistsData.results.filter((artist: any) =>
      artist.artistName.startsWith(currentDayLetter),
    );

    console.log(`🎯 Filtering for day letter: "${currentDayLetter}"`);
    console.log(`📊 Total artists: ${artistsData.results.length}`);
    console.log(`✅ Filtered artists: ${filteredArtists.length}`);
    console.log('🎵 Artists found:', filteredArtists.map(a => a.artistName));

    // Transform to DTOs
    const artistDtos: ArtistDto[] = filteredArtists.map(artist => ({
      artistId: artist.artistId,
      artistName: artist.artistName,
      artistLinkUrl: artist.artistLinkUrl,
      artistType: artist.artistType,
      primaryGenreName: artist.primaryGenreName,
      primaryGenreId: artist.primaryGenreId,
      amgArtistId: artist.amgArtistId,
    }));

    // Return structured response
    return {
      success: true,
      message: `Found ${filteredArtists.length} artists starting with "${currentDayLetter}" for ${currentDay}`,
      currentDay,
      filterLetter: currentDayLetter,
      totalArtistsFound: filteredArtists.length,
      artists: artistDtos,
      timestamp: new Date().toISOString(),
    };
  }
}
