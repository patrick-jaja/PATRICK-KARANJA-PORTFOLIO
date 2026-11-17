# Patrick Karanja — Creative Portfolio

A responsive, multi-page portfolio for Patrick Karanja, built with static HTML, Tailwind CSS, and Vite.

## Requirements

- Node.js and npm

## Run locally

```powershell
npm install
npm run dev
```

Vite serves the portfolio at `http://localhost:3000`.

## Production build

```powershell
npm run build
npm run serve
```

The build regenerates `src/css/compiled.css` from `src/css/tailwind.css` and `tailwind.config.js`, then outputs the static site to `dist/`. Vite discovers root-level HTML pages automatically, so new case studies can be added as root-level `.html` files.

## Portfolio pages

- `index.html` — homepage and project gallery
- `ajira.html`, `kaisa.html`, `kepsa.html`, `kyeeap.html`, and `swvl.html` — project case studies
- `youthjobs.html` — Youth & Jobs Initiative case study

## Images and fonts

Original project artwork is kept under `assets/`. Smaller, web-ready project images live under `assets/optimized/` and are referenced by the relevant HTML pages; keep originals intact when replacing or optimizing an image. Local Gellix font files are stored under `assets/fonts/`.
