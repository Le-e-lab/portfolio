# Switchboard Redesign + Freelance Client Acquisition + SEO

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Lesley's portfolio from a flat dark showcase into a high-converting freelance client acquisition machine with the "Switchboard" alternating dark/light theme, interactive dot grid, scroll storytelling, proper SEO metadata, and structured data for search engine discoverability.

**Architecture:** Single-page React SPA (Vite + React 19) with react-router-dom. All styling via vanilla CSS with custom properties. No new dependencies — the dot grid is implemented as a pure canvas component extracted from the Framer source. Scroll effects use the existing `useReveal` hook with staggered delays. SEO metadata goes in `index.html` with JSON-LD structured data.

**Tech Stack:** React 19, Vite 7, react-router-dom 7, vanilla CSS, IntersectionObserver (existing `useReveal` hook), Canvas API (dot grid).

---

## Market Research Summary

### Client Acquisition Landscape (Africa/Zimbabwe 2026)
- **Platform saturation:** Upwork/Fiverr are race-to-the-bottom. Premium clients ($3,500-$8,500 per project) want direct technical partners, not gig workers.
- **Winning strategies for African freelancers:** (1) Portfolio SEO to rank for "[city] web designer", (2) Direct outreach with personalized video audits, (3) Content marketing showing real results, (4) Referral loops from happy clients, (5) Google Maps scouting of businesses with bad websites.
- **Trust signals that matter:** Custom domain (lesley.runs-on.dev ✓), live GitHub activity, real project metrics, professional headshot, clear service offerings, testimonials with names/companies.
- **Differentiation in Zimbabwe:** Lesley is unique as a designer+developer hybrid. Most ZW devs don't design; most ZW designers don't code. This dual capability is the primary differentiator.

### SEO Strategy (2026)
- **Name-first titles:** "Lesley Mutsambiwa | Designer & Developer in Harare" (not "Home" or "Portfolio")
- **Structured data:** Person, WebSite, ProfilePage, CreativeWork schemas in JSON-LD
- **Per-page metadata:** Unique title + description for each route (/, /work, /about, /contact)
- **Long-tail targeting:** "brand identity designer Zimbabwe", "full-stack developer Harare", "React developer Africa"
- **Cross-platform identity:** `rel="me"` links to GitHub, LinkedIn; consistent name/bio everywhere

### Competitor Positioning
- Top freelance portfolios (Aton De Rosa, Shadmaan Ansari) use: large project showcases with client info, service breakdowns, process explanations, testimonials, and clear CTAs
- Lesley's current gap: No services page, no testimonials, no client context on projects, no "hire me" flow

---

## What the Site Needs (Product Brief)

### Who is this for?
- **Primary:** Business owners, startup founders, and marketing managers in Zimbabwe, Southern Africa, and globally who need brand identity design or full-stack web applications built.
- **Secondary:** Tech recruiters and hiring managers evaluating Lesley for roles.

### What's the pain?
- Clients can't tell what Lesley offers, what it costs, or who he's worked with
- Projects show images but no context (what was it for? who was it for? what was the result?)
- No clear path from "I'm browsing" to "I want to hire this person"

### What does success look like?
- Client lands on site → understands services in 10 seconds → sees relevant work → reads a testimonial → clicks "Let's Talk" → fills form or sends email
- Google indexes all pages with rich snippets (name, services, location)
- Site ranks for "brand identity designer Zimbabwe" and "full-stack developer Harare" within 3 months

---

## File Structure

### Files to Create
- `src/components/DotGrid.jsx` — Canvas-based interactive dot grid (extracted from Framer source)
- `src/components/DotGrid.css` — Dot grid container styles
- `src/components/ProjectWindow.jsx` — Rich project detail modal (replaces lightbox)
- `src/components/ProjectWindow.css` — Project window styling (OS-window aesthetic)
- `src/components/ServicesSection.jsx` — Services offering block (for home page)
- `src/components/ServicesSection.css` — Services styling
- `src/components/TestimonialCard.jsx` — Reusable testimonial component
- `src/components/TestimonialCard.css` — Testimonial styling
- `public/robots.txt` — Search engine crawler directives
- `public/sitemap.xml` — Site structure for search engines
- `docs/superpowers/plans/2026-09-10-switchboard-redesign-freelance-seo.md` — This plan

### Files to Modify
- `index.html` — SEO metadata, JSON-LD structured data, Open Graph, per-page meta
- `src/index.css` — Add CSS variables for light theme sections, dot grid token, alternating section styles
- `src/components/Layout.jsx` — Add dot grid background layer
- `src/components/Layout.css` — Alternating section backgrounds, dot grid positioning
- `src/components/Hero.jsx` — Update for Switchboard dark section with dot grid
- `src/components/Hero.css` — Dot grid integration, enhanced scroll entrance
- `src/components/Work.jsx` — Group projects by type, richer lightbox → ProjectWindow, add client info to project data
- `src/components/Work.css` — Grouped project sections, alternating backgrounds, masonry improvements
- `src/components/About.jsx` — Add testimonials section, services summary
- `src/components/About.css` — Light theme section, testimonials grid
- `src/components/Contact.jsx` — Enhanced with service-specific CTAs
- `src/components/Contact.css` — Light/dark alternation
- `src/components/Sidebar.jsx` — Add Services nav item if page added
- `public/design-projects.json` — Add client info, project type grouping, richer descriptions

---

## Global Constraints

