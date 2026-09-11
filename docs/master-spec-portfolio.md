# Lesley Portfolio — Master Project Specification & Guardrails

> **Project:** Portfolio Refactor & Modernization (`lesley.runs-on.dev` / `Le-e-lab.github.io/portfolio/`)  
> **Brand Persona:** Lesley — Designer & Developer ("Designer who also codes")  
> **Stack:** React 19, Vite, Vanilla CSS (tokens), Framer Motion (purposeful feedback only), Native Playwright for verification.  
> **Palette:** Carbon Black (`#0c0c0c`), Charcoal (`#141414`), Tangerine (`#E8650A` / `#F97316`), Cream (`#F5F2EB` for light alternating sections).  
> **Typography:** Display Serifs (`Playfair Display`, `Bebas Neue`, `Clash Display`), Clean Sans (`Outfit`, `Satoshi`), Monospace (`JetBrains Mono`).

---

## 1. Aesthetic Architecture & Core Features

### A. Pointy-Top Interlocking Honeycomb Gallery (`Featured Work`)
- **Shape & Ratio:** CSS `clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)` on container with `aspect-ratio: 1 / 1.1547`.
- **Flex-Row Interlock Math:**
  - Rows are flex containers (`.hexcomb-row`).
  - Subsequent rows pull upward: `margin-block-start: calc(var(--hex) * -0.3)`.
  - Alternate rows offset horizontally: `margin-inline-start: calc(var(--hex) / 2)`.
- **Light-On Hover Effect:**
  - Behind the hovered cell, a radial glow (`.hex-glow`) fades in with tangerine accent.
  - Outer hex scales `1.06` and z-indexes above neighbors.
  - Inner image scales `1.12` without changing container layout boundaries (zero layout shift).
  - Label overlay slides up showing project title and discipline.
- **Mobile Graceful Degradation:** Below 480px, interlock math breaks down. Fall back to a clean 2-column grid or single-column stack.

### B. Liquid-Blend Organic Section Dividers
- **Canvas Continuity Metaphor:** An organic SVG blob using the *upcoming* section's background color bleeds upward into the previous section.
- **Multi-Layer Blend:**
  - Far bleed: `filter: blur(24px)`, opacity `0.3`, screen blend mode (`mix-blend-mode: screen`).
  - Near bleed: `filter: blur(10px)`, opacity `0.5`.
  - Crisp contour: opacity `1.0` anchors the physical boundary.
- **Alternating Sections:**
  - Hero (Dark Carbon) → Liquid Divider → Services / Work Intro (Light Cream `#F5F2EB`) → Liquid Divider → Honeycomb Featured Work & Design Showcase (Dark Blueprint `#0c0c0c`) → Liquid Divider → Contact Dossier.

---

## 2. ❌ Anti-Vibecoded Design & Code Guardrails (Strictly Enforced)

Actively avoid all generic "AI-generated" / "vibecoded" tropes:

### Visual & Design Clichés (Forbidden)
- **NO harsh gradients**, NO generic "radial orb" blur shapes, NO dot-grid backgrounds (use the hexagon/honeycomb grid instead).
- **NO Lucide icon pack defaults**, NO sparkle (✨) icons, NO emoji used as UI elements (use clean, scalable inline SVGs styled with CSS custom properties).
- **NO pure white backgrounds** — maintain deliberate dark theme with warm cream section alternation.
- **NO rainbow/neon/basic pastel palettes**, NO generic purple-and-black cliché combo — stick strictly to the Tangerine / Carbon Black / Cream system.
- **NO drop-shadow-heavy cards**, NO soft-corner-radius-everywhere look — keep sharp, architectural, intentional edges.
- **NO "liquid glass" / glassmorphism effect** unless explicitly requested.
- **NO colored left-stripe cards**, NO generic bento grid layout, NO decorative faux terminal windows.
- **NO 3-cards-in-a-row generic feature layout**, NO 3-tier pricing tables.
- **NO checkmark bullet lists** as default list styling.
- **NO animated arrows**, NO default "hover-lift-on-everything" animation — every animation must be purposeful feedback.
- **NO fake testimonials** or placeholder "customer" quotes.
- **Font deliberate selection:** Never default blindly to Inter, Geist, or Space Grotesk.

