# VELOCITY — Beyond the Ordinary

An interactive, scroll-driven automotive telemetry experience showcasing aerodynamic performance, synchronized vehicle physics, and empirical dispatch metrics. Built as a high-performance frontend engineering showcase.

Live Deployment: [https://faizankhatib-ctrl.github.io/VELOCITY-Scroll-Hero/](https://faizankhatib-ctrl.github.io/VELOCITY-Scroll-Hero/)  
Reference Implementation: [https://paraschaturvedi.github.io/car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation)

---

## Key Features

- **Coordinated GSAP ScrollTrigger Scrub (`scrub: 1`):** The vehicle's motion across the asphalt corridor is strictly driven by scroll velocity. No autoplay.
- **Dynamic Cyan Glowing Trail:** The energetic ribbon behind the car scales continuously with `scaleX` and `transformOrigin: left center`, remaining attached beneath the rear spoiler with zero gaps.
- **Sequential Typographic Reveal (`W E L C O M E   I T Z F I Z Z`):** Bold headline letters ignite sequentially with glowing cyan illumination as the vehicle sweeps across the roadway.
- **Telemetry HUD Readout:** Live digital speed counter ($0 \to 341\text{ km/h}$), corridor trajectory tracker ($0\% \to 100\%$), and dynamic stage indicators (`GRID/IDLE`, `LAUNCH`, `APEX`, `TOP SPEED`, `TERMINAL VELOCITY`).
- **Responsive Telemetry Metrics:** Four outcome cards pop in at distinct scroll trigger points without obstructing vehicle motion on desktop or mobile viewports.
- **Accessible & Resilient:** Supports `prefers-reduced-motion` for vestibular safety, handles viewport resize recalculations on the fly, and uses clean semantic HTML5 markup.

---

## Tech Stack

- **Core:** React 19, JavaScript (ES Modules)
- **Tooling:** Vite, Oxlint
- **Styling:** Tailwind CSS, Custom Automotive Utility System
- **Animation Engine:** GSAP 3.15, ScrollTrigger Plugin
- **Hosting:** Static GitHub Pages via GitHub Actions CI/CD

---

## Getting Started

### Prerequisites

- Node.js 18+ (tested on Node v20/v22)
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/faizankhatib-ctrl/VELOCITY-Scroll-Hero.git

# Enter the directory
cd VELOCITY-Scroll-Hero

# Install dependencies
npm install
```

### Development

```bash
# Start local dev server
npm run dev
```

The application will be accessible at `http://localhost:5173/`.

### Production Build & Linting

```bash
# Run linter
npm run lint

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Project Structure

```text
├── .github/workflows/
│   └── deploy.yml            # Automated GitHub Pages CI/CD workflow
├── public/
│   ├── car.png               # High-resolution McLaren 720S top-down asset
│   └── favicon.svg           # Site favicon
├── src/
│   ├── components/
│   │   ├── HeroSection.jsx   # Viewport-pinned graphite stage, HUD, & metrics
│   │   ├── CarVisual.jsx     # Asphalt road, vehicle asset, trail, & typography
│   │   └── StatsSection.jsx  # Performance archive & telemetry specs dashboard
│   ├── data/
│   │   └── stats.js          # Telemetry metrics dataset & layout configuration
│   ├── App.jsx               # Master GSAP ScrollTrigger timeline orchestrator
│   ├── App.css               # Asphalt textures, glow effects, & glassmorphism
│   ├── index.css             # Tailwind base layers, typography tokens, & scrollbars
│   └── main.jsx              # Application entry point
├── index.html                # Root HTML with SEO metadata & Google Fonts
├── package.json              # Project scripts & dependencies
└── vite.config.js            # Vite configuration with GitHub Pages base path
```

---

## License

MIT License. Designed and developed by Faizan Khatib.
