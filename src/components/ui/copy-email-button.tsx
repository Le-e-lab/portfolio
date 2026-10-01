"use client";

import { useCopy } from "@/hooks/use-copy";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/cn";

/**
 * Copy-email with an explicit confirmation. Section 5 and Section 7 both
 * require the acknowledgement, so the label swaps rather than relying on a
 * transient toast the user might miss.
 */
export function CopyEmailButton({
  className,
  variant = "outline",
}: {
  className?: string;
  variant?: "outline" | "ghost";
}) {
  const { copied, copy } = useCopy();

  return (
    <button
      type="button"
      onClick={() => void copy(siteConfig.email)}
      aria-live="polite"
      className={cn(
        "press inline-flex cursor-pointer items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase transition-colors duration-200",
        variant === "outline" &&
          "border border-line px-3 py-2 text-muted hover:border-muted hover:text-ink",
        variant === "ghost" && "px-0 py-1 text-muted hover:text-ink",
        copied && "text-accent",
        className,
      )}
    >
      {copied ? "Email copied" : "Copy email"}
    </button>
  );
}