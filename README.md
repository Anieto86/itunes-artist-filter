# iTunes Artist Filter

A NestJS application to search and filter artists using the iTunes Search API.

## Features

- Search artists by name
- Filter artist results
- RESTful API endpoints
- HTTP client integration for iTunes API

## Tech Stack

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **Axios** - HTTP client for API requests
- **pnpm** - Fast, disk space efficient package manager

## Installation

```bash
# Install dependencies
pnpm install
```

## Development

```bash
# Start development server
pnpm run start:dev

# Build for production
pnpm run build

# Run tests
pnpm run test
```

## API Endpoints

```
GET /artists        # Get all artists
GET /artists/:id    # Get artist by ID
POST /artists       # Search artists
```

## Project Structure

```
src/
├── artists/
│   ├── artists.controller.ts    # HTTP routes
│   ├── artists.service.ts       # Business logic
│   └── artists.module.ts        # Module configuration
└── main.ts                      # Application entry point
```

## Environment

- Node.js 18+
- pnpm 10+

## License

ISC
