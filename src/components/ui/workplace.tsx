import type { Workplace } from "@/lib/sections.data";
import { cn } from "@/lib/cn";

/** A workplace name, linked out when it has a site. */
export function WorkplaceName({ place, className }: { place: Workplace; className?: string }) {
  if (!place.href) return <span className={className}>{place.name}</span>;
  return (
    <a
      href={place.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("draw-underline text-ink", className)}
    >
      {place.name}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
