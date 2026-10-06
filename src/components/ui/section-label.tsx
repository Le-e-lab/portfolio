import { cn } from "@/lib/cn";

/** Section index labels in mono, e.g. "01 / Work". */
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
        "flex items-baseline gap-2 font-mono text-label tracking-[0.18em] text-muted uppercase",
        className,
      )}
    >
      <span className="text-accent tabular">{index}</span>
      <span aria-hidden="true" className="text-dim">
        /
      </span>
      <span>{label}</span>
      <span aria-hidden="true" className="label-rule ml-2 h-px max-w-24 flex-1 self-center bg-line" />
    </p>
  );
}