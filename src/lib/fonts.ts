import localFont from "next/font/local";

/**
 * Fonts live here only, so a swap takes minutes.
 * To change the pairing, edit these four blocks. Nothing else imports a font.
 *
 * Self-hosted latin variable files from Google Fonts, in src/fonts/. The
 * build used to fetch them from Google every time, and one failed fetch took
 * a deploy down. Each file covers every weight the site uses.
 * If Lighthouse performance drops below 95, drop `serif` first.
 */

export const display = localFont({
  src: "../fonts/bricolage-grotesque-latin.woff2",
  display: "swap",
  variable: "--font-bricolage",
  weight: "500 800",
  adjustFontFallback: "Arial",
});

export const body = localFont({
  src: "../fonts/instrument-sans-latin.woff2",
  display: "swap",
  variable: "--font-instrument-sans",
  weight: "400 600",
  adjustFontFallback: "Arial",
});

/** Italic only — at most one word per headline uses this. */
export const serif = localFont({
  src: "../fonts/instrument-serif-italic-latin.woff2",
  display: "swap",
  variable: "--font-instrument-serif",
  weight: "400",
  style: "italic",
  adjustFontFallback: "Times New Roman",
});

export const mono = localFont({
  src: "../fonts/martian-mono-latin.woff2",
  display: "swap",
  variable: "--font-martian-mono",
  weight: "400 500",
  fallback: ["ui-monospace", "monospace"],
  adjustFontFallback: false,
});

export const fontVariables = [
  display.variable,
  body.variable,
  serif.variable,
  mono.variable,
].join(" ");