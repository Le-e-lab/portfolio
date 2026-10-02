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
| Tap targets | Footer brand and CV links given `min-h-[44px]` at mobile widths only, with padding so the hit area does not break the line box. Header controls raised to 44px. |
| Owner markers leaked to visitors | **Fixed.** `[[FILL:]]` written as prose compiled verbatim into the page — 8 occurrences on KreditZW, 6 on Job-Agent. Every prompt converted to `{/* */}` MDX comments; `dropEmptySections()` added to `work.ts` so an unwritten study renders no bare Problem/Process/Result headings. Verified 0 leaks in rendered HTML across all five routes. |
| All five case studies written | **Complete.** KreditZW, Job-Agent, Guardian, ChefMuse and GyMPal each have full Problem, Process and Result prose grounded in `public/Lesley_Mutsambiwa_Resume.docx`, the live ChefMuse repository, and the POTRAZ / S.I. 155 of 2024 text. No invented metrics, users, or providers. |
| ChefMuse verification | Live site and repo both HTTP 200. Stack corrected from JavaScript to TypeScript against the repo. The deployed bundle opens the rear camera via `getUserMedia` with `facingMode: "environment"` and streams frames to a vision model, so the "point your phone at the fridge" summary is accurate and the Process section now states the mechanism. |
| Guardian legal grounding | Verified against primary sources: Cyber and Data Protection Act [Chapter 12:07] is Act 5 of 2021, POTRAZ is the designated authority under s5, and S.I. 155 of 2024 requires a data controller licence, registration at fifty or more data subjects, and a named data protection officer whose details are meant to be published. |
| No test suite | **Fixed.** `tests/portfolio.test.ts`, 8 tests on `node:test` + `tsx` (both already installed, no new dependency). `package.json` now has a `test` script, so `ci-parity.sh` step 6 executes instead of skipping. Includes the regression guard for the marker leak above. |
| Placeholder legibility | Dashed frames lifted to `#3a3a41` on `#0e0e10` (contrast 1.71). Orphaned `--color-status` amber token removed; the Hero availability dot now uses `--color-accent`. About caption placeholders became `Fig. 0x — caption pending` instead of a mangled marker. |
| Fake screenshot assets | `public/images/about/`, `public/images/food/` and `public/images/projects/` are gitignored, so a screenshot of our own placeholder frame can never reach production. |

## Verified deploy state

- `bash /home/lee/.config/opencode/scripts/ci-parity.sh .` → **PASSED**. TypeScript,
  ESLint, anti-vibecoding (43 files), RSC boundaries (41 files), production build,
  and 8/8 tests.
- Home page, all five `/work/[slug]` routes, `sitemap.xml` and `robots.txt` return
  200. Unknown slugs return 404.
- 1440px and 360px: no horizontal overflow, no console errors, no dead internal
  links, one `h1` per route, all tap targets ≥44px.
- Secret hygiene: zero `ghp_` / `github_pat_` / private-key matches across all
  tracked files *and* across full git history. `.env.local` is untracked and
  gitignored.
- The GitHub token was pasted in chat during this session. Rotate it, and put the
  replacement in the hosting platform's secret store as `GITHUB_TOKEN` if live
  snapshots are wanted on deploy. The build degrades honestly to the committed
  720-contribution snapshot when the token is absent — it never fabricates data.

**Working tree clean at `0d43edf`, 10 commits ahead of `origin/main`. Nothing has
been pushed.**


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
of them, LinkedIn URL, booking URL, and a defensible outcome for each of the five
case studies. `designProfileUrl` is set. Each remaining case-study gap is a
narrow `{/* TODO(owner) */}` comment enforced by a test, so it ships as a
non-blocker and costs a visitor nothing.