- **No new npm dependencies.** Dot grid is pure canvas. All animations are CSS or existing IntersectionObserver.
- **Performance budget:** Dot grid canvas must idle at <2% CPU when not hovered. Use `requestAnimationFrame` with early-exit when no dots are in impact radius.
- **Accessibility:** All scroll animations wrapped in `@media (prefers-reduced-motion: reduce)`. Dot grid is decorative only (`aria-hidden="true"`).
- **Mobile:** Dot grid disabled on viewports < 768px (GPU tax not worth it on mobile). Masonry collapses to single column.
- **Existing palette preserved:** `--tangerine: #E8650A`, `--bg: #0c0c0c`. Light sections add `--bg-light: #F5F0EB`, `--text-dark: #1a1714`.
- **Font stack preserved:** Playfair Display (display), Bebas Neue (headings), Outfit (body), JetBrains Mono (mono).

---

## Task 1: Light Theme CSS Variables + Alternating Section System

**Files:**
- Modify: `src/index.css:1-55` (add light theme variables)
- Modify: `src/index.css:122-130` (add `.section--light` class)

**Interfaces:**
- Consumes: None (foundation task)
- Produces: CSS variables `--bg-light`, `--text-dark`, `--text-dim-dark`, `--border-dark`, classes `.section--light`, `.section--dark`

- [ ] **Step 1: Add light theme variables to `:root`**

In `src/index.css`, after the existing `--border-hover` variable (line 22), add:

```css
/* Light section palette (Switchboard alternation) */
--bg-light: #F5F0EB;
--bg-light-raised: #EDE8E2;
--bg-light-card: #E5E0DA;
--text-dark: #1a1714;
--text-dim-dark: #5C5650;
--text-muted-dark: #9A9189;
--border-dark: rgba(0, 0, 0, 0.08);
--border-dark-hover: rgba(232, 101, 10, 0.3);
```

- [ ] **Step 2: Add alternating section classes**

After the existing `.section` rule (line 122), add:

```css
.section--light {
  background: var(--bg-light);
  color: var(--text-dark);
}

.section--light h1,
.section--light h2,
.section--light h3,
.section--light h4 {
  color: var(--text-dark);
}

.section--light p {
  color: var(--text-dim-dark);
}

.section--light .section-label {
  color: var(--tangerine);
}

.section--light .section-number {
  color: var(--text-muted-dark);
}

.section--dark {
  background: var(--bg);
  color: var(--text);
}
```

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: Clean build, no errors.

Run: `npm run dev`
Expected: Dev server starts. No visual changes yet (no sections use the new classes).

- [ ] **Step 4: Commit**

```bash
git add src/index.css
git commit -m "feat: add Switchboard light theme variables and alternating section classes"
```

---

## Task 2: Dot Grid Canvas Component

**Files:**
- Create: `src/components/DotGrid.jsx`
- Create: `src/components/DotGrid.css`

**Interfaces:**
- Consumes: None (standalone component)
- Produces: `<DotGrid color="..." size="..." spacing="..." />` React component

- [ ] **Step 1: Create `src/components/DotGrid.jsx`**

Extract the pure logic from the Framer source. Remove all Framer-specific imports (`addPropertyControls`, `ControlType`). Keep the core canvas animation.

```jsx
import { useEffect, useRef } from 'react';
import './DotGrid.css';

/* ── Smoothstep easing ── */
function smoothstep(t) {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

/* ── Parse hex/rgb color to {r,g,b} ── */
function parseColor(hex) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  const n = parseInt(h.slice(0, 6), 16);
  if (isNaN(n)) return { r: 136, g: 136, b: 136 };
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export default function DotGrid({
  dotColor = '#E8650A',
  dotSize = 3,
  dotSpacing = 28,
  orbitSpeed = 1.5,
  impactRadius = 100,
  scaleOnHover = 1.8,
  enableRevolve = true,
  className = '',
}) {
  const canvasRef = useRef(null);
  const cfgRef = useRef({
    dotColor, dotSize, dotSpacing, orbitSpeed,
    impactRadius, scaleOnHover, enableRevolve,
  });

  // Keep config refs fresh without re-running the effect
  cfgRef.current.dotColor = dotColor;
  cfgRef.current.dotSize = dotSize;
  cfgRef.current.dotSpacing = dotSpacing;
  cfgRef.current.orbitSpeed = orbitSpeed;
  cfgRef.current.impactRadius = impactRadius;
  cfgRef.current.scaleOnHover = scaleOnHover;
  cfgRef.current.enableRevolve = enableRevolve;

  const dotsRef = useRef([]);
  const spacingSnapRef = useRef(dotSpacing);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let W = 0, H = 0;
    let mouse = { x: -9999, y: -9999 };
    let hovering = false;
    let leaveTs = 0;
    let prevTs = 0;
    let raf = 0;
    let globalAngle = 0;

    function buildDots() {
      const sp = cfgRef.current.dotSpacing;
      spacingSnapRef.current = sp;
      dotsRef.current = [];
      const cols = Math.ceil(W / sp) + 2;
      const rows = Math.ceil(H / sp) + 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dotsRef.current.push({
            bx: c * sp, by: r * sp,
            inclination: Math.random() * Math.PI,
            ascension: Math.random() * Math.PI * 2,
            phase: Math.random() * Math.PI * 2,
            speedMult: 0.7 + Math.random() * 0.6,
          });
        }
      }
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildDots();
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function onEnter(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      hovering = true;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
      hovering = false;
      leaveTs = performance.now();
    }

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseenter', onEnter);
    canvas.addEventListener('mouseleave', onLeave);

    function loop(ts) {
      raf = requestAnimationFrame(loop);
      const dt = Math.min((ts - (prevTs || ts)) / 1000, 0.05);
      prevTs = ts;
      const cfg = cfgRef.current;
      if (spacingSnapRef.current !== cfg.dotSpacing) buildDots();
      globalAngle += cfg.orbitSpeed * dt;
      ctx.clearRect(0, 0, W, H);

      const rgb = parseColor(cfg.dotColor);
      const mx = mouse.x, my = mouse.y;
      const timeSinceLeave = hovering ? 0 : Math.max(0, ts - leaveTs) / 1000;
      const decay = hovering ? 1 : smoothstep(Math.max(0, 1 - timeSinceLeave * 1.5));

      for (const d of dotsRef.current) {
        const dx = d.bx - mx;
        const dy = d.by - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const inRange = dist < cfg.impactRadius && dist > 0;
        let x = d.bx, y = d.by, scale = 1, alpha = 0.3;

        if (inRange) {
          const t = dist / cfg.impactRadius;
          const inf = smoothstep(1 - t) * decay;
          if (cfg.enableRevolve) {
            const orbitR = (1 - t) * cfg.dotSpacing * 0.7 * inf;
            const theta = globalAngle * d.speedMult + d.phase;
            const cosA = Math.cos(d.ascension);
            const sinA = Math.sin(d.ascension);
            const cosI = Math.cos(d.inclination);
            const sinI = Math.sin(d.inclination);
            const lx = Math.cos(theta);
            const ly = Math.sin(theta) * cosI;
            const lz = Math.sin(theta) * sinI;
            const ox = (lx * cosA - ly * sinA) * orbitR;
            const oy = (lx * sinA + ly * cosA) * orbitR;
            x = d.bx + ox;
            y = d.by + oy;
            const depthScale = 0.75 + 0.25 * ((lz + 1) * 0.5);
            scale = (1 + (cfg.scaleOnHover - 1) * inf) * depthScale;
            alpha = (0.3 + 0.7 * inf) * depthScale;
          } else {
            scale = 1 + (cfg.scaleOnHover - 1) * inf;
            alpha = 0.3 + 0.7 * inf;
          }
        }

        const r = (cfg.dotSize / 2) * scale;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
        ctx.fill();
      }
    }

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseenter', onEnter);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`dot-grid-canvas ${className}`}
      aria-hidden="true"
    />
  );
}
```

