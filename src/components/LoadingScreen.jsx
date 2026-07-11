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
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Background grain */}
          <div className="loader-grain" />

          {/* Brush stroke line */}
          <motion.div
            className="loader-stroke"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Decorative circles */}
          <motion.div
            className="loader-circle loader-circle--1"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: phase >= 1 ? 1 : 0, opacity: phase >= 1 ? 0.05 : 0 }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="loader-circle loader-circle--2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: phase >= 1 ? 1 : 0, opacity: phase >= 1 ? 0.03 : 0 }}
            transition={{ duration: 1.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Redesigned Custom Interlocking Geometric Logo */}
          <motion.div
            className="loader-logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Outer Hexagon Outline */}
              <motion.polygon 
                points="50,10 85,30 85,70 50,90 15,70 15,30" 
                stroke="var(--teal)" 
                strokeWidth="1.5" 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
              />
              
              {/* Interlocking geometric background blueprint lines */}
              <motion.line x1="50" y1="10" x2="50" y2="90" stroke="var(--teal)" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.15" />
              <motion.line x1="15" y1="30" x2="85" y2="70" stroke="var(--teal)" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.15" />
              <motion.line x1="15" y1="70" x2="85" y2="30" stroke="var(--teal)" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.15" />

              {/* L Initial stylized path */}
              <motion.path 
                d="M 32,35 L 32,65 C 32,68 35,68 38,68 L 48,68" 
                stroke="var(--teal)" 
                strokeWidth="2.5" 
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
              />

              {/* M Stylized overlapping Infinity Loop path */}
              <motion.path 
                d="M 44,68 C 47,68 47,42 52,42 C 57,42 57,68 62,68 C 67,68 68,52 68,35" 
                stroke="var(--amber)" 
                strokeWidth="2.5" 
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.4, ease: "easeInOut", delay: 0.7 }}
              />

              {/* Interlocking Glowing Nodes (overlapping points) */}
              <motion.circle 
                cx="32" cy="35" r="3" 
                fill="var(--teal)" 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.3 }}
              />
              <motion.circle 
                cx="68" cy="35" r="3" 
                fill="var(--amber)" 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6, duration: 0.3 }}
              />
              <motion.circle 
                cx="52" cy="42" r="2.5" 
                fill="var(--teal)" 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, duration: 0.3 }}
              />
            </svg>
          </motion.div>

          {/* Name in Antonio font */}
          <motion.h1
            className="loader-name font-display"
            initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
            animate={{ 
              opacity: phase >= 2 ? 1 : 0, 
              y: phase >= 2 ? 0 : 15, 
              filter: phase >= 2 ? 'blur(0px)' : 'blur(6px)' 
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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

          {/* Progress bar */}
          <motion.div className="loader-progress">
            <motion.div
              className="loader-progress-bar"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: phase >= 1 ? 1 : 0 }}
              transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
