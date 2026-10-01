import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/motion-primitives";
import { ImageSlot } from "@/components/ui/image-slot";
import { ABOUT } from "@/lib/sections.data";
import { siteConfig } from "@/config/site.config";

/**
 * Section 8 beat 6. Text first, figures along the right rail with mono
 * captions — the figures are owner-supplied, so four of the five are dashed
 * placeholder frames until the photos land.
 */
export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-y border-line bg-surface py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
        <Reveal>
          <SectionLabel index="05" label="About" />
        </Reveal>

        <div className="mt-8 grid gap-10 sm:mt-10 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div className="space-y-5 sm:space-y-6">
            <Reveal delay={0.05}>
              <p className="max-w-[40ch] text-[1.35rem] leading-[1.3] tracking-[-0.02em] text-ink sm:text-[1.75rem]">
                {ABOUT.lead}
              </p>
            </Reveal>

            {ABOUT.body.map((paragraph, i) => (
              <Reveal key={paragraph} delay={0.06 + i * 0.05}>
                <p className="max-w-[62ch] text-[0.95rem] leading-[1.75] text-muted">
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <dl className="grid gap-px border border-line bg-line sm:grid-cols-2">
                {ABOUT.facts.map((fact) => (
                  <div key={fact.label} className="bg-surface px-4 py-3 sm:py-4">
                    <dt className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                      {fact.label}
                    </dt>
                    <dd className="mt-1.5 text-sm text-ink">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="max-w-[58ch] text-[0.95rem] leading-[1.75] text-muted">
                [[FILL]] Anything the resume does not say and you want on the
                record — what you are aiming at after 2028, whether you are
                looking for work or taking contract work, and anything a reader
                should know before they email.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              <Figure id="about-headshot" className="col-span-2" />
              <Figure id="about-workspace" className="col-span-2" />
              <Figure id="about-gym" />
              <Figure id="about-candid" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <p className="mt-12 border-t border-line pt-6 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
            {siteConfig.timezoneLabel} — {siteConfig.availability}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Figure({ id, className }: { id: string; className?: string }) {
  return (
    <figure className={className}>
      <ImageSlot
        id={id}
        sizes="(max-width: 1024px) 50vw, 320px"
        className="w-full"
      />
      <figcaption className="mt-2 font-mono text-[11px] tracking-[0.1em] text-muted uppercase">
        {FIGURE_CAPTIONS[id]}
      </figcaption>
    </figure>
  );
}

/**
 * ImageSlot renders its own dashed frame until the file lands, so captions
 * stay visible and the section reads as intentionally incomplete rather than
 * broken. Both are [[FILL]] in the manifest until the owner supplies alt text.
 */
const FIGURE_CAPTIONS: Record<string, string> = {
  "about-headshot": "Fig. 01: [[FILL]]",
  "about-workspace": "Fig. 02: [[FILL]]",
  "about-gym": "Fig. 03: [[FILL]]",
  "about-candid": "Fig. 04: [[FILL]]",
};
