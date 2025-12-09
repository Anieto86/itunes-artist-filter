# Copilot Instructions for iTunes Artist Filter API

## Project Overview
- **NestJS REST API** for filtering iTunes artists by the first letter of the current day (e.g., Monday → "M").
- Modular architecture: `src/artists` (business logic), `src/shared` (utilities), `src/common` (exceptions), `src/main.ts` (bootstrap).
- **Key services:**
  - `DateService`: Determines current day and letter.
  - `ItunesApiService`: Handles iTunes API requests and error handling.
  - `ArtistsFilterService`: Orchestrates filtering, sorting, pagination, and genre logic.

## Developer Workflow
- **Install dependencies:**
  - `pnpm install` (recommended) or `npm install`
- **Run dev server:**
  - `pnpm run start:dev` or `npm run start:dev`
- **Build for production:**
  - `pnpm run build` or `npm run build`
- **Run tests:**
  - `pnpm test` or `npm test`
  - All test files use `*.spec.ts` naming (see `src/artists/services/` for examples)
- **Lint/format:**
  - `pnpm run lint` / `pnpm run format`
- **Git workflow:**
  - Use feature branches (`feature/your-feature-name`), clean commits, PRs to `main`

## API Patterns
- **Main endpoint:** `GET /artists/today`
  - Query params: `genre`, `page`, `limit`, `sort`
  - Response always includes metadata (`currentDay`, `filterLetter`, `timestamp`)
  - If no artists found: returns `success: true`, empty array, and metadata
- **DTOs:**
  - All responses use DTOs from `src/artists/dto/`
- **Error handling:**
  - Custom exceptions in `src/common/exceptions/`
  - API errors are wrapped, not leaked

## Project Conventions
- **Strict TypeScript**: All code is type-safe, interfaces in `src/artists/interfaces/`
- **Dependency Injection**: All services are injected via NestJS modules
- **No caching**: iTunes API responses are not cached
- **Retry logic**: Fixed delay (500ms) for iTunes API errors (see `ItunesApiService`)
- **Biome**: Used for linting/formatting; ignore false positives on NestJS decorators

## Key Files & Directories
- `src/artists/services/artists-filter.service.ts`: Main business logic
- `src/artists/services/itunes-api.service.ts`: External API integration
- `src/shared/services/date.service.ts`: Day-of-week logic
- `src/artists/dto/artists-response.dto.ts`: Response structure
- `src/common/exceptions/itunes-api.exception.ts`: Error handling

## Examples
- Filtering, sorting, and pagination logic are all handled in `ArtistsFilterService`
- Tests for edge cases (genre, pagination, error formats) in `artists-filter.service.extra.spec.ts`

## Integration Points
- Only external dependency is iTunes API (no cache, no DB)
- All cross-component communication via NestJS DI

---
**For AI agents:**
- Follow the modular structure and use DTOs for all responses.
- Always wrap errors using custom exceptions.
- Use provided services for business logic; do not duplicate day/letter logic.
- Maintain strict typing and use interfaces for all external data.
- Reference README.md for additional details and examples.
