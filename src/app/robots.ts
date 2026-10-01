import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";

/**
 * Generated robots. Replaces the hand-edited public/robots.txt, which cannot
 * follow siteConfig.url when NEXT_PUBLIC_SITE_URL changes per environment.
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
