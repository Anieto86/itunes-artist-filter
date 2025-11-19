import { Controller, Get } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsFilterService } from './services/artists-filter.service';

@Controller('artists')
export class ArtistsController {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly artistsFilterService: ArtistsFilterService
  ) {}

  @Get('raw')
  async getRawArtists() {
    // NOTE: This endpoint is only for debugging the iTunes response structure
    const data = await this.artistsService.fetchRawArtistsFromITunes();
    return data;
  }

  @Get('today')
  async getTodayArtists() {
    return await this.artistsFilterService.getFilteredArtists();
  }
}
