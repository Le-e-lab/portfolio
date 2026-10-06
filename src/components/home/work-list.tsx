"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { m, useReducedMotion } from "motion/react";
import { SectionLabel } from "@/components/ui/section-label";
import { ScrollWords } from "@/components/ui/motion-primitives";
import { ImageSlot } from "@/components/ui/image-slot";
import { siteConfig } from "@/config/site.config";
import { getImage, showSlot, SHOW_PLACEHOLDERS } from "@/lib/images";
import type { WorkSummary } from "@/lib/work";
import { cn } from "@/lib/cn";

/**
 * List on the left, sticky 16:10 preview on the right that
 * crossfades to whichever project is nearest the viewport centre.
 *
 * IntersectionObserver with rootMargin "-45% 0px -45% 0px" reduces to a thin
 * band across the middle of the viewport, which is exactly the "nearest the
 * centre" rule. Below 1024px there is no sticky panel — each item shows its
 * own image inline.
 */
export function WorkList({ work }: { work: WorkSummary[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(
    work[0]?.slug ?? null,
  );
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());
  const reduced = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.getAttribute("data-slug"));
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    for (const el of itemRefs.current.values()) observer.observe(el);
    return () => observer.disconnect();
  }, [work]);

  const shown = hoveredSlug ?? activeSlug ?? work[0]?.slug ?? null;
  const active = work.find((w) => w.slug === shown) ?? work[0];

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="mx-auto max-w-[1120px] scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionLabel index="01" label="Work" />
          <h2 id="work-heading" className="mt-3 max-w-md text-3xl sm:text-4xl">
            <ScrollWords text="Five things I have actually shipped." />
          </h2>
        </div>
        <p className="max-w-xs font-mono text-label leading-relaxed tracking-[0.06em] text-muted uppercase md:pb-1 md:text-right">
          Each one has its own page. Nothing here is a redesign exercise.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* List. Mobile order 1. */}
        <ol className="lg:col-span-7">
          {work.map((w, i) => (
            <li
              key={w.slug}
              data-slug={w.slug}
              ref={(el) => {
                if (el) itemRefs.current.set(w.slug, el);
                else itemRefs.current.delete(w.slug);
              }}
              onMouseEnter={() => setHoveredSlug(w.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              className={cn(
                "border-t border-line last:border-b",
                "transition-colors duration-300",
                shown === w.slug && "border-t-accent",
              )}
            >
              <Link
                href={`/work/${w.slug}`}
                className="group block py-6 focus-visible:outline-none"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-label text-dim tabular">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="text-xl text-ink sm:text-2xl">
                        <span className="draw-underline">{w.title}</span>
                      </h3>
                      <span className="font-mono text-label text-dim tabular">
                        {w.year}
                      </span>
                    </div>
                    <p className="mt-2 max-w-md text-sm text-muted">
                      {w.summary}
                    </p>
                    <p className="mt-3 font-mono text-label leading-relaxed tracking-[0.1em] text-muted uppercase md:text-xs">
                      {w.role} &middot; {w.stack.slice(0, 3).join(" / ")}
                      {w.stack.length > 3 ? ` +${w.stack.length - 3}` : ""}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="shrink-0 self-center font-mono text-base text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent"
                  >
                    &rarr;
                  </span>
                </div>

                {/* Mobile: inline image. Hidden on desktop where the panel handles it. */}
                {showSlot(w.coverSlot) && (
                  <div className="mt-5 lg:hidden">
                    <ImageSlot
                      id={w.coverSlot}
                      sizes="(max-width: 1024px) 92vw, 0px"
                      className="w-full"
                    />
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ol>

        {/* Sticky preview. Desktop only. */}
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-24">
            <div className="relative aspect-[16/10] w-full">
              {work.map((w) => {
                const src = getImage(w.coverSlot);
                const isActive = active?.slug === w.slug;

                if (!src) {
                  if (!isActive) return null;
                  return SHOW_PLACEHOLDERS ? (
                    <div key={w.slug} className="absolute inset-0">
                      <ImageSlot
                        id={w.coverSlot}
                        sizes="40vw"
                        className="h-full w-full"
                      />
                    </div>
                  ) : (
                    // No cover yet: a type-only card, so the panel never goes blank.
                    <div
                      key={w.slug}
                      className="absolute inset-0 flex flex-col justify-between border border-line bg-surface p-6"
                    >
                      <span className="font-mono text-label tracking-[0.14em] text-muted uppercase tabular">
                        {w.year} &middot; {w.role}
                      </span>
                      <div>
                        <p className="font-display text-4xl tracking-[-0.03em] text-ink">
                          {w.title}
                        </p>
                        <p className="mt-3 max-w-[36ch] text-sm text-muted">
                          {w.summary}
                        </p>
                      </div>
                      <span className="font-mono text-label tracking-[0.1em] text-muted uppercase">
                        {w.stack.join(" / ")}
                      </span>
                    </div>
                  );
                }

                return (
                  <m.div
                    key={w.slug}
                    className="absolute inset-0"
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
                    }
                    aria-hidden={!isActive}
                  >
                    <div className="relative h-full w-full overflow-hidden border border-line bg-surface-2">
                      <Image
                        src={src}
                        alt={w.title}
                        fill
                        sizes="40vw"
                        className="object-cover"
                        style={
                          w.coverGrade
                            ? { filter: w.coverGrade }
                            : { filter: "saturate(0.92) contrast(1.04)" }
                        }
                      />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-bg/90 to-transparent p-3">
                        <span className="font-mono text-label-sm tracking-[0.12em] text-ink uppercase">
                          {w.title}
                        </span>
                        <span className="font-mono text-label text-muted tabular">
                          {w.year}
                        </span>
                      </div>
                    </div>
                  </m.div>
                );
              })}
            </div>

            <p className="mt-4 font-mono text-label tracking-[0.12em] text-muted uppercase">
              Hover or scroll to preview
            </p>
          </div>
        </div>
      </div>

      <p className="mt-10 font-mono text-label tracking-[0.12em] text-muted uppercase">
        More in{" "}
        <a
          href={`https://github.com/${siteConfig.githubUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="draw-underline text-muted"
        >
          GitHub
        </a>
      </p>
    </section>
  );
}
