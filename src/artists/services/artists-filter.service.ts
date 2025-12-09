import { Injectable } from "@nestjs/common";
import { ItunesApiException } from "../../common/exceptions/itunes-api.exception";
import { DateService } from "../../shared/services/date.service";
import { ArtistDto, FilteredArtistsResponseDto } from "../dto/artists-response.dto";
import { ItunesApiService } from "./itunes-api.service";

@Injectable()
export class ArtistsFilterService {
  constructor(
    private itunesApiService: ItunesApiService, //fetch artists from iTunes API
    private dateService: DateService, //get current day and letter
  ) {}

  async getFilteredArtists() {
    const artistsData = await this.itunesApiService.fetchArtists();
    const currentDayLetter = this.dateService.getCurrentDayLetter();

    // Filter artists whose name starts with the current day's letter
    // Format guard: ensure results is an array
    if (!Array.isArray(artistsData?.results)) {
      console.warn("Unexpected format: artistsData.results is not an array");
      return [];
    }

    // Filtered artists  per day letter
    const filteredArtists = artistsData.results.filter(
      (artist: ArtistDto) =>
        typeof artist.artistName === "string" &&
        artist.artistName.toUpperCase().startsWith(currentDayLetter),
    );

    console.log(`🎯 Filtering for day letter: "${currentDayLetter}"`);
    console.log(`📊 Total artists: ${artistsData.results.length}`);
    console.log(`✅ Filtered artists: ${filteredArtists.length}`);
    console.log(
      "🎵 Artists found:",
      (filteredArtists as Array<{ artistName: string }>).map(
        (a: { artistName: string }) => a.artistName,
      ),
    );

    return filteredArtists;
  }

  async getFilteredArtistsWithMetadata(
    // enhanced method with pagination, genre filter, sorting
    page = 1,
    limit = 10,
    genre?: string,
    sort: "asc" | "desc" = "asc",
  ): Promise<FilteredArtistsResponseDto> {
    // Sanitize page/limit to avoid NaN or invalid values
    page = Number.isNaN(page) || page < 1 ? 1 : Math.floor(page);
    limit = Number.isNaN(limit) || limit < 1 ? 10 : Math.floor(limit);
    const artistsData = await this.itunesApiService.fetchArtists();
    const currentDay = this.dateService.getCurrentDay();
    const currentDayLetter = this.dateService.getCurrentDayLetter();

    console.log(artistsData.results);

    // Filter artists whose name starts with the current day's letter
    // Format guard: ensure results is an array
    if (!Array.isArray(artistsData?.results)) {
      console.warn("Unexpected format: artistsData.results is not an array");
      throw new ItunesApiException("Unexpected iTunes API response format", 502);
    }

    // Filtered artists
    let filteredArtists = artistsData.results.filter(
      (artist: ArtistDto) =>
        typeof artist.artistName === "string" &&
        artist.artistName.toUpperCase().startsWith(currentDayLetter),
    );

    // Genre filtering
    if (genre) {
      console.log(filteredArtists.primaryGenreName, "filteredArtists");
      filteredArtists = filteredArtists.filter(
        (artist: ArtistDto) =>
          typeof artist.primaryGenreName === "string" &&
          artist.primaryGenreName.toLowerCase() === genre.toLowerCase(),
      );
    }

    // Sorting
    filteredArtists = filteredArtists.sort((a: ArtistDto, b: ArtistDto) => {
      if (!a.artistName || !b.artistName) return 0;
      if (sort === "desc") {
        return b.artistName.localeCompare(a.artistName);
      }
      return a.artistName.localeCompare(b.artistName);
    });

    if (filteredArtists.length === 0) {
      return {
        success: true,
        message: `No artists found starting with "${currentDayLetter}" for ${currentDay}`,
        currentDay,
        filterLetter: currentDayLetter,
        totalArtistsFound: 0,
        artists: [],
        timestamp: new Date().toISOString(),
        page,
        limit,
      };
    }

    console.log(`🎯 Filtering for day letter: "${currentDayLetter}"`);
    console.log(`📊 Total artists: ${artistsData.results.length}`);
    console.log(`✅ Filtered artists: ${filteredArtists.length}`);
    console.log(
      "🎵 Artists found:",
      (filteredArtists as Array<{ artistName: string }>).map(
        (a: { artistName: string }) => a.artistName,
      ),
    );

    // Pagination
    const start = (page - 1) * limit;
    const end = start + limit;
    const pagedArtists = filteredArtists.slice(start, end);

    // Transform to DTOs
    interface ArtistRaw {
      artistId: number;
      artistName: string;
      artistLinkUrl?: string;
      artistType?: string;
      primaryGenreName?: string;
      primaryGenreId?: number;
      amgArtistId?: number;
    }

    // mapper from raw artist to ArtistDto
    const artistDtos: ArtistDto[] = pagedArtists.map(
      (artist: ArtistRaw): ArtistDto => ({
        artistId: artist.artistId,
        artistName: artist.artistName,
        artistLinkUrl: artist.artistLinkUrl,
        artistType: artist.artistType,
        primaryGenreName: artist.primaryGenreName,
        primaryGenreId: artist.primaryGenreId,
        amgArtistId: artist.amgArtistId,
      }),
    );

    // Return structured response
    return {
      success: true,
      message: `Found ${artistDtos.length} artists on page ${page} (limit ${limit}) out of ${filteredArtists.length} total starting with "${currentDayLetter}" for ${currentDay}`,
      currentDay,
      filterLetter: currentDayLetter,
      totalArtistsFound: filteredArtists.length,
      artists: artistDtos,
      timestamp: new Date().toISOString(),
      page,
      limit,
    };
  }
}
