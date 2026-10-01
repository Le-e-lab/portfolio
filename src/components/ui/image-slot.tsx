import Image from "next/image";
import { getSlot, isPlaceholderAlt } from "@/lib/images.manifest";
import { getImage } from "@/lib/images";
import { cn } from "@/lib/cn";

type ImageSlotProps = {
  id: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Overrides the manifest alt. Only for genuinely different framing. */
  alt?: string;
  /** Image treatment: hairline outline + gentle grade. Section 9. */
  framed?: boolean;
  imgClassName?: string;
};

/**
 * Renders the real image when a file exists, otherwise a dashed frame at the
 * correct aspect ratio with a mono spec label. The placeholder is part of the
 * design, not an error state — it reads as intentional.
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
        className={cn(
          "object-cover",
          "[filter:saturate(0.92)_contrast(1.04)]",
          imgClassName,
        )}
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
        "flex flex-col items-center justify-center gap-2 border border-dashed border-line bg-surface",
        className,
      )}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`Placeholder awaiting ${label} at ${spec}`}
    >
      <span className="font-mono text-[10px] tracking-[0.14em] text-dim uppercase">
        {label}
      </span>
      <span className="font-mono text-[10px] tracking-[0.14em] text-dim/70 uppercase tabular">
        {spec}
      </span>
    </div>
  );
}