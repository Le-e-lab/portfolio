"use client";

import { ImageSlot } from "@/components/ui/image-slot";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { MaskedWords, Reveal } from "@/components/ui/motion-primitives";
import { siteConfig } from "@/config/site.config";

export function Hero() {
  return (
    <section
      id="hero"
      className="mx-auto max-w-[1120px] px-5 pt-24 pb-16 sm:px-8 sm:pt-32 sm:pb-24"
    >
      <Reveal delay={0}>
        <div className="flex flex-wrap items-center justify-between gap-8 sm:gap-10">
          <div className="max-w-2xl space-y-6">
            <Reveal delay={0}>
              <span className="inline-flex items-center gap-2 border border-line bg-surface px-3 py-1.5 font-mono text-label tracking-[0.14em] uppercase">
                <span className="h-2 w-2 rounded-full bg-accent" />
                {siteConfig.availability}
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="text-[clamp(3rem,8vw,5.5rem)] leading-[1.02] tracking-[-0.035em]">
                <MaskedWords text={siteConfig.fullName} />
              </h1>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-[1.15rem] text-muted sm:text-[1.25rem]">
                <span className="text-ink">{siteConfig.role}</span>{" "}
                {siteConfig.tagline}
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="max-w-[58ch] text-sm leading-[1.7] text-muted">
                {siteConfig.humanLine}
              </p>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="press inline-flex min-h-[44px] items-center border border-accent bg-accent px-5 font-mono text-label tracking-[0.12em] text-bg uppercase transition-opacity duration-200 hover:opacity-85"
                >
                  See work
                </a>
                <CopyEmailButton variant="outline" />
              </div>
            </Reveal>

            <Reveal delay={0.45}>
              <div className="-my-1 flex flex-wrap items-center gap-x-6 gap-y-1 text-muted">
                {siteConfig.socials.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    {...(s.href.startsWith("mailto:")
                      ? {}
                      : { target: "_blank", rel: "noopener noreferrer" })}
                    className="draw-underline inline-flex min-h-[44px] items-center px-2 font-mono text-label tracking-[0.12em] uppercase md:min-h-0 md:px-0"
                  >
                    {s.label}
                  </a>
                ))}
                  {/* Plain anchor, not Link: Link prefetches its target as a
                      route, which 404s on a file like /cv.pdf. */}
                  <a
                    href={siteConfig.cvPath}
                    className="draw-underline inline-flex min-h-[44px] items-center px-2 font-mono text-label tracking-[0.12em] uppercase md:min-h-0 md:px-0"
                  >
                    CV
                  </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="shrink-0">
            <ImageSlot
              id="hero-avatar"
              priority
              framed
              sizes="(max-width: 768px) 96vw, 280px"
              className="mx-auto w-40 sm:w-56 md:w-64"
              imgClassName=""
            />
          </Reveal>
        </div>
      </Reveal>
    </section>
  );
}
