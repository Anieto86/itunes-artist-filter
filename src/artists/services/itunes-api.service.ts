import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ItunesApiService {
  constructor(private httpService: HttpService) {}
  // Service methods
 async fetchArtists() {


  try{
     const response = await firstValueFrom(this.httpService.get('https://itunes.apple.com/search?term=artist&entity=musicArtist'));
 return response?.data || [];
  }

  catch (error){
    throw new Error('Error fetching artists from iTunes API');
  }

  }

}
