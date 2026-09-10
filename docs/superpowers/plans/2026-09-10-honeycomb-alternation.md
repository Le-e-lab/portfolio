# Honeycomb Hero + Alternating Sections + Image-Rich Layout Plan

> **Status:** Pending approval — no code written for these tasks yet (contact form readability fix already applied separately).

**Goal:** Transform the site into a genuinely premium, image-led portfolio using a research-backed interlocking hexagon (honeycomb) gallery on the home page, and extend the Switchboard cream/dark alternation to the About and Work pages. Prepare the project data model for many more images.

---

## Market / Portfolio Research Findings

### 1. Hexagon Grids (how the pros build them)
From shadcn blocks, CodeFronts, CodeTap, and Awwwards galleries — the standard, dependency-free technique is:

- **Shape:** CSS `clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)` on an element with `aspect-ratio: 1 / 1.1547` (true pointy-top hex ratio).
- **Interlock (honeycomb):** Build with *flex rows*, not a single grid. Subsequent rows pull up with `margin-block-start: calc(var(--hex) * -0.3)`; alternate rows shift `margin-inline-start: calc(var(--hex) / 2)` so peaks nest into the row above.
- **Hover "light" effect (what Lesley asked for):** 
  - Outer hex scales `1.06` and gets `z-index: 1` so it lifts above neighbors.
  - A radial glow (`::after` with radial-gradient in tangerine) fades in at low opacity.
  - The inner image scales `1.12` (`transform: scale(1.12)`).
  - A label overlay fades up from the bottom with the project title/category.
- **Hairline separation trick:** Outer hex = slightly larger with a dark fill; inner hex (nested `<img>` also clipped) inset 2px reads as a 2px border without breaking the interlock math. To get a *clean* light-effect, use a radial-glow container behind the hovered hex instead of borders.
- **No-JS option:** Pure CSS hover. Rows are `<li>` siblings so the flex overlap works; a single `--hex` custom property resizes the whole comb.
- **Performance:** clip-path + transform/opacity only, no layout-triggering properties. Mobile falls back to a simple 2-column clipped grid (or plain stack) — honeycomb interlock math breaks below ~480px.

### 2. Premium Portfolio Patterns (Awwwards / Codrops 2026)
- **Alternation is the standard:** Almost every award-winning portfolio alternates light/dark sections (Veronica Zubakova: `#F5F5F5` ↔ `#131313`; MIUX: dark palette with bright highlight). Confirms our Switchboard direction.
- **Image-led home pages convert:** The winning portfolios lead with work imagery (Cynx "interactive gallery on scroll", Pacôme Pertant "spiral view" gallery) rather than a big text-first hero.
- **Clear hover feedback is mandatory:** Every interactive work tile scales/glows/reveals on hover so it feels alive (high-end-visual-design: never `transition: all`; always custom cubic-beziers, `transform`+`opacity` only).
- **Generous whitespace:** Sections are `py-24`–`py-40`, not cramped (`high-end-visual-design` § Spatial Rhythm).
- **Few, curated projects beat galleries:** 6–10 strategic case studies with outcome language outperform 30 generic thumbnails.

