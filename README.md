# Harry Potter Characters

Character explorer built with React + Vite consuming the Harry Potter API.

## Demo
- Deploy: https://your-vercel-url.vercel.app

## Features
- Character listing with house/group filters and name search
- House theming on cards and clean, responsive grid
- Only characters with valid images are shown for visual consistency

## Tech Stack
- React
- Vite
- Axios
- CSS (no frameworks)

## Install & Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Project Structure
```
src/
  components/   # UI components (cards, filters, footer)
  pages/        # Home page
  services/     # API access (hpService)
  styles/       # Global styles (app.css)
public/         # Static assets
```

## Academic Notes
- API data is normalized (house label + houseKey) to keep filtering consistent.
- UI avoids external libraries to demonstrate core React + CSS skills.
- Images are framed uniformly for a consistent grid layout.

## Author
- Alba Ganduxé — 2026
