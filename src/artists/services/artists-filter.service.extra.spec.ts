import { DateService } from "../../shared/services/date.service";
import { ArtistDto } from "../dto/artists-response.dto";
import { ArtistsFilterService } from "./artists-filter.service";
import { ItunesApiService } from "./itunes-api.service";

describe("ArtistsFilterService (extra cases)", () => {
  let service: ArtistsFilterService;
  let dateService: DateService;
  let itunesApiService: ItunesApiService;

  beforeEach(() => {
    dateService = new DateService();
    itunesApiService = { fetchArtists: jest.fn() } as unknown as ItunesApiService;
    service = new ArtistsFilterService(itunesApiService, dateService);
  });

  it("should filter by genre", async () => {
    jest.spyOn(dateService, "getCurrentDayLetter").mockReturnValue("M");
    (itunesApiService.fetchArtists as jest.Mock).mockResolvedValue({
      results: [
        { artistName: "Madonna", primaryGenreName: "Pop" },
        { artistName: "Metallica", primaryGenreName: "Rock" },
        { artistName: "Moby", primaryGenreName: "Electronic" },
      ],
    });
    const response = await service.getFilteredArtistsWithMetadata(1, 10, "Pop");
    expect(response.artists.map((a: ArtistDto) => a.artistName)).toEqual(["Madonna"]);
    expect(response.totalArtistsFound).toBe(1);
    expect(response.page).toBe(1);
    expect(response.limit).toBe(10);
    expect(response.message).toMatch(/Found 1 artists on page 1/);
  });

  it("should paginate results", async () => {
    jest.spyOn(dateService, "getCurrentDayLetter").mockReturnValue("M");
    (itunesApiService.fetchArtists as jest.Mock).mockResolvedValue({
      results: [{ artistName: "Madonna" }, { artistName: "Metallica" }, { artistName: "Moby" }],
    });
    const response = await service.getFilteredArtistsWithMetadata(2, 1);
    expect(response.artists.map((a: ArtistDto) => a.artistName)).toEqual(["Metallica"]);
    expect(response.totalArtistsFound).toBe(3);
    expect(response.page).toBe(2);
    expect(response.limit).toBe(1);
    expect(response.message).toMatch(/Found 1 artists on page 2/);
  });

  it("should return empty array and metadata if no artists found", async () => {
    jest.spyOn(dateService, "getCurrentDayLetter").mockReturnValue("Z");
    (itunesApiService.fetchArtists as jest.Mock).mockResolvedValue({
      results: [{ artistName: "Madonna" }, { artistName: "Metallica" }],
    });
    const response = await service.getFilteredArtistsWithMetadata();
    expect(response.artists).toEqual([]);
    expect(response.totalArtistsFound).toBe(0);
    expect(response.success).toBe(true);
    expect(response.page).toBe(1);
    expect(response.limit).toBe(10);
    expect(response.message).toMatch(/No artists found/);
  });

  it("should handle invalid format in getFilteredArtistsWithMetadata", async () => {
    jest.spyOn(dateService, "getCurrentDayLetter").mockReturnValue("M");
    (itunesApiService.fetchArtists as jest.Mock).mockResolvedValue({});
    await expect(service.getFilteredArtistsWithMetadata()).rejects.toThrow();
  });
});
