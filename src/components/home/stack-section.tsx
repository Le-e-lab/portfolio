import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/motion-primitives";
import { STACK_GROUPS } from "@/lib/sections.data";

/**
 * Grouped by what a technology is FOR. A logo wall of
 * thirty icons would say nothing; "these are the rails I run payment flows
 * on" is a claim you can check.
 */
export function StackSection() {
  return (
    <section
      id="stack"
      className="mx-auto max-w-[1120px] scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24"
    >
      <Reveal>
        <SectionLabel index="04" label="Stack" />
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="mt-6 max-w-[24ch] text-[1.5rem] leading-[1.25] tracking-[-0.02em] text-ink sm:text-[2rem]">
          Grouped by what they are for, not by how good they look.
        </h2>
      </Reveal>

      <dl className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {STACK_GROUPS.map((group, i) => (
          /* dl > div > (dt, dd) is valid. dl > div > div > dt is not, so the
             Reveal wrapper IS the cell — no second div. */
          <Reveal key={group.id} delay={0.04 * i} className="bg-bg p-5 sm:p-6">
            <dt className="font-mono text-[11px] tracking-[0.16em] text-ink uppercase">
              {group.label}
            </dt>
            <dd className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="border border-line bg-surface px-2 py-1 font-mono text-[11px] tracking-[0.02em] text-muted"
                >
                  {item}
                </span>
              ))}
            </dd>
          </Reveal>
        ))}

        <Reveal delay={0.2} className="bg-surface p-5 sm:p-6">
          <dt className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
            [[FILL]]
          </dt>
          <dd className="mt-4 text-sm leading-[1.7] text-muted">
            Anything you want added or removed from this list. Right now it
            mirrors the resume.
          </dd>
        </Reveal>
      </dl>
    </section>
  );
}
