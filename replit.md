# Jignesh D Maru - Review App

## Overview
A review application where users can submit reviews for GitHub repositories from https://github.com/Jignesh1236. Users can provide their name, select an app/repo name, give a star rating (1-5), and write a review.

## Features
- Submit reviews with name, app/repo name, star rating, and review text
- View all reviews in the Reviews tab
- Click on GitHub icon next to app name to visit the repository
- Reviews sorted by date (newest first)

## Tech Stack
- **Frontend**: React with Vite, TypeScript, TailwindCSS, Radix UI components
- **Backend**: Express.js with TypeScript
- **Database**: MongoDB (via DATABASE_URL environment variable)
- **State Management**: TanStack Query (React Query)

## Project Structure
```
client/           - React frontend
  src/
    components/   - UI components (ReviewCard, ReviewForm, etc.)
    pages/        - Page components (Overview, Reviews)
    lib/          - Utilities and query client
server/           - Express backend
  index.ts        - Server entry point
  routes.ts       - API routes
  storage.ts      - MongoDB storage layer
shared/           - Shared types and schemas
  schema.ts       - Zod schemas for validation
```

## API Endpoints
- `GET /api/reviews` - Fetch all reviews
- `POST /api/reviews` - Create a new review
- `GET /api/widget` - Get SVG widget for reviews

## Running the App
- Development: `npm run dev`
- Build: `npm run build`
- Production: `npm run start`

## Environment Variables
- `DATABASE_URL` - MongoDB connection string (required)
