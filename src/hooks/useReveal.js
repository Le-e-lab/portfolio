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
export default function useReveal(options = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px' } = options;
  const observerRef = useRef(null);

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

  // Safety net: guarantee the observer is torn down when the component unmounts.
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  return ref;
}
