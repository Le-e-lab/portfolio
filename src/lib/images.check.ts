import { IMAGE_SLOTS, type StaticImageSlotId } from "./images.manifest";
import { hasImage } from "./images";
import { siteConfig } from "@/config/site.config";

/**
 * With strictImages on, a production build fails when a required
 * slot has no file. This runs from the root layout so it covers every route.
 *
 * Currently returns [] because the four About photos and four food photos are
 * not supplied yet, which is why strictImages ships as false. Flip it to true
 * in site.config.ts once those eight files exist.
 */
export function findMissingRequiredImages(): string[] {
  const missing: string[] = [];
  for (const id of Object.keys(IMAGE_SLOTS) as StaticImageSlotId[]) {
    const slot = IMAGE_SLOTS[id];
    if (!slot.required) continue;
    if (hasImage(id)) continue;
    missing.push(`${id} (${slot.ratio}, ${slot.minWidth}x${slot.minHeight} min)`);
  }
  return missing;
}

export function assertRequiredImages() {
  if (!siteConfig.flags.strictImages) return;
  if (process.env.NODE_ENV !== "production") return;

  const missing = findMissingRequiredImages();
  if (missing.length === 0) return;

  throw new Error(
    [
      "",
      "strictImages is enabled but these required image slots have no file:",
      ...missing.map((m) => `  - ${m}`),
      "",
      "Add the files under src/assets/images/ and register them in src/lib/images.ts,",
      "or set flags.strictImages to false in src/config/site.config.ts for a preview build.",
      "",
    ].join("\n"),
  );
}