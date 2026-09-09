import { NavLink, useLocation } from 'react-router-dom';
import Icon from './Icon';
import './MobileNav.css';

const navItems = [
  { to: '/', icon: 'home', label: 'Home' },
  { to: '/work', icon: 'code-bracket', label: 'Work' },
  { to: '/about', icon: 'user', label: 'About' },
  { to: '/contact', icon: 'envelope', label: 'Contact' },
];

export default function MobileNav() {
  const location = useLocation();

  return (
    <nav className="bottombar">
      <div className="bottombar-inner">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`bottombar-item ${isActive ? 'bottombar-item--active' : ''}`}
            >
              {isActive && <span className="bottombar-active-bubble" />}

              <Icon name={item.icon} size={18} className="bottombar-icon" />
              <span className="bottombar-label font-mono">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}