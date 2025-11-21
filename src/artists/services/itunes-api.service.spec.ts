import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { of, throwError } from "rxjs";
import { ItunesApiException } from "../../common/exceptions/itunes-api.exception";
import { ItunesApiService } from "./itunes-api.service";

describe("ItunesApiService", () => {
  let service: ItunesApiService;
  let httpService: Partial<HttpService>;
  let configService: Partial<ConfigService>;

  beforeEach(() => {
    httpService = {
      get: jest.fn(),
    };
    configService = {
      get: jest.fn((key: string) => {
        if (key === "itunes.baseUrl") return "https://itunes.apple.com";
        if (key === "itunes.timeout") return 5000;
        if (key === "itunes.maxRetries") return 0;
        return undefined;
      }),
    };
    service = new ItunesApiService(httpService as HttpService, configService as ConfigService);
  });

  it("should map valid response", async () => {
    (httpService.get as jest.Mock).mockReturnValue(
      of({ data: { results: [{ artistId: 1, artistName: "Test" }] } }),
    );
    const result = await service.fetchArtists();
    expect(result.results[0].artistName).toBe("Test");
  });

  it("should throw on timeout error", async () => {
    (httpService.get as jest.Mock).mockReturnValue(throwError(() => ({ name: "TimeoutError" })));
    await expect(service.fetchArtists()).rejects.toThrow(ItunesApiException);
    await expect(service.fetchArtists()).rejects.toMatchObject({ response: expect.objectContaining({ statusCode: 504 }) });
  });

  it("should throw on API downtime", async () => {
    (httpService.get as jest.Mock).mockReturnValue(throwError(() => ({ response: {} })));
    await expect(service.fetchArtists()).rejects.toThrow(ItunesApiException);
    await expect(service.fetchArtists()).rejects.toMatchObject({ response: expect.objectContaining({ statusCode: 503 }) });
  });

  it("should throw on unexpected format", async () => {
    (httpService.get as jest.Mock).mockReturnValue(of({ data: { foo: "bar" } }));
    await expect(service.fetchArtists()).rejects.toThrow(ItunesApiException);
    await expect(service.fetchArtists()).rejects.toMatchObject({ response: expect.objectContaining({ statusCode: 503 }) });
  });

  it("should throw on unknown error", async () => {
    (httpService.get as jest.Mock).mockReturnValue(throwError(() => ({ message: "Other error" })));
    await expect(service.fetchArtists()).rejects.toThrow(ItunesApiException);
    await expect(service.fetchArtists()).rejects.toMatchObject({ response: expect.objectContaining({ statusCode: 500 }) });
  });
});
