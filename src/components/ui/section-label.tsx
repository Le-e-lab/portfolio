import { cn } from "@/lib/cn";

/** Section 6: section index labels in mono, e.g. "01 / Work". */
export function SectionLabel({
  index,
  label,
  className,
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-baseline gap-2 font-mono text-[11px] tracking-[0.18em] text-muted uppercase",
        className,
      )}
    >
      <span className="text-accent tabular">{index}</span>
      <span aria-hidden="true" className="text-dim">
        /
      </span>
      <span>{label}</span>
    </p>
  );
}