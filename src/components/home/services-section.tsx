import Link from "next/link";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/motion-primitives";
import { siteConfig } from "@/config/site.config";
import { SERVICES } from "@/lib/sections.data";

/**
 * Section 8 beat 4. Services as a numbered ledger rather than cards — the
 * point is that these are things someone has actually done, so each row
 * carries its provenance.
 */
export function ServicesSection() {
  return (
    <section
      id="services"
      className="mx-auto max-w-[1120px] scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24"
    >
      <Reveal>
        <SectionLabel index="03" label="Services" />
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="mt-6 max-w-[34ch] text-[1.5rem] leading-[1.25] tracking-[-0.02em] text-ink sm:text-[2rem]">
          {siteConfig.designLine}
        </h2>
      </Reveal>

      <ul className="mt-12 border-t border-line">
        {SERVICES.map((service, i) => (
          <li key={service.id} className="border-b border-line">
            <Reveal delay={0.04 * i}>
              <div className="grid gap-3 py-7 sm:grid-cols-[3rem_1fr] sm:gap-6 sm:py-8">
                <span className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase tabular">
                  {service.index}
                </span>

                <div className="space-y-3">
                  <h3 className="max-w-[26ch] text-[1.25rem] leading-[1.25] tracking-[-0.02em] sm:text-[1.4rem]">
                    {service.title}
                  </h3>
                  <p className="max-w-[62ch] text-sm leading-[1.7] text-muted sm:text-[0.95rem]">
                    {service.body}
                  </p>
                  <p className="font-mono text-[11px] leading-[1.6] tracking-[0.08em] text-muted uppercase">
                    {service.evidence}
                  </p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal delay={0.1}>
        <p className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
          <span>Currently</span>
          <Link
            href="#contact"
            className="draw-underline text-ink"
          >
            {siteConfig.availability.toLowerCase()}
          </Link>
          <span aria-hidden="true">.</span>
        </p>
      </Reveal>
    </section>
  );
}