- [ ] **Step 2: Create `src/components/DotGrid.css`**

```css
.dot-grid-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: auto; /* canvas needs pointer events for hover detection */
  z-index: 0;
}

@media (max-width: 768px) {
  .dot-grid-canvas {
    display: none; /* GPU tax not worth it on mobile */
  }
}

@media (prefers-reduced-motion: reduce) {
  .dot-grid-canvas {
    display: none;
  }
}
```

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: Clean build.

Run: `npm run dev`, manually import `<DotGrid />` in Hero temporarily to verify it renders and responds to mouse hover.

- [ ] **Step 4: Commit**

```bash
git add src/components/DotGrid.jsx src/components/DotGrid.css
git commit -m "feat: add interactive dot grid canvas component"
```

---

## Task 3: Integrate Dot Grid into Hero + Layout Alternation

**Files:**
- Modify: `src/components/Hero.jsx`
- Modify: `src/components/Hero.css`
- Modify: `src/components/Layout.css`

**Interfaces:**
- Consumes: `DotGrid` component from Task 2
- Produces: Hero section with dot grid overlay, Layout with alternating section backgrounds

- [ ] **Step 1: Add DotGrid to Hero.jsx**

Import DotGrid and place it as a background layer inside the hero section:

```jsx
import DotGrid from './DotGrid';
// ... existing imports

export default function Hero() {
  // ... existing navigate hook
  return (
    <section className="hero section--dark">
      <DotGrid
        dotColor="#E8650A"
        dotSize={2.5}
        dotSpacing={30}
        orbitSpeed={1.2}
        impactRadius={120}
        scaleOnHover={1.6}
      />
      <div className="hero-grid">
        {/* ... existing content unchanged ... */}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update Hero.css for dot grid layering**

Add to `src/components/Hero.css`:

```css
.hero {
  /* existing styles stay */
  position: relative; /* already set, ensure it's there */
}

/* Ensure hero content sits above the dot grid */
.hero-grid {
  position: relative;
  z-index: 1;
}
```

The `.hero-grid` already exists — just verify it has `position: relative; z-index: 1;`.

- [ ] **Step 3: Add alternating section to Work page**

In `src/components/Work.jsx`, update the section class:

```jsx
<section className="section work-section section--dark">
```

- [ ] **Step 4: Update Layout.css for content padding above dot grid**

No changes needed — the `.main-content` already has padding and z-index. The dot grid lives inside each section, not in the Layout.

- [ ] **Step 5: Build and verify visually**

Run: `npm run dev`, navigate to `/`. Verify:
- Dot grid renders behind hero text
- Dots orbit when mouse hovers near them
- Hero text is readable above the dots
- Mobile (< 768px): no dot grid renders

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero.jsx src/components/Hero.css src/components/Work.jsx
git commit -m "feat: integrate dot grid into Hero, add dark section class to Work"
```

---

## Task 4: Project Data Enrichment (Client Info + Grouping)

**Files:**
- Modify: `public/design-projects.json`
- Modify: `src/components/Work.jsx` (data structures)

**Interfaces:**
- Consumes: None (data layer)
- Produces: Enriched project objects with `client`, `year`, `group` fields

- [ ] **Step 1: Update `public/design-projects.json`**

