import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/config/site.config";
import { assertRequiredImages } from "@/lib/images.check";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LapRail } from "@/components/ui/lap-rail";
import { MotionProvider } from "@/components/ui/motion-primitives";
import { CommandPalette } from "@/components/command-palette/command-palette";
import { getAllWork } from "@/lib/work";

assertRequiredImages();

// Read once on the server, passed down as plain props. Keeps fs out of the client bundle.
const paletteWork = getAllWork().map((w) => ({
  slug: w.slug,
  title: w.title,
  year: w.year,
}));

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.fullName} — ${siteConfig.role}`,
    template: `%s — ${siteConfig.fullName}`,
  },
  description:
    "Full-stack developer in Harare building web apps from database to interface: AI scoring tools, student portals and payment flows.",
    alternates: { canonical: "/" },
    manifest: siteConfig.manifestPath,
    // Next auto-links src/app/favicon.ico, which is what a bare /favicon.ico
    // request resolves to. icon.svg is the master mark and stays crisp at any
    // size; the raster PNGs remain for the manifest and older browsers.
    icons: {
      icon: [
        { url: siteConfig.faviconPath, sizes: "any" },
        { url: siteConfig.iconSvgPath, type: "image/svg+xml" },
      ],
      apple: [{ url: siteConfig.appleTouchIconPath, sizes: "180x180" }],
    },
    themeColor: "#0a0a0b",
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.fullName,
    title: `${siteConfig.fullName} — ${siteConfig.role}`,
    description:
      "Full-stack developer in Harare building web apps from database to interface.",
    images: [
      {
        url: siteConfig.ogImagePath,
        width: 1200,
        height: 630,
        alt: siteConfig.fullName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.fullName} — ${siteConfig.role}`,
    description: "Full-stack developer in Harare building web apps end to end.",
    images: [siteConfig.ogImagePath],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  colorScheme: "dark",
};

/** JSON-LD Person, matching the visible content. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.fullName,
  url: siteConfig.url,
  email: `mailto:${siteConfig.email}`,
  jobTitle: "Full-stack developer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Harare",
    addressCountry: "ZW",
  },
  knowsAbout: [
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "MongoDB",
    "REST APIs",
    "PWA",
  ],
  sameAs: [`https://github.com/${siteConfig.githubUsername}`].filter(
    (u) => !u.includes("undefined"),
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-ZW" className={fontVariables}>
      <head>
        {/* JSON-LD Person. */}
        <script
          type="application/ld+json"
          // Static, owner-controlled object. No user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-dvh bg-bg text-ink antialiased">
        {/* One LazyMotion for the whole tree. Wrapping only part of it leaves
            every m.* outside the provider unanimated. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-bg focus:uppercase"
        >
          Skip to content
        </a>

        {/* If the bundle never runs, nothing may stay at opacity 0. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>

        <MotionProvider>
          <Header />
          <CommandPalette work={paletteWork} />

          <main id="main">{children}</main>

          <Footer />
          <LapRail />
        </MotionProvider>
      </body>
    </html>
  );
}
