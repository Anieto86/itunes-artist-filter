import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ArtistsService {
  private readonly ITUNES_API_URL =
    'https://itunes.apple.com/search?term=rock&entity=musicArtist&limit=50';

  constructor(private readonly httpService: HttpService) {}

  // For now we just fetch raw data to inspect the iTunes payload
  async fetchRawArtistsFromITunes(): Promise<any> {
    try {
      const response$ = this.httpService.get(this.ITUNES_API_URL, {
        timeout: 5000, // basic timeout to avoid hanging requests
      });
      const response = await firstValueFrom(response$);
      return response.data;
    } catch (error) {
      // TODO: refine error handling later
      throw new InternalServerErrorException(
        'Failed to fetch artists from iTunes',
      );
    }
  }
}
