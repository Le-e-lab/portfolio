"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand } from "@/components/ui/brand";
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center gap-6 px-5 sm:px-8">
        <Link href="/" aria-label={`${siteConfig.fullName}, home`} className="inline-flex min-h-[44px] shrink-0 items-center text-[0.9375rem] md:min-h-0">
          <Brand />
        </Link>

        {onHome && (
          <nav aria-label="Sections" className="hidden lg:block">
            <ul className="flex items-center gap-5">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`/#${s.id}`}
                    aria-current={active === s.id ? "true" : undefined}
                    className={cn(
                      "inline-flex min-h-[44px] items-center font-mono text-label tracking-[0.12em] whitespace-nowrap uppercase transition-colors duration-200",
                      active === s.id ? "text-ink" : "text-muted hover:text-ink",
                    )}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => openCommandPalette()}
            className="press hidden min-h-[44px] cursor-pointer items-center gap-2 border border-line px-2.5 font-mono text-label-sm tracking-[0.12em] text-muted uppercase transition-colors duration-200 hover:border-muted hover:text-ink sm:inline-flex"
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

          <MobileNav onHome={onHome} />
        </div>
      </div>
    </header>
  );
}

function MobileNav({ onHome }: { onHome: boolean }) {
  return (
    <>
      {/* Anchor jump is all mobile needs; no drawer required for 7 sections. */}
      <details className="lg:hidden">
        <summary
          className="press inline-flex min-h-[44px] cursor-pointer list-none items-center border border-line px-2.5 font-mono text-label-sm tracking-[0.12em] text-muted uppercase transition-colors duration-200 hover:text-ink [&::-webkit-details-marker]:hidden"
          aria-label="Open section menu"
        >
          Menu
        </summary>
        <nav
          aria-label="Sections"
          className="absolute inset-x-0 top-16 border-b border-line bg-bg"
        >
          <ul className="mx-auto flex max-w-[1120px] flex-col px-5 py-2 sm:px-8">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={onHome ? `#${s.id}` : `/#${s.id}`}
                  className="flex min-h-[44px] items-baseline gap-3 border-b border-line/60 py-3 font-mono text-[0.75rem] tracking-[0.1em] uppercase last:border-0"
                >
                  <span className="text-accent tabular">{s.index}</span>
                  <span className="text-muted">{s.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </details>
    </>
  );
}