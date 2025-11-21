import { Controller, Get, Query } from '@nestjs/common';
import { FilteredArtistsResponseDto } from './dto/artists-response.dto';
import { ArtistsFilterService } from './services/artists-filter.service';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsFilterService: ArtistsFilterService) {}

  @Get('today')
  async getTodayArtists(
    // biome-ignore lint/suspicious/noDecorator
    @Query('page') page?: string,
    // biome-ignore lint/suspicious/noDecorator
    @Query('limit') limit?: string
  ): Promise<FilteredArtistsResponseDto> {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return await this.artistsFilterService.getFilteredArtistsWithMetadata(pageNum, limitNum);
  }
}
