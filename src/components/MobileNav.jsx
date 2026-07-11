import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineHome, HiOutlineUser, HiOutlineCodeBracket, HiOutlineEnvelope } from 'react-icons/hi2';
import './MobileNav.css';

const navItems = [
  { to: '/', icon: HiOutlineHome, label: 'Home' },
  { to: '/work', icon: HiOutlineCodeBracket, label: 'Work' },
  { to: '/about', icon: HiOutlineUser, label: 'About' },
  { to: '/contact', icon: HiOutlineEnvelope, label: 'Contact' },
];

export default function MobileNav() {
  const location = useLocation();

  return (
    <nav className="bottombar">
      <div className="bottombar-inner">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`bottombar-item ${isActive ? 'bottombar-item--active' : ''}`}
            >
              {/* Active Background Capsule Overlay sliding smoothly */}
              {isActive && (
                <motion.div
                  className="bottombar-active-bubble"
                  layoutId="mobileNavBubble"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              
              <Icon size={18} className="bottombar-icon" />
              <span className="bottombar-label font-mono">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
