import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AxiosError } from "axios";
import { catchError, delay, firstValueFrom, of, retry, throwError, timeout } from "rxjs";
import { ItunesApiException } from "../../common/exceptions/itunes-api.exception";

@Injectable()
export class ItunesApiService {
  constructor(
    private httpService: HttpService, //HttpService → viene de HttpModule
    private configService: ConfigService, //ConfigService → viene de ConfigModule
    // private cacheService: CacheService
  ) {}

  async fetchArtists() {
    const baseUrl = this.configService.get<string>("itunes.baseUrl", "https://itunes.apple.com");
    const timeoutMs = this.configService.get<number>("itunes.timeout", 5000);
    const maxRetries = this.configService.get<number>("itunes.maxRetries", 3);
    const url = `${baseUrl}/search?term=artist&entity=musicArtist&limit=200`;

    try {
      const response = await firstValueFrom(
        this.httpService.get(url).pipe(
          // Perform the HTTP GET request
          timeout(timeoutMs),
          retry({
            count: maxRetries,
            delay: (error) => {
              // If maxRetries is 0, do not retry
              if (maxRetries === 0) {
                return throwError(() => error);
              }
              // Only retry on 5xx errors or timeout
              if (error?.response?.status >= 500 || error?.name === "TimeoutError") {
                return of(true).pipe(delay(500)); // 500ms between retries
              }
              return throwError(() => error);
            },
          }),
          catchError((err) => throwError(() => err)),
        ),
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
        const axiosError = error as AxiosError;
        const status = axiosError.response?.status;
        let message = "iTunes API is down or unreachable";
        if (status === 502) message = "Bad Gateway from iTunes API";
        if (status === 504) message = "iTunes API request timed out";
        if (status === 500) message = "Internal server error from iTunes API";
        // If the error is due to unexpected format, force status 502
        if (
          axiosError.response?.data &&
          typeof axiosError.response.data === "object" &&
          "results" in axiosError.response.data &&
          !Array.isArray((axiosError.response.data as { results?: unknown }).results)
        ) {
          throw new ItunesApiException("Unexpected iTunes API response format", 502);
        }
        throw new ItunesApiException(message, status || 503);
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
