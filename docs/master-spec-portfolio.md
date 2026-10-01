# Lesley Portfolio — Master Project Specification & Guardrails

> **Project:** Portfolio (`lesley.runs-on.dev`)
> **Owner:** Lesley Mutsambiwa — full-stack developer, Harare (`Le-e-lab`)
> **Stack:** Next.js 15 App Router, React 19, Tailwind v4 (`@theme` tokens), `motion` (LazyMotion + `domAnimation`), MDX case studies, native Playwright for verification.
> **Node:** 26.x · **Package manager:** pnpm (npm scripts still work)

This document describes what actually ships. It replaced a Vite-era spec that
documented a Carbon + violet palette, a honeycomb gallery, and Playfair/Outfit
type — none of which exist in this repository any more.

---

## 1. Non-negotiable content policy

**The site never invents facts.** This is the single most important rule and it
outranks every aesthetic instruction below.

- Facts come from `src/config/site.config.ts`, `src/lib/sections.data.ts`, and
  the resume at `public/Lesley_Mutsambiwa_Resume.docx`.
- Literal `[[FILL]]` markers in `sections.data.ts` and `content/work/*.mdx` are
  **intentional owner-work placeholders.** Do not delete them, do not replace
  them with plausible text, and do not report them as bugs.
- No fabricated metrics, testimonials, client names, project outcomes, or
  activity numbers.
- Unsatisfied image slots render a dashed placeholder frame via `ImageSlot`. That
  is correct behaviour, not a defect.

Still owed by the owner before these become real: LinkedIn URL, design profile
URL, booking URL, About copy and figure captions, F1 rows/team/opinion, gym
detail beyond GyMPal, food descriptions, anime/manga titles, side projects, and
defensible case-study outcomes. Required image slots: `about-headshot`,
`about-workspace`, `about-gym`, `about-candid`, `food-1..4`,
`work-kwikifund-cover`, `work-job-agent-cover`.

`siteConfig.flags.strictImages` stays `false` until every required slot has a
real file **and** real alt text. The gate in `src/lib/images.check.ts` is live
but disabled by design; flipping it too early breaks the build.

`GITHUB_TOKEN` is server/build-only and optional. With no token the Activity
section shows an honest empty state. Never substitute sample activity data.

---

## 2. Design system

### Tokens (`src/styles/globals.css`, `@theme` block)

| Token | Value | Role |
| --- | --- | --- |
| `--color-bg` | `#0a0a0b` | Page |
| `--color-surface` | `#111113` | Ledger rows, cards |
| `--color-surface-2` | `#17171a` | Hover / nested fill |
| `--color-line` | `#26262b` | 1px hairlines — the only divider |
| `--color-ink` | `#ededea` | Primary text |
| `--color-muted` | `#8c8c95` | Body, labels |
| `--color-dim` | `#787881` | Tertiary, **bg only** (see contrast) |
| `--color-accent` | `#ff4d2e` | Indices, single emphasis |
| `--color-status` | `#ffb224` | GitHub activity heat only |

Dark-only. There is no light theme and no `prefers-color-scheme` branch.

### Measured contrast (WCAG AA needs 4.5:1)

| Foreground | on `bg` | on `surface` | on `surface-2` |
| --- | --- | --- | --- |
| `ink` | 16.87 | 16.08 | 15.25 |
| `muted` | 5.94 | 5.66 | 5.37 |
| `dim` | **4.53** | **4.31 ✗** | **4.09 ✗** |
| `accent` | 5.99 | 5.71 | 5.41 |
| `status` | 10.97 | 10.46 | 9.92 |

**`text-dim` is legal only on `bg`.** On `surface` or `surface-2` use
`text-muted`. This is a measured constraint, not a preference — an earlier pass
had About facts and Stack cells failing because of it.

### Typography (`src/lib/fonts.ts`)

Bricolage Grotesque (display) · Instrument Sans (body) · Martian Mono (labels) ·
Instrument Serif (italic accent, at most one word per headline).

11px uppercase mono at `0.14–0.18em` tracking is the label register. At 360px,
mono labels need `leading-[1.6] tracking-[0.08em]` or they wrap awkwardly —
prefer widening a label over truncating it.

Radius is 2px max (`--radius-sharp`). Sharp, architectural edges.

### Forbidden

No gradients, glows, radial orbs, dot grids, drop shadows, glassmorphism,
`backdrop-filter`, emoji as UI, Lucide defaults, generic bento/3-card layouts,
checkmark bullet lists, or hover-lift-on-everything. No green anywhere — note
`public/images/projects/gympal.webp` contains `#10B981` and must be verified or
replaced before reuse. No em-dash-heavy AI copy, no "It's not X, it's Y"
constructions.

