import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import usePaintBrush from '../hooks/usePaintBrush';
import './Layout.css';

const pageVariants = {
  initial: { opacity: 0, y: 40, filter: 'blur(8px)' },
  enter: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } },
  exit: { opacity: 0, y: -20, filter: 'blur(6px)', transition: { duration: 0.35, ease: [0.77, 0, 0.175, 1] } },
};

export default function Layout() {
  const location = useLocation();
  usePaintBrush();

  return (
    <div className="app">
      <Sidebar />
      <MobileNav />

      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            className="page-wrapper"
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
