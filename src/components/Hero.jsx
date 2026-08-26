import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import './Hero.css';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-content">
        {/* Portrait */}
        <motion.div
          className="hero-portrait"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="portrait-ring">
            <svg viewBox="0 0 200 200" className="portrait-svg">
              {/* Outer ring */}
              <circle cx="100" cy="100" r="96" stroke="#E8650A" strokeWidth="1" fill="none" opacity="0.3" />
              <circle cx="100" cy="100" r="90" stroke="#E8650A" strokeWidth="0.5" fill="none" opacity="0.15" strokeDasharray="4 6" />

              {/* Stylized face silhouette */}
              <ellipse cx="100" cy="82" rx="32" ry="38" fill="#1a1a1a" stroke="#E8650A" strokeWidth="1.2" />
              <ellipse cx="100" cy="135" rx="22" ry="16" fill="#1a1a1a" stroke="#E8650A" strokeWidth="1" />

              {/* Hair spikes */}
              <path d="M 72 65 L 65 40 L 80 55" fill="#1a1a1a" stroke="#E8650A" strokeWidth="1" />
              <path d="M 82 52 L 78 28 L 95 48" fill="#1a1a1a" stroke="#E8650A" strokeWidth="1" />
              <path d="M 100 48 L 102 22 L 115 48" fill="#1a1a1a" stroke="#E8650A" strokeWidth="1" />
              <path d="M 118 52 L 125 30 L 128 55" fill="#1a1a1a" stroke="#E8650A" strokeWidth="1" />
              <path d="M 130 65 L 138 42 L 125 58" fill="#1a1a1a" stroke="#E8650A" strokeWidth="1" />

              {/* Eyes */}
              <ellipse cx="88" cy="80" rx="5" ry="4" fill="#E8650A" opacity="0.8" />
              <ellipse cx="112" cy="80" rx="5" ry="4" fill="#E8650A" opacity="0.8" />
              <circle cx="89" cy="79" r="1.5" fill="#F5F0EB" />
              <circle cx="113" cy="79" r="1.5" fill="#F5F0EB" />

              {/* Subtle smile */}
              <path d="M 93 92 Q 100 97 107 92" stroke="#E8650A" strokeWidth="0.8" fill="none" opacity="0.5" />

              {/* Glow dots */}
              <circle cx="100" cy="100" r="98" fill="none" stroke="#E8650A" strokeWidth="0.3" opacity="0.1">
                <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="20s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
          <div className="portrait-glow" />
        </motion.div>

        {/* Name + Role */}
        <motion.div
          className="hero-text"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
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
      </div>
    </section>
  );
}
