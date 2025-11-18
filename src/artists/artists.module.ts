import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';

// Flow: Request → Controller → Service → Response

@Module({
  imports: [HttpModule], // HTTP client for iTunes API
  controllers: [ArtistsController], // Handle routes
  providers: [ArtistsService], // Business logic
})
export class ArtistsModule {}