```json
{
  "projects": [
    {
      "title": "Gold Brand Piece",
      "category": "Brand Identity",
      "group": "brand-identity",
      "description": "Premium gold-toned brand asset for a luxury client — rich palette with editorial structure and refined typography.",
      "client": "Private Client",
      "year": "2025",
      "image": "/images/design/brand-identity/gold-brand-piece.jpg",
      "featured": true
    },
    {
      "title": "Logo Design",
      "category": "Logo",
      "group": "logo",
      "description": "Custom logomark — geometric precision meets bold visual identity. Designed for a tech startup seeking a modern, memorable mark.",
      "client": "Startup Client",
      "year": "2025",
      "image": "/images/design/logo/logo-design.jpg",
      "featured": false
    },
    {
      "title": "Studio Logo",
      "category": "Logo",
      "group": "logo",
      "description": "Black and white minimal studio identity — clean geometry, timeless type. Built for a creative studio focused on simplicity.",
      "client": "Creative Studio",
      "year": "2025",
      "image": "/images/design/logo/studio-logo.jpg",
      "featured": false
    }
  ]
}
```

- [ ] **Step 2: Update curated projects in Work.jsx**

In `src/components/Work.jsx`, enrich the `curatedProjects` array with client info:

```js
const curatedProjects = [
  {
    tag: 'Developer',
    title: 'Tarisai Portal',
    description: 'Enterprise ERP and visual scaling portal. Secure routing, dashboards, and API integrations for a Zimbabwean tech company.',
    client: 'Tarisai',
    year: '2025',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Security'],
    color: '#E8650A',
    link: 'https://www.tarisai.co.zw/',
    category: 'software'
  },
  {
    tag: 'Developer',
    title: 'Elevate Partners',
    description: 'Business management system and analytics suite built for enterprise scalability and strategic decision-making.',
    client: 'Elevate Value Partners',
    year: '2025',
    tech: ['Next.js', 'Tailwind', 'Node.js', 'Analytics'],
    color: '#FF8C38',
    link: 'https://www.elevatevaluepartners.co.zw/',
    category: 'software'
  },
  {
    tag: 'Project',
    title: "The Chef's Muse",
    description: 'AI-powered recipe generator with calorie scanning via Gemini Vision. A personal project exploring AI in everyday tools.',
    client: 'Personal Project',
    year: '2025',
    tech: ['React', 'Tailwind', 'Gemini API'],
    color: '#E8650A',
    link: 'https://le-e-lab.github.io/chefs-muse/',
    category: 'software'
  },
];
```

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: Clean build. Projects still render but now have client/year data available.

- [ ] **Step 4: Commit**

```bash
git add public/design-projects.json src/components/Work.jsx
git commit -m "feat: enrich project data with client info, year, and grouping"
```

---

## Task 5: Project Detail Window (Replaces Lightbox)

**Files:**
- Create: `src/components/ProjectWindow.jsx`
- Create: `src/components/ProjectWindow.css`
- Modify: `src/components/Work.jsx` (swap lightbox for ProjectWindow)

**Interfaces:**
- Consumes: Project object with `title`, `category`, `description`, `client`, `year`, `image`
- Produces: `<ProjectWindow project={...} onClose={...} />` component

- [ ] **Step 1: Create `src/components/ProjectWindow.jsx`**

A rich modal styled like a floating OS window with a title bar, image, and metadata.

```jsx
import { useEffect, useCallback } from 'react';
import Icon from './Icon';
import './ProjectWindow.css';

export default function ProjectWindow({ project, onClose }) {
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (!project) return;
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [project, handleKey]);

  if (!project) return null;

  return (
    <div className="pw-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={project.title}>
      <div className="pw-window" onClick={(e) => e.stopPropagation()}>
        {/* Title bar */}
        <div className="pw-titlebar">
          <div className="pw-titlebar-dots">
            <span className="pw-dot pw-dot--red" />
            <span className="pw-dot pw-dot--yellow" />
            <span className="pw-dot pw-dot--green" />
          </div>
          <span className="pw-titlebar-text">{project.title}</span>
          <button className="pw-close interactive" onClick={onClose} aria-label="Close">
            <Icon name="x" size={14} />
          </button>
        </div>

        {/* Content */}
        <div className="pw-body">
          <div className="pw-image-wrap">
            <img src={project.image} alt={project.title} className="pw-image" />
          </div>
          <div className="pw-meta">
            <div className="pw-meta-row">
              <span className="pw-meta-label">Category</span>
              <span className="pw-meta-value">{project.category}</span>
            </div>
            {project.client && (
              <div className="pw-meta-row">
                <span className="pw-meta-label">Client</span>
                <span className="pw-meta-value">{project.client}</span>
              </div>
            )}
            {project.year && (
              <div className="pw-meta-row">
                <span className="pw-meta-label">Year</span>
                <span className="pw-meta-value">{project.year}</span>
              </div>
            )}
            <div className="pw-description">
              <p>{project.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/ProjectWindow.css`**

