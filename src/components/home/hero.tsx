"use client";

import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { MaskedWords, Reveal } from "@/components/ui/motion-primitives";
import { IdCard } from "@/components/home/id-card";
import { siteConfig } from "@/config/site.config";

export function Hero() {
  return (
    <section
      id="hero"
      className="mx-auto max-w-[1120px] overflow-x-clip px-5 pt-24 pb-8 sm:px-8 sm:pt-32 sm:pb-16"
    >
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_300px] lg:gap-16">
        <div className="hero-drift max-w-2xl space-y-6 lg:pt-16">
          <Reveal delay={0.05}>
            <h1 className="text-[clamp(3.25rem,13vw,6rem)] leading-[0.95] tracking-[-0.045em]">
              <MaskedWords text={siteConfig.fullName} />
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="max-w-[34ch] text-[1.15rem] leading-[1.45] text-muted sm:text-[1.3rem]">
              <span className="text-ink">{siteConfig.role}</span>{" "}
              {siteConfig.tagline}
            </p>
          </Reveal>

          {/* The card on mobile carries the same facts, so the long bio waits
              for the room desktop has. */}
          <Reveal delay={0.25} className="hidden sm:block">
            <p className="max-w-[58ch] text-sm leading-[1.7] text-muted">
              {siteConfig.humanLine}
            </p>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
              <a
                href="#work"
                className="press inline-flex min-h-[48px] items-center justify-center border border-accent bg-accent px-5 font-mono text-label tracking-[0.12em] text-bg uppercase transition-opacity duration-200 hover:opacity-85"
              >
                See work
              </a>
              <CopyEmailButton variant="outline" className="justify-center" />
            </div>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="-mx-2 flex flex-wrap items-center gap-x-4 text-muted md:mx-0 md:gap-x-6">
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

        {/* Card first on mobile; on both sizes its strap runs up behind the
            header. */}
        <div className="hero-lag relative order-first pt-6 lg:order-none lg:pt-12">
          <IdCard className="mx-auto w-[min(250px,72vw)] lg:w-full" />
        </div>
      </div>
    </section>
  );
}
