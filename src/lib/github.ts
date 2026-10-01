import fs from "node:fs";
import path from "node:path";
import { siteConfig } from "@/config/site.config";

/**
 * Reads the commit snapshot written by scripts/snapshot-github.ts at build
 * time. The site never calls GitHub from the request path, so a rate limit or
 * an outage cannot take the Activity section down.
 *
 * When the snapshot is empty (no GITHUB_TOKEN on the build machine) the
 * section renders an honest empty state rather than fabricated numbers.
 */

const SNAPSHOT_PATH = path.join(process.cwd(), "data", "github-snapshot.json");

export type ContributionDay = {
  date: string;
  contributionCount: number;
  weekday: number;
};

export type GithubSnapshot = {
  fetchedAt: string;
  login: string;
  totalContributions: number;
  weeks: { contributionDays: ContributionDay[] }[];
};

export type ActivityData = {
  /** false when no usable snapshot exists. Drives the empty state. */
  available: boolean;
  login: string;
  /** ISO date of the newest day in the snapshot. */
  through: string | null;
  totalContributions: number;
  /** Days with at least one contribution. */
  activeDays: number;
  /** Longest run of consecutive contributing days. */
  longestStreak: number;
  /** Current run ending at the newest day, 0 if the last day was quiet. */
  currentStreak: number;
  /** Flattened, oldest first. */
  days: ContributionDay[];
  /** Days per week, in GitHub's own column order. */
  weeks: ContributionDay[][];
};

const EMPTY: ActivityData = {
  available: false,
  login: siteConfig.githubUsername,
  through: null,
  totalContributions: 0,
  activeDays: 0,
  longestStreak: 0,
  currentStreak: 0,
  days: [],
  weeks: [],
};

function readSnapshot(): GithubSnapshot | null {
  try {
    if (!fs.existsSync(SNAPSHOT_PATH)) return null;
    const raw: unknown = JSON.parse(fs.readFileSync(SNAPSHOT_PATH, "utf8"));
    if (!raw || typeof raw !== "object") return null;

    const snap = raw as Partial<GithubSnapshot>;
    if (!Array.isArray(snap.weeks) || snap.weeks.length === 0) return null;

    // Guard against a truncated write rather than trusting the shape blindly.
    const weeks = snap.weeks.filter(
      (w) => w && Array.isArray(w.contributionDays) && w.contributionDays.length > 0,
    );
    if (weeks.length === 0) return null;

    return {
      fetchedAt: String(snap.fetchedAt ?? ""),
      login: String(snap.login ?? siteConfig.githubUsername),
      totalContributions: Number(snap.totalContributions ?? 0),
      weeks,
    };
  } catch {
    return null;
  }
}

/** Longest and trailing runs of days with count > 0. */
function streaks(days: ContributionDay[]) {
  let longest = 0;
  let run = 0;
  for (const d of days) {
    run = d.contributionCount > 0 ? run + 1 : 0;
    if (run > longest) longest = run;
  }

  const last = days.at(-1);
  let current = last && last.contributionCount > 0 ? 1 : 0;
  for (let i = days.length - 2; i >= 0 && current > 0; i--) {
    if ((days[i]?.contributionCount ?? 0) > 0) current++;
    else break;
  }

  return { longest, current };
}

let cache: ActivityData | null = null;

export function getActivity(): ActivityData {
  if (cache) return cache;

  const snap = readSnapshot();
  if (!snap) {
    cache = { ...EMPTY };
    return cache;
  }

  const weeks = snap.weeks.map((w) => w.contributionDays);
  const days = weeks.flat();
  const { longest, current } = streaks(days);

  cache = {
    available: true,
    login: snap.login,
    through: days.at(-1)?.date ?? null,
    totalContributions: days.reduce((sum, d) => sum + d.contributionCount, 0),
    activeDays: days.filter((d) => d.contributionCount > 0).length,
    longestStreak: longest,
    currentStreak: current,
    days,
    weeks,
  };
  return cache;
}
