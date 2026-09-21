import { useEffect, useRef } from 'react';
import { markIntroSeen } from '../lib/introStorage';
import './Intro.css';

/* ═══ First-Open Intro — signature + F1 car ═══
   Plays once per browser session (sessionStorage gate set in App).
   Blank Carbon canvas → "Lesley Mutsambiwa" signs itself in →
   a Formula 1 car races across below and off-screen → the overlay
   lifts off, revealing the site underneath.
   Skipped entirely for prefers-reduced-motion (App gates this too). */

function F1Car() {
  return (
    <svg
      className="intro-car__svg"
      viewBox="26 194 460 124"
      role="img"
      aria-label="Formula 1 car racing across"
    >
      {/* Real component — game-icons.net "f1-car" by skoll, CC BY 3.0.
          Source: https://game-icons.net/1x1/skoll/f1-car.html
          Solid background rect stripped, viewBox cropped to the car's
          bounding box, fills re-tokenized to the brand palette. */}
      <path
        d="M355.975 292.25a24.82 24.82 0 1 0 24.82-24.81 24.84 24.84 0 0 0-24.82 24.81zm-253-24.81a24.81 24.81 0 1 1-24.82 24.81 24.84 24.84 0 0 1 24.81-24.81zm-76.67-71.52h67.25l-13.61 49.28 92-50.28h57.36l1.26 34.68 32 14.76 11.74-14.44h15.62l3.16 16c137.56-13 192.61 29.17 192.61 29.17s-7.52 5-25.93 8.39c-3.88 3.31-3.66 14.44-3.66 14.44h24.2v16h-52v-27.48c-1.84.07-4.45.41-7.06.47a40.81 40.81 0 1 0-77.25 23h-204.24a40.81 40.81 0 1 0-77.61-17.67c0 1.24.06 2.46.17 3.67h-36z"
        className="intro-car__body"
      />
      {/* Accent hubs re-added on the *visual* wheel centers (brand violet).
          Rear M-point (102.975,267.44) = circle top → center (103,292).
          Front M-point (355.975,292.25) = circle LEFT edge → center (380.8,292.25),
          rounded to 381. Coordinates stay in original 512-space; the viewBox
          (26 194 460 124) only crops the display window. */}
      <circle cx="103" cy="292" r="11" className="intro-car__hub" />
      <circle cx="381" cy="292.25" r="11" className="intro-car__hub" />
    </svg>
  );
}

export default function Intro({ onDone }) {
  const overlayRef = useRef(null);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    markIntroSeen();
    onDone();
  };

  useEffect(() => {
    const overlay = overlayRef.current;

    // Choreography (ms): signature sweep → kicker → car launch → lift → done
    const tCar = window.setTimeout(() => overlay?.classList.add('is-car'), 1350);
    const tExit = window.setTimeout(() => overlay?.classList.add('is-exit'), 2750);
    const tDone = window.setTimeout(finish, 3650);

    // Any click or key finishes instantly (skip the show)
    const skip = () => finish();
    overlay?.addEventListener('click', skip);
    window.addEventListener('keydown', skip);

    // Lock background scroll while the intro covers the page
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.clearTimeout(tCar);
      window.clearTimeout(tExit);
      window.clearTimeout(tDone);
      overlay?.removeEventListener('click', skip);
      window.removeEventListener('keydown', skip);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="intro-overlay" ref={overlayRef} aria-hidden="true">
      <div className="intro-content">
        <h1 className="intro-signature" aria-hidden="true">
          Lesley Mutsambiwa
        </h1>
        <p className="intro-kicker" aria-hidden="true">
          Designer &amp; Developer — Harare
        </p>
      </div>

      <div className="intro-track" aria-hidden="true">
        <span className="intro-streak intro-streak--1" />
        <span className="intro-streak intro-streak--2" />
        <div className="intro-car">
          <F1Car />
        </div>
      </div>

      <span className="intro-skip" aria-hidden="true">Skip</span>
    </div>
  );
}