import { useEffect, useState } from 'react';
import './LoadingScreen.css';

function prefersNoLoader() {
  if (typeof window === 'undefined') return true;
  // Skip brand loader on small screens / slow networks / reduced motion — content first.
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = window.matchMedia('(max-width: 768px)').matches;
  const slow = navigator.connection && navigator.connection.effectiveType
    && ['slow-2g', '2g', '3g'].includes(navigator.connection.effectiveType);
  return reduced || small || slow;
}

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState(0);
  const [skip] = useState(prefersNoLoader);

  useEffect(() => {
    if (skip) {
      onComplete();
      return;
    }
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => onComplete(), 1300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [skip, onComplete]);

  if (skip) return null;

  return (
    <div className={`loader ${phase >= 1 ? 'loader--ready' : ''} ${phase >= 2 ? 'loader--out' : ''}`}>
      <div className="loader-logo">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="32" fill="#0c0c0c" className="loader-circle" />
          <path
            d="M 18 18 L 18 46 L 24 46 L 24 32 L 34 46 L 42 46 L 32 30 L 42 18 L 34 18 L 24 30 L 24 18 Z"
            fill="#E8650A"
            fillRule="evenodd"
            className="loader-mark"
          />
        </svg>
      </div>

      <div className="loader-line" />
    </div>
  );
}