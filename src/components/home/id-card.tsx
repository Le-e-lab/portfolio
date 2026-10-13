"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animate, m, useMotionValue, useSpring, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { WorkplaceName } from "@/components/ui/workplace";
import { WORKPLACES, type Workplace } from "@/lib/sections.data";
import { getImage } from "@/lib/images";
import { getSlot } from "@/lib/images.manifest";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/cn";

const avatar = getImage("hero-avatar");
const avatarAlt = getSlot("hero-avatar")?.alt ?? "";

/** Strap length above the card, px. Desktop runs up behind the header. */
const STRAP = { desktop: 300, mobile: 140 };
const SWING = { type: "spring", stiffness: 160, damping: 7, mass: 0.9 } as const;
/** Below this many px of travel a press is a tap, and a tap turns the card. */
const TAP_SLOP = 6;
/** Phone tilt is clamped to this many degrees either way. */
const TILT_MAX = 25;

const clamp = (v: number, max: number) => Math.max(-max, Math.min(max, v));

type OrientationCtor = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

/**
 * A hanging staff ID. Drag it and the lanyard follows, let go and it swings
 * back; tap or press the button to turn it over.
 *
 * Drag is hand-rolled on pointer events because the site's LazyMotion only
 * ships domAnimation, and domMax would cost ~10KB for this one card. Touch
 * drags are horizontal only (touch-action: pan-y), so a thumb resting on the
 * card still scrolls the page.
 *
 * On touch screens the card also follows the phone: tilt it side to side and
 * the card swings and turns with it. iOS gates motion behind a permission
 * prompt, so it is asked for on the first tap on the card.
 */
