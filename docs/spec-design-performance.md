# Lesley Portfolio — Design & Performance Plan (Approach B: Surgical Refactor)

**Date:** 2026-09-09
**Status:** Approved by Lesley
**Brand:** Lesley — Designer & Developer
**Domain:** `lesley.runs-on.dev` (free subdomain via runs-on.dev registry)

---

## Current State

- Vite + React 19 SPA at `Le-e-lab.github.io/portfolio/`
- 402KB single JS bundle (framer-motion + react-icons + react-router) — slow on 3G
- 4 routes: Home, Work, About, Contact
- Design system: Carbon Black (#0c0c0c) + Tangerine (#E8650A), Playfair Display + Bebas Neue + Outfit + JetBrains Mono
- Work page has 3 design projects buried under software projects
- Positioning reads "developer who designs"; target is "designer who also codes"

## Workstream 1 — Performance

| Change | Impact |
|---|---|
| React.lazy route code-splitting | -120KB initial |
| Replace react-icons with inline SVG icon set | -80KB |
| Skip framer-motion animations on mobile / reduced-motion | -60KB perceived |
| Remove film grain overlay on mobile | GPU savings |
| Lazy-load + fixed aspect ratio on images | CLS fix |
| WebP conversion of hero + design images | -40% image weight |

**Target:** < 150KB initial JS, first paint in ~2-3s on 3G.

## Workstream 2 — Design-Led Positioning

- Hero: "Designer & Developer" (design first), de-emphasize tech pills
- Work page: default filter = Design, larger visual design grid
- About: promote graphic designer role, design-first bio
- Contact: keep dossier style (already strong)

## Workstream 3 — Graphic Design Showcase

- Masonry-style grid (CSS columns) with full-bleed thumbnails
- Lightbox modal (custom, no native confirm/alert) with zoom + description
- Category tags: Logo, Brand Identity, UI Design, Poster
- `public/design-projects.json` data file (manual, extendable)
- Images stored in `public/images/design/`, max ~800px wide, WebP/JPEG

## Hosting

1. Claim `lesley.runs-on.dev` (GitHub sign-in)
2. CNAME → `le-e-lab.github.io` via registry PR
3. Change Vite `base` from `/portfolio/` to `/`
4. Deploy via existing GitHub Actions workflow