"use client";

import { useEffect, useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { SECTORS, SECTIONS, siteConfig } from "@/config/site.config";

/**
 * Section 8: the scroll is one lap, sectors are sections.
 *
 * Decorative only (aria-hidden) — the header nav is the navigation.
 * The progress fill and the numeric label are driven by one motion value, and
 * React only re-renders when the rounded percentage actually changes, so this
 * is not a per-frame render.
 */
export function LapRail() {
  const [pct, setPct] = useState(0);
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);

  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    // One custom property on the root drives both the bar and the rail fill,
    // so no React state changes per frame.
    document.documentElement.style.setProperty("--lap", p.toFixed(4));
    const next = Math.round(p * 100);
    setPct((prev) => (prev === next ? prev : next));
  });

  // Which section is current, and where each sector starts.
  const [marks, setMarks] = useState(() => SECTORS.map((s) => ({ id: s.id, at: 0 })));

  useEffect(() => {
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;

      setMarks(
        SECTORS.map((sector) => {
          const firstId = sector.spans[0];
          const el = firstId === "hero" ? document.body : document.getElementById(firstId);
          const top = el?.getBoundingClientRect().top ?? 0;
          const absolute = top + window.scrollY;
          return { id: sector.id, at: Math.min(1, Math.max(0, absolute / max)) };
        }),
      );
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );

    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const current = SECTIONS.find((s) => s.id === activeId) ?? SECTIONS[0];
  const complete = pct >= 99 && current.id === "contact";

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-40">
      {/* Mobile: 2px top progress bar. */}
      <div className="h-0.5 w-full bg-line lg:hidden">
        <div
          className="h-full origin-left bg-accent"
          style={{ transform: "scaleX(var(--lap, 0))" }}
        />
      </div>

      {/* Desktop: thin vertical rail with sector marks. */}
      <div className="fixed top-1/2 right-5 hidden -translate-y-1/2 lg:block">
        <div className="flex items-stretch gap-3">
          <div className="flex flex-col justify-between py-1">
            {SECTORS.map((sector) => {
              const active = sector.spans.includes(current.id as never);
              return (
                <span
                  key={sector.id}
                  className="relative flex h-8 items-center"
                  style={{ marginTop: sector.id === "s2" ? "auto" : undefined }}
                >
                  <span
                    className={`block h-px transition-all duration-300 ${
                      active ? "w-4 bg-accent" : "w-2 bg-dim"
                    }`}
                  />
                </span>
              );
            })}
          </div>

          <div className="relative h-48 w-px bg-line">
            <div
              className="absolute inset-x-0 top-0 origin-top bg-accent"
              style={{ height: "calc(var(--lap, 0) * 100%)" }}
            />
            {marks.map((m) => (
              <span
                key={m.id}
                className="absolute -left-px h-px w-px bg-line"
                style={{ top: `${m.at * 100}%` }}
              />
            ))}
          </div>

          <div className="flex w-28 flex-col justify-between py-0.5">
            <span className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase tabular">
              Lap {siteConfig.flags.storytelling ? "1/1" : "off"}
            </span>
            <span className="font-mono text-[10px] tracking-[0.12em] text-muted uppercase">
              {complete ? "Lap complete" : current.label}
            </span>
            <span className="font-mono text-[10px] tracking-[0.12em] text-accent uppercase tabular">
              {String(pct).padStart(3, "0")}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}