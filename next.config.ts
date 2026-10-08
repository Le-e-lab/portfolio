import type { NextConfig } from "next";

/**
 * Two deployment targets, one codebase.
 *
 * The primary target is a Node server, where next/image optimisation and custom
 * response headers both work.
 *
 * GitHub Pages serves static files only, so that build is a full static export:
 * NEXT_OUTPUT_EXPORT=1 turns on `output: "export"`, which also requires the
 * image optimiser off (it is a server route).
 *
 * basePath stays empty by default because public/CNAME already claims the
 * custom domain lesley.runs-on.dev, and Pages serves that at the root. Set
 * NEXT_PUBLIC_BASE_PATH=/portfolio only if Pages is ever switched to the
 * github.io fallback, where a project page is served from a subdirectory.
 *
 * Both switches are off by default, so `pnpm build` keeps producing a Node
 * build and CI is unaffected.
 */
const isExport = process.env.NEXT_OUTPUT_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // GitHub Pages 404s /work/x/ for a flat work/x.html, but 301s /work/x to the
  // folder form, so the folder form is the one URL that works typed either way.
  trailingSlash: true,
  output: isExport ? "export" : undefined,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    // Self-hosted fonts + local images only. No remote patterns needed yet.
    remotePatterns: [],
    // The optimiser is a server route, so a static export has to skip it.
    unoptimized: isExport,
  },
  // Custom response headers are a server feature and GitHub Pages ignores them
  // regardless, so they are left off the export rather than silently doing nothing.
  ...(isExport
    ? {}
    : {
        async headers() {
          return [
            {
              source: "/:path*",
              headers: [
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                { key: "X-Frame-Options", value: "SAMEORIGIN" },
              ],
            },
          ];
        },
      }),
};

export default nextConfig;