### 3. How This Maps to Lesley's Requests
| Request | Research-backed solution |
|---|---|
| "Home grid in hexagon shapes with a light hover effect" | New **Featured Work honeycomb** section below the Services: interlocking hex tiles of design images, tangerine radial glow on hover, title overlay, opens ProjectWindow on click |
| "We're going to add more [images]" | Extend `design-projects.json` data model: add `featured` flag drives hex section; work page masonry auto-handles any count; grouping stays flat per latest fix |
| "Same as contact page [alternation] on About and Projects" | Wrap About intro in `section--light`; keep timeline/tech dark; testimonials in light. Wrap Work intro + software in `section--light`; design grid stays dark with the blueprint grid |
| "Contact form grey text not readable" | ✅ DONE — bumped `.glass-label`, `.glass-form-title`, `.ticket-label`, `.ticket-meta span`, `.success-logs` from `--text-muted` → `--text-dim` (#B8B0A8) |

---

## Task Plan

### Task A: Fix contact form readability
✅ Already applied (committed in this session alongside the combined-grid/readability fixes... will verify).

- [ ] Verify in browser that form labels/titles read clearly on the dark glass.
- [ ] Check contrast of `.glass-label` (now `--text-dim` on `rgba(20,20,20,0.45)` over cream) — if still weak, bump form background opacity.

### Task B: DesignProjects data model for more images
**Files:** `public/design-projects.json`

- [ ] Keep `title`, `category`, `group`, `description`, `client`, `year`, `image`, `featured`.
- [ ] Add optional `thumb` field (for hex crop if full image ratio is wrong) — hexagons center-crop via `object-fit: cover`, so only needed for extreme ratios.

### Task C: Honeycomb Featured Work section (home)
**Files:**
- Create: `src/components/HoneycombGrid.jsx`
- Create: `src/components/HoneycombGrid.css`
- Modify: `src/components/Hero.jsx` (render `<HoneycombGrid projects={designProjects.slice(0,6)} />` after ServicesSection)
- Modify: `src/components/Hero.css` (section wrapper, dark bg, dot grid behind)

**Implementation notes (from research):**
- Row pattern `4-3-4` or `3-2-3-2` hex per row; odd rows offset half-hex; rows overlap by `-0.3 * --hex`.
- Cell: `<button class="hex">` with clip-path; nested `<img>` clipped same shape; `::after` radial glow in tangerine; label `.hex-label` fades in on hover.
- Hover: `scale(1.06)`, `z-index: 1`, image `scale(1.12)`, glow opacity 1.
- Click → `onOpenProject(project)` → opens `ProjectWindow` (reuse existing component; pass callback via Context or lift state into a wrapper).
- Dark section + DotGrid behind for the Switchboard feel.
- Mobile: fall back to 2-col clipped hexes (no interlock offset) or 3-col simple grid; ensure no overflow.
- `prefers-reduced-motion`: disable hover scale.

### Task D: Work page alternation
**Files:** `src/components/Work.jsx`, `src/components/Work.css`

- [ ] Intro header block → `section--light` zone (cream) — "Selected Design Work".
- [ ] Design grid stays dark (`section--dark`) with blueprint grid + optional DotGrid behind it.
- [ ] Software section → `section--light` (cream cards that work on light: adjust card bg to `--bg-light-card`, border `--border-dark`, text `--text-dark`).
- [ ] Verify filter buttons readable on cream.

### Task E: About page alternation
**Files:** `src/components/About.jsx`, `src/components/About.css`

- [ ] Header ("A designer who can build what they draw") → `section--light` (cream).
- [ ] Timeline + terminal → `section--dark`.
- [ ] Tech grid + testimonials → `section--light` (cards adapt to light theme).
- [ ] Ensure timeline links/dots remain tangerine on cream.

### Task F: Visual verification
- [ ] Playwright DOM audit: no tiny text, no console errors, all pages render full content.
- [ ] Honeycomb interlock verified: no gaps, hover glow works, click opens window.
- [ ] Build + lint clean.

---

## Design Decisions (Switchboard + Honeycomb)
- **Hex glow:** tangerine radial-gradient at 0.25 opacity, scaled up on hover — reads as a "light turning on".
- **Cells link to projects:** clicking a hex opens the OS-style ProjectWindow (already built) — research shows hover-lift + modal-with-context converts better than external links.
- **6 featured hexes on home** (3-2-3 pattern or 4-3): enough visual punch without crowding; more images can go in the Work page masonry.
- **--hex custom property:** `clamp(140px, 18vw, 220px)` so the comb scales; all row math derives from it.
- **No new dependencies** — pure CSS clip-path + existing IntersectionObserver/PW components.

---

## Approval Gate
Lesley — before I build the honeycomb section and the About/Work alternation, confirm:

1. **Honeycomb location:** below the Services section on home (my plan), or replace the hero's portrait with the honeycomb? For a designer portfolio leading with imagery, I'd put it BELOW services as "Featured Work" — keeps the name/role hero intact.
2. **Honeycomb size on mobile:** 2-col clipped hexes, or plain image stack with rounded corners? (Hex stack is trendier; plain stack is safer/readable.)
3. **About order:** Cream header → dark timeline → cream tech/testimonials — good?
4. **Work alternation:** Cream intro + cream software, dark design grid in between — good?

Once you approve, I'll build Task C → D → E → F in order with a commit per task.