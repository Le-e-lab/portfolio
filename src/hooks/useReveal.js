import { useEffect, useRef } from 'react';

// Native scroll-reveal — replaces framer-motion whileInView.
// Adds `is-revealed` class when the element enters the viewport.
// Usage: <div ref={ref} className={`reveal ${inView ? 'is-revealed' : ''}`}>
export default function useReveal(options = {}) {
  const ref = useRef(null);
  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px' } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-revealed');
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
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}