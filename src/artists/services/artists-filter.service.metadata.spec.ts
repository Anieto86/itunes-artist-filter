import { DateService } from '../../shared/services/date.service';
import { ArtistsFilterService } from './artists-filter.service';
import { ItunesApiService } from './itunes-api.service';

describe('ArtistsFilterService metadata response', () => {
  let service: ArtistsFilterService;
  let dateService: DateService;
  let itunesApiService: ItunesApiService;

  beforeEach(() => {
    dateService = new DateService();
    itunesApiService = { fetchArtists: jest.fn() } as unknown as ItunesApiService;
    service = new ArtistsFilterService(itunesApiService, dateService);
  });

  it('should return full metadata in response DTO', async () => {
    jest.spyOn(dateService, 'getCurrentDay').mockReturnValue('Monday');
    jest.spyOn(dateService, 'getCurrentDayLetter').mockReturnValue('M');
    (itunesApiService.fetchArtists as jest.Mock).mockResolvedValue({
      results: [
        {
          artistId: 1,
          artistName: 'Madonna',
          artistLinkUrl: 'url',
          artistType: 'Solo',
          primaryGenreName: 'Pop',
          primaryGenreId: 123,
          amgArtistId: 456,
        },
      ],
    });
    const response = await service.getFilteredArtistsWithMetadata();
    expect(response).toMatchObject({
      success: true,
      message: expect.stringContaining('Found'),
      currentDay: 'Monday',
      filterLetter: 'M',
      totalArtistsFound: 1,
      artists: [
        expect.objectContaining({
          artistId: 1,
          artistName: 'Madonna',
          artistLinkUrl: 'url',
          artistType: 'Solo',
          primaryGenreName: 'Pop',
          primaryGenreId: 123,
          amgArtistId: 456,
        }),
      ],
      timestamp: expect.any(String),
    });
  });
});
