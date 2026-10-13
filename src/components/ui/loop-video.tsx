"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * A muted, silent loop from public/media/<name>.{webm,mp4} with a
 * <name>-poster.webp still. Decorative only, so it is hidden from assistive
 * tech.
 *
 * It plays only while on screen, and never under reduced motion, where the
 * poster stands in for it.
 */
export function LoopVideo({ name, className }: { name: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const src = `${basePath}/media/${name}`;
  return (
    <video
      ref={ref}
      aria-hidden="true"
      muted
      loop
      playsInline
      preload="metadata"
      poster={`${src}-poster.webp`}
      className={cn("block aspect-square w-full bg-surface-2 object-cover", className)}
    >
      <source src={`${src}.webm`} type="video/webm" />
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
}
