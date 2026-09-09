import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';

const navItems = [
  { to: '/', label: 'Home', num: '01' },
  { to: '/work', label: 'Work', num: '02' },
  { to: '/about', label: 'About', num: '03' },
  { to: '/contact', label: 'Contact', num: '04' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <nav className="sidenav">
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
            >
              <span
                className={`sidenav-item ${isActive ? 'sidenav-item--active' : ''}`}
                style={{ animationDelay: `${0.5 + i * 0.08}s` }}
              >
                <span className="sidenav-num">{item.num}</span>
                <span className="sidenav-label">{item.label}</span>
              </span>
            </NavLink>
          );
        })}
      </div>

      <div className="sidenav-bottom">
      </div>
    </nav>
  );
}