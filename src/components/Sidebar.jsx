import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineCodeBracket,
  HiOutlineSparkles,
  HiOutlineEnvelope,
} from 'react-icons/hi2';
import ThemeToggle from './ThemeToggle';
import './Sidebar.css';

const navItems = [
  { to: '/', icon: HiOutlineHome, label: 'Home' },
  { to: '/about', icon: HiOutlineUser, label: 'About' },
  { to: '/projects', icon: HiOutlineCodeBracket, label: 'Projects' },
  { to: '/interests', icon: HiOutlineSparkles, label: 'Interests' },
  { to: '/contact', icon: HiOutlineEnvelope, label: 'Contact' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <motion.nav
      className="sidebar"
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
    >
      <div className="sidebar-inner">
        <motion.div
          className="sidebar-logo"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          L
        </motion.div>

        <div className="sidebar-nav">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className="sidebar-link"
                title={item.label}
              >
                <motion.div
                  className={`sidebar-btn ${isActive ? 'active' : ''}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={20} />
                  {isActive && (
                    <motion.div
                      className="active-indicator"
                      layoutId="activeNav"
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                </motion.div>
              </NavLink>
            );
          })}
        </div>
        
        <div className="sidebar-footer">
           <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
}
