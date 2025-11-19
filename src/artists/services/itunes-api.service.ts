import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ItunesApiException } from '../../common/exceptions/itunes-api.exception';

@Injectable()
export class ItunesApiService {
  constructor(private httpService: HttpService) {}
  // Service methods
  async fetchArtists() {
    try {
      const response = await firstValueFrom(
        this.httpService.get('https://itunes.apple.com/search?term=artist&entity=musicArtist')
      );
      return response?.data || [];
    } catch (error) {
      throw new ItunesApiException('Failed to fetch artists from iTunes API');
    }
  }
}
