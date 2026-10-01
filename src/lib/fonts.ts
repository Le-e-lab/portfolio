import {
  Bricolage_Grotesque,
  Instrument_Sans,
  Instrument_Serif,
  Martian_Mono,
} from "next/font/google";

/**
 * Fonts live here only, so a swap takes minutes.
 * To change the pairing, edit these four blocks. Nothing else imports a font.
 *
 * Latin subset + display:swap + minimum weights.
 * If Lighthouse performance drops below 95, drop `serif` first (Section 6).
 */

export const display = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
  weight: ["500", "600", "700", "800"],
});

export const body = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans",
  weight: ["400", "500", "600"],
});

/** Italic only — at most one word per headline uses this. */
export const serif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
  weight: ["400"],
  style: ["italic"],
});

export const mono = Martian_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-martian-mono",
  weight: ["400", "500"],
});

export const fontVariables = [
  display.variable,
  body.variable,
  serif.variable,
  mono.variable,
].join(" ");