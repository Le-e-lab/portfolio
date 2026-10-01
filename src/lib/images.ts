import type { StaticImageData } from "next/image";

/**
 * Static image imports. Section 9 requires static imports so next/image emits
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