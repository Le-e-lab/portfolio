"use client";

import Link from "next/link";
import { ImageSlot } from "@/components/ui/image-slot";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { MaskedWords, Reveal, MotionProvider } from "@/components/ui/motion-primitives";
import { siteConfig } from "@/config/site.config";

export function Hero() {
  return (
    <MotionProvider>
      <section
        id="hero"
        className="mx-auto max-w-[1120px] px-5 pt-24 pb-12 sm:px-8 sm:pt-32 sm:pb-20"
      >
        <Reveal delay={0}>
          <div className="flex flex-wrap items-center justify-between gap-8 sm:gap-10">
            <div className="max-w-2xl space-y-6">
              <Reveal delay={0}>
                <span className="inline-flex items-center gap-2 border border-line bg-surface px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase">
                  <span className="h-2 w-2 rounded-full bg-status" />
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
                <p className="max-w-lg text-sm text-muted">{siteConfig.humanLine}</p>
              </Reveal>

              <Reveal delay={0.35}>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="#work"
                    className="press border border-accent bg-accent px-5 py-2.5 font-mono text-[11px] tracking-[0.12em] text-bg uppercase transition-opacity duration-200 hover:opacity-85"
                  >
                    See work
                  </a>
                  <CopyEmailButton variant="outline" />
                </div>
              </Reveal>

              <Reveal delay={0.45}>
                <div className="flex flex-wrap items-center gap-3 text-muted">
                  {siteConfig.socials.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      {...(s.href.startsWith("mailto:")
                        ? {}
                        : { target: "_blank", rel: "noopener noreferrer" })}
                      className="draw-underline font-mono text-[11px] tracking-[0.12em] uppercase"
                    >
                      {s.label}
                    </a>
                  ))}
                  <Link
                    href={siteConfig.cvPath}
                    className="draw-underline font-mono text-[11px] tracking-[0.12em] uppercase"
                  >
                    CV
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="shrink-0">
              <ImageSlot
                id="hero-avatar"
                priority
                framed
                sizes="(max-width: 768px) 96vw, 280px"
                className="mx-auto w-40 rounded-full sm:w-56 md:w-64"
                imgClassName="rounded-full"
              />
            </Reveal>
          </div>
        </Reveal>
      </section>
    </MotionProvider>
  );
}