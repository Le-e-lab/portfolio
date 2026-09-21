import { useCallback, useEffect, useRef } from 'react';

// Native scroll-reveal — replaces framer-motion whileInView.
// Adds `is-revealed` class when the element enters the viewport.
// Usage: <div ref={ref} className={`reveal ${inView ? 'is-revealed' : ''}`}>
//
// Uses a callback ref so the IntersectionObserver is re-created whenever the
// attached DOM node changes (e.g. conditional rendering unmounts/remounts the
// element on filter toggles). A plain `useRef` + mount-only effect would bind
// the observer to the original node, leaving any remounted element stuck at
// the `.reveal` initial state (opacity: 0) forever.
//
// Safety nets (content must never stay hidden):
//   1. Elements already inside the viewport at attach time are revealed
//      immediately — no observer race, no flash of frozen opacity:0.
//   2. A last-resort timer force-reveals everything after `fallbackMs`
//      (default 6s) in case the observer never fires (print, screenshots,
//      exotic embeds). Normal scroll reveals are unaffected for the first
//      ~6 seconds of browsing.
export default function useReveal(options = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px', fallbackMs = 6000 } = options;
  const observerRef = useRef(null);
  const fallbackRef = useRef(null);

  const ref = useCallback(
    (node) => {
      // Detach from the previous node whenever React mounts/unmounts/remounts.
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (!node) return;

      if (!('IntersectionObserver' in window)) {
        node.classList.add('is-revealed');
        return;
      }

      // Reveal immediately if already inside the viewport (e.g. first screen
      // content on load, anchor jumps, or a remount during a filter toggle).
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top >= -vh && rect.top <= vh * 0.85) {
        node.classList.add('is-revealed');
      }

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold, rootMargin }
      );

      obs.observe(node);
      observerRef.current = obs;
    },
    [threshold, rootMargin]
  );

  // Last resort: if any element is still waiting on the observer after the
  // fallback window, reveal it. Guarantees content is never permanently hidden.
  useEffect(() => {
    if (fallbackMs <= 0) return undefined;
    fallbackRef.current = window.setTimeout(() => {
      document.querySelectorAll('.reveal:not(.is-revealed)').forEach((el) => {
        el.classList.add('is-revealed');
      });
    }, fallbackMs);
    return () => window.clearTimeout(fallbackRef.current);
  }, [fallbackMs]);

  // Safety net: guarantee the observer is torn down when the component unmounts.
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (fallbackRef.current) {
        window.clearTimeout(fallbackRef.current);
        fallbackRef.current = null;
      }
    };
  }, []);

  return ref;
}
