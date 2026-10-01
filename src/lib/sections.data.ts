/**
 * Copy for the lower home sections. Section 6 of AGENTS.md: content lives in
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
    evidence: "Resume: Kwikifund, Elevate Value Partners",
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

/** Stack groups. Section 12 — grouped by what it is FOR, not a logo wall. */
export type StackGroup = {
  id: string;
  label: string;
  items: string[];
};

export const STACK_GROUPS: StackGroup[] = [
  {
    id: "languages",
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python"],
  },
  {
    id: "web",
    label: "On the web",
    items: [
      "React",
      "Next.js",
      "React Native",
      "Node.js",
      "REST APIs",
      "Web scraping",
    ],
  },
  {
    id: "data",
    label: "Data",
    items: ["MongoDB", "SQL", "AI / ML", "NLP"],
  },
  {
    id: "platform",
    label: "Platform",
    items: ["PWA", "Service Workers", "USSD", "Digital wallets", "Bootstrap"],
  },
  {
    id: "tooling",
    label: "Tooling",
    items: [
      "Git",
      "GitHub",
      "Postman",
      "Linux",
      "Agile",
      "Vercel",
      "Playwright",
    ],
  },
];

/** About. The resume gives the career; the rest is the owner's to write. */
export const ABOUT = {
  lead: "I am a BSc Computer Science student at Africa University and the Lead Developer at two startups. Most of my work sits in the gap between a database and a person trying to use it.",
  body: [
    "I started out explaining things. Running the Google Developer Student Club at Africa University means I run the workshops, define what everyone is building, and then read the code when it does not work. That is a better way to learn a stack than tutorials, and it is why I am usually the one explaining something to someone.",
    "Before that I was building. Kwikifund scores credit for people the banking system has historically ignored, over USSD and mobile wallets, because that is how the users actually bank. The job-automation agent reads job boards, ranks what is worth applying to, and tells me on WhatsApp instead of making me check. GyMPal is a dark-themed PWA that tracks calisthenics and works with the doorbell off.",
    "I care about the unglamorous parts. Responsive layout at 360px. Keyboard focus that survives. A build that fails loudly instead of shipping something broken. The interface is the part everyone sees, but it is the last thing I decide.",
  ],
  facts: [
    { label: "Based in", value: "Harare, Zimbabwe" },
    {
      label: "Studying",
      value: "BSc Honours Computer Science, Africa University, 2028",
    },
    { label: "Academic standing", value: "GPA 3.78, Dean's List" },
    { label: "Currently", value: "Lead Developer, Tarisai" },
    { label: "Also", value: "Co-Founder, Elevate Value Partners" },
    { label: "In the club", value: "GDSC Lead, Africa University" },
  ],
} as const;

/** Off the clock. Resume says nothing about these; they are the owner's. */
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
    body: "[[FILL]] Which season, which team, and what you actually argue about. One driver, one team, one opinion about the last race.",
    slots: [],
  },
  {
    id: "gym",
    index: "02",
    label: "Calisthenics",
    body: "The reason GyMPal exists. Dumbbells and bodyweight, long-term routines rather than a list of exercises. I built the tracker because every app assumed a gym I do not have.",
    slots: ["about-gym"],
  },
  {
    id: "food",
    index: "03",
    label: "Food",
    body: "[[FILL]] What you cook, what you order when you have given up, and the one dish you would claim is better than it is.",
    slots: ["food-1", "food-2", "food-3", "food-4"],
  },
  {
    id: "anime",
    index: "04",
    label: "Anime and manga",
    body: "[[FILL]] Titles, and the one that made you start learning something technical.",
    slots: [],
  },
  {
    id: "side",
    index: "05",
    label: "Side projects",
    body: "[[FILL]] The things with no deadline that taught you the most.",
    slots: [],
  },
];
