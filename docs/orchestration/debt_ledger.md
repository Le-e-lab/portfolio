# DEBT_LEDGER — Portfolio

> Deliberate simplifications, known ceilings, and upgrade paths.
> Audited 2026-10-02 against the Next.js 15 App Router build. The previous
> version of this file described a Vite codebase that no longer exists.

---

## Active debt

### 1. No test suite
- **Location:** repo root — no `*.test.*`, no test runner in `package.json`
- **Status:** `ci-parity.sh` step 6 reports "No test suite defined or placeholder
  found, skipping" and exits 0. The gate passes without proving anything.
- **Upgrade path:** `node --test` needs no dependency. The highest-value first
  tests are pure: `src/lib/heat.ts` bucketing, `src/lib/work.ts` frontmatter
  validation against `zod`, and `images.check.ts` missing-slot detection.
- **Priority:** Medium

### 2. `strictImages` ships false
- **Location:** `src/config/site.config.ts` → `flags.strictImages`
- **Status:** The gate in `src/lib/images.check.ts` is live but disabled. Correct:
  all eight About/food slots still have `[[FILL]]` alt text.
- **Upgrade path:** Owner writes real alt text → flip to `true`.
- **Priority:** Blocked on owner

### 3. Empty owner URLs
- **Location:** `site.config.ts` → `linkedinUrl`, `designProfileUrl`, `bookingUrl`
  are all `""`
- **Status:** Correctly guarded by `{siteConfig.x && (...)}` in
  `contact-section.tsx`, so no dead links render. The channels are simply absent.
- **Upgrade path:** Owner supplies the URLs. No code change needed.
- **Priority:** Blocked on owner

### 4. Dead Vite-era assets
- **Location:** `public/images/design/` (14 files), `public/images/projects/`
  (6), `public/images/hero-portrait.{jpg,webp}`, `public/design-projects.json`,
  `public/projects.json`, `src/assets/images/design/` (3 files)
- **Status:** Zero references anywhere in `src/` or `content/`. The only live
  `public/` asset is `og-image.jpg` via `siteConfig.ogImagePath`.
- **Upgrade path:** Delete, or move the design pieces somewhere deliberate if
  the portfolio is ever meant to show graphic work.
- **Priority:** Low — harmless, just weight in the repo

### 5. Cover `minWidth` is aspirational
- **Location:** `images.manifest.ts` → `WORK_COVER_MIN = { 2400, 1500 }`
- **Status:** Real covers are 1280×800. Never asserted — the value only appears in
  placeholder label copy. Ratio is correct (1.6 = `16 / 10`), so no crop.
- **Upgrade path:** Lower the numbers to match what is actually supplied, or
  leave as the target for future re-exports.
- **Priority:** Low

---

## Resolved this session

| Item | Resolution |
|------|------------|
| `snapshot-github.ts` never read `.env.local` | `tsx` does not load env files, so the Activity calendar silently froze on the last good snapshot even with a token present. Added `process.loadEnvFile` with ENOENT tolerated. Verified: fresh 720-contribution fetch. |
| Kwikifund → KreditZW rename | Completed across content, manifest, config and services data. |
| Hardcoded label sizes | Replaced `text-[11px]` / `text-[10px]` with the `text-label` / `text-label-sm` tokens. |
