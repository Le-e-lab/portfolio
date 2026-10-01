/**
 * Every image slot in the site, in one place. Section 9 of AGENTS.md.
 *
 * `file` is a static import under src/assets/images/. Static imports are
 * required so next/image emits blur placeholders and knows the dimensions at
 * build time — a string path in public/ would give us neither.
 *
 * Alt text is owner-supplied. Until then `alt` is empty and ImageSlot renders
 * the dashed placeholder frame instead of a broken image.
 */

export type AspectRatio = `${number} / ${number}`;

export type ImageSlotDef = {
  id: string;
  /** Where it appears, for the placeholder label. */
  where: string;
  required: boolean;
  ratio: AspectRatio;
  minWidth: number;
  minHeight: number;
  /** Guidance shown in PLACEHOLDERS.md until the owner supplies real alt. */
  alt: string;
  /** short mono caption used under About images */
  caption?: string;
};

export const IMAGE_SLOTS = {
  "hero-avatar": {
    id: "hero-avatar",
    where: "Hero",
    required: true,
    ratio: "1 / 1",
    minWidth: 512,
    minHeight: 512,
    // Supplied: stylized vector illustration of a man in a suit and tie on
    // black. Owner note: a real photo would serve this slot better.
    alt: "Stylised illustration of Lesley in a suit and tie on a black background",
  },
  "about-headshot": {
    id: "about-headshot",
    where: "About",
    required: true,
    ratio: "4 / 5",
    minWidth: 1200,
    minHeight: 1500,
    alt: "[[FILL]] Describe the person",
    caption: "Fig. 01: [[FILL]]",
  },
  "about-workspace": {
    id: "about-workspace",
    where: "About",
    required: true,
    ratio: "3 / 2",
    minWidth: 1800,
    minHeight: 1200,
    alt: "[[FILL]] Describe the desk or setup",
    caption: "Fig. 02: [[FILL]]",
  },
  "about-gym": {
    id: "about-gym",
    where: "About",
    required: true,
    ratio: "4 / 5",
    minWidth: 1200,
    minHeight: 1500,
    alt: "[[FILL]] Describe the scene",
    caption: "Fig. 03: [[FILL]]",
  },
  "about-candid": {
    id: "about-candid",
    where: "About",
    required: true,
    ratio: "1 / 1",
    minWidth: 1200,
    minHeight: 1200,
    alt: "[[FILL]] Describe the scene",
    caption: "Fig. 04: [[FILL]]",
  },
  "food-1": {
    id: "food-1",
    where: "Off the clock",
    required: true,
    ratio: "1 / 1",
    minWidth: 1000,
    minHeight: 1000,
    alt: "[[FILL]] Name the dish",
  },
  "food-2": {
    id: "food-2",
    where: "Off the clock",
    required: true,
    ratio: "1 / 1",
    minWidth: 1000,
    minHeight: 1000,
    alt: "[[FILL]] Name the dish",
  },
  "food-3": {
    id: "food-3",
    where: "Off the clock",
    required: true,
    ratio: "1 / 1",
    minWidth: 1000,
    minHeight: 1000,
    alt: "[[FILL]] Name the dish",
  },
  "food-4": {
    id: "food-4",
    where: "Off the clock",
    required: true,
    ratio: "1 / 1",
    minWidth: 1000,
    minHeight: 1000,
    alt: "[[FILL]] Name the dish",
  },
  og: {
    id: "og",
    where: "Social card",
    required: false,
    ratio: "1200 / 630",
    minWidth: 1200,
    minHeight: 630,
    alt: "Social preview card for Lesley Mutsambiwa",
  },
} satisfies Record<string, ImageSlotDef>;

export type StaticImageSlotId = keyof typeof IMAGE_SLOTS;

/** Case-study images are keyed by slug, so they are resolved dynamically. */
export const WORK_COVER_RATIO = "16 / 10";
export const WORK_COVER_MIN = { width: 2400, height: 1500 } as const;
export const WORK_GALLERY_MIN_WIDTH = 2000;

