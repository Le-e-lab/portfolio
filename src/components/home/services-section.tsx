import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import auFlyer from "@/assets/images/design/africa-university-flyer.webp";
import gdgWelcome from "@/assets/images/design/gdg-3.webp";
import gdgJoin from "@/assets/images/design/join-93-8.webp";
import goldenLogo from "@/assets/images/design/logo-93-8.webp";
import goldenFlyer from "@/assets/images/design/gold-brand.webp";
import hubLogo from "@/assets/images/design/studio-2.webp";
import labLogo from "@/assets/images/design/studio-logo.webp";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal, ScrollWords } from "@/components/ui/motion-primitives";
import { siteConfig } from "@/config/site.config";
import { SERVICES } from "@/lib/sections.data";

/**
 * Services as a numbered ledger rather than cards — the
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
          <ScrollWords text={siteConfig.designLine} />
        </h2>
      </Reveal>

      <ul className="mt-12 border-t border-line">
        {SERVICES.map((service, i) => (
          <li key={service.id} className="border-b border-line">
            <Reveal delay={0.04 * i}>
              <div className="grid gap-3 py-7 sm:grid-cols-[3rem_1fr] sm:gap-6 sm:py-8">
                <span className="font-mono text-label tracking-[0.14em] text-accent uppercase tabular">
                  {service.index}
                </span>

                <div className="space-y-3">
                  <h3 className="max-w-[26ch] text-[1.25rem] leading-[1.25] tracking-[-0.02em] sm:text-[1.4rem]">
                    {service.title}
                  </h3>
                  <p className="max-w-[62ch] text-sm leading-[1.7] text-muted sm:text-[0.95rem]">
                    {service.body}
                  </p>
                  <p className="font-mono text-label leading-[1.6] tracking-[0.08em] text-muted uppercase">
                    {service.evidence}
                  </p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>

      <div className="mt-14">
        <Reveal>
          <p className="font-mono text-label tracking-[0.14em] text-muted uppercase">
            Design work
          </p>
        </Reveal>
        {/* Columns, not a grid: flyers are tall and logos square, so each
            piece keeps its own shape instead of being cropped to a cell. */}
        <div className="mt-5 columns-2 gap-4 sm:columns-3 lg:columns-4">
          {DESIGN.map((piece) => (
            <Reveal key={piece.title} className="mb-4 break-inside-avoid">
              <figure>
                <a
                  href={piece.src.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden border border-line"
                >
                  <Image
                    src={piece.src}
                    alt={piece.alt}
                    sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 260px"
                    className="h-auto w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                </a>
                <figcaption className="mt-2 font-mono text-label tracking-[0.1em] text-muted uppercase">
                  {piece.title}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>

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

const DESIGN: { title: string; alt: string; src: StaticImageData }[] = [
  {
    title: "93.8 FM competition flyer",
    alt: "Flyer for Africa University's 93.8 FM Design the Sound competition",
    src: auFlyer,
  },
  {
    title: "Golden Pieces logo",
    alt: "Golden Pieces Investments logo in black and gold",
    src: goldenLogo,
  },
  {
    title: "GDG welcome flyer",
    alt: "Google Developers Group Africa University flyer: New semester, new build",
    src: gdgWelcome,
  },
  {
    title: "The Hub logo",
    alt: "The Hub logo with a microphone mark",
    src: hubLogo,
  },
  {
    title: "Golden Pieces flyer",
    alt: "Golden Pieces Investments flyer listing stationery, printing, binding and laminating",
    src: goldenFlyer,
  },
  {
    title: "LAB logo",
    alt: "LAB logo, white on black",
    src: labLogo,
  },
  {
    title: "GDG recruitment flyer",
    alt: "Google Developers Group Africa University flyer: Why join us",
    src: gdgJoin,
  },
];