export function IdCard({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const [flipped, setFlipped] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const tiltX = useSpring(0, { stiffness: 200, damping: 20 });
  const tiltY = useSpring(0, { stiffness: 200, damping: 20 });

  const strap = useMotionValue(STRAP.desktop);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => strap.set(mq.matches ? STRAP.desktop : STRAP.mobile);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [strap]);
  // The card hangs in line with its strap: angle from the anchor to the clip.
  const drag = useRef<{ id: number; sx: number; sy: number; moved: boolean; touch: boolean } | null>(null);

  // Phone tilt adds its own sway on top of the drag offset.
  const sway = useSpring(0, { stiffness: 60, damping: 9 });
  const cardX = useTransform(() => x.get() + sway.get());
  const hang = useTransform(() => (-Math.atan2(cardX.get(), strap.get() + y.get()) * 180) / Math.PI);
  const rotate = useSpring(hang, { stiffness: 260, damping: 14 });
  const strapPath = useTransform(() => `M 0 ${-strap.get()} L ${cardX.get()} ${y.get()}`);

  const [motionAsked, setMotionAsked] = useState(false);
  useEffect(() => {
    if (reduced || !window.matchMedia("(hover: none)").matches) return;
    let baseBeta: number | null = null;
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null || drag.current) return;
      // Whatever angle the phone is held at first is "level".
      baseBeta ??= e.beta;
      const side = clamp(e.gamma, TILT_MAX);
      const pitch = clamp(e.beta - baseBeta, TILT_MAX);
      sway.set(side * 1.2);
      tiltY.set(side * 0.6);
      tiltX.set(pitch * -0.4);
    };
    window.addEventListener("deviceorientation", onTilt);
    return () => window.removeEventListener("deviceorientation", onTilt);
  }, [reduced, motionAsked, sway, tiltX, tiltY]);

  /** iOS 13+ needs a user gesture before it sends orientation events. */
  function askForMotion() {
    if (motionAsked) return;
    setMotionAsked(true);
    const ctor = window.DeviceOrientationEvent as OrientationCtor | undefined;
    ctor?.requestPermission?.().catch(() => {});
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced || drag.current || e.button !== 0) return;
    // Links and the turn button keep their own clicks.
    if ((e.target as HTMLElement).closest("a, button")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    x.stop();
    y.stop();
    drag.current = {
      id: e.pointerId,
      sx: e.clientX - x.get(),
      sy: e.clientY - y.get(),
      moved: false,
      touch: e.pointerType !== "mouse",
    };
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) {
      if (e.pointerType === "mouse" && !reduced) {
        const r = e.currentTarget.getBoundingClientRect();
        tiltX.set(((e.clientY - r.top) / r.height - 0.5) * -14);
        tiltY.set(((e.clientX - r.left) / r.width - 0.5) * 18);
      }
      return;
    }
    const dx = e.clientX - d.sx;
    // Pulling up slackens the strap, so resist it; pulling down stretches it.
    const rawY = d.touch ? 0 : e.clientY - d.sy;
    const dy = rawY < 0 ? rawY * 0.35 : rawY * 0.6;
    if (Math.hypot(dx, dy) > TAP_SLOP) d.moved = true;
    x.set(dx);
    y.set(dy);
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" && !reduced) askForMotion();
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    if (!d.moved) setFlipped((f) => !f);
    animate(x, 0, SWING);
    animate(y, 0, { ...SWING, damping: 12 });
  }

  function onPointerLeave() {
    tiltX.set(0);
    tiltY.set(0);
  }

  return (
    <div className={cn("relative select-none", className)}>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-px w-px overflow-visible"
      >
        <defs>
          <m.path id="lanyard" d={strapPath} />
        </defs>
        <m.path d={strapPath} stroke="var(--color-accent)" strokeWidth={22} fill="none" />
        <text
          className="fill-bg font-mono uppercase"
          fontSize={9}
          letterSpacing="0.2em"
          dominantBaseline="central"
        >
          <textPath href="#lanyard">
            {"lesley.runs-on.dev · full-stack · harare · ".repeat(3)}
          </textPath>
        </text>
      </svg>

      <m.div
        style={{ x: cardX, y, rotate, transformOrigin: "50% 0%" }}
        initial={reduced ? false : { y: -140, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 9, delay: 0.2 }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={onPointerLeave}
        className={cn(
          "relative touch-pan-y",
          reduced ? "cursor-default" : "cursor-grab active:cursor-grabbing",
        )}
      >
        {/* Clip between strap and card. */}
        <div aria-hidden="true" className="absolute -top-3 left-1/2 z-10 h-5 w-9 -translate-x-1/2 border border-[#55555c] bg-surface-2">
          <div className="mx-auto mt-1.5 h-1 w-4 bg-bg" />
        </div>

        <m.div
          style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
          className="relative"
        >
          <m.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 16 }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative grid w-full"
          >
            <Front hidden={flipped} onTurn={() => setFlipped(true)} />
            <Back hidden={!flipped} onTurn={() => setFlipped(false)} />
          </m.div>
        </m.div>
      </m.div>

      <p aria-hidden="true" className="mt-4 hidden text-center font-mono text-label-sm tracking-[0.14em] text-dim uppercase lg:block">
        Drag it · Click to turn over
      </p>
      {!reduced && (
        <p aria-hidden="true" className="mt-4 text-center font-mono text-label-sm tracking-[0.14em] text-dim uppercase [@media(hover:hover)]:hidden lg:hidden">
          Tilt your phone · Tap to turn over
        </p>
      )}
    </div>
  );
}

const face =
  "col-start-1 row-start-1 flex flex-col overflow-hidden [backface-visibility:hidden] border";

function Front({ hidden, onTurn }: { hidden: boolean; onTurn: () => void }) {
  return (
    <section
      aria-label="ID card, front"
      aria-hidden={hidden}
      inert={hidden}
      className={cn(face, "border-[#d6d6d1] bg-ink text-bg")}
    >
      <header className="flex items-center justify-between bg-accent px-4 pt-5 pb-3">
        <span className="font-body text-[0.95rem] font-semibold tracking-[-0.01em]">
          {siteConfig.name}.
        </span>
        <span className="font-mono text-label-sm tracking-[0.16em] uppercase">Staff ID</span>
      </header>
      {/* Punched slot the clip goes through. */}
      <span aria-hidden="true" className="absolute top-1.5 left-1/2 h-1.5 w-10 -translate-x-1/2 bg-bg" />

      <div className="flex flex-1 flex-col px-4 pt-4 pb-3">
        <div className="relative aspect-square w-full overflow-hidden border border-[#c9c9c3] bg-[#d9d9d4]">
          {avatar && (
            <Image
              src={avatar}
              alt={avatarAlt}
              fill
              priority
              draggable={false}
              sizes="(max-width: 1024px) 220px, 300px"
              className="object-cover"
            />
          )}
        </div>

        <p className="mt-3 font-display text-[1.45rem] leading-[1] font-semibold tracking-[-0.03em] uppercase">
          {siteConfig.fullName.split(" ").map((w) => (
            <span key={w} className="block">{w}</span>
          ))}
        </p>

        <dl className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-1.5 font-mono text-label-sm tracking-[0.06em] uppercase">
          <Field label="Role" value="Full-stack dev" />
          <Field label="Based" value="Harare, ZW" />
          <Field label="ID no." value={siteConfig.githubUsername} />
          <Field label="Class of" value="2028" />
        </dl>

        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <Barcode value={siteConfig.githubUsername} />
          <TurnButton onClick={onTurn} label="Turn over" dark />
        </div>
      </div>
    </section>
  );
}

