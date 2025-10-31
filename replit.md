# Review Website

## Overview
A modern review website application built with Vite frontend and Express backend. Users can submit reviews with ratings and view all submitted reviews.

**Current State**: Fully functional and running in Replit environment

## Project Architecture

### Frontend
- **Framework**: Vite + Vanilla JavaScript
- **Port**: 5000 (webview)
- **Features**:
  - Review submission form with star rating system
  - Reviews listing page
  - Client-side routing
  - Responsive design

### Backend
- **Framework**: Express.js (Node.js)
- **Port**: 3000 (localhost only)
- **Database**: MongoDB (via MongoDB Atlas)
- **API Endpoints**:
  - `GET /api/reviews` - Fetch all reviews
  - `POST /api/reviews` - Submit a new review

### Database Schema
```javascript
{
  name: String (required),
  rating: Number (1-5, required),
  review: String (required),
  date: String (auto-generated),
  timestamps: true
}
```

## Environment Configuration

### Required Secrets
- `MONGODB_URI` - MongoDB connection string (format: mongodb+srv://username:password@cluster.mongodb.net/database)

### Port Configuration
**Development:**
- Frontend: 0.0.0.0:5000 (exposed to public)
- Backend: localhost:3000 (internal only, not exposed)
- Vite proxy forwards `/api` requests to backend

**Production (Deployment):**
- Server: 0.0.0.0 on PORT from environment (defaults to 3000 if not set)
- Replit automatically sets PORT environment variable in deployment
- Serves both API endpoints and static frontend files from dist/
- MONGODB_URI must be set in deployment secrets

## Recent Changes (Oct 30, 2025)
- Imported project from GitHub
- Fixed backend server port from 5000 to 3000 for development
- Updated vite.config.js to proxy API requests to localhost:3000
- Added allowedHosts: 'all' to vite.config.js for Replit's dynamic domains
- Added HMR WebSocket configuration for Replit environment (wss protocol)
- Created unified start script (start.sh) to run both servers
- Added .gitignore for Node.js projects
- Configured deployment for autoscale target
- Updated server.js to bind to 0.0.0.0 in production for proper deployment
- Installed all npm dependencies
- Added MongoDB URI secret for database connection

## Deployment
The application is configured for autoscale deployment:
- Build command: `npm run build`
- Run command: `node server.js` (serves both API and static frontend)

## Development Workflow
Run `bash start.sh` to start both backend and frontend servers in development mode.
