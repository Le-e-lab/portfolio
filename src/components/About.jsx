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

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } },
};

export default function About() {
  return (
    <section className="section about-section">
      <motion.div className="about-content" variants={container} initial="hidden" animate="visible">
        <motion.span className="section-number" variants={fadeUp}>03</motion.span>
        <motion.span className="section-label" variants={fadeUp}>About</motion.span>

        <motion.h2 className="about-heading" variants={fadeUp}>
          A night owl who codes <br />
          <span className="text-gradient">in the quiet.</span>
        </motion.h2>

        {/* Lewis Hamilton Quote */}
        <motion.div className="about-quote" variants={fadeUp}>
          <div className="quote-accent" />
          <div className="quote-body">
            <p className="quote-text">&quot;You have to believe in yourself when no one else does — that makes you a winner right there.&quot;</p>
            <span className="quote-attr">— Lewis Hamilton</span>
          </div>
        </motion.div>

        <motion.p className="about-bio" variants={fadeUp}>
          I build things that work — and look good doing it. As a second-year CS student
          at Africa University, I&apos;m focused on full-stack development with a designer&apos;s eye.
          I run Linux, I write clean code, and I ship projects that matter.
        </motion.p>

        <motion.p className="about-bio" variants={fadeUp}>
          When I&apos;m not coding, you&apos;ll find me watching F1, reading poetry,
          or hiking under the stars. I believe great software starts with great taste.
        </motion.p>

        {/* Tech Stack — Rotating Marquee */}
        <motion.div className="about-block" variants={fadeUp}>
          <h3 className="about-subtitle">Tech Stack</h3>
        </motion.div>
      </motion.div>

      {/* Marquee — full width */}
      <div className="tech-marquee">
        <div className="tech-marquee-track">
          {[...techStack, ...techStack, ...techStack].map((tech, i) => {
            const Icon = tech.icon;
            return (
              <div key={`${tech.name}-${i}`} className="tech-marquee-item">
                <Icon size={20} style={{ color: tech.color }} />
                <span>{tech.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