/** Real alt text for the three covers that already exist as files. */
const WORK_ALT: Record<string, string> = {
  "work-chefmuse-cover":
    "Chef's Muse landing page: headline 'Cooking with zero recipes.' above an 'Open Your Fridge' call to action",
  "work-guardian-cover":
    "Guardian landing page: 'Cybersecurity compliance for Zimbabwean businesses' above a 'Scan my website free' button",
  "work-gympal-cover":
    "GyMPal dashboard: 'Level Up Every Day' above streak counters and dumbbell-only workout templates",
};

/** Work slots we have real descriptions for but no file yet. */
const WORK_PENDING_ALT: Record<string, string> = {
  "work-kwikifund-cover":
    "[[FILL]] Kwikifund mobile screen showing the credit scoring result",
  "work-ai-job-agent-cover":
    "[[FILL]] Screenshot of the job automation agent's output",
};

/** Dynamic slot for a case-study slug + kind. Returns undefined for junk ids. */
export function getWorkSlotId(slug: string, kind: "cover" | `gallery${1|2|3|4}`) {
  return kind === "cover" ? `work-${slug}-cover` : `work-${slug}-${kind}`;
}

export function getWorkSlotDef(slug: string, kind: "cover" | `gallery${1|2|3|4}`): ImageSlotDef {
  const id = getWorkSlotId(slug, kind);
  if (kind === "cover") {
    return {
      id,
      where: `Work / ${slug}`,
      required: false,
      ratio: WORK_COVER_RATIO,
      minWidth: WORK_COVER_MIN.width,
      minHeight: WORK_COVER_MIN.height,
      alt:
        WORK_ALT[id] ?? WORK_PENDING_ALT[id] ?? "[[FILL]] Describe the project UI",
    };
  }
  return {
    id,
    where: `Work / ${slug}`,
    required: false,
    ratio: "16 / 10",
    minWidth: WORK_GALLERY_MIN_WIDTH,
    minHeight: Math.round(WORK_GALLERY_MIN_WIDTH * 0.625),
    alt: "[[FILL]] Describe the screen",
  };
}

/**
 * Static imports. A slot absent from this map has no file yet, so ImageSlot
 * renders its dashed frame. Import order is irrelevant; keys are slot ids.
 */
export function getSlot(id: string): ImageSlotDef | undefined {
  const base = (IMAGE_SLOTS as Record<string, ImageSlotDef>)[id];
  if (base) return base;

  if (!id.startsWith("work-")) return undefined;

  // "work-<slug>-cover" | "work-<slug>-galleryN". Slugs are kebab-case and can
  // contain hyphens (job-agent), so the kind is always the LAST segment and the
  // slug is everything between the prefix and it.
  const prefix = "work-";
  const rest = id.slice(prefix.length);
  const dash = rest.lastIndexOf("-");
  if (dash === -1) return undefined;
  const slug = rest.slice(0, dash);
  const kind = rest.slice(dash + 1);
  if (!slug || !kind) return undefined;

  if (kind === "cover") {
    return {
      id,
      where: `Work / ${slug}`,
      required: false,
      ratio: WORK_COVER_RATIO,
      minWidth: WORK_COVER_MIN.width,
      minHeight: WORK_COVER_MIN.height,
      alt: WORK_ALT[id] ?? WORK_PENDING_ALT[id] ?? "[[FILL]] Describe the project UI",
    };
  }

  if (/^gallery[1-4]$/.test(kind)) {
    return {
      id,
      where: `Work / ${slug}`,
      required: false,
      ratio: "16 / 10",
      minWidth: WORK_GALLERY_MIN_WIDTH,
      minHeight: Math.round(WORK_GALLERY_MIN_WIDTH * 0.625),
      alt: "[[FILL]] Describe the screen",
    };
  }

  return undefined;
}

export function isPlaceholderAlt(alt: string): boolean {
  return alt.startsWith("[[FILL]]") || alt.trim() === "";
}