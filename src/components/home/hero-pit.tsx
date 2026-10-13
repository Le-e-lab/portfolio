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
 *    dock, which stacks above him). Hover or tap him and he waves back.
 *    Scrolling, typing or clicking elsewhere and he vanishes again.
 *
 * The clips' backgrounds are graded to --color-bg and blended with `lighten`,
 * so the box around him disappears into the page. Under reduced motion,
 * Save-Data or 2G he never appears and nothing is fetched.
 */
export function HeroPit() {
  const spot = useRef<HTMLDivElement>(null);
  const wave = useRef<HTMLVideoElement>(null);
  const idle = useRef<HTMLVideoElement>(null);
  const corner = useRef<HTMLDivElement>(null);
  const poke = useRef<HTMLVideoElement>(null);
  const [waving, setWaving] = useState(false);
  const [idling, setIdling] = useState(false);
  const [poked, setPoked] = useState(false);
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
    const c = corner.current;
    const p = poke.current;
    if (!portal || !el || !w || !i || !c || !p) return;

    let lastInput = performance.now();
    let timer: ReturnType<typeof setTimeout> | undefined;

    // One timer, re-armed for whatever is left, instead of work on every event.
    const arm = (ms = IDLE_AFTER_MS) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const left = IDLE_AFTER_MS - (performance.now() - lastInput);
        if (left > 0) return arm(left);
        if (document.hidden || !w.paused) return arm();
        if (!i.getAttribute("src")) {
          i.src = `${media}/pit-hero-idle.mp4`;
          // Same clip as the hero wave, so usually already cached.
          p.src = `${media}/pit-hero-wave.mp4`;
          p.preload = "auto";
        }
        i.play().catch(() => {});
      }, ms);
    };

    const onMove = () => {
      lastInput = performance.now();
    };

    // Moving the mouse keeps him around so it can reach him; scrolling,
    // typing or clicking anywhere but on him sends him away.
    const onInput = (e: Event) => {
      lastInput = performance.now();
      if (i.paused || (e.target instanceof Node && c.contains(e.target))) return;
      setIdling(false);
      setPoked(false);
      // Let him fade before freezing the clips.
      setTimeout(() => {
        i.pause();
        p.pause();
      }, 300);
      arm();
    };

    // Touch or hover him and he waves back, every time. A wave already
    // running plays out first.
    const onPoke = () => {
      if (!p.paused) return;
      p.currentTime = 0;
      p.play().catch(() => {});
    };
    const onPokePlaying = () => setPoked(true);
    const onPokeEnd = () => setPoked(false);

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
    const events = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, onInput, opts));
    window.addEventListener("pointermove", onMove, opts);
    c.addEventListener("pointerenter", onPoke);
    p.addEventListener("playing", onPokePlaying);
    p.addEventListener("ended", onPokeEnd);
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
      window.removeEventListener("pointermove", onMove);
      c.removeEventListener("pointerenter", onPoke);
      p.removeEventListener("playing", onPokePlaying);
      p.removeEventListener("ended", onPokeEnd);
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
            ref={corner}
            aria-hidden="true"
            className={cn(
              "fixed right-4 bottom-[calc(52px_+_env(safe-area-inset-bottom))] z-40 aspect-[5/4] w-[120px] origin-bottom-right select-none mix-blend-lighten lg:right-8 lg:bottom-0 lg:w-[220px] xl:w-[260px]",
              pop,
              idling
                ? "scale-100 opacity-100 duration-500"
                : "pointer-events-none scale-75 opacity-0 duration-300",
            )}
          >
            <video ref={idle} muted loop playsInline preload="none" className="h-full w-full object-cover" />
            <video
              ref={poke}
              muted
              playsInline
              preload="none"
              className={cn("absolute inset-0 h-full w-full object-cover", !poked && "opacity-0")}
            />
          </div>,
          portal,
        )}
    </>
  );
}
