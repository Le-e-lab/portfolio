import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import './LoadingScreen.css';

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1800);
    const t3 = setTimeout(() => setPhase(3), 3200);
    const t4 = setTimeout(() => onComplete(), 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          className="loader"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Background grain */}
          <div className="loader-grain" />

          {/* Brush stroke line */}
          <motion.div
            className="loader-stroke"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          />

          {/* Decorative circles */}
          <motion.div
            className="loader-circle loader-circle--1"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: phase >= 1 ? 1 : 0, opacity: phase >= 1 ? 0.06 : 0 }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          />
          <motion.div
            className="loader-circle loader-circle--2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: phase >= 1 ? 1 : 0, opacity: phase >= 1 ? 0.04 : 0 }}
            transition={{ duration: 1.8, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
          />

          {/* Logo */}
          <motion.div
            className="loader-logo"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0.8, y: phase >= 1 ? 0 : 20 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 3c0 0-9 10-9 18a9 9 0 0018 0c0-8-9-18-9-18z" fill="var(--teal)" opacity="0.9"/>
              <path d="M12 16l-3 3 3 3" stroke="var(--bg)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="M20 16l3 3-3 3" stroke="var(--bg)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="loader-name"
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 20, filter: phase >= 2 ? 'blur(0px)' : 'blur(8px)' }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            Lesley
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="loader-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 2 ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Developer · Designer · Builder
          </motion.p>

          {/* Progress */}
          <motion.div className="loader-progress">
            <motion.div
              className="loader-progress-bar"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: phase >= 1 ? 1 : 0 }}
              transition={{ duration: 3, ease: [0.23, 1, 0.32, 1] }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
