# 🎵 iTunes Artist Filter API

A professional NestJS REST API that fetches music artists from iTunes API and filters them based on the current day of the week. Built as a technical assessment demonstrating enterprise-grade architecture, dependency injection, and API integration.

## 🚀 Core Features

- **Day-based Filtering**: Automatically determines current day letter (Monday → "M", Tuesday → "T") and filters artists whose names start with that letter
- **iTunes API Integration**: Robust HTTP client with error handling and data transformation
- **Professional Architecture**: Modular NestJS structure with dependency injection and separation of concerns
- **Structured DTOs**: Type-safe response objects with metadata and timestamps
- **Error Handling**: Custom exceptions and comprehensive logging

## 🛠 Tech Stack

- **NestJS v11.1.9** - Progressive Node.js framework with TypeScript
- **TypeScript** - Strict mode for type safety
- **RxJS** - Reactive programming with firstValueFrom for HTTP calls
- **Biome v2.3.6** - Modern linting and formatting
- **pnpm v10.22.0** - Fast, efficient package manager

## 📦 Installation & Setup


### Prerequisites
- Node.js 18+
- pnpm 10+ (recommended, auto-installed via packageManager)
- npm (compatible alternative)

---
**ℹ️ Note:** This project is optimized for pnpm, but you can use npm if you prefer. All scripts work the same with both package managers.
---

### Quick Start

#### Using pnpm (recommended)
```bash
# Install dependencies
pnpm install
# Start development server
pnpm run start:dev
```

#### Using npm (alternative)
```bash
# Install dependencies
npm install
# Start development server
npm run start:dev
```

The server will be available at http://localhost:3000

### Development Commands

#### pnpm commands
```bash
# Development with hot reload
pnpm run start:dev
# Production build
pnpm run build
# Start production server
pnpm run start:prod
# Format code
pnpm run format
# Linting
pnpm run lint
```

#### npm commands
```bash
# Development with hot reload
npm run start:dev
# Production build
npm run build
# Start production server
npm run start:prod
# Format code
npm run format
# Linting
npm run lint
```

## 🌐 API Documentation

### Main Endpoint
```http
GET /artists/today
```

**Description**: Returns artists whose names start with the first letter of the current day

**Response Format**:
```json
{
  "success": true,
  "message": "Artists filtered successfully for current day",
  "currentDay": "Tuesday",
  "filterLetter": "T",
  "totalArtistsFound": 15,
  "artists": [
    {
      "artistId": 159260351,
      "artistName": "Taylor Swift",
      "primaryGenreName": "Pop",
      "artistLinkUrl": "https://music.apple.com/us/artist/taylor-swift/159260351?uo=4"
    }
  ],
  "timestamp": "2024-11-19T10:30:00.000Z"
}
```

### Example Usage
```bash
# Get filtered artists for today
curl http://localhost:3000/artists/today

# Pretty format with jq
curl -s http://localhost:3000/artists/today | jq '.'
```

## 🏗 Project Architecture

```
src/
├── shared/                      # Reusable services and utilities
│   ├── services/
│   │   └── date.service.ts      # Day-of-week logic
│   └── shared.module.ts         # Shared module exports
├── artists/                     # Core business domain
│   ├── controllers/
│   │   └── artists.controller.ts    # HTTP routes and validation
│   ├── services/
│   │   ├── itunes-api.service.ts    # iTunes API integration
│   │   └── artists-filter.service.ts # Business logic orchestration
│   ├── dto/
│   │   └── artists-response.dto.ts  # Type-safe response objects
│   └── artists.module.ts        # Feature module configuration
├── common/                      # Cross-cutting concerns
│   └── exceptions/
│       └── itunes-api.exception.ts  # Custom error handling
└── main.ts                      # Application bootstrap
```

## 🧠 Business Logic

### Day-Based Filtering Algorithm
1. **Get Current Day**: Uses DateService to determine today's day name
2. **Extract Letter**: Takes first character of day name (e.g., "Wednesday" → "W")
3. **Fetch Artists**: Calls iTunes API with search term for the letter
4. **Filter Results**: Returns only artists whose names start with the day letter
5. **Structure Response**: Wraps results in professional DTO with metadata

### Services Architecture
- **DateService**: Reusable date logic across the application
- **ItunesApiService**: Handles all iTunes API communication
- **ArtistsFilterService**: Orchestrates business logic and data transformation

## 🔧 Development Workflow

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: description of changes"

# Push and create PR
git push origin feature/your-feature-name
```

### Code Quality
- **TypeScript strict mode** for type safety
- **Biome configuration** for consistent formatting
- **Professional error handling** with custom exceptions
- **Dependency injection** following NestJS best practices

## 🧪 Testing (Future Implementation)

Prepared structure for comprehensive testing:
```bash
# Create testing branch
git checkout -b feature/testing

# Unit tests
pnpm run test

# Integration tests
pnpm run test:e2e

# Test coverage
pnpm run test:cov
```

## 📊 Assessment Criteria Covered

- ✅ **NestJS Proficiency**: Modules, controllers, services, dependency injection
- ✅ **TypeScript Mastery**: Strict mode, interfaces, type safety
- ✅ **API Integration**: HTTP client, error handling, data transformation
- ✅ **Architecture Design**: Separation of concerns, reusable components
- ✅ **Professional Code**: DTOs, exception handling, logging
- ✅ **Git Workflow**: Feature branches, clean commits, proper merging

## 🚀 Deployment Ready

The application is production-ready with:
- Environment configuration
- Error handling and logging
- Type-safe API responses
- Professional project structure
- Clean git history

## 📝 License

ISC
