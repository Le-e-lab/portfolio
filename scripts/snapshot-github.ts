import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
const SNAPSHOT = path.join(DATA_DIR, "github-snapshot.json");

/** Kept in sync with siteConfig.githubUsername by hand; the script runs in tsx
 *  without the "@/" alias, and one string is not worth a build-time import. */
const LOGIN = "Le-e-lab";

type Calendar = {
  totalContributions: number;
  weeks: { contributionDays: { date: string; contributionCount: number; weekday: number }[] }[];
};

function write(payload: unknown) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(SNAPSHOT, `${JSON.stringify(payload, null, 2)}\n`);
}

function readExisting(): { weeks: unknown[] } | null {
  try {
    const parsed = JSON.parse(fs.readFileSync(SNAPSHOT, "utf8"));
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * A missing token must never destroy a snapshot that a previous build already
 * fetched. Writing an empty payload here would mean the Activity section blanks
 * itself out on any machine without a token, which is the common case for a
 * fresh clone.
 */
function ensureEmptySnapshot(reason: string) {
  const existing = readExisting();
  if (existing && Array.isArray(existing.weeks) && existing.weeks.length > 0) {
    console.warn(`[snapshot] ${reason}. Keeping the existing snapshot (${existing.weeks.length} weeks).`);
    return;
  }
  // An empty snapshot is already correct. Rewriting it would only churn
  // fetchedAt on every build and produce a dirty file for no reason.
  if (existing) {
    console.warn(`[snapshot] ${reason}. The Activity section shows its empty state.`);
    return;
  }
  write({ fetchedAt: new Date().toISOString(), login: LOGIN, totalContributions: 0, weeks: [] });
  console.warn(`[snapshot] ${reason}. Wrote an empty snapshot — the Activity section will show its empty state.`);
}

async function main() {
  if (!process.env.GITHUB_TOKEN) {
    ensureEmptySnapshot("GITHUB_TOKEN is not set");
    return;
  }

  const from = new Date();
  from.setFullYear(from.getFullYear() - 1);

  const query = `query($login:String!, $from:DateTime!){
    user(login:$login){
      contributionsCollection(from:$from){
        contributionCalendar{
          totalContributions
          weeks{ contributionDays{ date contributionCount weekday } }
        }
      }
    }
  }`;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables: { login: LOGIN, from: from.toISOString() },
      }),
    });

    if (!res.ok) throw new Error(`GraphQL responded ${res.status}`);
    const body = (await res.json()) as {
      data?: { user?: { contributionsCollection?: { contributionCalendar?: Calendar } } };
      errors?: { message: string }[];
    };
    if (body.errors?.length) throw new Error(body.errors.map((e) => e.message).join("; "));

    const calendar = body.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar?.weeks?.length) throw new Error("no contribution weeks returned");

    const total = calendar.weeks
      .flatMap((w) => w.contributionDays)
      .reduce((sum, d) => sum + d.contributionCount, 0);

    write({ fetchedAt: new Date().toISOString(), login: LOGIN, totalContributions: total, weeks: calendar.weeks });
    console.log(`[snapshot] wrote ${total} contributions across ${calendar.weeks.length} weeks`);
  } catch (err) {
    // A rate limit or an outage must not fail the build either. Keep the data we
    // already have and say so out loud rather than silently degrading.
    console.error(`[snapshot] fetch failed: ${(err as Error).message}`);
    ensureEmptySnapshot("fetch failed");
  }
}

void main();
