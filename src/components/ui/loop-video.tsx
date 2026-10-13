"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * A muted, silent loop from public/media/<name>.{webm,mp4} with a
 * <name>-poster.webp still. Decorative only, so it is hidden from assistive
 * tech.
 *
 * Only the ~10KB poster ships with the page. The clip is fetched the first
 * time it scrolls on screen, plays only while visible, and is never fetched
 * under reduced motion, Save-Data or a 2G connection.
 */
export function LoopVideo({ name, className }: { name: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const src = `${basePath}/media/${name}`;

  useEffect(() => {
    const video = ref.current;
    if (!video || !canAffordVideo()) return;
    const io = new IntersectionObserver((entries) => {
      if (!entries[0]?.isIntersecting) return video.pause();
      if (!video.getAttribute("src")) {
        video.src = `${src}.${video.canPlayType("video/webm") ? "webm" : "mp4"}`;
      }
      video.play().catch(() => {});
    });
    io.observe(video);
    return () => io.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      aria-hidden="true"
      muted
      loop
      playsInline
      preload="none"
      poster={`${src}-poster.webp`}
      className={cn("block aspect-square w-full bg-surface-2 object-cover", className)}
    />
  );
}

type Connection = { saveData?: boolean; effectiveType?: string };

export function canAffordVideo(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  // Chromium only; Safari and Firefox have no signal, so they get the clip.
  const conn = (navigator as Navigator & { connection?: Connection }).connection;
  if (conn?.saveData) return false;
  return !conn?.effectiveType?.endsWith("2g");
}
