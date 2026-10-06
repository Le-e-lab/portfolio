"use client";

import { useRef } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/cn";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * One LazyMotion for the whole tree keeps the feature bundle small. Every
 * animated element must therefore use `m.*`, never `motion.*`.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}

export function Reveal({
  children,
  delay = 0,
  y = 10,
  duration = 0.6,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  as?: "div" | "li" | "span" | "section";
}) {
  const reduced = usePrefersReducedMotion();
  const off = reduced || !siteConfig.flags.storytelling;
  const Tag = m[as];

  // Reduced motion or the storytelling kill-switch renders the final state with
  // no animation. This still has to be an m.* element with an explicit visible
  // `initial`, not an early return: motion writes its hidden state as an inline
  // style on the first render, and React reuses that DOM node on the re-render
  // that follows the media query resolving. A plain tag leaves the stale
  // opacity:0 behind and the content never appears.
  return (
    <Tag
      data-reveal=""
      className={className}
      initial={off ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={off ? { duration: 0 } : { duration, ease: EASE_OUT, delay }}
    >
      {children}
    </Tag>
  );
}

/**
 * The name rises word by word out of a masked line.
 * Each word sits in an overflow-hidden box so it appears to slide up from
 * behind the baseline.
 */
export function MaskedWords({
  text,
  className,
  wordClassName,
  stagger = 0.08,
  duration = 0.7,
  delay = 0,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const off = reduced || !siteConfig.flags.storytelling;
  const words = text.split(" ");

  return (
    <span className={cn("inline", className)} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom"
          // Bottom padding keeps descenders from being clipped by the mask.
          style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
        >
          <m.span
            data-reveal=""
            className={cn("inline-block", wordClassName)}
            initial={off ? false : { y: "110%" }}
            animate={off ? undefined : { y: "0%" }}
            transition={{
              duration: off ? 0 : duration,
              ease: EASE_OUT,
              delay: off ? 0 : delay + i * stagger,
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </m.span>
        </span>
      ))}
    </span>
  );
}

/** Staggered container for lists. Fade + lift only. */
export function Stagger({
  children,
  className,
  stagger = 0.06,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduced = usePrefersReducedMotion();
  // With reduced motion the items resolve instantly, so no stagger delays.
  const effectiveStagger = reduced || !siteConfig.flags.storytelling ? 0 : stagger;

  const variants: Variants = {
    hidden: {},
    shown: { transition: { staggerChildren: effectiveStagger, delayChildren: delay } },
  };

  return (
    <m.div
      data-reveal=""
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 10,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const off = reduced || !siteConfig.flags.storytelling;

  const variants: Variants = off
    ? { hidden: { opacity: 1, y: 0 }, shown: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y },
        shown: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
      };

  return (
    <m.div data-reveal="" className={className} variants={variants}>
      {children}
    </m.div>
  );
}

/**
 * Scroll -> storytelling. Each word brightens from dim to full ink as the line
 * travels up through the viewport, so a statement reads at the pace of the
 * scroll. The real text stays in the DOM, so screen readers and copy-paste see
 * one plain sentence.
 */
export function ScrollWords({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.55"],
  });

  if (reduced || !siteConfig.flags.storytelling) {
    return (
      <span ref={ref} className={className}>
        {text}
      </span>
    );
  }

  const words = text.split(" ");
  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <ScrollWord
          key={`${word}-${i}`}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </ScrollWord>
      ))}
    </span>
  );
}

function ScrollWord({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  // Floor of 0.28 keeps the unread words legible, just quieter.
  const opacity = useTransform(progress, range, [0.28, 1]);
  return <m.span style={{ opacity }}>{children}</m.span>;
}
