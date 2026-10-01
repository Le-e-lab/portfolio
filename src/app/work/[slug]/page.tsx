import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getWork, getWorkSlugs, getAdjacent } from "@/lib/work";
import { ImageSlot } from "@/components/ui/image-slot";
import { siteConfig } from "@/config/site.config";
import { getImage } from "@/lib/images";

export function generateStaticParams() {
  return getWorkSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWork(slug);
  if (!entry) return {};

  const { meta } = entry;
  const cover = getImage(meta.coverSlot);

  return {
    title: meta.title,
    description: meta.summary,
    alternates: { canonical: `/work/${meta.slug}` },
    openGraph: {
      type: "article",
      title: `${meta.title} — ${siteConfig.fullName}`,
      description: meta.summary,
      url: `/work/${meta.slug}`,
      images: cover
        ? [{ url: cover.src, width: cover.width, height: cover.height, alt: meta.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.summary,
    },
  };
}

/** Sticky mini-index of the MDX headings, read from the body on the server. */
function headings(content: string) {
  return content
    .split("\n")
    .filter((l) => l.startsWith("## "))
    .map((l) => {
      const label = l.slice(3).trim();
      return { label, id: label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") };
    });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getWork(slug);
  if (!entry) notFound();

  const { meta, content } = entry;
  const { prev, next } = getAdjacent(slug);
  const index = headings(content);
  const cover = getImage(meta.coverSlot);

  return (
    <div className="mx-auto max-w-[1120px] px-5 pt-24 pb-16 sm:px-8 sm:pt-32">
      <Link
        href="/#work"
        className="draw-underline inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-muted uppercase"
      >
        <span aria-hidden="true">&larr;</span> All work
      </Link>

      <header className="mt-8">
        <h1 className="text-[clamp(2.5rem,6vw,4rem)] leading-[1.05] tracking-[-0.03em]">
          {meta.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">{meta.summary}</p>

        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-line py-5 font-mono text-[11px] tracking-[0.08em] uppercase sm:grid-cols-4">
          <Meta term="Year">{meta.year}</Meta>
          <Meta term="Role">{meta.role}</Meta>
          <div>
            <dt className="text-dim">Stack</dt>
            <dd className="mt-1 text-muted">{meta.stack.join(", ")}</dd>
          </div>
          <div>
            <dt className="text-dim">Links</dt>
            <dd className="mt-1 flex flex-wrap gap-3">
              {meta.links.length === 0 ? (
                <span className="text-dim">None yet</span>
              ) : (
                meta.links.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="draw-underline text-accent"
                  >
                    {l.label}
                  </a>
                ))
              )}
            </dd>
          </div>
        </dl>
      </header>

      <div className="mt-10 grid gap-12 lg:grid-cols-12">
        {/* Sticky mini-index, desktop only. */}
        {index.length > 0 && (
          <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <p className="font-mono text-[10px] tracking-[0.16em] text-dim uppercase">
                On this page
              </p>
              <ul className="mt-3 flex flex-col gap-2 border-l border-line pl-4">
                {index.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className="font-mono text-[11px] tracking-[0.06em] text-muted transition-colors duration-200 hover:text-accent"
                    >
                      {h.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}

        <article className={index.length > 0 ? "lg:col-span-9" : "lg:col-span-12"}>
          {cover ? (
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-line bg-surface-2">
              <Image
                src={cover}
                alt={meta.title}
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 780px"
                className="object-cover [filter:saturate(0.92)_contrast(1.04)]"
              />
            </div>
          ) : (
            <ImageSlot id={meta.coverSlot} priority className="w-full" />
          )}

          <div className="prose-invert mt-12 max-w-2xl">
            <MDXRemote
              source={content}
              components={{
                h2: (props) => (
                  <h2
                    id={props.children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}
                    className="mt-12 scroll-mt-28 text-2xl tracking-[-0.02em] first:mt-0"
                    {...props}
                  />
                ),
                p: (props) => <p className="mt-4 leading-relaxed text-muted" {...props} />,
                a: (props) => (
                  <a
                    className="draw-underline text-accent"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),
                ul: (props) => <ul className="mt-4 list-none space-y-2 text-muted" {...props} />,
                ol: (props) => (
                  <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted marker:text-dim" {...props} />
                ),
                code: (props) => (
                  <code
                    className="border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-ink"
                    {...props}
                  />
                ),
              }}
            />
          </div>

          {meta.gallerySlots.length > 0 && (
            <div className="mt-14">
              <h2 className="font-mono text-[10px] tracking-[0.16em] text-dim uppercase">
                Gallery
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {meta.gallerySlots.map((slot) => (
                  <ImageSlot key={slot} id={slot} sizes="(max-width: 640px) 92vw, 40vw" />
                ))}
              </div>
            </div>
          )}
        </article>
      </div>

      {/* Large previous / next. */}
      <nav
        aria-label="More projects"
        className="mt-20 grid gap-px border border-line bg-line sm:grid-cols-2"
      >
        {prev ? (
          <ProjectLink item={prev} direction="prev" />
        ) : (
          <span className="bg-bg p-6" />
        )}
        {next ? (
          <ProjectLink item={next} direction="next" />
        ) : (
          <span className="bg-bg p-6" />
        )}
      </nav>
    </div>
  );
}

function Meta({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-dim">{term}</dt>
      <dd className="mt-1 text-muted">{children}</dd>
    </div>
  );
}

function ProjectLink({
  item,
  direction,
}: {
  item: { slug: string; title: string; summary: string };
  direction: "prev" | "next";
}) {
  return (
    <Link
      href={`/work/${item.slug}`}
      className="group flex flex-col gap-3 bg-bg p-6 transition-colors duration-300 hover:bg-surface sm:p-8"
    >
      <span className="font-mono text-[10px] tracking-[0.16em] text-dim uppercase">
        {direction === "prev" ? "Previous" : "Next"}
      </span>
      <span className="text-2xl tracking-[-0.02em] sm:text-3xl">
        <span className="draw-underline">{item.title}</span>
      </span>
      <span className="max-w-sm text-sm text-muted">{item.summary}</span>
    </Link>
  );
}