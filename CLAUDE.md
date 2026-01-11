# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "Tweede kookboek van Robrecht" - a recipe collection web application built with Next.js. The site displays a curated collection of recipes with detailed information, images, and cooking instructions. Live site: https://kookboek.robrecht.me

**Tech Stack**: Next.js 15.2.4, React 19, TypeScript, Tailwind CSS 4.0, pnpm

## Development Commands

```bash
# Development server with hot reload
pnpm dev

# Production build
pnpm build

# Production server (after build)
pnpm start

# Linting (enforces import order and Next.js standards)
pnpm lint

# Update dependencies interactively
pnpm deps

# Download and convert recipe images to WebP
pnpm run scripts:download-images
```

**Package Manager**: This project uses pnpm exclusively. Version is locked to 10.6.4+ via packageManager field.

## Architecture & Code Structure

### Core Architecture
- **Static Site Generation (SSG)**: All pages pre-rendered at build time for performance
- **Data Source**: Single JSON file (`data/recipes.json`) containing all recipe data
- **Routing**: File-based routing with dynamic recipe pages at `/r/[slug]`
- **Image Strategy**: Local WebP images stored in `data/images/`

### Directory Structure
```
data/                       # Recipe data and assets
├── recipes.json            # Recipe database (~15-20 recipes)
├── images/                 # Recipe images (WebP format)
└── images.ts               # Image exports for imports

src/
├── pages/                  # Next.js routing
│   ├── index.tsx          # Home page (recipe grid)
│   ├── r/[slug].tsx       # Dynamic recipe detail pages
│   └── api/recipes.ts     # REST API endpoint
├── components/            # React components
│   ├── RecipeCard.tsx     # Recipe preview card
│   └── RecipeImage/       # Image handling component
├── core/                  # Business logic & utilities
│   ├── recipes.ts         # Recipe queries and utilities
│   └── types.ts           # TypeScript interfaces
├── util/                  # Utilities
│   └── string.ts          # ISO 8601 duration parsing
└── styles/
    └── globals.css        # Global styles + custom Tailwind theme
```

### Key Features
- **Screen Wake Lock**: Recipe detail pages prevent mobile screens from dimming during cooking
- **Dynamic Ingredient Scaling**: Adjust recipe servings with automatic amount calculations
- **ISO 8601 Time Parsing**: Cook times stored as `PT20M` format, displayed as "20m"
- **Responsive Design**: 1-4 column recipe grid based on screen size
- **SEO Optimization**: Open Graph tags, structured data

## Data Structure

### Recipe Type Structure
```typescript
interface Recipe {
  name: string;           // Recipe title
  slug: string;          // URL identifier (e.g., "kip-tikka-masala")
  image: string;         // Image filename
  recipeYield: number;   // Default servings for scaling
  prepTime?: string;     // ISO 8601 format (PT20M = 20 minutes)
  cookTime?: string;
  totalTime?: string;
  recipeCuisine?: string;     // e.g., "Italiaans", "Aziatisch"
  recipeCategory?: string;    // e.g., "Lunch", "Hoofdgerecht"
  recipeIngredient: RecipeIngredient[];
  recipeInstructions: RecipeInstruction[];
}
```

### Recipe Management

- **Data File**: `data/recipes.json` contains all recipe data
- **Image Files**: Store WebP images in `data/images/`
- **Image Imports**: Auto-generated `data/images.ts` file exports all images
- **Slug Generation**: Use kebab-case slugs matching recipe names

## TypeScript Configuration

**Path Aliases**: Use `@` prefix for clean imports and `@data` for data access
```typescript
import { Recipe } from '@core/types';
import { RecipeCard } from '@components/RecipeCard';
import { formatDuration } from '@util/string';
import * as Images from '@data/images';
```

**Strict Mode**: TypeScript strict mode is enabled. All code must be fully typed.

## Styling Guidelines

**Tailwind CSS v4**: Custom theme with warm color palette
- Primary colors: `--color-primary-500` (#fbd791), `--color-primary-600` (#e8c580)
- Font: Montserrat (Google Fonts)
- Mobile-first responsive design

## Development Practices

### Import Organization
ESLint enforces alphabetical import order with newlines between groups:
```typescript
import { GetStaticProps } from 'next';
import { useState } from 'react';

import { RecipeCard } from '@components/RecipeCard';

import { getAllRecipes } from '@core/recipes';
import { Recipe } from '@core/types';
```

### Code Patterns
- **Static Generation**: Use `getStaticProps` and `getStaticPaths` for data fetching
- **Component Structure**: Functional components with TypeScript interfaces
- **State Management**: React hooks (useState, useEffect) - no external state library
- **Error Handling**: Graceful fallbacks for missing recipe data or images

### Testing & Quality
- No test framework currently configured
- ESLint runs on build and enforces import ordering
- TypeScript compiler ensures type safety

## Common Operations

### Adding a New Recipe

1. Add recipe data to `data/recipes.json` with unique slug
2. Add recipe image to `data/images/` as WebP
3. Update `data/images.ts` with image import
4. Verify recipe displays correctly on home page and detail page

### Image Management
- Images should be WebP format for performance
- Use `pnpm run scripts:download-images` to fetch and convert images from URLs
- Images are imported statically for Next.js optimization

### API Development
- REST endpoint at `/api/recipes` returns all recipe data as JSON
- Follow Next.js API route patterns for new endpoints
- Maintain type safety with TypeScript interfaces

## Performance Considerations

- **Static Generation**: All pages built at compile time
- **Image Optimization**: Next.js Image component with WebP format
- **Bundle Size**: Minimal dependencies, no unnecessary libraries
- **Mobile Optimization**: Screen wake lock for cooking, touch-friendly interface

## Environment & Tooling

- **Node.js**: 22.14.0 (specified in `.tool-versions`)
- **pnpm**: 10.7.1+ (locked in package.json)
- **Editor**: VSCode settings configured for TypeScript path resolution