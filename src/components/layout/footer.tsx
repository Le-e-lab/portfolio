import Link from "next/link";
import { Brand } from "@/components/ui/brand";
import { SECTIONS, siteConfig } from "@/config/site.config";
import { CopyEmailButton } from "@/components/ui/copy-email-button";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto max-w-[1120px] px-5 py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link href="/" className="text-[15px]">
              <Brand />
            </Link>
            <p className="mt-3 max-w-xs font-body text-sm text-muted">
              {siteConfig.designLine}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
              Sections
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/#${s.id}`}
                    className="draw-underline inline-flex min-h-[44px] items-center font-body text-sm text-muted transition-colors duration-200 hover:text-ink md:min-h-0"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
              Elsewhere
            </h2>
            <ul className="mt-3 flex flex-col gap-1.5">
              {siteConfig.socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    {...(s.href.startsWith("mailto:")
                      ? {}
                      : { target: "_blank", rel: "noopener noreferrer" })}
                    className="draw-underline inline-flex min-h-[44px] items-center font-body text-sm text-muted transition-colors duration-200 hover:text-ink md:min-h-0"
                  >
                    {s.label}
                    {s.handle && (
                      <span className="ml-2 font-mono text-[11px] text-dim">{s.handle}</span>
                    )}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={siteConfig.cvPath}
                  className="draw-underline inline-flex min-h-[44px] items-center font-body text-sm text-muted transition-colors duration-200 hover:text-ink md:min-h-0"
                >
                  CV
                  <span className="ml-2 font-mono text-[11px] text-dim">PDF</span>
                </a>
              </li>
            </ul>
            <CopyEmailButton className="mt-4" />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[11px] tracking-[0.12em] text-muted uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>
            {siteConfig.location} &middot; {siteConfig.timezoneLabel}
          </p>
          <p>
            Built with Next.js, Tailwind and motion &middot; &copy; {year}{" "}
            {siteConfig.fullName}
          </p>
        </div>
      </div>
    </footer>
  );
}