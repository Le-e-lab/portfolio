import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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

  // Freeze body scroll while the route curtain sweeps (~1.1s)
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => { document.body.style.overflow = ''; }, 1150);
    return () => { clearTimeout(t); document.body.style.overflow = ''; };
  }, [location.pathname]);

  return (
    <div className="app">
      <Sidebar />
      <MobileNav />

      {/* Sliding Transition Curtain — pure CSS, keyed by route so it replays */}
      <div key={`curtain-${location.pathname}`} className={`curtain-overlay ${curtainClass(location.pathname)}`} aria-hidden="true">
        <div className="curtain-panel primary-curtain" />
        <div className="curtain-panel secondary-curtain" />
      </div>

      <main className="main-content">
        <div key={location.pathname} className="page-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
}