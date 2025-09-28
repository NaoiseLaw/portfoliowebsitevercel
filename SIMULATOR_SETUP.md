# 3D Recruitment Simulator Setup

This document outlines the basic infrastructure setup for the 3D recruitment simulator that has been added to your portfolio.

## Files Created/Modified

### New Files:
- `app.js` - Express server with session middleware
- `routes/simulator.js` - Simulator routes with chat endpoint
- `public/simulator/index.html` - Basic HTML with Three.js setup
- `.env.example` - Environment variables template

### Modified Files:
- `package.json` - Added Express dependencies and server script
- `src/data/resume.tsx` - Added simulator link to navbar

## Dependencies Added

- `@google/generative-ai` - Google AI integration
- `express` - Web server framework
- `express-session` - Session management
- `@types/express` - TypeScript types for Express
- `@types/express-session` - TypeScript types for express-session

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your actual Google AI API key.

3. **Start the Express server:**
   ```bash
   npm run server
   ```
   The simulator will be available at: http://localhost:3001/simulator

4. **Start Next.js development server (in another terminal):**
   ```bash
   npm run dev
   ```
   Your portfolio will be available at: http://localhost:3000

## File Structure

```
portfolio/
├── app.js                          # Express server
├── routes/
│   └── simulator.js                # Simulator routes
├── public/
│   └── simulator/
│       └── index.html              # Simulator HTML page
├── .env.example                    # Environment variables template
└── src/
    └── data/
        └── resume.tsx              # Updated with simulator link
```

## Next Steps

1. **Add your Three.js code** to the script section in `public/simulator/index.html`
2. **Implement Google AI integration** in the `/chat` POST route in `routes/simulator.js`
3. **Customize the UI** styling in the HTML file as needed
4. **Add error handling** and validation as required

## API Endpoints

- `GET /simulator` - Serves the simulator HTML page
- `POST /simulator/chat` - Handles chat messages (placeholder for AI integration)
- `GET /simulator/session` - Returns session information
- `GET /health` - Health check endpoint

## Notes

- The simulator runs on port 3001 to avoid conflicts with Next.js (port 3000)
- Session management is configured for basic functionality
- All routes include proper error handling
- The HTML includes a responsive design and placeholder UI elements
- Three.js is loaded via CDN for easy setup
