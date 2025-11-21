import { Injectable } from "@nestjs/common";
import { ItunesApiException } from "../../common/exceptions/itunes-api.exception";
import { DateService } from "../../shared/services/date.service";
import { ArtistDto, FilteredArtistsResponseDto } from "../dto/artists-response.dto";
import { ItunesApiService } from "./itunes-api.service";

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
    // Format guard: ensure results is an array
    if (!Array.isArray(artistsData?.results)) {
      console.warn("Unexpected format: artistsData.results is not an array");
      return [];
    }

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
    page = 1,
    limit = 10,
    genre?: string,
  ): Promise<FilteredArtistsResponseDto> {
    const artistsData = await this.itunesApiService.fetchArtists();
    const currentDay = this.dateService.getCurrentDay();
    const currentDayLetter = this.dateService.getCurrentDayLetter();

    // Filter artists whose name starts with the current day's letter
    // Format guard: ensure results is an array
    if (!Array.isArray(artistsData?.results)) {
      console.warn("Unexpected format: artistsData.results is not an array");
      throw new ItunesApiException("Unexpected iTunes API response format", 502);
    }

    let filteredArtists = artistsData.results.filter(
      (artist: ArtistDto) =>
        typeof artist.artistName === "string" &&
        artist.artistName.toUpperCase().startsWith(currentDayLetter),
    );

    if (genre) {
      filteredArtists = filteredArtists.filter(
        (artist: ArtistDto) =>
          typeof artist.primaryGenreName === "string" &&
          artist.primaryGenreName.toLowerCase() === genre.toLowerCase(),
      );
    }

    if (filteredArtists.length === 0) {
      return {
        success: true,
        message: `No artists found starting with "${currentDayLetter}" for ${currentDay}`,
        currentDay,
        filterLetter: currentDayLetter,
        totalArtistsFound: 0,
        artists: [],
        timestamp: new Date().toISOString(),
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

    // Paginación
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
      message: `Found ${filteredArtists.length} artists starting with "${currentDayLetter}" for ${currentDay}`,
      currentDay,
      filterLetter: currentDayLetter,
      totalArtistsFound: filteredArtists.length,
      artists: artistDtos,
      timestamp: new Date().toISOString(),
    };
  }
}
