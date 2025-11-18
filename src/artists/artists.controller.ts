import { Controller, Get } from '@nestjs/common';
import { ArtistsService } from './artists.service';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get('raw')
  async getRawArtists() {
    // NOTE: This endpoint is only for debugging the iTunes response structure
    const data = await this.artistsService.fetchRawArtistsFromITunes();
    return data;
  }
}
