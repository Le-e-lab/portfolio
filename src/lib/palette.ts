/**
 * Cross-tree signal for opening the command palette without threading a
 * context provider through the layout. A DOM event is the smallest thing that
 * works between the header, the palette and case-study pages.
 */
export const OPEN_PALETTE_EVENT = "portfolio:open-command-palette";

export function openCommandPalette() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_PALETTE_EVENT));
}