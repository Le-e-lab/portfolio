import { IMAGE_SLOTS, type StaticImageSlotId } from "./images.manifest";
import { hasImage } from "./images";
import { siteConfig } from "@/config/site.config";

/**
 * Alt text the owner still owes. A supplied slot whose alt is still one of
 * these is a build blocker, not a warning: hasImage() only proves a file
 * landed, so without this check dropping the file in and flipping
 * strictImages would ship alt="[[FILL]] Describe the person" to production.
 */
const OWNER_MARKER = "[[FILL";

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
    if (!hasImage(id)) {
      missing.push(`${id} (${slot.ratio}, ${slot.minWidth}x${slot.minHeight} min)`);
      continue;
    }
    // The file landed but the alt is still a placeholder.
    if (slot.alt.includes(OWNER_MARKER)) {
      missing.push(`${id} (file supplied, but alt text is still owner-owed)`);
    }
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
      "strictImages is enabled but these required image slots are unfinished:",
      ...missing.map((m) => `  - ${m}`),
      "",
      "Add the files under src/assets/images/ and register them in src/lib/images.ts,",
      "and replace any [[FILL]] alt text in src/lib/images.manifest.ts with real",
      "description of the photo.",
      "Or set flags.strictImages to false in src/config/site.config.ts for a preview build.",
      "",
    ].join("\n"),
  );
}