import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/motion-primitives";
import { ImageSlot } from "@/components/ui/image-slot";
import { OFF_THE_CLOCK } from "@/lib/sections.data";
import { cn } from "@/lib/cn";

/**
 * The human end of the site. Calisthenics is real and comes
 * from the resume because it explains GyMPal; the rest are [[FILL]] because
 * the resume says nothing and guessing would be dishonest.
 */
export function OffTheClock() {
  return (
    <section
      id="off-the-clock"
      className="mx-auto max-w-[1120px] scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24"
    >
      <Reveal>
        <SectionLabel index="06" label="Off the clock" />
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="mt-6 max-w-[28ch] text-[1.5rem] leading-[1.25] tracking-[-0.02em] text-ink sm:text-[2rem]">
          Five things that have nothing to do with the work.
        </h2>
      </Reveal>

      <div className="mt-12 space-y-px border-b border-line">
        {OFF_THE_CLOCK.map((block, i) => (
          <Reveal key={block.id} delay={0.05 * i}>
            <div className="grid gap-x-2 gap-y-3 border-t border-line py-6 sm:grid-cols-[4rem_14rem_1fr] sm:gap-6 sm:py-7">
              <span className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase tabular">
                {block.index}
              </span>

              <h3 className="text-[1.15rem] leading-[1.25] tracking-[-0.015em]">
                {block.label}
              </h3>

              <div className="space-y-4">
                <p className="max-w-[58ch] text-[0.95rem] leading-[1.75] text-muted">
                  {block.body}
                </p>

                {block.slots.length > 0 && (
                  <div
                    className={cn(
                      "grid gap-4",
                      block.slots.length > 2
                        ? "grid-cols-2 sm:grid-cols-4"
                        : block.slots.length === 1
                          ? "grid-cols-1 max-w-[320px]"
                          : "grid-cols-2",
                    )}
                  >
                    {block.slots.map((id) => (
                      <ImageSlot
                        key={id}
                        id={id}
                        sizes="(max-width: 640px) 50vw, 200px"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