```css
/* ═══ Project Window (OS-style modal) ═══ */
.pw-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-xl);
  background: rgba(8, 8, 8, 0.85);
  backdrop-filter: blur(12px);
  animation: pw-backdrop-in 0.25s var(--ease-out) both;
}

@keyframes pw-backdrop-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.pw-window {
  position: relative;
  max-width: 800px;
  width: 100%;
  background: var(--bg-raised);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.04);
  animation: pw-window-in 0.35s var(--ease-out) both;
}

@keyframes pw-window-in {
  from { opacity: 0; transform: scale(0.92) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

/* Title bar */
.pw-titlebar {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: 0.65rem var(--space-lg);
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid var(--border);
}

.pw-titlebar-dots {
  display: flex;
  gap: 6px;
}

.pw-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.pw-dot--red { background: #ff5f56; }
.pw-dot--yellow { background: #ffbd2e; }
.pw-dot--green { background: #27c93f; }

.pw-titlebar-text {
  flex: 1;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  text-align: center;
}

.pw-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition: background 200ms var(--ease-out), color 200ms var(--ease-out);
}

.pw-close:hover {
  background: var(--tangerine);
  border-color: var(--tangerine);
  color: #fff;
}

/* Body */
.pw-body {
  max-height: 75vh;
  overflow-y: auto;
}

.pw-image-wrap {
  background: var(--bg);
  overflow: hidden;
}

.pw-image {
  width: 100%;
  display: block;
  max-height: 50vh;
  object-fit: contain;
}

.pw-meta {
  padding: var(--space-xl);
}

.pw-meta-row {
  display: flex;
  justify-content: space-between;
  padding: var(--space-sm) 0;
  border-bottom: 1px solid var(--border);
}

.pw-meta-label {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--text-muted);
}

.pw-meta-value {
  font-size: 0.85rem;
  color: var(--text);
}

.pw-description {
  margin-top: var(--space-lg);
}

.pw-description p {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--text-dim);
}

/* Mobile */
@media (max-width: 768px) {
  .pw-backdrop {
    padding: var(--space-md);
    align-items: flex-start;
    padding-top: 6vh;
  }
  .pw-body {
    max-height: 80vh;
  }
}
```

- [ ] **Step 3: Update Work.jsx to use ProjectWindow**

Replace the lightbox state and rendering in `src/components/Work.jsx`:

1. Import ProjectWindow: `import ProjectWindow from './ProjectWindow';`
2. Keep the `lightbox` state (rename to `selectedProject` for clarity, or keep as-is)
3. Replace the lightbox JSX at the bottom of the return with:

```jsx
<ProjectWindow project={lightbox} onClose={closeLightbox} />
```

4. Remove the old `lightbox-backdrop` / `lightbox-card` JSX entirely.

- [ ] **Step 4: Build and verify visually**

Run: `npm run dev`, go to `/work`, click a design project. Verify:
- OS-style window opens with title bar (red/yellow/green dots)
- Image displays correctly
- Category, Client, Year metadata shows
- Description is readable
- Escape key closes it
- Clicking backdrop closes it
- Mobile: window is scrollable

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectWindow.jsx src/components/ProjectWindow.css src/components/Work.jsx
git commit -m "feat: replace lightbox with OS-style project detail window"
```

---

## Task 6: Grouped Project Sections + Masonry Rhythm

**Files:**
- Modify: `src/components/Work.jsx` (grouping logic)
- Modify: `src/components/Work.css` (grouped section styles)

**Interfaces:**
- Consumes: Enriched project data from Task 4 with `group` field
- Produces: Visually grouped project sections (Logos, Brand Identities) with varied tile sizes

- [ ] **Step 1: Add grouping logic to Work.jsx**

After the `designProjects` state, compute grouped projects:

```js
const groupedDesign = designProjects.reduce((acc, p) => {
  const group = p.group || 'other';
  if (!acc[group]) acc[group] = [];
  acc[group].push(p);
  return acc;
}, {});

const groupLabels = {
  'logo': 'Logo Design',
  'brand-identity': 'Brand Identity',
  'other': 'Other Work',
};
```

- [ ] **Step 2: Update the design showcase JSX to render grouped sections**

Replace the single `design-masonry` div with grouped rendering:

```jsx
{showDesign && designProjects.length > 0 && (
  <div id="design" className="design-showcase">
    {Object.entries(groupedDesign).map(([groupKey, projects]) => (
      <div key={groupKey} className="design-group">
        <div className="design-group-header">
          <span className="design-group-line" />
          <span className="design-group-label font-mono">{groupLabels[groupKey] || groupKey}</span>
          <span className="design-group-line" />
        </div>
        <div className="design-masonry">
          {projects.map((project, i) => (
            <button
              key={project.title}
              className={`design-tile interactive ${project.featured ? 'design-tile--featured' : ''}`}
              onClick={() => setLightbox(project)}
              aria-label={`View ${project.title}`}
            >
              {/* ... existing tile content unchanged ... */}
            </button>
          ))}
        </div>
      </div>
    ))}
  </div>
)}
```

- [ ] **Step 3: Add grouped section CSS to Work.css**

```css
/* Design group headers */
.design-group {
  margin-bottom: var(--space-3xl);
}

.design-group:last-child {
  margin-bottom: 0;
}

.design-group-header {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
}

.design-group-line {
  flex: 1;
  height: 1px;
  background: var(--border);
}

.design-group-label {
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--text-muted);
  white-space: nowrap;
}
```

- [ ] **Step 4: Build and verify**

Run: `npm run dev`, go to `/work`. Verify:
- "Logo Design" and "Brand Identity" sections have separate headers with divider lines
- Featured items still span 2 rows within their group
- Masonry rhythm looks intentional, not flat

- [ ] **Step 5: Commit**

```bash
git add src/components/Work.jsx src/components/Work.css
git commit -m "feat: group design projects by type with section headers"
```

---

## Task 7: Home Page Scroll Story (Services + Featured Work)

**Files:**
- Create: `src/components/ServicesSection.jsx`
- Create: `src/components/ServicesSection.css`
- Modify: `src/components/Hero.jsx` (add services + work preview sections below hero)

**Interfaces:**
- Consumes: `useReveal` hook from `../hooks/useReveal`
- Produces: Services section with 3 service cards, featured work preview

- [ ] **Step 1: Create `src/components/ServicesSection.jsx`**

```jsx
import useReveal from '../hooks/useReveal';
import './ServicesSection.css';

