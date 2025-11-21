import { DateService } from "../../shared/services/date.service";
import { ArtistsFilterService } from "./artists-filter.service";
import { ItunesApiService } from "./itunes-api.service";

describe("ArtistsFilterService sorting", () => {
  let service: ArtistsFilterService;
  let dateService: DateService;
  let itunesApiService: ItunesApiService;

  beforeEach(() => {
    dateService = new DateService();
    itunesApiService = { fetchArtists: jest.fn() } as unknown as ItunesApiService;
    service = new ArtistsFilterService(itunesApiService, dateService);
  });

  it("should sort artists ascending by name", async () => {
    jest.spyOn(dateService, "getCurrentDayLetter").mockReturnValue("M");
    (itunesApiService.fetchArtists as jest.Mock).mockResolvedValue({
      results: [{ artistName: "Metallica" }, { artistName: "Madonna" }, { artistName: "Moby" }],
    });
    const response = await service.getFilteredArtistsWithMetadata(1, 10, undefined, "asc");
    expect(response.artists.map((a) => a.artistName)).toEqual(["Madonna", "Metallica", "Moby"]);
  });

  it("should sort artists descending by name", async () => {
    jest.spyOn(dateService, "getCurrentDayLetter").mockReturnValue("M");
    (itunesApiService.fetchArtists as jest.Mock).mockResolvedValue({
      results: [{ artistName: "Metallica" }, { artistName: "Madonna" }, { artistName: "Moby" }],
    });
    const response = await service.getFilteredArtistsWithMetadata(1, 10, undefined, "desc");
    expect(response.artists.map((a) => a.artistName)).toEqual(["Moby", "Metallica", "Madonna"]);
  });
});
