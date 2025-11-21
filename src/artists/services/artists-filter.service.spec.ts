import { DateService } from "../../shared/services/date.service";
import { ArtistDto } from "../dto/artists-response.dto";
import { ArtistsFilterService } from "./artists-filter.service";
import { ItunesApiService } from "./itunes-api.service";

describe("ArtistsFilterService", () => {
  let service: ArtistsFilterService;
  let dateService: DateService;
  let itunesApiService: ItunesApiService;

  beforeEach(() => {
    dateService = new DateService();
    itunesApiService = { fetchArtists: jest.fn() } as unknown as ItunesApiService;
    service = new ArtistsFilterService(itunesApiService, dateService);
  });

  it("should filter artists by first letter of day (case-insensitive)", async () => {
    jest.spyOn(dateService, "getCurrentDayLetter").mockReturnValue("M");
    (itunesApiService.fetchArtists as jest.Mock).mockResolvedValue({
      results: [{ artistName: "Madonna" }, { artistName: "metallica" }, { artistName: "Sia" }],
    });
    const filtered = await service.getFilteredArtists();
    expect(filtered.map((a: ArtistDto) => a.artistName)).toEqual(["Madonna", "metallica"]);
  });

  it("should return empty array if no matches", async () => {
    jest.spyOn(dateService, "getCurrentDayLetter").mockReturnValue("Z");
    (itunesApiService.fetchArtists as jest.Mock).mockResolvedValue({
      results: [{ artistName: "Madonna" }, { artistName: "metallica" }],
    });
    const filtered = await service.getFilteredArtists();
    expect(filtered).toEqual([]);
  });

  it("should handle unexpected format (no results array)", async () => {
    jest.spyOn(dateService, "getCurrentDayLetter").mockReturnValue("M");
    (itunesApiService.fetchArtists as jest.Mock).mockResolvedValue({});
    const filtered = await service.getFilteredArtists();
    expect(filtered).toEqual([]);
  });
});