const services = [
  {
    num: '01',
    title: 'Brand Identity',
    desc: 'Logos, visual systems, and brand guidelines that make businesses unforgettable. From concept to complete brand packages.',
    tags: ['Logo Design', 'Visual Identity', 'Brand Guidelines'],
  },
  {
    num: '02',
    title: 'UI / Web Design',
    desc: 'Premium websites and applications designed for conversion. Every pixel intentional, every interaction purposeful.',
    tags: ['Web Design', 'Landing Pages', 'Design Systems'],
  },
  {
    num: '03',
    title: 'Full-Stack Development',
    desc: 'React frontends, Node.js backends, and everything in between. I build what I design — no handoff gaps.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
  },
];

export default function ServicesSection() {
  const headerRef = useReveal();
  const cardsRef = useReveal();

  return (
    <section className="section section--light services-section">
      <div className="services-container">
        <div ref={headerRef} className="reveal services-header">
          <span className="section-number services-number">What I Do</span>
          <h2 className="services-heading">
            Design that converts. Code that scales.
          </h2>
          <p className="services-sub">
            I bridge the gap between visual design and technical execution — so your brand looks premium and performs flawlessly.
          </p>
        </div>

        <div ref={cardsRef} className="reveal services-grid">
          {services.map((s) => (
            <div key={s.num} className="service-card interactive">
              <span className="service-num font-mono">{s.num}</span>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <div className="service-tags">
                {s.tags.map((t) => (
                  <span key={t} className="service-tag font-mono">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/components/ServicesSection.css`**

```css
.services-section {
  padding: var(--space-4xl) 0;
}

.services-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-xl);
}

.services-header {
  margin-bottom: var(--space-3xl);
  max-width: 700px;
}

.services-number {
  color: var(--tangerine) !important;
}

.services-heading {
  font-size: clamp(2rem, 4vw, 3rem);
  color: var(--text-dark);
  margin-bottom: var(--space-md);
}

.services-sub {
  font-size: 1.1rem;
  line-height: 1.75;
  color: var(--text-dim-dark);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-xl);
}

.service-card {
  padding: var(--space-2xl);
  background: var(--bg-light-card);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-lg);
  transition: border-color 350ms var(--ease-out), box-shadow 350ms var(--ease-out), transform 350ms var(--ease-out);
}

.service-card:hover {
  border-color: var(--tangerine);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  transform: translateY(-4px);
}

.service-num {
  font-size: 0.6rem;
  color: var(--tangerine);
  letter-spacing: 0.1em;
  display: block;
  margin-bottom: var(--space-md);
}

.service-title {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  color: var(--text-dark);
  margin-bottom: var(--space-md);
}

.service-desc {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--text-dim-dark);
  margin-bottom: var(--space-lg);
}

.service-tags {
  display: flex;
  gap: var(--space-xs);
  flex-wrap: wrap;
}

.service-tag {
  font-size: 0.55rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted-dark);
  border: 1px solid var(--border-dark);
  padding: 0.2em 0.6em;
  border-radius: var(--radius-sm);
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Wire ServicesSection into App or Hero**

Add the ServicesSection below the Hero on the home page. Two options:

**Option A (recommended):** Create a `HomePage.jsx` that composes Hero + ServicesSection + a featured work teaser, and route `/` to it.

**Option B (simpler):** Add ServicesSection directly inside `Hero.jsx` after the hero section.

For YAGNI, go with **Option B** — add it inside `Hero.jsx`:

```jsx
import ServicesSection from './ServicesSection';

export default function Hero() {
  return (
    <>
      <section className="hero section--dark">
        {/* ... existing hero content ... */}
      </section>
      <ServicesSection />
    </>
  );
}
```

- [ ] **Step 4: Build and verify scroll storytelling**

Run: `npm run dev`, go to `/`. Verify:
- Hero is dark with dot grid
- Scrolling down reveals a cream section with "What I Do" and 3 service cards
- Service cards stagger-reveal as they enter viewport
- Alternation between dark hero and cream services feels intentional
- Mobile: cards stack vertically

- [ ] **Step 5: Commit**

```bash
git add src/components/ServicesSection.jsx src/components/ServicesSection.css src/components/Hero.jsx
git commit -m "feat: add services section to home page for scroll storytelling"
```

---

## Task 8: Testimonials Component + About Page Integration

**Files:**
- Create: `src/components/TestimonialCard.jsx`
- Create: `src/components/TestimonialCard.css`
- Modify: `src/components/About.jsx` (add testimonials section)
- Modify: `src/components/About.css` (testimonials grid, alternating section)

**Interfaces:**
- Consumes: `useReveal` hook
- Produces: Testimonial cards with quote, name, role, company

- [ ] **Step 1: Create `src/components/TestimonialCard.jsx`**

```jsx
import './TestimonialCard.css';

export default function TestimonialCard({ quote, name, role, company }) {
  return (
    <div className="testimonial-card interactive">
      <div className="testimonial-quote-mark">"</div>
      <p className="testimonial-quote">{quote}</p>
      <div className="testimonial-author">
        <div className="testimonial-avatar">
          <span className="testimonial-initial">{name.charAt(0)}</span>
        </div>
        <div className="testimonial-info">
          <span className="testimonial-name">{name}</span>
          <span className="testimonial-role font-mono">{role}{company && `, ${company}`}</span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/TestimonialCard.css`**

```css
.testimonial-card {
  padding: var(--space-xl);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  position: relative;
  transition: border-color 350ms var(--ease-out), transform 350ms var(--ease-out);
}

.testimonial-card:hover {
  border-color: rgba(232, 101, 10, 0.2);
  transform: translateY(-3px);
}

.testimonial-quote-mark {
  font-family: var(--font-display);
  font-size: 3rem;
  line-height: 1;
  color: var(--tangerine);
  opacity: 0.3;
  margin-bottom: var(--space-sm);
}

.testimonial-quote {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--text-dim);
  font-style: italic;
  margin-bottom: var(--space-lg);
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.testimonial-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--tangerine-dim);
  border: 1px solid rgba(232, 101, 10, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.testimonial-initial {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  color: var(--tangerine);
}

.testimonial-name {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text);
  display: block;
}

.testimonial-role {
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}
```

- [ ] **Step 3: Add testimonials data to About.jsx**

Add a testimonials array and render a grid section. Placeholders are fine for now — Lesley will fill with real testimonials:

```js
const testimonials = [
  {
    quote: "Lesley delivered a complete brand identity that transformed how our customers see us. His design thinking is top-tier.",
    name: "Client Name",
    role: "Founder",
    company: "Company Name",
  },
  {
    quote: "The web portal Lesley built handles our entire operations. Clean code, great UX, and he understood our business from day one.",
    name: "Client Name",
    role: "CTO",
    company: "Company Name",
  },
];
```

Add a testimonials section in the About JSX (after the tech grid):

```jsx
{/* Testimonials */}
<div className="testimonials-section">
  <h3 className="testimonials-title">What Clients Say</h3>
  <div className="testimonials-grid">
    {testimonials.map((t, i) => (
      <TestimonialCard key={i} {...t} />
    ))}
  </div>
</div>
```

- [ ] **Step 4: Add testimonials CSS to About.css**

```css
.testimonials-section {
  margin-top: var(--space-4xl);
  padding-top: var(--space-3xl);
  border-top: 1px solid var(--border);
}

.testimonials-title {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: var(--space-xl);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-xl);
}

@media (max-width: 768px) {
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 5: Build and verify**

Run: `npm run dev`, go to `/about`. Verify:
- Testimonials section appears below tech grid
- Cards have quote marks, italic text, author avatars
- Hover lifts the card
- Mobile: cards stack

- [ ] **Step 6: Commit**

```bash
git add src/components/TestimonialCard.jsx src/components/TestimonialCard.css src/components/About.jsx src/components/About.css
git commit -m "feat: add testimonials section to About page"
```

---

## Task 9: SEO Metadata + JSON-LD Structured Data

**Files:**
- Modify: `index.html` (meta tags, JSON-LD)
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`

**Interfaces:**
- Consumes: None (static files)
- Produces: Complete SEO metadata for search engines and AI

- [ ] **Step 1: Overhaul `index.html` head**

Replace the existing `<head>` content with comprehensive metadata:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Primary SEO -->
    <title>Lesley Mutsambiwa | Designer & Developer in Harare, Zimbabwe</title>
    <meta name="title" content="Lesley Mutsambiwa | Designer & Developer in Harare, Zimbabwe" />
    <meta name="description" content="Freelance brand identity designer and full-stack developer based in Harare, Zimbabwe. I create premium visual identities and build high-performance web applications with React, Node.js, and modern stacks." />
    <meta name="keywords" content="Lesley Mutsambiwa, brand identity designer Zimbabwe, logo design Harare, full-stack developer Africa, React developer Zimbabwe, web designer Harare, freelance designer Africa, UI UX designer Zimbabwe" />
    <meta name="author" content="Lesley Mutsambiwa" />
    <meta name="theme-color" content="#0c0c0c" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://lesley.runs-on.dev/" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://lesley.runs-on.dev/" />
    <meta property="og:title" content="Lesley Mutsambiwa | Designer & Developer in Harare" />
    <meta property="og:description" content="Freelance brand identity designer and full-stack developer. Premium visual identities and high-performance web applications." />
    <meta property="og:image" content="https://lesley.runs-on.dev/favicon.svg" />
    <meta property="og:site_name" content="Lesley Mutsambiwa" />
    <meta property="og:locale" content="en_ZW" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="https://lesley.runs-on.dev/" />
    <meta name="twitter:title" content="Lesley Mutsambiwa | Designer & Developer" />
    <meta name="twitter:description" content="Freelance brand identity designer and full-stack developer in Harare, Zimbabwe." />
    <meta name="twitter:image" content="https://lesley.runs-on.dev/favicon.svg" />

    <!-- JSON-LD Structured Data: Person -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://lesley.runs-on.dev/#me",
      "name": "Lesley Mutsambiwa",
      "url": "https://lesley.runs-on.dev/",
      "image": "https://lesley.runs-on.dev/images/hero-portrait.jpg",
      "jobTitle": "Designer & Full-Stack Developer",
      "description": "Freelance brand identity designer and full-stack developer based in Harare, Zimbabwe.",
      "knowsAbout": [
        "Brand Identity Design",
        "Logo Design",
        "Visual Design",
        "UI/UX Design",
        "React Development",
        "Node.js Development",
        "Full-Stack Development",
        "Web Application Development",
        "PostgreSQL",
        "JavaScript",
        "TypeScript"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Design & Development Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Brand Identity Design",
              "description": "Complete brand identity packages including logos, visual systems, and brand guidelines."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Full-Stack Web Development",
              "description": "Custom web applications built with React, Node.js, and modern databases."
            }
          }
        ]
      },
      "sameAs": [
        "https://github.com/Le-e-lab",
        "https://www.linkedin.com/in/lesley-mutsambiwa/"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Harare",
        "addressCountry": "ZW"
      },
      "email": "lesleymutsambiwa@gmail.com"
    }
    </script>

    <!-- JSON-LD: WebSite -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Lesley Mutsambiwa",
      "url": "https://lesley.runs-on.dev/",
      "description": "Portfolio of Lesley Mutsambiwa — designer and developer building from Harare to the world.",
      "author": {
        "@id": "https://lesley.runs-on.dev/#me"
      }
    }
    </script>

    <!-- Fonts: non-blocking -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" media="print" onload="this.media='all'" />
  </head>