---

## 3. Architecture

```
src/app/            layout, page, sitemap.ts, robots.ts, not-found.tsx, work/[slug]
src/components/
  home/             hero, work-list, activity-section,
                    services-section, stack-section, about-section,
                    off-the-clock, contact-section
  layout/           header, footer
  ui/               brand, copy-email-button, image-slot, lap-rail,
                    motion-primitives, section-label
  command-palette/  command-palette
src/lib/            work.ts (fs, MDX), github.ts (fs, server-only),
                    heat.ts (pure), sections.data.ts, images.manifest.ts,
                    images.ts, images.check.ts, cn.ts, fonts.ts
content/work/       five MDX case studies
scripts/            snapshot-github.ts
```

Routing is deliberately shallow: `/` and `/work/[slug]`. Services, Stack, About,
Off the clock and Contact are **sections of the home page**, not routes. Do not
add routes for them, and do not link to them as if they were.

`src/lib/work.ts` and `src/lib/github.ts` read the filesystem, so they are
server-only. `src/lib/heat.ts` must stay pure and client-safe.

### Motion

`MotionProvider` (LazyMotion + `domAnimation`) wraps the **entire tree** in
`src/app/layout.tsx`. This is load-bearing: a provider nested inside `Hero`
means every `Reveal` below the fold renders nothing. Do not move it back.

`Reveal` honours both `prefers-reduced-motion` and `siteConfig.flags.storytelling`.
Under reduced motion it renders the final state with no clip and no transform.
The CSS `[data-reveal]` override inside the reduced-motion media query is
deliberate — it makes content visible pre-paint and prevents a hydration race
where a stale inline `opacity:0` survives.

Server HTML is always visible without JS; the no-JS guard is a `<noscript>` block
in the layout because motion only applies its hidden state after hydration.

`LapRail` dispatches `lap:progress` with `{ pct }`; `ActivitySection` listens and
maps it to a single `clip-path` on the calendar wrapper. Never reintroduce
per-cell animation — 371 Motion components was the version that got replaced.
It renders on `/` only.

---

## 4. Animation laws

1. **Scroll → storytelling.** One scroll listener for the whole page, rAF
   throttled, with `resize` and `load` re-measurement and proper cleanup. The
   activity calendar scrubs with the lap rather than adding a second listener.
2. **Reveal → hierarchy.** Fade + lift (`translateY(8px)` → `0`), staggered.
   Reveal blocks below the fold. Never reveal everything at once.
3. **Hover → feedback.** Underline draw, background shift, image zoom inside a
   fixed container (zero layout shift).
4. **Click → feedback.** `scale(0.97)` on press. Async actions show full state
   progression (`Send` → `Sending…` → `Sent ✓`).

Never `transition: all` — list properties explicitly. Never unthrottled scroll or
resize listeners. Never native `alert`/`confirm`.

---

## 5. Accessibility and quality gates

- Zero horizontal scroll at 360–400px. Verify, don't assume.
- Tap targets ≥44px on real controls. Sentence links inside a paragraph are not
  controls and must not carry `min-h-[44px]` — it breaks the line box.
- Exactly one `h1` per route. Section headlines are `h2`.
- Full keyboard navigation with a visible focus ring. The 404 exposes a strict
  order: skip link → brand → palette trigger → nav → content links.
- Every `<img>` has alt text. Zero dead links (`href="#"` or `href=""`).
- Descriptive title and meta description on every route.

---

## 6. Verification gate

Before declaring any task finished, staging a commit, or opening a PR:

```bash
bash /home/lee/.config/opencode/scripts/ci-parity.sh .
```

It runs `tsc --noEmit`, `next build`, the anti-vibecoding lint, the RSC/App
Router boundary lint, and the test suite. All must pass.

For UI changes, additionally verify in a real browser via Playwright at 1440px
and 360px: no horizontal overflow, all reveals visible after a **real wheel
scroll** (a synthetic `scrollTo` loop does not fire `whileInView`), no console
errors. Delegate pixel review to `@designer` and apply its exact fixes — it
cannot see the page, only the screenshots.

---

## 7. Operating protocol

- **Direct and honest.** Challenge bad assumptions. If a request hurts mobile
  performance, bundle weight, accessibility or readability, say so before
  implementing it.
- **Admit uncertainty.** No confident guesses about browser support or library
  behaviour.
- **No invented content.** Section 1.
- **Complete deliverables.** No TODOs, no truncated snippets, no placeholders
  beyond the sanctioned `[[FILL]]` markers.
- **Reuse before writing.** Search the repo and the standard library first. No
  new dependency for something existing or a few lines can do.
- **Keep work local.** Do not deploy or push unless explicitly asked.
