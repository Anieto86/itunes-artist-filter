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

    console.log(artistsData.results.length, filteredArtists.length);
      return filteredArtists;
    }
  }
