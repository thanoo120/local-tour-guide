# Ceylon Wanderer — Local Tour & Travel Web Guide

A mobile-first responsive web application for tourists exploring Sri Lanka. Browse local attractions by category, bookmark favourites, calculate real-time distances using the Geolocation API, and open directions in Google Maps.

---

## Framework & Stack

| Layer | Technology |
|---|---|
| Framework | React 19 (SPA) |
| Routing | React Router v7 (HashRouter) |
| Styling | Tailwind CSS v4 |
| Build Tool | Vite 8 |
| Mock API | json-server |
| Storage | Browser LocalStorage |
| Location | HTML5 Geolocation API |

---

## Running on Localhost

### Prerequisites

- Node.js 18 or later
- npm 9 or later

### Steps

```bash
# 1. Install dependencies
cd frontend
npm install

# 2. Start the mock REST API (runs on port 3001)
npx json-server --watch db.json --port 3001

# 3. In a separate terminal, start the dev server (runs on port 5173)
npm run dev
```

Open `http://localhost:5173` in your browser.

> The app works without json-server — it falls back to built-in local data automatically.

---

## Browser Compatibility

Tested and working in:

- Google Chrome 120+ (recommended for DevTools mobile simulation)
- Mozilla Firefox 121+
- Microsoft Edge 120+

The Geolocation API requires a secure context (HTTPS or localhost).

---

## Mobile Simulation

Open Chrome DevTools → Toggle device toolbar (`Ctrl+Shift+M`) and select any of:

- iPhone 12 Pro (390×844)
- Pixel 7 (412×915)
- Samsung Galaxy S20 Ultra (412×915)

---

## Features

- Category filtering: Hotels, Nature, Historical
- Real-time distance from your location (Haversine formula)
- Favourites persisted in LocalStorage
- Google Maps deep-link from every attraction detail page
- Search with client-side validation (min 2 characters)