```

- [ ] **Step 2: Create `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://lesley.runs-on.dev/sitemap.xml
```

- [ ] **Step 3: Create `public/sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://lesley.runs-on.dev/</loc>
    <lastmod>2026-09-10</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://lesley.runs-on.dev/work</loc>
    <lastmod>2026-09-10</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://lesley.runs-on.dev/about</loc>
    <lastmod>2026-09-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://lesley.runs-on.dev/contact</loc>
    <lastmod>2026-09-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

- [ ] **Step 4: Build and verify**

Run: `npm run build`
Expected: Clean build. Verify `dist/robots.txt` and `dist/sitemap.xml` exist.

View `dist/index.html` and verify JSON-LD is in the output.

- [ ] **Step 5: Commit**

```bash
git add index.html public/robots.txt public/sitemap.xml
git commit -m "feat: add comprehensive SEO metadata, JSON-LD structured data, robots.txt, sitemap"
```

---

## Task 10: Contact Page Enhancement (Freelance CTAs)

**Files:**
- Modify: `src/components/Contact.jsx` (add service-specific CTAs)
- Modify: `src/components/Contact.css` (alternating light section)

**Interfaces:**
- Consumes: None
- Produces: Enhanced contact page with clear freelance service CTAs

- [ ] **Step 1: Add service options before the form in Contact.jsx**

