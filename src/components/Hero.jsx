import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import './Hero.css';

const letterReveal = {
  hidden: { opacity: 0, y: 60, rotateX: -40 },
  visible: (i) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { duration: 0.8, delay: 0.3 + i * 0.08, ease: [0.23, 1, 0.32, 1] },
  }),
};

const clipReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
  visible: { clipPath: 'inset(0 0% 0 0)', opacity: 1, transition: { duration: 1, delay: 0.9, ease: [0.23, 1, 0.32, 1] } },
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const nameLetters = 'Lesley'.split('');

  return (
    <section className="hero" ref={ref}>
      <div className="hero-content" style={{ transform: `translateY(${textY.get()}px)` }}>
        {/* Left — text */}
        <div className="hero-text-col">
          <motion.div className="hero-status" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}>
            <span className="hero-dot" />Available for work
          </motion.div>

          <div className="hero-title">
            <h1 className="hero-name">
              {nameLetters.map((letter, i) => (
                <motion.span key={i} className="hero-letter" custom={i} variants={letterReveal} initial="hidden" animate="visible">{letter}</motion.span>
              ))}
            </h1>
            <motion.div className="hero-subtitle" variants={clipReveal} initial="hidden" animate="visible">
              <span className="hero-prefix">I&apos;m a</span>
              <span className="hero-role text-gradient">Developer.</span>
            </motion.div>
          </div>

          <motion.p className="hero-desc" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2, ease: [0.23, 1, 0.32, 1] }}>
            Full-stack developer & CS student crafting elegant digital experiences from Harare to the world. With a background in graphic design, I bring visual thinking to every project. Open for freelance and collaborations.
          </motion.p>

          <motion.div className="hero-pills">
            {['React', 'Node.js', 'Python', 'Linux', 'Cybersecurity'].map((t, i) => (
              <motion.span key={t} className="hero-pill" initial={{ opacity: 0, y: 15, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 1.4 + i * 0.07, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}>{t}</motion.span>
            ))}
          </motion.div>

          <motion.div className="hero-ctas">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7, type: 'spring', stiffness: 120, damping: 14 }} whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link to="/work" className="cta-primary">View Work →</Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, type: 'spring', stiffness: 120, damping: 14 }} whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link to="/contact" className="cta-secondary">Let&apos;s Talk</Link>
            </motion.div>
          </motion.div>

          <motion.div className="hero-socials">
            {[
              { href: 'https://mail.google.com/mail/?view=cm&fs=1&to=lesleymutsambiwa@gmail.com', icon: <HiOutlineEnvelope size={14} />, label: 'Email' },
              { href: 'https://github.com/Le-e-lab', icon: <FaGithub size={14} />, label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/lesley-mutsambiwa/', icon: <FaLinkedinIn size={14} />, label: 'LinkedIn' },
            ].map((link, i) => (
              <motion.a key={link.label} href={link.href} target={link.href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer" className="hero-social" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 + i * 0.1, duration: 0.5 }} whileHover={{ y: -2 }}>
                {link.icon}{link.label}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Right — Veni Vidi Vici */}
        <motion.div className="hero-brush-accent" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 1.5, ease: [0.23, 1, 0.32, 1] }}>
          <span className="hero-brush-word">Veni</span>
          <span className="hero-brush-word">Vidi</span>
          <span className="hero-brush-word hero-brush-word--lg">Vici</span>
          <div className="hero-brush-sub">
            <span>I came.</span>
            <span>I saw.</span>
            <span>I conquered.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
