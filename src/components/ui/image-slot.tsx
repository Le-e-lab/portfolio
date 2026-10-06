import Image from "next/image";
import { getSlot, isPlaceholderAlt } from "@/lib/images.manifest";
import { getImage, SHOW_PLACEHOLDERS } from "@/lib/images";
import { cn } from "@/lib/cn";

type ImageSlotProps = {
  id: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Overrides the manifest alt. Only for genuinely different framing. */
  alt?: string;
  /** Image treatment: hairline outline + gentle grade. */
  framed?: boolean;
  imgClassName?: string;
};

/**
 * Renders the real image when a file exists, otherwise a dashed frame at the
 * correct aspect ratio with a mono spec label. Dev only: production renders
 * nothing until the file lands.
 */
export function ImageSlot({
  id,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  alt,
  framed = true,
  imgClassName,
}: ImageSlotProps) {
  const slot = getSlot(id);
  const src = getImage(id);

  if (!slot || !src) {
    if (!SHOW_PLACEHOLDERS) return null;
    return (
      <PlaceholderFrame
        id={id}
        where={slot?.where ?? "Image"}
        ratio={slot?.ratio ?? "16 / 10"}
        minWidth={slot?.minWidth ?? 1600}
        minHeight={slot?.minHeight ?? 1000}
        className={className}
      />
    );
  }

  const resolvedAlt = alt ?? slot.alt;
  const decorative = isPlaceholderAlt(resolvedAlt);

  return (
    <div
      className={cn("relative overflow-hidden bg-surface-2", framed && "hairline", className)}
      style={{ aspectRatio: slot.ratio }}
    >
      <Image
        src={src}
        alt={decorative ? "" : resolvedAlt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", imgClassName)}
        style={{ filter: slot.grade ?? "saturate(0.92) contrast(1.04)" }}
      />
    </div>
  );
}

function PlaceholderFrame({
  id,
  where,
  ratio,
  minWidth,
  minHeight,
  className,
}: {
  id: string;
  where: string;
  ratio: string;
  minWidth: number;
  minHeight: number;
  className?: string;
}) {
  const ratioLabel = ratio.replace(/ \/ /g, ":");
  const label = `${where.toUpperCase()} / ${id.replace(/^(work-|about-|hero-)/, "")}`;
  const spec = `${ratioLabel} / ${minWidth}x${minHeight} min`;

  return (
    <div
      className={cn(
        // A hairline dashed border in --color-line on --color-bg measures
        // 1.31:1 and disappears in a screenshot, which made these read as
        // broken images rather than as a slot waiting on a file. Lifting both
        // the border and the fill one step keeps it quiet but visibly a frame.
        "flex flex-col items-center justify-center gap-2 border border-dashed border-[#3a3a41] bg-[#0e0e10] p-6",
        className,
      )}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`Placeholder awaiting ${label} at ${spec}`}
    >
      <span className="text-center font-mono text-label-sm leading-[1.5] tracking-[0.1em] text-muted uppercase sm:text-label sm:tracking-[0.14em]">
        {label}
      </span>
      <span className="text-center font-mono text-label-sm leading-[1.5] tracking-[0.1em] text-muted uppercase tabular sm:text-label sm:tracking-[0.14em]">
        {spec}
      </span>
    </div>
  );
}