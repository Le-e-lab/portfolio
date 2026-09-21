import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import MeshDrift from './MeshDrift';
import Icon from './Icon';
import './Layout.css';

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Per-route document titles (SEO + tab clarity)
  useEffect(() => {
    const titles = {
      '/': "Lesley's Lab | Designer & Developer in Harare, Zimbabwe",
      '/work': "Work | Lesley's Lab",
      '/about': "About | Lesley's Lab",
      '/contact': "Contact | Lesley's Lab",
    };
    document.title = titles[location.pathname] || "Page not found | Lesley's Lab";
  }, [location.pathname]);

  return (
    <div className="app">
      {/* Home backdrop. Rendered here, not inside .page-wrapper: that wrapper
          animates a filter, which becomes the containing block for a fixed
          canvas and would clip the field to the wrapper's box (short of the
          footer). As a shell sibling it covers the whole viewport. */}
      {isHome && <MeshDrift />}

      <Sidebar />
      <MobileNav />

      <main className="main-content">
        <div key={location.pathname} className="page-wrapper">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__note">
          © {year} Lesley&apos;s Lab — Designed &amp; built by Lesley.
        </p>
        <div className="site-footer__links">
          <a
            href="mailto:lesleymutsambiwa@gmail.com"
            className="site-footer__link"
          >
            <Icon name="envelope" size={13} />
            <span>Email</span>
          </a>
          <a
            href="https://github.com/Le-e-lab"
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer__link"
          >
            <Icon name="github" size={13} />
            <span>GitHub</span>
          </a>
          <button
            type="button"
            className="site-footer__back-top"
            onClick={scrollToTop}
          >
            Back to top
            <Icon name="arrow-up" size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}