import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { SharedModule } from "../shared/shared.module";
import { ArtistsController } from "./artists.controller";
import { ArtistsFilterService } from "./services/artists-filter.service";
import { ItunesApiService } from "./services/itunes-api.service";

// Flow: Request → Controller → Service → Response

@Module({
  imports: [HttpModule, SharedModule], // HTTP client for iTunes API + DateService
  controllers: [ArtistsController], // Handle routes
  providers: [ItunesApiService, ArtistsFilterService], // Business logic
})
export class ArtistsModule {}
