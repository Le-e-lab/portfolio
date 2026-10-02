import Link from "next/link";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/ui/motion-primitives";
import { getAllWork } from "@/lib/work";

/**
 * 404. Same editorial register as the home sections rather than a stock apology
 * page: a ledger of where you can actually go next, built from the real work
 * list so it never drifts out of date. The LapRail hides itself on this route,
 * because a lap with no sectors to cross would sit frozen at 000%.
 */
export default function NotFound() {
  const work = getAllWork();

  return (
    <main className="mx-auto max-w-[1120px] px-5 pt-20 pb-16 sm:px-8 sm:pt-24 sm:pb-20">
      <Reveal>
        <SectionLabel index="404" label="Not found" />
      </Reveal>

      <Reveal delay={0.05}>
        <h1 className="mt-6 max-w-[16ch] text-[clamp(2rem,5vw,3.5rem)] leading-[1.02] tracking-[-0.02em]">
          That page is not here.
        </h1>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-6 max-w-[52ch] text-[0.95rem] leading-[1.7] text-muted">
          The address you followed does not match anything on this site. The
          work below is the shortest way back to something useful.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <ul className="mt-12 border-t border-line">
          {/* Home is a different kind of destination from a case study, so it
              gets its own row treatment instead of sitting as a peer in the
              year column. */}
          <li className="border-b border-line bg-surface">
            <Link
              href="/"
              className="group grid min-h-[72px] grid-cols-[4.5rem_1fr_auto] items-center gap-3 px-4 transition-colors duration-200 hover:bg-surface-2"
            >
              <span className="font-mono text-label tracking-[0.16em] text-accent uppercase tabular">
                Index
              </span>
              <span className="text-[1.15rem] leading-[1.3] tracking-[-0.015em] text-ink">
                Home
              </span>
              <Arrow />
            </Link>
          </li>

          {work.map((entry) => (
            <li key={entry.slug} className="border-b border-line">
              <Link
                href={`/work/${entry.slug}`}
                className="group grid min-h-[72px] grid-cols-[4.5rem_1fr_auto] items-center gap-3 px-4 transition-colors duration-200 hover:bg-surface"
              >
                <span className="font-mono text-label tracking-[0.16em] text-muted uppercase tabular">
                  {entry.year}
                </span>
                <span className="text-[1.15rem] leading-[1.3] tracking-[-0.015em]">
                  {entry.title}
                </span>
                <Arrow />
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </main>
  );
}

/** Type, not an icon set. Fades in on hover or keyboard focus. */
function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="font-mono text-label text-dim opacity-40 transition-[color,opacity] duration-200 group-hover:text-ink group-hover:opacity-100 group-focus-visible:text-ink group-focus-visible:opacity-100"
    >
      &rarr;
    </span>
  );
}
