import { Module } from "@nestjs/common";
import { ArtistsModule } from "./artists/artists.module";
import { ConfigModule } from "./config/config.module";

@Module({
  imports: [ConfigModule, ArtistsModule],
})
export class AppModule {}
