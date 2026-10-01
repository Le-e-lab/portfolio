import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
import { getWorkSlugs } from "@/lib/work";

/**
 * Generated sitemap. Case studies are read from content/work so a new MDX file
 * is discoverable without a hand-edited XML file going stale. The root page is
 * the only other URL: Services, Stack, About, Off the clock and Contact are
 * sections of it, not separate routes.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...getWorkSlugs().map((slug) => ({
      url: `${siteConfig.url}/work/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
