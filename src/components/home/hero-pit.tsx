"use client";

import { useEffect, useRef, useState } from "react";
import { canAffordVideo } from "@/components/ui/loop-video";
import { cn } from "@/lib/cn";

const media = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/media`;
/** How long a visitor has to sit still before Pit settles in and watches them. */
const IDLE_AFTER_MS = 8000;

/**
 * Pit, beside the name. He waves when the hero comes into view, stands still
 * while the visitor is busy, and after a quiet spell plays his idle loop,
 * blinking out at them. Any input stops it again.
 *
 * The clips' backgrounds are graded to --color-bg, so he stands on the page
 * rather than in a box. Under reduced motion, Save-Data or 2G only the 9KB
 * still loads.
 */
export function HeroPit() {
  const box = useRef<HTMLDivElement>(null);
  const wave = useRef<HTMLVideoElement>(null);
  const idle = useRef<HTMLVideoElement>(null);
  const [waving, setWaving] = useState(false);

  useEffect(() => {
    const el = box.current;
    const w = wave.current;
    const i = idle.current;
    if (!el || !w || !i || !canAffordVideo()) return;

    let inView = false;
    let lastInput = performance.now();
    let timer: ReturnType<typeof setTimeout> | undefined;

    const load = (v: HTMLVideoElement, name: string) => {
      if (!v.getAttribute("src")) v.src = `${media}/${name}.mp4`;
    };

    // One timer, re-armed for whatever is left, instead of work on every event.
    const arm = (ms = IDLE_AFTER_MS) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const left = IDLE_AFTER_MS - (performance.now() - lastInput);
        if (left > 0) return arm(left);
        if (!inView || !w.paused) return;
        load(i, "pit-hero-idle");
        i.play().catch(() => {});
      }, ms);
    };

    const onInput = () => {
      lastInput = performance.now();
      if (!i.paused) i.pause();
    };

    // Swap only once frames arrive, so a slow load never blanks him out.
    const onWavePlaying = () => setWaving(true);
    const onWaveEnd = () => {
      setWaving(false);
      arm();
    };

    const io = new IntersectionObserver((entries) => {
      inView = !!entries[0]?.isIntersecting;
      if (!inView) {
        w.pause();
        i.pause();
        clearTimeout(timer);
        return;
      }
      load(w, "pit-hero-wave");
      w.currentTime = 0;
      w.play().catch(() => {});
    });

    const opts = { passive: true } as const;
    const events = ["pointermove", "pointerdown", "keydown", "scroll", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, onInput, opts));
    w.addEventListener("playing", onWavePlaying);
    w.addEventListener("ended", onWaveEnd);
    io.observe(el);

    return () => {
      io.disconnect();
      clearTimeout(timer);
      w.removeEventListener("playing", onWavePlaying);
      w.removeEventListener("ended", onWaveEnd);
      events.forEach((e) => window.removeEventListener(e, onInput));
    };
  }, []);

  const clip = "absolute inset-0 h-full w-full object-cover transition-opacity duration-300";
  return (
    <div
      ref={box}
      aria-hidden="true"
      // Bottom sits on the first line of the h1 (font size x 0.95 leading),
      // at its right end, where "Lesley" leaves room.
      className="pointer-events-none absolute right-0 bottom-[calc(100%_-_0.95*clamp(3.25rem,13vw,6rem))] aspect-[5/4] w-[clamp(96px,28vw,150px)] select-none"
    >
      <video
        ref={idle}
        muted
        loop
        playsInline
        preload="none"
        poster={`${media}/pit-hero-idle-poster.webp`}
        className={cn(clip, waving && "opacity-0")}
      />
      <video
        ref={wave}
        muted
        playsInline
        preload="none"
        className={cn(clip, !waving && "opacity-0")}
      />
    </div>
  );
}
