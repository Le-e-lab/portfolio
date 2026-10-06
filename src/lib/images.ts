import type { StaticImageData } from "next/image";

/**
 * Static imports, so next/image emits
 * blur placeholders and knows intrinsic dimensions at build time.
 *
 * A slot missing from this map has no file yet and ImageSlot renders its
 * dashed frame instead. Add the import, add the map entry, done.
 */

import heroAvatar from "@/assets/images/hero-avatar.webp";
import chefMuseCover from "@/assets/images/work/chefmuse-cover.webp";
import guardianCover from "@/assets/images/work/guardian-cover.webp";
import gymPalCover from "@/assets/images/work/gympal-cover.webp";

export const STATIC_IMAGES: Record<string, StaticImageData> = {
  "hero-avatar": heroAvatar,
  "work-chefmuse-cover": chefMuseCover,
  "work-guardian-cover": guardianCover,
  "work-gympal-cover": gymPalCover,
};

export function getImage(slotId: string): StaticImageData | undefined {
  return STATIC_IMAGES[slotId];
}

export function hasImage(slotId: string): boolean {
  return slotId in STATIC_IMAGES;
}
/**
 * Dashed spec frames are a reminder for the owner, not something a visitor
 * should see. Production builds drop any slot that has no file yet.
 */
export const SHOW_PLACEHOLDERS = process.env.NODE_ENV !== "production";

export function showSlot(slotId: string): boolean {
  return SHOW_PLACEHOLDERS || hasImage(slotId);
}
