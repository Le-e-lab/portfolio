"use client";

import Link from "next/link";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import { Brand } from "@/components/ui/brand";
import { HarareClock } from "@/components/ui/harare-clock";
import { SECTIONS, siteConfig } from "@/config/site.config";
import { useActiveSection } from "@/hooks/use-active-section";
import { openCommandPalette } from "@/lib/palette";
import { cn } from "@/lib/cn";

const SECTION_IDS = SECTIONS.map((s) => s.id) as readonly string[];

export function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const active = useActiveSection(onHome ? SECTION_IDS : []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-[1120px] items-center gap-6 px-5 sm:px-8">
          <Link href="/" aria-label={`${siteConfig.fullName}, home`} className="inline-flex min-h-[44px] shrink-0 items-center text-[0.9375rem] md:min-h-0">
            <Brand />
          </Link>

          {onHome && (
            <nav aria-label="Sections" className="hidden lg:block">
              <ul className="flex items-center gap-4">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`/#${s.id}`}
                      aria-current={active === s.id ? "true" : undefined}
                      className={cn(
                        "nav-tick group inline-flex min-h-[44px] items-center gap-1.5 font-mono text-label tracking-[0.12em] whitespace-nowrap uppercase transition-colors duration-200",
                        active === s.id ? "text-ink" : "text-muted hover:text-ink",
                      )}
                    >
                      <span
                        className={cn(
                          "tabular transition-colors duration-200",
                          active === s.id ? "text-accent" : "text-dim group-hover:text-accent",
                        )}
                      >
                        {s.index}
                      </span>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="ml-auto flex items-center gap-2">
            <p className="mr-2 hidden items-center gap-2 font-mono text-label tracking-[0.12em] text-muted uppercase xl:flex">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
              Harare <HarareClock className="text-ink" />
            </p>

            <button
              type="button"
              onClick={() => openCommandPalette()}
              className="press hidden min-h-[44px] cursor-pointer items-center gap-2 border border-line px-2.5 font-mono text-label-sm tracking-[0.12em] text-muted uppercase transition-colors duration-200 hover:border-muted hover:text-ink lg:inline-flex"
            >
              <span className="sr-only">Open command palette</span>
              <kbd className="text-ink">Ctrl</kbd>
              <span aria-hidden="true" className="text-dim">
                +
              </span>
              <kbd className="text-ink">K</kbd>
            </button>

            <a
              href={`mailto:${siteConfig.email}`}
              className="press inline-flex min-h-[44px] items-center border border-accent bg-accent px-3 font-mono text-label tracking-[0.12em] text-bg uppercase transition-opacity duration-200 hover:opacity-85"
            >
              Contact
            </a>
          </div>
        </div>
      </header>

      <MobileDock onHome={onHome} active={active} />
    </>
  );
}

/**
 * Mobile navigation lives at the bottom, where the thumb is. The dock names
 * the section you are in and fills with scroll progress; the menu opens a
 * native <dialog>, which brings focus trapping and Escape for free.
 */
function MobileDock({ onHome, active }: { onHome: boolean; active: string | null }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const current = SECTIONS.find((s) => s.id === active);
  const close = () => dialog.current?.close();

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-bg/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm lg:hidden">
        <div aria-hidden="true" className="absolute inset-x-0 -top-px h-px origin-left bg-accent" style={{ transform: "scaleX(var(--lap, 0))" }} />
        <div className="flex h-14 items-center gap-3 px-5 sm:px-8">
          <p aria-live="polite" className="min-w-0 flex-1 truncate font-mono text-label tracking-[0.12em] uppercase">
            {current ? (
              <>
                <span className="text-accent tabular">{current.index}</span>
                <span className="text-dim"> / </span>
                <span className="text-ink">{current.label}</span>
              </>
            ) : (
              <span className="text-muted">
                Harare <HarareClock className="text-ink" />
              </span>
            )}
          </p>
          <button
            type="button"
            onClick={() => openCommandPalette()}
            className="press inline-flex min-h-[44px] cursor-pointer items-center px-2 font-mono text-label tracking-[0.12em] text-muted uppercase transition-colors duration-200 hover:text-ink"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => dialog.current?.showModal()}
            aria-haspopup="dialog"
            className="press inline-flex min-h-[44px] cursor-pointer items-center gap-2 border border-line px-3 font-mono text-label tracking-[0.12em] text-ink uppercase"
          >
            <span aria-hidden="true" className="flex flex-col gap-[3px]">
              <span className="block h-px w-3.5 bg-current" />
              <span className="block h-px w-2.5 bg-current" />
            </span>
            Menu
          </button>
        </div>
      </div>

      <dialog
        ref={dialog}
        aria-label="Site menu"
        onClick={(e) => e.target === e.currentTarget && close()}
        className="sheet fixed inset-x-0 top-auto bottom-0 m-0 max-h-[88dvh] w-full max-w-none border-t border-line bg-bg p-0 text-ink lg:hidden"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-2">
          <span className="font-mono text-label tracking-[0.14em] text-muted uppercase">
            Seven sections, one lap
          </span>
          <button
            type="button"
            onClick={close}
            className="press inline-flex min-h-[44px] cursor-pointer items-center font-mono text-label tracking-[0.12em] text-muted uppercase hover:text-ink"
          >
            Close
          </button>
        </div>
        <nav aria-label="Sections">
          <ol className="px-5">
            {SECTIONS.map((s) => (
              <li key={s.id} className="border-b border-line">
                <a
                  href={onHome ? `#${s.id}` : `/#${s.id}`}
                  onClick={close}
                  aria-current={active === s.id ? "true" : undefined}
                  className="flex min-h-[56px] items-baseline gap-4 py-3"
                >
                  <span className="font-mono text-label text-accent tabular">{s.index}</span>
                  <span
                    className={cn(
                      "font-display text-[1.75rem] leading-none tracking-[-0.03em]",
                      active === s.id ? "text-ink" : "text-muted",
                    )}
                  >
                    {s.label}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="flex flex-wrap gap-x-6 px-5 pt-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] font-mono text-label tracking-[0.12em] text-muted uppercase">
          {siteConfig.socials.map((s) => (
            <a key={s.href} href={s.href} className="inline-flex min-h-[44px] items-center hover:text-ink">
              {s.label}
            </a>
          ))}
          <a href={siteConfig.cvPath} className="inline-flex min-h-[44px] items-center hover:text-ink">
            CV
          </a>
        </div>
      </dialog>
    </>
  );
}
