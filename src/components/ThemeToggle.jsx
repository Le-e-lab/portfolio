import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiMoon, HiSun } from 'react-icons/hi2';
import './ThemeToggle.css';

export default function ThemeToggle() {
  // Initialize with local storage OR system preference
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Listen for system changes if no override is set (optional, but good UX)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      // Only auto-switch if user hasn't manually toggled (simplified here by just updating if no LS, but we are setting LS on mount so this is tricky. 
      // Better: If we want to allow system override, we'd need a 'system' state.
      // For now, let's just respect initial load.
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <motion.button
      className="theme-toggle"
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
      aria-label="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'light' ? 180 : 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        {theme === 'light' ? (
          <HiSun size={20} className="theme-icon sun" />
        ) : (
          <HiMoon size={20} className="theme-icon moon" />
        )}
      </motion.div>
    </motion.button>
  );
}
