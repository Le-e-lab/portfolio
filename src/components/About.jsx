import { useState } from 'react';
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

const timeline = [
  {
    year: '2025 — Present',
    role: 'Developer',
    company: 'Tarisai & Elevate Value Partners',
    desc: 'Directing system architectures and engineering pipelines. Architected client web portals, API routing layers, and secure databases.',
    links: [
      { label: 'Tarisai', url: 'https://www.tarisai.co.zw/' },
      { label: 'Elevate Value Partners', url: 'https://www.elevatevaluepartners.co.zw/' }
    ]
  },
  {
    year: '2025 — Present',
    role: 'Computer Science Student',
    company: 'Africa University',
    desc: 'Deepening understanding of software engineering, database architectures, and algorithms.'
  },
  {
    year: '2025 — Present',
    role: 'Full-Stack Developer',
    company: 'Freelance & Open Source',
    desc: 'Designing and deploying web applications with React, Node.js, and Python.'
  },
  {
    year: '2025 — Present',
    role: 'Graphic Designer',
    company: 'Freelance Design Studio',
    desc: 'Crafting premium UI layouts, logos, and brand identity systems.'
  }
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function About() {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <section className="section about-section">
      <div className="about-container">
        {/* Header */}
        <motion.div
          className="about-header"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span className="section-number" variants={fadeUp}>03</motion.span>
          <motion.span className="section-label" variants={fadeUp}>About</motion.span>
          <motion.h2 className="about-heading" variants={fadeUp}>
            A developer who cares about <span className="text-gradient">design.</span>
          </motion.h2>
          <motion.p className="about-bio" variants={fadeUp}>
            CS student at Africa University. I build full-stack applications with clean code and pixel-perfect interfaces. When I&apos;m not coding, I&apos;m designing brand identities or configuring my Linux setup.
          </motion.p>
        </motion.div>

        {/* Two-column content */}
        <div className="about-grid">
          {/* Timeline */}
          <motion.div
            className="about-timeline"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="timeline-title">Experience</h3>
            <div className="timeline-items">
              {timeline.map((item, idx) => (
                <motion.div key={idx} className="timeline-item" variants={fadeUp}>
                  <div className="timeline-dot-connector">
                    <div className="timeline-dot" />
                    {idx < timeline.length - 1 && <div className="timeline-connector" />}
                  </div>
                  <div className="timeline-content">
                    <span className="timeline-year font-mono">{item.year}</span>
                    <h4 className="timeline-role">{item.role}</h4>
                    <span className="timeline-company">
                      {item.links ? (
                        item.links.map((link, lIdx) => (
                          <span key={link.url}>
                            <a href={link.url} target="_blank" rel="noreferrer" className="timeline-link interactive">
                              {link.label}
                            </a>
                            {lIdx < item.links.length - 1 && ' & '}
                          </span>
                        ))
                      ) : item.company}
                    </span>
                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quote + Terminal */}
          <motion.div
            className="about-aside"
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="about-quote interactive">
              <div className="quote-accent" />
              <div className="quote-body">
                <p className="quote-text">&quot;You have to believe in yourself when no one else does — that makes you a winner right there.&quot;</p>
                <span className="quote-attr font-mono">— Lewis Hamilton</span>
              </div>
            </div>

            {/* Mini terminal */}
            <div className="mini-terminal">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="terminal-title font-mono">mutsambiwa@fedora:~</span>
              </div>
              <div className="terminal-body font-mono">
                <div className="terminal-line">
                  <span className="t-prompt">$</span> <button className="t-cmd interactive" onClick={() => setActiveTab(activeTab === 'neofetch' ? null : 'neofetch')}>neofetch</button>
                </div>
                {activeTab === 'neofetch' && (
                  <div className="terminal-output">
                    <span className="text-tangerine">mutsambiwa@fedora</span>
                    <span>OS: Fedora Linux 40</span>
                    <span>WM: bspwm (Night Rain)</span>
                    <span>Shell: zsh 5.9</span>
                    <span>Memory: 4892MiB / 16000MiB</span>
                  </div>
                )}
                <div className="terminal-line">
                  <span className="t-prompt">$</span> <button className="t-cmd interactive" onClick={() => setActiveTab(activeTab === 'status' ? null : 'status')}>git status</button>
                </div>
                {activeTab === 'status' && (
                  <div className="terminal-output">
                    <span>Active Projects: 6</span>
                    <span>Availability: <span className="text-tangerine">Available for work</span></span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tech stack */}
        <motion.div
          className="tech-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {techStack.map((tech) => {
            const Icon = tech.icon;
            return (
              <motion.div key={tech.name} className="tech-item" variants={fadeUp}>
                <Icon size={22} style={{ color: tech.color }} />
                <span className="tech-name font-mono">{tech.name}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
