# Smart Travel Planner (with Real API Integration)

This version uses real external APIs to fetch points of interest and suggestions based on destination and interests.

## Features
- Tailwind CSS styling
- Dynamic form for destination, duration, and interests
- Real-time data fetching from OpenTripMap API (or similar)
- Works inside microCI iframe

## API Requirements
- Sign up at https://opentripmap.io/product and get an API key.
- Replace `YOUR_API_KEY` in `scripts/main.js` with your key.

## Usage
1. Open `index.html` in browser or iframe.
2. Enter destination (e.g., New York, Rome, Paris).
3. Select trip duration and interests.
4. View dynamic itinerary based on real-world data.

## Note
This app assumes a valid API key for OpenTripMap and basic rate limits.