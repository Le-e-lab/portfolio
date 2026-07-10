import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import './Sidebar.css';

const navItems = [
  { to: '/', label: 'Home', num: '01' },
  { to: '/work', label: 'Work', num: '02' },
  { to: '/about', label: 'About', num: '03' },
  { to: '/contact', label: 'Contact', num: '04' },
];

export default function Sidebar() {
  const location = useLocation();
  const [hovered, setHovered] = useState(null);

  return (
    <motion.nav
      className="sidenav"
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.5 }}
    >
      {/* Vertical line */}
      <div className="sidenav-line" />

      {/* Nav items — vertical text on right edge */}
      <div className="sidenav-items">
        {navItems.map((item, i) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className="sidenav-link"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <motion.span
                className={`sidenav-item ${isActive ? 'sidenav-item--active' : ''}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.08 }}
              >
                <span className="sidenav-num">{item.num}</span>
                <span className="sidenav-label">{item.label}</span>
              </motion.span>
            </NavLink>
          );
        })}
      </div>

      {/* Theme toggle — bottom */}
      <div className="sidenav-bottom">
        <ThemeToggle />
      </div>
    </motion.nav>
  );
}
