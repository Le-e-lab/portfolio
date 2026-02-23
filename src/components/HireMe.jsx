import { motion } from 'framer-motion';
import { HiOutlineDownload, HiOutlineArrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import './HireMe.css';

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const reasonsToHire = [
  {
    title: "Full-Stack Capable",
    desc: "From React frontends to Node.js backends and Python scripts, I build complete solutions.",
    icon: "💻"
  },
  {
    title: "Problem Solver",
    desc: "I don't just write code; I solve distinct business problems with efficient, scalable logic.",
    icon: "🧩"
  },
  {
    title: "Quick Learner",
    desc: "Adapting to new stacks (like Fedora/Linux configs) is second nature to me.",
    icon: "⚡"
  },
  {
    title: "Design Sensibility",
    desc: "I care about the pixels. Clean aesthetics, glassmorphism, and smooth animations matter.",
    icon: "🎨"
  }
];

export default function HireMe() {
  const navigate = useNavigate();

  return (
    <section className="section hire-me-section">
      <motion.div
        className="hire-me-content"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.button 
          className="back-btn"
          onClick={() => navigate('/')}
          variants={fadeUp}
          whileHover={{ x: -4 }}
        >
          <HiOutlineArrowLeft size={16} />
          Back to Portfolio
        </motion.button>

        <motion.span className="section-label" variants={fadeUp}>
          Recruitment
        </motion.span>

        <motion.h1 className="hire-heading" variants={fadeUp}>
          Ready to make an <br />
          <span className="text-gradient">Impact.</span>
        </motion.h1>

        <motion.p className="hire-bio" variants={fadeUp}>
          I&apos;m currently open to <strong>internships, freelance, and junior developer roles</strong>.
          If you&apos;re looking for a developer who blends technical skill with a keen eye for design
          and a &quot;night owl&quot; work ethic, let&apos;s talk.
        </motion.p>

        <motion.div className="hire-actions" variants={fadeUp}>
          <motion.a 
            href="/Lesley_Mutsambiwa_Resume.docx" 
            download="Lesley_Mutsambiwa_Resume.docx"
            className="resume-btn"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <HiOutlineDownload size={18} />
            Download Resume
          </motion.a>
          
          <motion.a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=lesleymutsambiwa@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn-alt"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Me directly
          </motion.a>
        </motion.div>

        <div className="hire-grid">
          {reasonsToHire.map((reason) => (
            <motion.div 
              key={reason.title} 
              className="hire-card glass"
              variants={fadeUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <span className="hire-icon">{reason.icon}</span>
              <h3 className="hire-card-title">{reason.title}</h3>
              <p className="hire-card-desc">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