Add a "What can I help with?" section with clickable service chips that pre-fill the subject field:

```jsx
const serviceOptions = [
  'Brand Identity',
  'Logo Design',
  'Website Design',
  'Full-Stack Development',
  'UI/UX Design',
  'Other',
];
```

In the JSX, before the form, add:

```jsx
<div className="service-options">
  <span className="service-options-label font-mono">What can I help with?</span>
  <div className="service-chips">
    {serviceOptions.map((s) => (
      <button
        key={s}
        className={`service-chip interactive ${subject === s ? 'active' : ''}`}
        onClick={() => setSubject(s)}
        type="button"
      >
        {s}
      </button>
    ))}
  </div>
</div>
```

This requires adding a `subject` state and wiring it to the subject input's `value` and `onChange`.

- [ ] **Step 2: Add alternating light section to Contact**

Wrap the top portion of the contact section in `section--light`:

```jsx
<section className="section contact-section">
  <div className="contact-light-zone section--light">
    {/* Left column (info) + Right column (form) go here */}
  </div>
  {/* Why block and footer stay in dark */}
  <div className="section--dark">
    {/* reasons grid + footer */}
  </div>
</section>
```

- [ ] **Step 3: Add service chip CSS to Contact.css**

```css
.service-options {
  margin-bottom: var(--space-2xl);
}

.service-options-label {
  display: block;
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--text-muted-dark);
  margin-bottom: var(--space-md);
}

.service-chips {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.service-chip {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--text-dim-dark);
  cursor: pointer;
  transition: border-color 250ms var(--ease-out), color 250ms var(--ease-out), background 250ms var(--ease-out);
}

.service-chip:hover {
  border-color: var(--tangerine);
  color: var(--tangerine);
}

.service-chip.active {
  background: var(--tangerine);
  border-color: var(--tangerine);
  color: #fff;
}
```

- [ ] **Step 4: Build and verify**

Run: `npm run dev`, go to `/contact`. Verify:
- Top portion is light background (cream)
- Bottom (capabilities + footer) is dark
- Service chips are clickable and highlight
- Clicking a chip pre-fills the subject input
- Mobile: chips wrap, form is full-width

- [ ] **Step 5: Commit**

```bash
git add src/components/Contact.jsx src/components/Contact.css
git commit -m "feat: enhance Contact page with service chips and alternating light section"
```

---

## Task 11: Visual Verification + Final Polish

**Files:**
- None (verification and polish pass)

**Interfaces:**
- Consumes: All previous tasks
- Produces: Visually verified, polished site ready for deployment

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: Clean build with zero errors.

- [ ] **Step 2: Start dev server and visual audit**

Run: `npm run dev`

Use Playwright or auto-browser to screenshot every page at:
- Desktop (1440px)
- Tablet (768px)
- Mobile (375px)

Verify for each page:
1. **Home (/):** Dark hero with dot grid → scroll → cream services section → transition feels intentional
2. **Work (/work):** Grouped sections with headers, masonry tiles, project window opens on click
3. **About (/about):** Timeline, tech grid, testimonials, all readable
4. **Contact (/contact):** Light top section with service chips, dark bottom with capabilities

- [ ] **Step 3: Check console for errors**

Open browser dev tools → Console tab → verify zero errors or warnings.

- [ ] **Step 4: Verify SEO metadata**

View page source on `/` → verify JSON-LD is present and valid.
Check `robots.txt` and `sitemap.xml` are accessible.

- [ ] **Step 5: Commit any polish fixes**

```bash
git add -A
git commit -m "fix: visual polish pass — spacing, alternation, responsive fixes"
```

---

## Execution Handoff

**Plan complete and saved to `docs/superpowers/plans/2026-09-10-switchboard-redesign-freelance-seo.md`.**

Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration. Good for getting each piece right before moving on.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints. Faster but less review between steps.

Which approach, Lesley? Also — do you have real testimonials from clients (Tarisai, Elevate, etc.) you want to plug in, or should we use the placeholders for now and you fill them in later?
