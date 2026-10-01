import { siteConfig } from "@/config/site.config";

/**
 * Section 1.2: no designed logo, monogram, icon or favicon.
 *
 * If the owner later drops src/assets/brand/logo.svg, import it above and swap
 * the return. Until then the name renders in plain body-font text.
 */
export function Brand({ className }: { className?: string }) {
  return (
    <span
      className={className}
      style={{ fontFamily: "var(--font-body)", fontWeight: 600, letterSpacing: "-0.01em" }}
    >
      {siteConfig.name}
      <span className="text-accent">.</span>
    </span>
  );
}