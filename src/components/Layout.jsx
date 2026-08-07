import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import usePaintBrush from '../hooks/usePaintBrush';
import './Layout.css';

// Dynamic transition variants based on route pathname
const getTransitionStyle = (path, isSecondary = false) => {
  const delay = isSecondary ? 0.08 : 0;
  
  switch (path) {
    case '/work':
      // Vertical Blind (Top-to-Bottom Shutter)
      return {
        initial: { y: '-100%', x: '0%', scale: 1, rotate: 0, borderRadius: '0%' },
        animate: { 
          y: ['-100%', '0%', '100%'],
          x: '0%',
          scale: 1,
          rotate: 0,
          borderRadius: '0%',
          transition: { duration: 1.1, times: [0, 0.45, 1], ease: [0.76, 0, 0.24, 1], delay }
        }
      };
    case '/about':
      // Diagonal Shutter (Slide from top-left to bottom-right)
      return {
        initial: { x: '-130%', y: '-130%', scale: 1.5, rotate: -25, borderRadius: '0%' },
        animate: { 
          x: ['-130%', '0%', '130%'],
          y: ['-130%', '0%', '130%'],
          scale: 1.5,
          rotate: -25,
          borderRadius: '0%',
          transition: { duration: 1.25, times: [0, 0.45, 1], ease: [0.76, 0, 0.24, 1], delay }
        }
      };
    case '/contact':
      // Scale-up Iris Circle Cover
      return {
        initial: { scale: 0, opacity: 1, x: '0%', y: '0%', rotate: 0, borderRadius: '50%' },
        animate: { 
          scale: [0, 2.2, 3.5],
          opacity: [1, 1, 0],
          x: '0%',
          y: '0%',
          rotate: 0,
          borderRadius: '50%',
          transition: { duration: 1.2, times: [0, 0.5, 1], ease: [0.76, 0, 0.24, 1], delay }
        }
      };
    default:
      // Horizontal Sweep (Left-to-Right) for Home (/)
      return {
        initial: { x: '-100%', y: '0%', scale: 1, rotate: 0, borderRadius: '0%' },
        animate: { 
          x: ['-100%', '0%', '100%'],
          y: '0%',
          scale: 1,
          rotate: 0,
          borderRadius: '0%',
          transition: { duration: 1.1, times: [0, 0.45, 1], ease: [0.76, 0, 0.24, 1], delay }
        }
      };
  }
};

export default function Layout() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  usePaintBrush();

  // Trigger transitions on pathname change (state is reset by curtain onAnimationComplete)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- deliberate route-change trigger, not a render cascade
    setIsTransitioning(true);
  }, [location.pathname]);

  return (
    <div className="app">
      <Sidebar />
      <MobileNav />

      {/* Sliding Transition Curtain Overlay - dynamically unmounted once finished */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key={`curtain-${location.pathname}`}
            className="curtain-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            {/* Primary curtain (forest green) */}
            <motion.div 
              className="curtain-panel primary-curtain" 
              initial="initial"
              animate="animate"
              variants={getTransitionStyle(location.pathname, false)}
            />
            {/* Secondary curtain (graphite) */}
            <motion.div 
              className="curtain-panel secondary-curtain"
              initial="initial"
              animate="animate"
              variants={getTransitionStyle(location.pathname, true)}
              onAnimationComplete={() => {
                // Secondary curtain delay represents full transition cover duration
                setIsTransitioning(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            className="page-wrapper"
            variants={{
              initial: { opacity: 0, y: 15 },
              enter: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] } },
              exit: { opacity: 0, y: -10, transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] } }
            }}
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
