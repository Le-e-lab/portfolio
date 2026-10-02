# SESSION_STATE — Portfolio

> **Date:** 2026-10-02
> **Status:** Green. `ci-parity.sh` passes; typecheck, production build,
> anti-vibecoding lint and RSC boundary lint all clean.
>
> The previous version of this file tracked a Vite + `src/components/*.jsx`
> codebase. That code is gone. The live architecture is Next.js 15 App Router
> and is documented in `docs/master-spec-portfolio.md`.

---

## What ships

- Routes: `/` and `/work/[slug]` only. Five lower sections are anchors.
- Seven sections on one page: Work, Activity, Services, Stack, About,
  Off the clock, Contact. Three lap sectors drive `LapRail`.
- Five MDX case studies in `content/work/`.
- Motion: `MotionProvider` in the root layout, `Reveal` for hierarchy, one
  rAF-throttled scroll listener for the whole page.

## Work done this session

| Change | State |
|--------|-------|
| `scripts/snapshot-github.ts` — token never loaded | **Fixed.** `tsx` does not load `.env.local`; only Next.js does. The Activity calendar was frozen on a stale snapshot despite a valid token in `.env.local`. Added `process.loadEnvFile(".env.local")` (ENOENT tolerated, existing env vars still win). Verified live: 720 contributions / 53 weeks. |
| Kwikifund → KreditZW rename | Completed in `content/work/`, `images.manifest.ts`, `site.config.ts`, `sections.data.ts`. |
| Owner copy | `humanLine`, About lead/body/facts, Off the clock (all five blocks), stack additions (Dart, Expo, Flutter, SQLite, Supabase, Linux, Fedora KDE), `designProfileLabel` → Kinto Designs, prefilled mailto inquiry template. |
| Typography tokens | Hardcoded `text-[11px]` / `text-[10px]` swapped for `text-label` / `text-label-sm` across all components. |
| Tap targets | Footer brand and CV links given `min-h-[44px]` at mobile widths only, with padding so the hit area does not break the line box. |

## Investigated and deliberately not shipped

**The ten files in `public/images/about/`, `public/images/food/` and
`public/images/projects/*-cover.webp` are screenshots of this site's own dashed
placeholder frames, not real photographs or product screenshots.**

Evidence: every one of the ten is `PaletteAlpha`, and its colour histogram is
dominated by the exact design tokens — `#0A0A0B` (`--color-bg`, 1.79M of 1.8M
pixels), `#26262B` (`--color-line`), `#8C8C95` (`--color-muted`) — with 149–207
unique colours and standard deviation ≈ 0.01. A real screenshot
(`chefmuse-cover.webp`) measures std 0.12 with 6184 colours. Worse,
`about-headshot`, `about-workspace`, `about-gym` and `about-candid` are
byte-identical (md5 `1000ee99…`), as are `food-1` through `food-4`
(md5 `0cfa495c…`).

Wiring them into `src/lib/images.ts` was attempted and reverted. Registering
them would replace eight intentional dashed placeholder frames with eight flat
black rectangles — the same picture four times in a row in both the About and
Food rows — and would make `hasImage()` lie, which is the thing
`strictImages` is supposed to gate on. The dashed frame is the designed,
honest state per §1 of the master spec.

**Still owed by the owner:** real photography for the four About and four Food
slots, real screenshots for the KreditZW and job-agent covers, alt text for all
of them, LinkedIn URL, design profile URL, booking URL, and defensible
case-study outcomes.
