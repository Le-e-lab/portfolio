/**
 * Single typed source of truth for identity, links and behaviour flags.
 * Single source of truth for identity and section metadata.
 */

export type SocialLink = {
  label: string;
  href: string;
  /** Shown in the mono tooltip / palette. */
  handle?: string;
};

export type SiteConfig = {
  name: string;
  /** Used for <title>, OG, JSON-LD Person. */
  fullName: string;
  role: string;
  /** Short plain sentence for the hero. See COPY.md — all three options
   *  were drafted from the owner's resume; the chosen one needs sign-off. */
  tagline: string;
  /** The one honest design line. Appears once, in Services. */
  designLine: string;
  /** One human detail. Appears in the hero bio line. */
  humanLine: string;

  url: string;
  locale: string;
  email: string;
  phone: string;
  location: string;
  timezone: string;
  timezoneLabel: string;
  /** Availability pill in the hero. */
  availability: string;
  /** Contact block. */
  responseTime: string;
  bookingUrl: string;

  githubUsername: string;
  linkedinUrl: string;
  /** Exactly one design profile. No 14-link social rows. */
  designProfileUrl: string;
  designProfileLabel: string;

  /** Max four. */
  socials: SocialLink[];

  cvPath: string;
  ogImagePath: string;

  flags: {
    /** Storytelling motion. false = fade-ups only. */
    storytelling: boolean;
    /** Fail production builds when a required image slot is missing. */
    strictImages: boolean;
    /** Server-action contact form. Off by default. */
    contactForm: boolean;
    /** Privacy-friendly analytics. Off by default. */
    analytics: boolean;
    /** Only if GitHub Events still returns commit messages. */
    showCommitMessages: boolean;
  };

  /** GitHub fetch cache window, seconds. */
  githubRevalidate: number;
};

export const siteConfig: SiteConfig = {
  name: "Lesley",
  fullName: "Lesley Mutsambiwa",
  role: "Full-stack developer.",
  tagline:
    "I build web apps from database to interface — AI scoring tools, student portals and payment flows, shipped from Harare.",
  designLine:
    "I also design, and I'm still learning it properly. The logos and flyers in this portfolio are mine.",
  humanLine:
    "BSc Computer Science at Africa University. I run the Google Developer Student Club there, which is why I am usually explaining something to someone.",

  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lesley.runs-on.dev",
  locale: "en_ZW",
  email: "mutsambiwalesley@gmail.com",
  phone: "+263789727791",
  location: "Harare, Zimbabwe",
  timezone: "UTC+2",
  timezoneLabel: "CAT (UTC+2), Harare",
  availability: "Open to freelance and contract work",
  responseTime: "Usually replies within 24 hours",
  bookingUrl: "",

  githubUsername: "Le-e-lab",
  linkedinUrl: "",
  designProfileUrl: "",
  designProfileLabel: "Design",

  socials: [
    { label: "GitHub", href: "https://github.com/Le-e-lab", handle: "Le-e-lab" },
    { label: "Email", href: "mailto:mutsambiwalesley@gmail.com", handle: "mutsambiwalesley" },
  ],

  cvPath: "/cv.pdf",
  ogImagePath: "/og-image.jpg",

  flags: {
    storytelling: true,
    /**
     * strictImages ships FALSE on purpose. The four About photos and four
     * food photos are still unsupplied, and a true value blocks every build.
     * The gate itself is implemented and live in src/lib/images.check.ts.
     * Flip this to true once those eight files exist. See PLACEHOLDERS.md.
     */
    strictImages: false,
    contactForm: false,
    analytics: false,
    showCommitMessages: false,
  },

  githubRevalidate: 3600,
} as const;

/** Nav anchors, in page order. Seven sections, one lap. */
export const SECTIONS = [
  { id: "work", index: "01", label: "Work" },
  { id: "activity", index: "02", label: "Activity" },
  { id: "services", index: "03", label: "Services" },
  { id: "stack", index: "04", label: "Stack" },
  { id: "about", index: "05", label: "About" },
  { id: "off-the-clock", index: "06", label: "Off the clock" },
  { id: "contact", index: "07", label: "Contact" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

/** Lap rail sectors: the three laps across the home page. */
export const SECTORS = [
  { id: "s1", label: "Who I am", spans: ["hero", "work"] },
  { id: "s2", label: "What I ship", spans: ["activity", "services", "stack"] },
  { id: "s3", label: "Talk to me", spans: ["about", "off-the-clock", "contact"] },
] as const;