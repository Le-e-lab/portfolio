import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import './Hero.css';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      {/* Background image */}
      <div className="hero-bg">
        <img
          src="/portfolio/images/hero-portrait.jpg"
          alt=""
          className="hero-bg-img"
        />
        <div className="hero-bg-overlay" />
      </div>

      {/* Content */}
      <motion.div
        className="hero-content"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero-status" variants={fadeUp}>
          <span className="hero-dot" />Available for work
        </motion.div>

        <motion.h1 className="hero-name" variants={fadeUp}>
          Lesley
        </motion.h1>

        <motion.p className="hero-role" variants={fadeUp}>
          Developer <span className="hero-amp">&</span> Designer
        </motion.p>

        <motion.p className="hero-desc" variants={fadeUp}>
          Full-stack applications with type safety and visual design. CS student at Africa University, building from Harare to the world.
        </motion.p>

        <motion.div className="hero-pills" variants={fadeUp}>
          {['React', 'Node.js', 'Python', 'Linux'].map((t) => (
            <span key={t} className="hero-pill">{t}</span>
          ))}
        </motion.div>

        <motion.div className="hero-ctas" variants={fadeUp}>
          <button className="cta-primary" onClick={() => navigate('/work')}>
            View Work
          </button>
          <button className="cta-secondary" onClick={() => navigate('/contact')}>
            Let&apos;s Talk
          </button>
        </motion.div>

        <motion.div className="hero-socials" variants={fadeUp}>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=lesleymutsambiwa@gmail.com" className="hero-social interactive">
            <HiOutlineEnvelope size={14} /> <span>Email</span>
          </a>
          <a href="https://github.com/Le-e-lab" target="_blank" rel="noreferrer" className="hero-social interactive">
            <FaGithub size={14} /> <span>GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/lesley-mutsambiwa/" target="_blank" rel="noreferrer" className="hero-social interactive">
            <FaLinkedinIn size={14} /> <span>LinkedIn</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
