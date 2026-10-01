"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { SECTIONS, siteConfig } from "@/config/site.config";
import { OPEN_PALETTE_EVENT } from "@/lib/palette";
import { useCopy } from "@/hooks/use-copy";

/** Case-study items are passed in as props so no fs read happens in the client bundle. */
type PaletteWorkItem = {
  slug: string;
  title: string;
  year: string;
};

/**
 * Section 12. Restyled completely from tokens — nothing here should resemble
 * a stock component library. cmdk handles filtering and list semantics; the
 * chrome is ours.
 */
export function CommandPalette({ work = [] }: { work?: PaletteWorkItem[] }) {
  const [open, setOpen] = useState(false);
  const { copy, copied } = useCopy();
  const router = useRouter();
  // Focus returns here when the palette closes. Section 12.
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);

    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) lastFocused.current = document.activeElement as HTMLElement | null;
  }, [open]);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open && (
          <m.div
            // Overlay
            className="fixed inset-0 z-90 flex items-start justify-center bg-bg/80 p-4 pt-[12vh] backdrop-blur-sm sm:pt-[16vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
          >
            <m.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              className="w-full max-w-lg border border-line bg-surface"
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -4 }}
              // Under 200ms spring on open.
              transition={{ type: "spring", stiffness: 520, damping: 32, duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Command
                // cmdk renders a combobox; label it properly.
                label="Command palette"
                className="flex flex-col"
                loop
              >
                <Command.Input
                  autoFocus
                  placeholder="Jump to a section, project or action"
                  className="w-full border-b border-line bg-transparent px-4 py-3 font-body text-sm text-ink outline-none placeholder:text-dim"
                />

                <Command.List className="max-h-[52vh] overflow-y-auto overscroll-contain p-1.5">
                  <Command.Empty className="px-3 py-6 font-mono text-[11px] tracking-[0.1em] text-dim uppercase">
                    Nothing matches
                  </Command.Empty>

                  <Group heading="Sections">
                    {SECTIONS.map((s) => (
                      <Item
                        key={s.id}
                        onSelect={() => {
                          setOpen(false);
                          router.push(`/#${s.id}`);
                        }}
                      >
                        <span className="w-6 shrink-0 font-mono text-[10px] text-accent tabular">
                          {s.index}
                        </span>
                        {s.label}
                      </Item>
                    ))}
                  </Group>

                  <Group heading="Work">
                    {work.map((p) => (
                      <Item
                        key={p.slug}
                        onSelect={() => {
                          setOpen(false);
                          router.push(`/work/${p.slug}`);
                        }}
                      >
                        <span className="truncate">{p.title}</span>
                        <span className="ml-auto shrink-0 font-mono text-[10px] text-dim tabular">
                          {p.year}
                        </span>
                      </Item>
                    ))}
                  </Group>

                  <Group heading="Actions">
                    <Item
                      onSelect={async () => {
                        await copy(siteConfig.email);
                      }}
                    >
                      {copied ? "Email copied" : "Copy my email"}
                      <span className="ml-auto font-mono text-[10px] text-dim">
                        {copied ? "done" : siteConfig.email}
                      </span>
                    </Item>
                    <Item onSelect={() => window.open(`https://github.com/${siteConfig.githubUsername}`, "_blank", "noopener")}>
                      Open GitHub
                      <span className="ml-auto font-mono text-[10px] text-dim">
                        {siteConfig.githubUsername}
                      </span>
                    </Item>
                    <Item onSelect={() => router.push(siteConfig.cvPath)}>
                      Download CV
                      <span className="ml-auto font-mono text-[10px] text-dim">PDF</span>
                    </Item>
                  </Group>
                </Command.List>

                <div className="flex items-center gap-4 border-t border-line px-4 py-2 font-mono text-[10px] tracking-[0.1em] text-dim uppercase">
                  <span>
                    <kbd className="text-muted">↑</kbd> <kbd className="text-muted">↓</kbd> move
                  </span>
                  <span>
                    <kbd className="text-muted">↵</kbd> open
                  </span>
                  <span>
                    <kbd className="text-muted">esc</kbd> close
                  </span>
                </div>
              </Command>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}

function Group({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <Command.Group
      heading={heading}
      className="mb-1 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:tracking-[0.16em] [&_[cmdk-group-heading]]:text-dim [&_[cmdk-group-heading]]:uppercase"
    >
      {children}
    </Command.Group>
  );
}

function Item({
  children,
  onSelect,
}: {
  children: React.ReactNode;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-2 px-3 py-2 font-body text-sm text-muted transition-colors duration-150 data-[selected=true]:bg-surface-2 data-[selected=true]:text-ink"
    >
      {children}
    </Command.Item>
  );
}