### Copywriting Clichés (Forbidden)
- **NO em-dash-heavy** AI-sounding marketing copy.
- **NO "It's not X, it's Y"** sentence constructions.
- Keep copy authentic, punchy, and direct to Lesley's real background and projects.

### Functional & Technical Checklist (Mandatory)
- [ ] **Zero horizontal scroll** on any screen size. Explicitly test at 360px–400px mobile viewports.
- [ ] **Zero dead/broken links or buttons** — every interactive element must link to a real route or fire an action.
- [ ] **Zero leftover placeholder text** ("Lorem ipsum", "Your text here") in production builds. Only explicitly-labeled gallery image placeholders until replaced.
- [ ] **Working footer links** and current copyright year.
- [ ] **Favicon, descriptive page title, and meta description** present on every route.
- [ ] **Compressed/optimized images** (WebP/SVG, explicit aspect ratios to prevent CLS).
- [ ] **Custom 404 page** matching site aesthetic.
- [ ] **Explicit feedback states** for all interactive components (loading, sending, success, error).
- [ ] **Clickable contact info:** Logo, phone number, and email must be clickable (`tel:`, `mailto:`).

---

## 3. 🎨 Animation Principles (The 4 Feedback Laws)

Animation is feedback and storytelling, never gratuitous decoration:

1. **01 — Scroll → Storytelling:**
   - *Parallax:* Background geometric lines move at different velocities from foreground tiles.
   - *Scrub:* Animations tied directly to scroll progress rather than autoplaying timers.
   - *Pin + Transform:* Focal section pins in place while internal content shifts underneath.
2. **02 — Reveal → Hierarchy:**
   - *Fade + Lift:* Default reveal for new content blocks as they enter viewport.
   - *Stagger:* Grouped tiles enter sequentially with slight stagger delay.
   - *Clip Reveal:* Image and visual showcases uncover via clip-path masks rather than generic fades.
   - *Rule:* Never reveal everything at once — pace content with the user's scroll.
3. **03 — Hover → Feedback:**
   - *Magnetic CTA:* Primary buttons subtly shift towards cursor within close proximity.
   - *Image Zoom:* Image itself scales inside the fixed container (zero layout shift).
   - *Text Shift:* Links react with subtle underline slide-in or color transition.
4. **04 — Click → Feedback:**
   - *Press + Spring:* Buttons compress on active press (`scale(0.97)`) and spring back on release.
   - *State Sequence:* Async actions show full progression (`Send` → `Sending...` → `Sent ✓`). Never leave a click unacknowledged.

---

## 4. 🔒 Security, Legal, Compliance & Accessibility

- **Security:** No hardcoded tokens, secrets, or API keys in code or git history. Enforce HTTPS, sanitized inputs, secure CORS, and error masking in production.
- **Legal & Compliance:** Verify licensing on all fonts and visual assets. Simple Privacy Policy and Terms of Service. Honest representation of skills and client work.
- **Accessibility:** Minimum WCAG AA color contrast ratios (checked especially on cream backgrounds and form inputs). Comprehensive `alt` text on images, full keyboard navigation with visible focus indicators.

---

## 5. 🤝 Agent Operating Protocols & Interaction Style

- **Direct & Honest:** Challenge bad assumptions. If a proposed design hurts mobile performance, increases bundle weight, or harms readability, explain why and present the better alternative.
- **Uncertainty Transparency:** If browser support for a CSS property is uncertain or a layout requires polyfilling, state it plainly instead of guessing.
- **Double-Pass Self-Reflection:** Mentally model code, audit against the anti-vibecoding checklist, and only output complete, production-ready code.
- **Verification Gate:** Verify frontend changes in a real browser via Playwright screenshots at 375px and 1440px viewports before declaring done.
