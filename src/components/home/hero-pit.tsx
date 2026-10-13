"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { canAffordVideo } from "@/components/ui/loop-video";
import { cn } from "@/lib/cn";

const media = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/media`;
/** How long a visitor has to sit still before Pit comes back to keep them company. */
const IDLE_AFTER_MS = 60_000;

/**
 * Pit, the mascot. Two appearances, and nothing on screen in between:
 *
 * 1. A big "hey" beside the name the first time the hero is in view: he pops
 *    in, waves once, and is gone.
 * 2. After a full minute with no input anywhere on the page, he peeks up from
 *    the bottom corner and idles, blinking out at the visitor. The clip is cut
 *    at his legs, so the cut sits on the screen edge (or under the mobile
 *    dock, which stacks above him). Any input and he vanishes again.
 *
 * The clips' backgrounds are graded to --color-bg and blended with `lighten`,
 * so the box around him disappears into the page. Under reduced motion,
 * Save-Data or 2G he never appears and nothing is fetched.
 */
export function HeroPit() {
  const spot = useRef<HTMLDivElement>(null);
  const wave = useRef<HTMLVideoElement>(null);
  const idle = useRef<HTMLVideoElement>(null);
  const [waving, setWaving] = useState(false);
  const [idling, setIdling] = useState(false);
  // The corner Pit is portalled to <body>: a transformed ancestor would turn
  // `fixed` into `absolute` and isolate the blend.
  const [portal, setPortal] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (canAffordVideo()) setPortal(document.body);
  }, []);

  useEffect(() => {
    const el = spot.current;
    const w = wave.current;
    const i = idle.current;
    if (!portal || !el || !w || !i) return;

    let lastInput = performance.now();
    let timer: ReturnType<typeof setTimeout> | undefined;

    // One timer, re-armed for whatever is left, instead of work on every event.
    const arm = (ms = IDLE_AFTER_MS) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const left = IDLE_AFTER_MS - (performance.now() - lastInput);
        if (left > 0) return arm(left);
        if (document.hidden || !w.paused) return arm();
        if (!i.getAttribute("src")) i.src = `${media}/pit-hero-idle.mp4`;
        i.play().catch(() => {});
      }, ms);
    };

    const onInput = () => {
      lastInput = performance.now();
      if (i.paused) return;
      setIdling(false);
      // Let him fade before freezing the clip.
      setTimeout(() => i.pause(), 300);
      arm();
    };

    const onIdlePlaying = () => setIdling(true);
    const onWavePlaying = () => setWaving(true);
    const onWaveEnd = () => setWaving(false);

    // Wave once per visit, the first time his whole spot is in view. The
    // bottom margin keeps the mobile dock from counting as "in view", so on a
    // short phone he waits for the first scroll instead of waving under it.
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        w.src = `${media}/pit-hero-wave.mp4`;
        w.play().catch(() => {});
      },
      { threshold: 0.9, rootMargin: "0px 0px -64px 0px" },
    );

    const opts = { passive: true } as const;
    const events = ["pointermove", "pointerdown", "keydown", "scroll", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, onInput, opts));
    w.addEventListener("playing", onWavePlaying);
    w.addEventListener("ended", onWaveEnd);
    i.addEventListener("playing", onIdlePlaying);
    io.observe(el);
    arm();

    return () => {
      io.disconnect();
      clearTimeout(timer);
      w.removeEventListener("playing", onWavePlaying);
      w.removeEventListener("ended", onWaveEnd);
      i.removeEventListener("playing", onIdlePlaying);
      events.forEach((e) => window.removeEventListener(e, onInput));
    };
  }, [portal]);

  const pop = "transition-[opacity,scale] ease-[cubic-bezier(0.34,1.56,0.64,1)]";
  return (
    <>
      {/* Bottom sits on the first line of the h1 (font size x 0.95 leading),
          at its right end, where "Lesley" leaves room. */}
      <div
        ref={spot}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute right-0 bottom-[calc(100%_-_0.95*clamp(3.25rem,13vw,6rem))] aspect-[5/4] w-[clamp(104px,27vw,180px)] origin-bottom-right lg:w-[240px] xl:w-[270px] select-none",
          pop,
          waving ? "scale-100 opacity-100 duration-500" : "scale-50 opacity-0 duration-300",
        )}
      >
        <video ref={wave} muted playsInline preload="none" className="h-full w-full object-cover mix-blend-lighten" />
        {/* Level with his raised hand, clear of the card hint above. */}
        <span className="absolute top-[22%] left-0 -translate-x-[70%] font-display text-[1.35rem] leading-none font-semibold tracking-[-0.02em] text-accent uppercase lg:text-[1.75rem]">
          Hey!
        </span>
      </div>

      {portal &&
        createPortal(
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none fixed right-4 bottom-[calc(52px_+_env(safe-area-inset-bottom))] z-40 aspect-[5/4] w-[120px] origin-bottom-right select-none mix-blend-lighten lg:right-8 lg:bottom-0 lg:w-[220px] xl:w-[260px]",
              pop,
              idling ? "scale-100 opacity-100 duration-500" : "scale-75 opacity-0 duration-300",
            )}
          >
            <video ref={idle} muted loop playsInline preload="none" className="h-full w-full object-cover" />
          </div>,
          portal,
        )}
    </>
  );
}
