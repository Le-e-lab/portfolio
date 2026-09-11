# DEBT_LEDGER — Portfolio

> Tracks deliberate simplifications, known ceilings, and upgrade paths.
> Format: `ponytail: <comment>` entries logged during development.

---

## Active Debt

### 1. `.interactive` dead CSS class
- **Location:** `src/index.css` (`.interactive { cursor: pointer; ... }`)
- **Status:** Dead — no element in the codebase uses this class
- **Decision:** Intentionally NOT removed this pass — zero functional impact, low effort to leave
- **Removal:** Grep for `.interactive` in all `.css` and `.jsx` files; if zero hits, delete the rule
- **Priority:** Low

### 2. Mailto-only contact dispatch
- **Location:** `src/components/Contact.jsx` — `window.location.href = mailto:...`
- **Status:** Honest but limited — no form backend; `setFormState('sent')` fires unconditionally after mailto
- **Upgrade path:** Replace with Resend API route or Formspree/FormsSubmit endpoint
- **ponytail:** Mailto is zero-dep, zero-config, honest. A real backend is warranted when Lesley wants server-side email delivery + submissions log.
- **Priority:** Medium (when portfolio is ready for inbound leads)

### 3. Parallax 180px offset (gallery hex shift)
- **Location:** `HexPattern.css` — `@keyframes hex-parallax { to { transform: translate3d(0, 180px, 0) } }`
- **Status:** Works and feels good; 180px was chosen empirically, not mathematically derived from section heights
- **Upgrade path:** If gallery section heights change, the 180px may feel too much or too little. Tune `180px` to match new content length.
- **ponytail:** CSS custom properties could parameterize this per-section, but YAGNI for a single-page portfolio.
- **Priority:** Low

### 4. Hex overlay `pointer-events: auto`
- **Location:** `HexPattern.css` — `.hex-pattern` has `pointer-events: auto` (needed for glow effect mouse tracking)
- **Status:** Correctly layered behind hero content via z-index stacking; magnetic-move audit proves CTAs are reachable
- **Upgrade path:** If a future layout change breaks the stacking order, hex will silently block CTA clicks. Audit `z-index` values if touching hero layout.
- **ponytail:** Could add `pointer-events: none` to the hex and use a separate invisible pointer-tracker div, but the current stacking works.
- **Priority:** Low (guard against layout changes only)

### 5. Magnetic CTA test environment false negatives
- **Location:** Playwright audit script `/tmp/opencode/audit-anim.js`
- **Status:** `scrollIntoView` is swallowed by `.hero` overflow-hidden ancestor chain; explicit `window.scrollTo` required
- **ponytail:** This is a test-infrastructure issue, not app code. Documented here to prevent future agents from "fixing" working code based on false-negative Playwright results.
- **Priority:** Test infrastructure only

### 6. Gallery slots 4–10 awaiting real design pieces
- **Location:** `src/components/galleryData.js` — entries `gallery-4` through `gallery-10`
- **Status:** Honest "In Progress" tangerine-gradient placeholders; 3 real pieces now wired (`gold-brand-piece`, `logo-design`, `studio-logo`)
- **Upgrade path:** Swap each `gradient` for an `image` path under `/public/images/design/` and it renders automatically (hover-zoom + modal already wired)
- **ponytail:** Kept 10 slots so the grid doesn't reflow when pieces land fast; `Array.from` generator removed in favor of explicit curated entries.
- **Priority:** High (visual completeness) — blocked on Lesley producing the assets

### 7. Hex facet-joint opacity tuned visually blind
- **Location:** `src/components/HexGlowPattern.jsx` — node stamp `globalAlpha = 0.55`, radius `0.9`
- **Status:** Chosen for subtlety; exact feel not pixel-verified (image-vision API disabled in this environment, HTTP 403 SERVICE_DISABLED)
- **Upgrade path:** If the joints read too hot/cold, adjust `0.55` / `0.9` — or gate on `d2 < coreR2` to only stamp near-cursor vertices
- **ponytail:** One fixed alpha avoids per-vertex distance math; core-brightening pass already conveys proximity.
- **Priority:** Low

---

## Resolved Debt (this session)

| Item | Resolution |
|------|------------|
| `.font-mono` utility missing | Added to `index.css` |
| Hero CTA magnetic effect scaffolded but unused | Full implementation in `Hero.jsx` |
| Parallax gap (Law 01) | CSS `animation-timeline: scroll(root)` with `@supports` fallback |
| Contact form fake success (Law 04) | Real mailto dispatch + TRANSMITTING/TRANSMISSION_SECURED states |
