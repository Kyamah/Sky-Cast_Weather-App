# 🌤️ SkyCast – Real-Time Weather Forecasting App

> **SkyCast** is a fast, responsive web application that delivers current, hourly, and 7-day weather forecasts for any location in the world. Built with React, Tailwind CSS, and the OpenWeather API, the project demonstrates API integration, state management with hooks, and modern front-end deployment.

---

## 📚 Table of Contents
1. [Features](#-features)
2. [Live Demo](#-live-demo)
3. [How It Works](#-how-it-works)
4. [Tech Stack](#-tech-stack)
5. [Getting Started](#-getting-started)
6. [Environment Variables](#-environment-variables)
7. [Available Scripts](#-available-scripts)
8. [Folder Structure](#-folder-structure)
9. [Deployment](#-deployment)
10. [Roadmap](#-roadmap)
11. [Contributing](#-contributing)
12. [License](#-license)
13. [Acknowledgements](#-acknowledgements)

---

## ✨ Features
- **Geolocation & Manual Search** – Detects user location or lets users search any city/ZIP.
- **Current Conditions Card** – Temperature, humidity, wind, sunrise/sunset, weather icon.
- **Hourly & 7-Day Forecast** – Scrollable hourly strip and daily grid with min/max temps.
- **Dynamic Backgrounds** – Changes imagery based on weather (sunny, rainy, snowy, etc.).
- **Dark-Mode Toggle** – Respects system preference and user override.
- **Responsive Design** – Optimized for mobile, tablet, and desktop.
- **Offline Fallback** – Caches last successful response with `localStorage` for flaky networks.
- **Lighthouse ≥ 90** – Performance-focused build with tree-shaking and code-splitting.

---

## 🚀 Live Demo
| Environment | URL |
|-------------|-----|
| Production  | <https://skycast.app> |
| Staging     | <https://beta.skycast.app> |

*(Both are auto-deployed from `main` and `dev` branches via Vercel.)*

---

## ⚙️ How It Works

1. **UI Layer (React + Tailwind)**  
   - `App.jsx` mounts global context and routes.  
   - `SearchBar.jsx` emits a `(lat, lon)` pair via context on submit.  
   - `WeatherPanel.jsx` consumes context and triggers `useWeather(lat, lon)`.

2. **Data Layer (`useWeather` hook)**  
   - Calls `/api/weather?lat={}&lon={}` (proxy) with `fetch`.  
   - Normalizes the OpenWeather JSON into a slimmed-down object: `current`, `hourly`, `daily`.  
   - Caches the object for 30 minutes in `localStorage`.

3. **Proxy Server (`/server/index.js`, optional)**  
   - Express middleware adds API key from `process.env` and sets `Cache-Control`.  
   - Prevents exposing the key in front-end bundle and lets you add rate-limit headers.

4. **Rendering**  
   - Components subscribe to the normalized weather object and re-render automatically.  
   - Icons from **Heroicons** or **Weather Icons** display conditionally.  
   - The `<body>` gradient or image gets a CSS class like `bg-rain` or `bg-clear` via effect.

5. **Build & Deployment**  
   - `vite build` produces a 100 KB gzipped bundle.  
   - Vercel detects the React template, builds, and serves from its edge CDN.

---

## 🛠️ Tech Stack
| Layer         | Technology                                   |
|---------------|----------------------------------------------|
| Front-End     | React 18, Vite, Tailwind CSS                 |
| State         | React Context + Hooks                        |
| Charts        | Chart.js (temp trends)                       |
| Back-End*     | Node.js + Express (API proxy & caching)      |
| API           | **OpenWeatherMap One Call v3**               |
| Geocoding     | Mapbox / OpenStreetMap Nominatim             |
| Deployment    | Vercel                                       |
| CI/CD         | GitHub Actions (lint → build → deploy)       |

\*You can skip the server entirely by calling the API directly and hiding the key in environment variables if your platform allows it.

---

## 🧑‍💻 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/your-handle/skycast.git
cd skycast

# 2. Install dependencies
npm install         # or yarn

# 3. Create environment file
cp .env.example .env.local  # then fill in your API keys

# 4. Run in dev mode
npm run dev         # http://localhost:5173

# 5. Build for production
npm run build && npm run preview

