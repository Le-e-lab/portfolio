import { motion } from 'framer-motion';
import './Interests.css';

const poetryLines = [
  "The heights by great men reached and kept",
  "Were not attained by sudden flight,",
  "But they, while their companions slept,",
  "Were toiling upward in the night."
];

const passionCards = [
  {
    title: 'Formula 1',
    description: 'The engineering mastery, the split-second decisions, the raw speed. F1 is poetry in motion at 200mph.',
    visual: '🏎️',
    gradient: 'linear-gradient(135deg, rgba(230, 35, 35, 0.15), rgba(255, 107, 0, 0.15))',
    border: 'rgba(230, 35, 35, 0.3)'
  },
  {
    title: 'Night & Rain',
    description: "There's a certain magic to coding at 2 AM while rain hammers the window. My most productive hours.",
    visual: '🌧️',
    gradient: 'linear-gradient(135deg, rgba(88, 166, 255, 0.15), rgba(167, 139, 250, 0.15))',
    border: 'rgba(88, 166, 255, 0.3)'
  },
  {
    title: 'Nature & Stars',
    description: 'Hiking to the highest point and lying under a blanket of stars. Perspective that no screen can offer.',
    visual: '✨',
    gradient: 'linear-gradient(135deg, rgba(52, 211, 153, 0.15), rgba(251, 191, 36, 0.15))',
    border: 'rgba(52, 211, 153, 0.3)'
  },
  {
    title: 'Poetry & Reading',
    description: 'From Rumi to Neruda, from tech docs to philosophy. Words shape how I think and how I build.',
    visual: '📖',
    gradient: 'linear-gradient(135deg, rgba(212, 165, 116, 0.15), rgba(167, 139, 250, 0.15))',
    border: 'rgba(212, 165, 116, 0.3)'
  },
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

export default function Interests() {
  return (
    <section className="section interests-section">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.span className="section-label" variants={fadeUp}>
          Interests
        </motion.span>

        <motion.h2 className="interests-heading" variants={fadeUp}>
          Beyond the <span className="text-gradient">Code</span>
        </motion.h2>

        {/* Poetry Block */}
        <motion.div className="poem-block" variants={fadeUp}>
          <div className="poem-accent-line" />
          <div className="poem-content">
            {poetryLines.map((line, lineIdx) => (
              <p key={lineIdx} className="poem-line">
                {line.split(' ').map((word, wordIdx) => (
                  <motion.span
                    key={wordIdx}
                    className="poem-word"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + (lineIdx * 5 + wordIdx) * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {word}{' '}
                  </motion.span>
                ))}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Passion Cards */}
        <div className="passion-grid">
          {passionCards.map((card, i) => (
            <motion.div
              key={card.title}
              className="passion-card"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.6 + i * 0.1,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -6,
                scale: 1.03,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
              style={{ 
                background: card.gradient,
                borderColor: card.border 
              }}
            >
              <span className="passion-visual">{card.visual}</span>
              <h3 className="passion-title">{card.title}</h3>
              <p className="passion-desc">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Atmospheric glow */}
      <div className="interests-glow" />
    </section>
  );
}
