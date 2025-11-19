import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, timeout } from 'rxjs';
import { ItunesApiException } from '../../common/exceptions/itunes-api.exception';

@Injectable()
export class ItunesApiService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) {}

  async fetchArtists() {
    const baseUrl = this.configService.get<string>('itunes.baseUrl', 'https://itunes.apple.com');
    const timeoutMs = this.configService.get<number>('itunes.timeout', 5000);
    const url = `${baseUrl}/search?term=artist&entity=musicArtist`;
    try {
      const response = await firstValueFrom(this.httpService.get(url).pipe(timeout(timeoutMs)));
      // Format guard: must be object with results array
      if (!response?.data || !Array.isArray(response.data.results)) {
        throw new ItunesApiException('Unexpected iTunes API response format');
      }
      return response.data;
    } catch (error) {
      console.error('iTunes API error:', error);
      throw new ItunesApiException('Failed to fetch artists from iTunes API');
    }
  }
}
