// Session gate for the first-open intro. Kept out of Intro.jsx so the
// component module only exports components (fast-refresh friendly).

const INTRO_KEY = 'lsl-intro-seen';

export function introSeen() {
  try {
    return sessionStorage.getItem(INTRO_KEY) === '1';
  } catch {
    return true; // storage blocked — don't trap the visitor behind the intro
  }
}

export function markIntroSeen() {
  try {
    sessionStorage.setItem(INTRO_KEY, '1');
  } catch {
    /* ignore */
  }
}
