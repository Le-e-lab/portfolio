"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "motion/react";
import { SectionLabel } from "@/components/ui/section-label";
import { heatLevel } from "@/lib/heat";
import type { ActivityData } from "@/lib/github";
import { cn } from "@/lib/cn";

/**
 * Section 8 beat 3. The contribution calendar scrubs with the lap rail.
 *
 * The rail writes --lap-progress on :root and nothing else, so this component
 * subscribes to a custom event it raises rather than adding a second scroll
 * listener. One scroll handler for the page, not two.
 */
export function ActivitySection(props: ActivityData) {
  if (!props.available) return <ActivityEmpty login={props.login} />;
  return <ActivityCalendar {...props} />;
}

function ActivityCalendar({
  login,
  through,
  totalContributions,
  activeDays,
  longestStreak,
  currentStreak,
  weeks,
}: ActivityData) {
  const reduced = useReducedMotion();
  const [playhead, setPlayhead] = useState<number | null>(null);
  const dayCount = weeks.reduce((n, w) => n + w.length, 0);

  useEffect(() => {
    const onLap = (e: Event) => {
      const { pct } = (e as CustomEvent<{ pct: number }>).detail;
      setPlayhead(Math.round((pct / 100) * dayCount));
    };
    window.addEventListener("lap:progress", onLap);
    return () => window.removeEventListener("lap:progress", onLap);
  }, [dayCount]);

  const days = useMemo(() => weeks.flat(), [weeks]);
  const max = useMemo(() => days.reduce((m, d) => Math.max(m, d.contributionCount), 0), [days]);
  const first = days[0]?.date;

  return (
    <section
      id="activity"
      aria-labelledby="activity-heading"
      className="mx-auto max-w-[1120px] scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionLabel index="02" label="Activity" />
          <h2 id="activity-heading" className="mt-3 max-w-md text-3xl sm:text-4xl">
            What I actually typed.
          </h2>
        </div>
        <p className="max-w-xs font-mono text-[11px] leading-relaxed tracking-[0.06em] text-muted uppercase md:pb-1 md:text-right">
          Twelve months of commits, read from GitHub at build time.
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
        <Stat term="Contributions" value={totalContributions.toLocaleString("en-GB")} />
        <Stat term="Days active" value={activeDays.toLocaleString("en-GB")} />
        <Stat term="Longest streak" value={`${longestStreak}d`} />
        <Stat term="Current streak" value={`${currentStreak}d`} accent={currentStreak > 0} />
      </dl>

      <p className="mb-3 font-mono text-[10px] tracking-[0.14em] text-muted uppercase md:hidden">
        Scroll to see the full year
      </p>

      <div className="activity-scroll mt-8 overflow-x-auto pb-2">
        {/* One clip on the wrapper, not 371 animations. The calendar wipes in
            from the left as the lap advances, which is what "scrubbed playback"
            means; doing it per-cell cost 371 Motion components to get a worse
            result. reduced motion gets no wipe at all. */}
        <div
          className="inline-flex min-w-max gap-[3px] pr-6 md:pr-0"
          style={
            reduced || playhead === null
              ? undefined
              : { clipPath: `inset(0 ${100 - (playhead / dayCount) * 100}% 0 0)` }
          }
          aria-hidden="true"
        >
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day) => (
                <span
                  key={day.date}
                  title={`${day.contributionCount} contributions on ${day.date}`}
                  className="h-[11px] w-[11px] border border-line"
                  style={{ backgroundColor: `var(--heat-${heatLevel(day.contributionCount, max)})` }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* The calendar is decorative once the counts are in the stat row above. */}
      <p className="sr-only">
        Contribution calendar covering {first} to {through}.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
          {monthRange(first, through)}
        </p>
        <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <span
              key={l}
              aria-hidden="true"
              className="h-[11px] w-[11px] border border-line"
              style={{ backgroundColor: `var(--heat-${l})` }}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      <p className="mt-8 max-w-md font-mono text-[11px] leading-relaxed tracking-[0.06em] text-muted">
        <a
          href={`https://github.com/${login}`}
          target="_blank"
          rel="noopener noreferrer"
          className="draw-underline text-ink"
        >
          github.com/{login}
        </a>{" "}
        Commit messages stay private. The counts do not.
      </p>
    </section>
  );
}

function Stat({
  term,
  value,
  accent,
}: {
  term: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="min-h-[112px] bg-bg p-4 sm:p-5">
      {/* nowrap matters: "Longest streak" wrapped to two lines at 360px and
          pushed that tile's number off the shared baseline. */}
      <dt className="whitespace-nowrap font-mono text-[11px] leading-4 tracking-[0.12em] text-muted uppercase">
        {term}
      </dt>
      <dd className={cn("mt-2 text-3xl tabular", accent ? "text-accent" : "text-ink")}>
        {value}
      </dd>
    </div>
  );
}

function ActivityEmpty({ login }: { login: string }) {
  return (
    <section
      id="activity"
      aria-labelledby="activity-heading"
      className="mx-auto max-w-[1120px] scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24"
    >
      <SectionLabel index="02" label="Activity" />
      <h2 id="activity-heading" className="mt-3 max-w-md text-3xl sm:text-4xl">
        What I actually typed.
      </h2>

      <div
        className="mt-8 flex flex-col items-center justify-center gap-3 border border-dashed border-line bg-surface p-10 text-center"
        role="status"
      >
        <span className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
          Activity / contribution calendar
        </span>
        <p className="max-w-md font-mono text-[11px] leading-relaxed tracking-[0.06em] text-muted">
          The calendar fills in once the build machine has{" "}
          <code className="border border-line bg-surface-2 px-1.5 py-0.5 text-ink">
            GITHUB_TOKEN
          </code>{" "}
          set. It is deliberately empty rather than showing sample numbers.
        </p>
        <a
          href={`https://github.com/${login}`}
          target="_blank"
          rel="noopener noreferrer"
          className="draw-underline mt-1 font-mono text-[11px] tracking-[0.12em] text-ink uppercase"
        >
          github.com/{login}
        </a>
      </div>
    </section>
  );
}

/** "Mar 2025 to Feb 2026" without pulling in a date library. */
function monthRange(first: string | undefined, last: string | null) {
  if (!first || !last) return "";
  const fmt = (iso: string) => {
    const d = new Date(`${iso}T00:00:00Z`);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });
  };
  return `${fmt(first)} to ${fmt(last)}`;
}
