import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom, retry, timeout } from "rxjs";
import { ItunesApiException } from "../../common/exceptions/itunes-api.exception";

@Injectable()
export class ItunesApiService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    // private cacheService: CacheService
  ) {}

  async fetchArtists() {
    const baseUrl = this.configService.get<string>("itunes.baseUrl", "https://itunes.apple.com");
    const timeoutMs = this.configService.get<number>("itunes.timeout", 5000);
    const maxRetries = this.configService.get<number>("itunes.maxRetries", 3);
    const url = `${baseUrl}/search?term=artist&entity=musicArtist`;
    try {
      const response = await firstValueFrom(
        this.httpService.get(url).pipe(timeout(timeoutMs), retry(maxRetries)),
      );
      // Format guard: must be object with results array
      if (!response?.data || !Array.isArray(response.data.results)) {
        throw new ItunesApiException("Unexpected iTunes API response format", 502);
      }
      return response.data;
    } catch (error) {
      // TimeoutError from RxJS
      if (
        error &&
        typeof error === "object" &&
        "name" in error &&
        (error as { name?: string }).name === "TimeoutError"
      ) {
        throw new ItunesApiException("iTunes API request timed out", 504);
      }
      // Axios error with response
      if (error && typeof error === "object" && "response" in error) {
        throw new ItunesApiException("iTunes API is down or unreachable", 503);
      }
      // Unexpected format error
      if (
        error &&
        typeof error === "object" &&
        "message" in error &&
        typeof (error as { message?: string }).message === "string" &&
        (error as { message?: string }).message?.includes("Unexpected iTunes API response format")
      ) {
        throw new ItunesApiException("Unexpected iTunes API response format", 502);
      }
      throw new ItunesApiException("Unknown error fetching artists from iTunes API", 500);
    }
  }
}