function Back({ hidden, onTurn }: { hidden: boolean; onTurn: () => void }) {
  return (
    <section
      aria-label="ID card, back"
      aria-hidden={hidden}
      inert={hidden}
      className={cn(face, "border-line bg-surface-2 px-4 pt-6 pb-3 [transform:rotateY(180deg)]")}
    >
      <span aria-hidden="true" className="absolute top-1.5 left-1/2 h-1.5 w-10 -translate-x-1/2 bg-bg" />
      <p className="font-mono text-label tracking-[0.16em] text-muted uppercase">Worked at</p>
      <ul className="mt-3 border-t border-line">
        {Object.values<Workplace>(WORKPLACES).map((place) => (
          <li key={place.name} className="border-b border-line py-2.5 text-[0.95rem] leading-tight text-ink">
            <WorkplaceName place={place} />
            {place.href && <span aria-hidden="true" className="ml-1 text-accent">↗</span>}
          </li>
        ))}
      </ul>

      <dl className="mt-5 space-y-2.5 font-mono text-label-sm tracking-[0.08em] uppercase">
        <div>
          <dt className="text-muted">Studying</dt>
          <dd className="mt-0.5 text-ink">BSc Computer Science, Africa University</dd>
        </div>
        <div>
          <dt className="text-muted">Issued</dt>
          <dd className="mt-0.5 text-ink">Harare, Zimbabwe</dd>
        </div>
      </dl>

      <p className="mt-auto pt-4 font-mono text-label-sm leading-[1.7] tracking-[0.08em] text-muted uppercase">
        If found, return to
        <a href={`mailto:${siteConfig.email}`} className="draw-underline block break-all text-ink normal-case tracking-normal">
          {siteConfig.email}
        </a>
      </p>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-mono text-label-sm tracking-[0.12em] text-muted uppercase">
          {siteConfig.timezone}
        </span>
        <TurnButton onClick={onTurn} label="Front" />
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[#55555c]">{label}</dt>
      <dd className="text-bg">{value}</dd>
    </div>
  );
}

function TurnButton({ onClick, label, dark }: { onClick: () => void; label: string; dark?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "press inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 font-mono text-label-sm tracking-[0.12em] uppercase transition-colors duration-200",
        dark ? "text-[#3a3a40] hover:text-bg" : "text-muted hover:text-ink",
      )}
    >
      <span aria-hidden="true">↻</span>
      {label}
    </button>
  );
}

/** Decorative bars derived from a string, so it is stable across renders. */
function Barcode({ value }: { value: string }) {
  let cursor = 0;
  const bars = [...value.repeat(2)].flatMap((ch) => {
    const code = ch.charCodeAt(0);
    return [1 + (code % 3), 1 + ((code >> 2) % 2)];
  });
  const rects = bars.map((w, i) => {
    const rect = i % 2 === 0 ? { x: cursor, w } : null;
    cursor += w + 1;
    return rect;
  });
  return (
    <svg aria-hidden="true" viewBox={`0 0 ${cursor} 20`} preserveAspectRatio="none" className="h-8 w-28 text-bg">
      {rects.map((r, i) => r && <rect key={i} x={r.x} width={r.w} height={20} fill="currentColor" />)}
    </svg>
  );
}
