import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
const SNAPSHOT = path.join(DATA_DIR, "github-snapshot.json");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function graphql<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  if (!GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN is missing");
  }
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`GraphQL ${res.status}`);
  const body = (await res.json()) as any;
  if (body.errors) throw new Error(JSON.stringify(body.errors));
  return body.data as T;
}

function writeEmptySnapshot(login: string) {
  const payload = {
    fetchedAt: new Date().toISOString(),
    login,
    totalContributions: 0,
    weeks: [],
  };
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(SNAPSHOT, JSON.stringify(payload, null, 2));
  console.warn("GITHUB_TOKEN missing — wrote empty snapshot", SNAPSHOT);
}

async function main() {
  const login = "Le-e-lab";
  if (!login) throw new Error("githubUsername missing");

  // Last 12 months
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  from.setFullYear(from.getFullYear() - 1);

  const q = `query($login:String!, $from:DateTime!){
    user(login:$login){
      contributionsCollection(from:$from, to: null){
        contributionCalendar{ totalContributions weeks{ contributionDays{ date contributionCount weekday } } }
      }
    }
  }`;

  try {
    const data = await graphql<any>(q, { login, from: from.toISOString() });
    const calendar = data.user?.contributionsCollection?.contributionCalendar;
    const payload = {
      fetchedAt: new Date().toISOString(),
      login,
      totalContributions: calendar?.totalContributions ?? 0,
      weeks: calendar?.weeks ?? [],
    };
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(SNAPSHOT, JSON.stringify(payload, null, 2));
    console.log(`wrote ${SNAPSHOT}`);
  } catch (e: any) {
    if (e?.message === "GITHUB_TOKEN is missing" || e instanceof Error && e.message.includes("GITHUB_TOKEN")) {
      writeEmptySnapshot(login);
      return;
    }
    console.error("snapshot:github failed, will reuse existing snapshot if present:", e);
    if (!fs.existsSync(SNAPSHOT)) {
      writeEmptySnapshot(login);
      return;
    }
    console.log("reusing existing", SNAPSHOT);
  }
}

main();