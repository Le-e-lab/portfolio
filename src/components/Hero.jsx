import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import MagneticButton from './MagneticButton';
import './Hero.css';

const letterReveal = {
  hidden: { opacity: 0, y: 120, rotateX: -60 },
  visible: (i) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { duration: 1.1, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

const clipReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
  visible: { clipPath: 'inset(0 0% 0 0)', opacity: 1, transition: { duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 1.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const F1CircuitGraphic = () => {
  const trackPath = "M 60,100 L 300,100 C 330,100 350,120 340,150 C 330,180 300,190 320,220 C 340,250 370,270 340,300 L 220,340 C 180,350 150,330 140,290 C 130,250 90,200 60,160 C 40,130 40,100 60,100 Z";
  return (
    <div className="f1-circuit-container">
      <svg viewBox="0 0 400 400" className="blueprint-svg f1-circuit-svg">
        {/* Track Outline Background Grid */}
        <line x1="200" y1="5" x2="200" y2="395" stroke="var(--teal)" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.12" />
        <line x1="5" y1="200" x2="395" y2="200" stroke="var(--teal)" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.12" />

        {/* F1 Circuit Track Path */}
        <path 
          d={trackPath} 
          stroke="var(--teal)" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none" 
          opacity="0.8" 
        />
        
        {/* F1 Circuit Track Path Inner details */}
        <path 
          d={trackPath} 
          stroke="var(--bg)" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none" 
          opacity="1" 
        />
        
        {/* Dotted racing line guide */}
        <path 
          d={trackPath} 
          stroke="var(--amber)" 
          strokeWidth="0.5" 
          strokeDasharray="4 6" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none" 
          opacity="0.5" 
        />

        {/* Track Corner Skill Names & Coordinates */}
        <g className="track-labels">
          {/* Turn 1: Node Straight */}
          <text x="180" y="85" fill="var(--text)" className="svg-text label-title">NODE STRAIGHT</text>
          <circle cx="180" cy="100" r="3" fill="var(--teal)" />
          
          {/* Turn 2: React Chicane */}
          <text x="310" y="240" fill="var(--text)" className="svg-text label-title">REACT CHICANE</text>
          <circle cx="320" cy="220" r="3" fill="var(--teal)" />
          
          {/* Turn 3: Python Hairpin */}
          <text x="210" y="365" fill="var(--text)" className="svg-text label-title">PYTHON HAIRPIN</text>
          <circle cx="220" cy="340" r="3" fill="var(--teal)" />

          {/* Turn 4: Linux Sweeper */}
          <text x="20" y="180" fill="var(--text)" className="svg-text label-title">LINUX SWEEPER</text>
          <circle cx="65" cy="160" r="3" fill="var(--teal)" />
          
          {/* Track Stats */}
          <text x="25" y="35" fill="var(--text-muted)" className="svg-text font-mono" opacity="0.6">CIRCUIT: LSL_DEV_V6</text>
          <text x="25" y="48" fill="var(--text-muted)" className="svg-text font-mono" opacity="0.6">LENGTH: 4.86 KM</text>
          <text x="25" y="61" fill="var(--text-muted)" className="svg-text font-mono" opacity="0.6">RECORD: 1:14.286</text>
        </g>
      </svg>

      {/* Animating F1 Car Dot */}
      <div className="f1-car-dot" />
    </div>
  );
};

export default function Hero() {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const nameLetters = 'Lesley'.split('');

  // Mobile Speedometer Booster widget states
  const [engineSpeed, setEngineSpeed] = useState(0);
  const [isRevving, setIsRevving] = useState(false);
  const boosterAnimationRef = useRef(null);

  const engageBooster = () => {
    if (isRevving) return;
    setIsRevving(true);
    let startTimestamp = null;
    const duration = 2400; // 2.4s total animation cycle

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;

      if (progress < duration) {
        const halfTime = duration * 0.55;
        let speedVal = 0;
        
        if (progress < halfTime) {
          // Accelerate to 312 KM/H
          const t = progress / halfTime;
          speedVal = 312 * t * t;
        } else {
          // Decelerate back to idle (0)
          const t = (progress - halfTime) / (duration - halfTime);
          speedVal = 312 * (1 - t * t);
        }
        
        setEngineSpeed(Math.max(0, speedVal));
        boosterAnimationRef.current = requestAnimationFrame(step);
      } else {
        setEngineSpeed(0);
        setIsRevving(false);
      }
    };

    boosterAnimationRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    return () => {
      if (boosterAnimationRef.current) {
        cancelAnimationFrame(boosterAnimationRef.current);
      }
    };
  }, []);

  return (
    <section className="hero" ref={ref}>
      {/* Blueprint Grid Overlay background */}
      <div className="hero-blueprint-bg" />

      {/* Absolutely Positioned F1 Track Background behind content layers */}
      <F1CircuitGraphic />
      
      <motion.div className="hero-grid" style={{ y: heroY }}>
        {/* COLUMN 1: Content details (takes left area) */}
        <div className="hero-grid-col content-col">
          <motion.div 
            className="hero-status" 
            initial={{ opacity: 0, x: -15 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hero-dot" />Available for work
          </motion.div>

          <div className="hero-title">
            <h1 className="hero-name">
              {nameLetters.map((letter, i) => (
                <div key={i} className="letter-wrapper">
                  <motion.span 
                    className="hero-letter" 
                    custom={i} 
                    variants={letterReveal} 
                    initial="hidden" 
                    animate="visible"
                  >
                    {letter}
                  </motion.span>
                </div>
              ))}
            </h1>
            <motion.div className="hero-subtitle" variants={clipReveal} initial="hidden" animate="visible">
              <span className="hero-prefix">I&apos;m a</span>
              <span className="hero-role text-gradient">Developer.</span>
            </motion.div>
          </div>

          <motion.p 
            className="hero-desc" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            I build fast full-stack applications with a focus on type safety and visual design. When I&apos;m not studying CS, you&apos;ll find me writing custom script tools, configuring bspwm/Linux configs, or building responsive interfaces.
          </motion.p>

          <motion.div className="hero-pills" variants={stagger} initial="hidden" animate="visible">
            {['React', 'Node.js', 'Python', 'Linux', 'Cybersecurity'].map((t) => (
              <motion.span key={t} className="hero-pill" variants={fadeUp}>{t}</motion.span>
            ))}
          </motion.div>

          <motion.div className="hero-ctas" variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={fadeUp}>
              <MagneticButton className="cta-primary" onClick={() => navigate('/work')}>
                View Work →
              </MagneticButton>
            </motion.div>
            <motion.div variants={fadeUp}>
              <MagneticButton className="cta-secondary" onClick={() => navigate('/contact')}>
                Let&apos;s Talk
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Socials horizontal row under CTAs */}
          <motion.div 
            className="hero-socials-horizontal" 
            variants={stagger} 
            initial="hidden" 
            animate="visible"
          >
            {[
              { href: 'https://mail.google.com/mail/?view=cm&fs=1&to=lesleymutsambiwa@gmail.com', icon: <HiOutlineEnvelope size={14} />, label: 'Email' },
              { href: 'https://github.com/Le-e-lab', icon: <FaGithub size={14} />, label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/lesley-mutsambiwa/', icon: <FaLinkedinIn size={14} />, label: 'LinkedIn' },
            ].map((link) => (
              <motion.a 
                key={link.label} 
                href={link.href} 
                target={link.href.startsWith('mailto') ? undefined : '_blank'} 
                rel="noreferrer" 
                className="hero-social interactive" 
                variants={fadeUp} 
                whileHover={{ y: -2 }}
              >
                {link.icon}
                <span>{link.label}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* Speedometer Mobile Widget (shows on mobile < 768px only) */}
          <div className="speedometer-mobile-wrap">
            <span className="speedometer-lbl font-mono">BOOSTER_CONSOLE // TOUCH INITIATE</span>
            <div className={`speed-dial-display ${isRevving ? 'pulse-active' : ''}`}>
              <div className="speed-val font-mono">
                {Math.floor(engineSpeed)} <span className="speed-unit">KM/H</span>
              </div>
              <div className="speed-dial-bar">
                <div 
                  className="speed-dial-fill" 
                  style={{ width: `${(engineSpeed / 312) * 100}%` }} 
                />
              </div>
            </div>
            <button 
              onClick={engageBooster}
              disabled={isRevving}
              className="engage-booster-btn font-mono interactive"
            >
              {isRevving ? 'BOOSTER_ENGAGED' : '[ ENGAGE ENGINE BOOSTER ]'}
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
