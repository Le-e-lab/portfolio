import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { getSlot, getWorkSlotId } from "@/lib/images.manifest";

/**
 * Case studies are MDX files in content/work. Frontmatter is validated with
 * zod so a malformed file fails the build with a useful message instead of
 * rendering half a page.
 */

const CONTENT_DIR = path.join(process.cwd(), "content", "work");

export const workFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/, "slug must be kebab-case"),
  year: z.union([z.string(), z.number()]).transform(String),
  role: z.string().min(1),
  stack: z.array(z.string()).min(1),
  /** One line for the work list and the sticky preview. */
  summary: z.string().min(1),
  links: z
    .array(z.object({ label: z.string(), url: z.string().url() }))
    .optional()
    .default([]),
  /** Ordered case studies. Lower first. */
  order: z.number().int().optional(),
  /** Shown in the work list. Defaults to every case study. */
  featured: z.boolean().optional().default(true),
  /** Slot ids, e.g. work-kreditzw-gallery-1 */
  gallerySlots: z.array(z.string()).max(4).optional().default([]),
});

export type WorkMeta = z.infer<typeof workFrontmatterSchema> & {
  coverSlot: string;
  /** Per-slot CSS filter from the manifest, so the case cover matches the list. */
  coverGrade?: string;
};

export type WorkEntry = {
  meta: WorkMeta;
  /** Raw MDX body, compiled at render time. */
  content: string;
};

export type WorkSummary = {
  slug: string;
  title: string;
  year: string;
  role: string;
  stack: string[];
  summary: string;
  links: { label: string; url: string }[];
  coverSlot: string;
  /** Per-slot CSS filter, so client-rendered covers match ImageSlot. */
  coverGrade?: string;
  gallerySlots: string[];
};

function readDir(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
}

function parse(file: string): WorkEntry {
  const full = path.join(CONTENT_DIR, file);
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);

  const parsed = workFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  - ${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("\n");
    throw new Error(
      `Invalid frontmatter in content/work/${file}:\n${issues}\n\n` +
        `Fix the file, or see src/lib/work.ts for the schema.`,
    );
  }

  // The filename must agree with the slug, or URLs silently disagree.
  const expected = file.replace(/\.mdx?$/, "");
  if (parsed.data.slug !== expected) {
    throw new Error(
      `Frontmatter slug "${parsed.data.slug}" does not match filename "${expected}" ` +
        `in content/work/${file}. They must be identical.`,
    );
  }

  const coverSlot = getWorkSlotId(parsed.data.slug, "cover");

  return {
    meta: {
      ...parsed.data,
      coverSlot,
      coverGrade: getSlot(coverSlot)?.grade,
    },
    content,
  };
}

let cache: WorkEntry[] | null = null;

function all(): WorkEntry[] {
  if (!cache) {
    cache = readDir()
      .map(parse)
      .sort((a, b) => (a.meta.order ?? 99) - (b.meta.order ?? 99));
  }
  return cache;
}

/** Every case study, ordered. Used by the command palette and prev/next. */
export function getAllWork(): WorkSummary[] {
  return all()
    .filter((w) => w.meta.featured)
    .map(({ meta }) => ({
      slug: meta.slug,
      title: meta.title,
      year: meta.year,
      role: meta.role,
      stack: meta.stack,
      summary: meta.summary,
      links: meta.links,
      coverSlot: meta.coverSlot,
      coverGrade: meta.coverGrade,
      gallerySlots: meta.gallerySlots,
    }));
}

export function getWork(slug: string): WorkEntry | undefined {
  return all().find((w) => w.meta.slug === slug);
}

export function getAdjacent(slug: string): {
  prev?: WorkSummary;
  next?: WorkSummary;
} {
  const list = getAllWork();
  const i = list.findIndex((w) => w.slug === slug);
  if (i === -1) return {};
  return { prev: list[i - 1], next: list[i + 1] };
}

export function getWorkSlugs(): string[] {
  return getAllWork().map((w) => w.slug);
}