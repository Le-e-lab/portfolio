import { motion } from 'framer-motion';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import './Hero.css';

/* Stagger container */
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const titleWords = ['Hey,', "I'm", 'Lesley'];
const subtitleWords = ['a', 'Developer.'];

export default function Hero() {
  return (
    <section className="section hero-section">
      <motion.div
        className="hero-content"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Status Badge */}
        <motion.div className="status-badge" variants={fadeUp}>
          <span className="status-dot" />
          <span>Available for hire.</span>
        </motion.div>

        {/* Title with per-word 3D reveal */}
        <div className="hero-title">
          <div className="title-line">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                className="title-word"
                initial={{ opacity: 0, y: 50, rotateX: -30, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + i * 0.05,
                  ease: "easeOut",
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
          <div className="title-line">
            {subtitleWords.map((word, i) => (
              <motion.span
                key={i}
                className={`title-word ${i === 1 ? 'accent' : ''}`}
                initial={{ opacity: 0, y: 50, rotateX: -30, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.05,
                  ease: "easeOut",
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Social Buttons — staggered with spring */}
        <motion.div className="hero-socials" variants={fadeUp}>
          <motion.a
            href="/hire-me"
            className="social-btn hire-me-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 200, damping: 15 }}
            whileHover={{ y: -3, scale: 1.05, boxShadow: '0 0 20px rgba(167,139,250,0.3)' }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              background: 'var(--accent-lavender)', 
              color: '#fff',
              border: 'none',
              fontWeight: 600
            }}
          >
            Hire Me
          </motion.a>
          {[
            { href: 'https://mail.google.com/mail/?view=cm&fs=1&to=lesleymutsambiwa@gmail.com', icon: <HiOutlineEnvelope size={16} />, label: 'Email' },
            { href: 'https://github.com/Le-e-lab', icon: <FaGithub size={16} />, label: 'GitHub' },
            { href: 'https://www.linkedin.com/in/lesley-mutsambiwa/', icon: <FaLinkedinIn size={16} />, label: 'LinkedIn' },
          ].map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              className="social-btn"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.1, type: 'spring', stiffness: 200, damping: 15 }}
              whileHover={{ y: -3, scale: 1.05, boxShadow: '0 0 20px rgba(167,139,250,0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              {link.icon}
              {link.label}
            </motion.a>
          ))}
        </motion.div>

        {/* Bio */}
        <motion.p className="hero-bio" variants={fadeUp}>
          I&apos;m Lesley — a second-year Computer Science student at Africa University
          with a passion for building elegant digital experiences. I work at the
          intersection of web development, app development, and cybersecurity,
          always seeking to join innovative teams and startups where I can make
          an impact.
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="hero-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>

      {/* Floating ambient glows */}
      <motion.div
        className="hero-glow hero-glow-1"
        animate={{
          y: [0, -20, 0],
          opacity: [0.06, 0.1, 0.06],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="hero-glow hero-glow-2"
        animate={{
          y: [0, 15, 0],
          opacity: [0.04, 0.08, 0.04],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </section>
  );
}
