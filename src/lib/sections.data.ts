/**
 * Copy for the lower home sections. Content lives in
 * config, not in components, so it can be edited without touching layout.
 *
 * Every claim below is traceable to /public/Lesley_Mutsambiwa_Resume.docx or to
 * a shipped project in content/work/. Anything the resume does not support is
 * an explicit [[FILL]] marker. Do not resolve those by inventing detail.
 */

export type Service = {
  id: string;
  index: string;
  title: string;
  body: string;
  /** Short mono provenance tag, e.g. where the claim comes from. */
  evidence: string;
};

export const SERVICES: Service[] = [
  {
    id: "product",
    index: "01",
    title: "Product engineering, database to interface",
    body: "Full-stack builds where the schema and the screen are the same job. Auth, payments and admin surfaces included, not deferred.",
    evidence: "Resume: Lead Developer, Tarisai",
  },
  {
    id: "fintech",
    index: "02",
    title: "Fintech rails that work where the users are",
    body: "USSD, digital wallets and AI credit scoring for microloans, BNPL and financial tooling across Africa.",
    evidence: "Resume: KreditZW, Elevate Value Partners",
  },
  {
    id: "ai",
    index: "03",
    title: "AI wired into an actual workflow",
    body: "Email triage over WhatsApp, NLP over job boards, web scraping that feeds a decision. Scored and prioritised, not chat-window wrappers.",
    evidence: "Resume: AI-Powered Email and Job Automation Agent",
  },
  {
    id: "leadership",
    index: "04",
    title: "Technical leadership and mentoring",
    body: "Setting the architecture, defining team roles, and running the workshops that turn students into people who can ship.",
    evidence: "Resume: GDSC Lead, Africa University",
  },
];

/** Stack groups, by what a tool is FOR here. Not a logo wall. */
export type StackGroup = {
  id: string;
  label: string;
  items: string[];
};

export const STACK_GROUPS: StackGroup[] = [
  {
    id: "languages",
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Dart"],
  },
  {
    id: "web",
    label: "On the web",
    items: [
      "React",
      "Next.js",
      "React Native",
      "Expo",
      "Flutter",
      "Node.js",
      "REST APIs",
      "Web scraping",
    ],
  },
  {
    id: "data",
    label: "Data",
    items: ["MongoDB", "SQL", "SQLite", "Supabase", "AI / ML", "NLP"],
  },
  {
    id: "platform",
    label: "Platform",
    items: ["PWA", "Service Workers", "USSD", "Digital wallets", "Linux", "Fedora KDE"],
  },
  {
    id: "tooling",
    label: "Tooling",
    items: [
      "Git",
      "GitHub",
      "Postman",
      "Agile",
      "Vercel",
      "Playwright",
    ],
  },
];

/** About. The resume gives the career; the rest is the owner's to write. */
export const ABOUT = {
  lead: "I am a BSc Computer Science student at Africa University, the CTO and Co-Founder at Elevate Value Partners, and the lead behind Kinto Designs. Most of my work sits in the gap between a database and a person trying to use it.",
  body: [
    "I started out explaining things. Running the Google Developer Student Club at Africa University means I run the workshops, define what everyone is building, and then read the code when it does not work. That is a better way to learn a stack than tutorials, and it is why I am usually the one explaining something to someone.",
    "Before that, I was building. At Elevate Value Partners, we built KreditZW to score credit for people the banking system has historically ignored, over USSD and mobile wallets, because that is how the users actually bank. For my own workflow, my job-automation agent reads job boards, ranks what is worth applying to, and tells me on WhatsApp instead of making me check. And GyMPal is a dark-themed PWA that tracks my skipping and bodyweight routines while working completely offline.",
    "I care about the unglamorous parts. Responsive layout at 360px. Keyboard focus that survives. A build that fails loudly instead of shipping something broken. The interface is the part everyone sees, but it is the last thing I decide.",
  ],
  facts: [
    { label: "Based in", value: "Harare, Zimbabwe" },
    {
      label: "Studying",
      value: "BSc Honours Computer Science, Africa University, 2028",
    },
    { label: "Academic standing", value: "GPA 3.78, Dean's List" },
    { label: "Currently", value: "CTO & Co-Founder, Elevate Value Partners" },
    { label: "Also", value: "Lead Developer, Tarisai | Designer, Kinto Designs" },
    { label: "In the club", value: "GDSC Lead, Africa University" },
  ],
} as const;

/** Off the clock. The resume says nothing about these; all five are the owner's. */
export type ClockBlock = {
  id: string;
  index: string;
  label: string;
  body: string;
  /** Image slots to show. Empty means text-only. */
  slots: string[];
};

export const OFF_THE_CLOCK: ClockBlock[] = [
  {
    id: "f1",
    index: "01",
    label: "Formula 1",
    body: "Lewis Hamilton. It's about the drive and the relentless persistence that made him a seven-time world champion.",
    slots: [],
  },
  {
    id: "gym",
    index: "02",
    label: "Calisthenics",
    body: "The reason GyMPal exists. A 30-minute skipping routine followed by push-ups and bodyweight work. I built the tracker because every app assumed a gym I do not have.",
    slots: ["about-gym"],
  },
  {
    id: "food",
    index: "03",
    label: "Food",
    body: "I love unique foods. I'm always exploring and trying to identify new things, stepping outside the usual comfort zone to see what else is out there.",
    slots: ["food-1", "food-2", "food-3", "food-4"],
  },
  {
    id: "anime",
    index: "04",
    label: "Anime and manga",
    body: "Dragon Ball Z. I absolutely love everything about DBZ - the energy, the characters, and the sheer scale of it.",
    slots: [],
  },
  {
    id: "side",
    index: "05",
    label: "Side projects",
    body: "Building and maintaining the GDSC web platform. It's a space I'm creating where students can interact, find free courses, and access online schedules so they can learn and connect outside of formal classes.",
    slots: [],
  },
];
