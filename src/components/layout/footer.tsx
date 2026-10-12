import Link from "next/link";
import { SECTIONS, siteConfig } from "@/config/site.config";
import { HarareClock } from "@/components/ui/harare-clock";
import { WorkplaceName } from "@/components/ui/workplace";
import { WORKPLACES, type Workplace } from "@/lib/sections.data";

const colHeading = "font-mono text-label tracking-[0.16em] text-muted uppercase";
const colLink =
  "draw-underline inline-flex min-h-[44px] items-center text-sm text-muted transition-colors duration-200 hover:text-ink md:min-h-0";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    // Bottom padding clears the mobile dock.
    <footer className="overflow-hidden border-t border-line pb-16 lg:pb-0">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 lg:grid-cols-4">
          <nav aria-label="Footer">
            <h2 className={colHeading}>Sections</h2>
            <ul className="mt-3 flex flex-col md:gap-1.5">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <Link href={`/#${s.id}`} className={colLink}>
                    <span className="mr-2 font-mono text-label text-dim tabular">{s.index}</span>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={colHeading}>Worked at</h2>
            <ul className="mt-3 flex flex-col gap-3 text-sm text-muted md:gap-2">
              {Object.values<Workplace>(WORKPLACES).map((place) => (
                <li key={place.name}>
                  <WorkplaceName place={place} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={colHeading}>Elsewhere</h2>
            <ul className="mt-3 flex flex-col md:gap-1.5">
              {siteConfig.socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    {...(s.href.startsWith("mailto:")
                      ? {}
                      : { target: "_blank", rel: "noopener noreferrer" })}
                    className={colLink}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={siteConfig.cvPath} className={colLink}>
                  CV <span className="ml-2 font-mono text-label text-dim">PDF</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className={colHeading}>Local time</h2>
            <p className="mt-3 font-display text-[2rem] leading-none tracking-[-0.03em] tabular">
              <HarareClock />
            </p>
            <p className="mt-2 font-mono text-label tracking-[0.12em] text-muted uppercase">
              {siteConfig.timezoneLabel}
            </p>
          </div>
        </div>
      </div>

      {/* The name as the floor of the page. Decorative: the brand is already
          announced by the header link. */}
      <div aria-hidden="true" className="mx-auto max-w-[1120px] px-5 sm:px-8">
        <p className="pt-4 font-display text-[clamp(5rem,27vw,19rem)] leading-[0.82] font-semibold tracking-[-0.06em] text-surface-2 select-none">
          {siteConfig.name}
          <span className="text-accent">.</span>
        </p>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-4 font-mono text-label tracking-[0.12em] text-muted uppercase sm:px-8">
          <p>
            &copy; {year} {siteConfig.fullName}
          </p>
          <a href="#main" className="draw-underline inline-flex min-h-[44px] items-center">
            Back to the start ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
