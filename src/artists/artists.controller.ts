import { Controller, Get, Query } from "@nestjs/common";
import { FilteredArtistsResponseDto } from "./dto/artists-response.dto";
import { ArtistsFilterService } from "./services/artists-filter.service";

@Controller("artists")
export class ArtistsController {
  constructor(private readonly artistsFilterService: ArtistsFilterService) {}

  @Get("today")
  async getTodayArtists(
    @Query("page") page?: string,
    @Query("limit") limit?: string,
    @Query("genre") genre?: string,
  ): Promise<FilteredArtistsResponseDto> {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return await this.artistsFilterService.getFilteredArtistsWithMetadata(pageNum, limitNum, genre);
  }
}
