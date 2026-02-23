import { motion } from 'framer-motion';
import {
  FaReact, FaNodeJs, FaLinux, FaPython, FaGitAlt
} from 'react-icons/fa6';
import {
  SiJavascript, SiTypescript, SiTailwindcss, SiMongodb, SiFedora
} from 'react-icons/si';
import './About.css';

const techStack = [
  { icon: FaReact, name: 'React', color: '#61dafb' },
  { icon: SiJavascript, name: 'JavaScript', color: '#f7df1e' },
  { icon: FaNodeJs, name: 'Node.js', color: '#68a063' },
  { icon: FaPython, name: 'Python', color: '#3776ab' },
  { icon: FaLinux, name: 'Linux', color: '#fcc624' },
  { icon: SiFedora, name: 'Fedora', color: '#51a2da' },
  { icon: FaGitAlt, name: 'Git', color: '#f05032' },
  { icon: SiMongodb, name: 'MongoDB', color: '#47a248' },
  { icon: SiTailwindcss, name: 'Tailwind', color: '#38bdf8' },
  { icon: SiTypescript, name: 'TypeScript', color: '#3178c6' },
];

const interests = [
  { label: 'Gaming', emoji: '🎮' },
  { label: 'F1', emoji: '🏎️' },
  { label: 'Poetry', emoji: '📜' },
  { label: 'Hiking', emoji: '🥾' },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function About() {
  return (
    <section className="section about-section">
      <motion.div
        className="about-content"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.span className="section-label" variants={fadeUp}>
          About Me
        </motion.span>

        <motion.h2 className="about-heading" variants={fadeUp}>
          A night owl who codes <br />
          <span className="text-gradient">in the quiet.</span>
        </motion.h2>

        <motion.div className="about-poem" variants={fadeUp}>
           <p className="poem-text">
            &quot;Rest if you must, but don’t you quit.&quot;
           </p>
           <p className="poem-text">
            &quot;You are the handicap you must face, / You are the one who must choose your place.&quot;
           </p>
           <span className="poem-author">— Edgar Albert Guest, <em>Motivation</em></span>
        </motion.div>

        <motion.p className="about-bio" variants={fadeUp}>
          I thrive in the quiet hours — when the world slows down. That&apos;s when I build my best work. As a CS student at
          Africa University, I&apos;m deeply passionate about crafting beautiful web
          and mobile applications. I run Linux (Fedora & CachyOS), dabble in
          cybersecurity, and I&apos;m always looking for my next startup to contribute to.
        </motion.p>

        <motion.p className="about-bio" variants={fadeUp}>
          Beyond the screen, you&apos;ll find me reading poetry, watching F1 races,
          or planning my next hiking trip under the stars. I believe in clean code
          and clean aesthetics.
        </motion.p>

        {/* Tech Stack */}
        <motion.div className="about-tech" variants={fadeUp}>
          <h3 className="about-subtitle">Tech Stack</h3>
          <div className="tech-grid">
            {techStack.map((tech, i) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  className="tech-badge"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.06, type: 'spring', stiffness: 200 }}
                  whileHover={{
                    y: -4,
                    boxShadow: `0 0 20px ${tech.color}22`,
                    borderColor: `${tech.color}44`,
                  }}
                >
                  <Icon size={18} style={{ color: tech.color }} />
                  <span>{tech.name}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Interests */}
        <motion.div className="about-interests" variants={fadeUp}>
          <h3 className="about-subtitle">What I Love</h3>
          <div className="interests-grid">
            {interests.map((item, i) => (
              <motion.div
                key={item.label}
                className="interest-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{
                  y: -6,
                  scale: 1.05,
                  transition: { type: 'spring', stiffness: 300 },
                }}
              >
                <span className="interest-emoji">{item.emoji}</span>
                <span className="interest-label">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
