import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import "reflect-metadata";

import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // CORS for development
  app.enableCors();

  const port = configService.get<number>("port") || 3000;
  await app.listen(port);

  console.log(`🚀 iTunes Artist Filter API running on http://localhost:${port}`);
  console.log(`📚 Available endpoints:`);
  console.log(`   GET /artists/today - Get artists filtered by current day`);
}

bootstrap();
