import { Injectable } from '@nestjs/common';
import { DateService } from '../../shared/services/date.service';
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
  }
