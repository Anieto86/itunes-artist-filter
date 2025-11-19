import { Controller, Get } from '@nestjs/common';
import { FilteredArtistsResponseDto } from './dto/artists-response.dto';
import { ArtistsFilterService } from './services/artists-filter.service';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsFilterService: ArtistsFilterService) {}

  @Get('today')
  async getTodayArtists(): Promise<FilteredArtistsResponseDto> {
    return await this.artistsFilterService.getFilteredArtistsWithMetadata();
  }
}
