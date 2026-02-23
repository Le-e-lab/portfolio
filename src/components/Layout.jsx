import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import './Layout.css';

export default function Layout() {
  return (
    <div className="app">
      <Sidebar />
      <MobileNav />

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
