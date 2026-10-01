# Portfolio Agent Instructions & Guardrails

@docs/master-spec-portfolio.md

## Commands
- Dev: `pnpm dev`
- Build: `pnpm build` (runs the GitHub snapshot first)
- Typecheck: `pnpm typecheck`
- Lint: `pnpm lint`

## Pre-flight gate — required before committing or declaring done

```bash
bash /home/lee/.config/opencode/scripts/ci-parity.sh .
```

UI changes also need browser verification at 1440px and 360px: no horizontal
overflow, all reveals visible after a real wheel scroll, zero console errors.
Delegate pixel review to `@designer` and apply its exact fixes.

## Three things that will bite you

1. **Never invent facts.** `[[FILL]]` markers and dashed image placeholders are
   intentional owner-work placeholders. See section 1 of the master spec.
2. **`MotionProvider` lives in the root layout.** Moving it into a component
   means every `Reveal` outside that subtree renders nothing.
3. **Routing is shallow.** `/` and `/work/[slug]` only. The five lower sections
   are anchors on the home page, not routes.

## Hard constraints

- Dark-only tokens, 2px max radius, hairline dividers. No gradients, glows,
  shadows, emoji, or green.
- `text-dim` is WCAG AA only on `bg`. On `surface`/`surface-2` use `text-muted`.
- Tap targets ≥44px on controls, not on sentence links.
- One `h1` per route. Section headlines are `h2`.
- `strictImages` stays `false` until every required image slot and its alt text
  exist. `GITHUB_TOKEN` is optional and server-only; with no token the Activity
  section shows an honest empty state — never sample data.
- Never `transition: all`, unthrottled scroll/resize listeners, or native
  `alert`/`confirm`.

Keep all work local. Do not deploy or push unless explicitly asked.
