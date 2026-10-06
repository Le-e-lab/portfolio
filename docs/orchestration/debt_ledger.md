# DEBT_LEDGER — Portfolio

> Deliberate simplifications, known ceilings, and upgrade paths.
> Audited 2026-10-02 against the Next.js 15 App Router build. The previous
> version of this file described a Vite codebase that no longer exists.

---

## Active debt

### 1. Owner-owed case study outcomes
- **Location:** `content/work/*.mdx` → the `Result` section of each of the five
- **Status:** All five now have complete Problem, Process and Result prose. What
  is missing is the part only Lesley can supply: a real outcome for each, the
  scoring model and payment provider behind KreditZW, the NLP library and
  WhatsApp gateway behind Job-Agent, the model and recipe corpus behind
  ChefMuse, the actual checks Guardian runs, and whether anyone has used GyMPal.
- **Not debt in the code sense.** Each gap is a narrow `{/* TODO(owner) */}`
  MDX comment, so it costs a visitor nothing and is enforced by
  `tests/portfolio.test.ts`. The prose around it never overstates: no invented
  percentages, users or latency numbers.
- **Upgrade path:** Answer the prompts, delete the comment. If there is genuinely
  no signal, "built for myself, no users tracked yet" is the correct line and
  reads better than a padded one.
- **Priority:** Blocked on owner

### 2. `strictImages` ships false
- **Location:** `src/config/site.config.ts` → `flags.strictImages`
- **Status:** The gate in `src/lib/images.check.ts` is live but disabled. Correct:
  all eight About/food slots still have `[[FILL]]` alt text, which now also fails
  the gate for any slot that *does* have a file. Correct behaviour.
- **Upgrade path:** Owner supplies the four About photos and four food photos
  with real alt text → flip to `true`. `tests/portfolio.test.ts` fails with a
  readable list until that happens, so the flip cannot silently break layout.
- **Priority:** Blocked on owner

### 3. Empty owner URLs
- **Location:** `site.config.ts` → `bookingUrl` is `""`. `linkedinUrl` is now set
  to `https://www.linkedin.com/in/lesley-mutsambiwa/`; `designProfileUrl` points
  at Kinto Designs.
- **Status:** Correctly guarded by `{siteConfig.x && (...)}` in
  `contact-section.tsx`, so no dead links render. Booking is simply absent. LinkedIn
  returns `999` to automated requests, so the link is unverified by machine.
- **Upgrade path:** Owner supplies the booking URL. No code change needed.
- **Priority:** Blocked on owner

### 4. `images.check.ts` is not unit-testable
- **Location:** `src/lib/images.check.ts` → imports `src/lib/images.ts`
- **Status:** `images.ts` imports `.webp` files as static imports so next/image
  can emit blur placeholders. Plain Node cannot load that extension, so importing
  the module under `node:test` throws `ERR_UNKNOWN_FILE_EXTENSION`. Only webpack
  can resolve it. The module is correct; it is untestable in isolation.
- **Upgrade path:** None needed. The manifest-level invariants are tested
  directly in `tests/portfolio.test.ts`, and the missing-slot gate still runs for
  real on every `next build`.
- **Priority:** Closed, documented

### 5. Dead Vite-era assets (design pieces now live in Services; the rest still dead)
- **Location:** `public/images/design/` (14 files), `public/images/projects/`
  (6), `public/images/hero-portrait.{jpg,webp}`, `public/design-projects.json`,
  `public/projects.json`, `src/assets/images/design/` (3 files)
- **Status:** Zero references anywhere in `src/` or `content/`. The only live
  `public/` asset is `og-image.jpg` via `siteConfig.ogImagePath`. The fake
  screenshots under `public/images/` are now gitignored so they cannot ship.
- **Upgrade path:** Delete, or move the design pieces somewhere deliberate if
  the portfolio is ever meant to show graphic work.
- **Priority:** Low — harmless, just weight in the repo

### 6. Cover `minWidth` is aspirational
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
| No test suite at all | `tests/portfolio.test.ts`, 8 tests on `node:test` + `tsx`, both already installed, so zero new dependencies. `package.json` now has a `test` script, which means `ci-parity.sh` step 6 actually runs instead of skipping. Covers frontmatter parsing, the owner-marker leak regression, unbalanced MDX comments, empty sections, link validation, `heatLevel` boundaries and the zero-max guard, and image slot invariants. |
| Owner markers rendered as public text | `[[FILL:]]` written as prose compiled verbatim into the page. It shipped 8 times on KreditZW and 6 on Job-Agent. All prompts converted to `{/* */}` MDX comments, plus `dropEmptySections()` in `work.ts` so an unwritten study renders no bare headings, plus a test that strips comments and fails if any marker survives in prose. |
| ChefMuse frontmatter claimed an unverified URL | Verified both `le-e-lab.github.io/chefs-muse` and `github.com/Le-e-lab/chefs-muse` at HTTP 200, then linked them. The `[[FILL]]` note claiming the URL was unconfirmed is retired. |
| `snapshot-github.ts` never read `.env.local` | `tsx` does not load env files, so the Activity calendar silently froze on the last good snapshot even with a token present. Added `process.loadEnvFile` with ENOENT tolerated. Verified: fresh 720-contribution fetch. |
| Kwikifund → KreditZW rename | Completed across content, manifest, config and services data. |
| Site frozen on a 21 Sep Pages artifact | `gh api repos/…/pages` reported `build_type: "workflow"`, so Pages publishes an uploaded artifact and never read `gh-pages`. The repo contained no Pages workflow, so nothing had rebuilt since September. Added `.github/workflows/deploy-pages.yml` (`configure-pages` → `upload-pages-artifact` → `deploy-pages`) with the `pages`/`id-token` permissions that mode requires. Live now at `lesley.runs-on.dev`. |
| Static export would have shipped unstyled | Added `public/.nojekyll`. Without it the Pages Jekyll build discards `_next/`, so the site would have gone live with no CSS or JS. |
| `pnpm install` failed in CI with `ERR_PNPM_IGNORED_BUILDS` | `pnpm-workspace.yaml` had `allowBuilds` entries whose values were the literal placeholder text `"set this to true or false"` instead of booleans. Set both to `true`. Note pnpm 11 ignores the `"pnpm"` field in `package.json` entirely. |
| CV link was broken on every path | Hero and contact wrapped `siteConfig.cvPath` in `next/link`, which prefetched the target as a route and 404ed on `/cv.pdf.txt`. The command palette used `router.push`, so the CV never downloaded at all. All three are plain anchors now. |
| Hardcoded label sizes | Replaced `text-[11px]` / `text-[10px]` with the `text-label` / `text-label-sm` tokens. |

