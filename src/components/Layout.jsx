import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import './Layout.css';

// Route → curtain direction class (CSS keyframes handle the wipe)
const curtainClass = (path) => {
  switch (path) {
    case '/work': return 'curtain--vertical';
    case '/about': return 'curtain--diagonal';
    case '/contact': return 'curtain--iris';
    default: return 'curtain--horizontal';
  }
};

export default function Layout() {
  const location = useLocation();
  const [curtain, setCurtain] = useState(false);
  const reducedRef = useRef(false);

  // Respect prefers-reduced-motion: no sweeping curtain at all
  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Mount the curtain on route change, then unmount it once the wipe settles
  // (kept mounted => full-screen black overlay at base state — the blank-screen bug)
  useEffect(() => {
    if (reducedRef.current) {
      document.body.style.overflow = '';
      return;
    }
    setCurtain(true);
    document.body.style.overflow = 'hidden';
    const unlock = setTimeout(() => { document.body.style.overflow = ''; }, 950);
    const hide = setTimeout(() => setCurtain(false), 1150);
    return () => { clearTimeout(unlock); clearTimeout(hide); document.body.style.overflow = ''; };
  }, [location.pathname]);

  return (
    <div className="app">
      <Sidebar />
      <MobileNav />

      {/* Sliding Transition Curtain — unmounts after the wipe */}
      {curtain && (
        <div className={`curtain-overlay ${curtainClass(location.pathname)}`} aria-hidden="true">
          <div className="curtain-panel primary-curtain" />
          <div className="curtain-panel secondary-curtain" />
        </div>
      )}

      <main className="main-content">
        <div key={location.pathname} className="page-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
}