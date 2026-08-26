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
    desc: 'Directing system architectures and engineering pipelines. Architected client web portals, API routing layers, and secure databases for Tarisai and Elevate Value Partners to maximize scalability and accessibility.',
    links: [
      { label: 'Tarisai', url: 'https://www.tarisai.co.zw/' },
      { label: 'Elevate Value Partners', url: 'https://www.elevatevaluepartners.co.zw/' }
    ]
  },
  {
    year: '2025 — Present',
    role: 'Computer Science Student',
    company: 'Africa University',
    desc: 'Deepening understanding of software engineering, database architectures, and algorithms. Actively leading developer group collaborations.'
  },
  {
    year: '2025 — Present',
    role: 'Full-Stack Developer',
    company: 'Freelance & Open Source',
    desc: 'Designing and deploying web applications with React, Node.js, and Python. Authoring shell script tools and Linux configuration dotfiles.'
  },
  {
    year: '2025 — Present',
    role: 'Graphic Designer',
    company: 'Freelance Design Studio',
    desc: 'Crafting premium UI layouts, logos, and vector illustrations. Merging geometric grid structures with interactive digital interfaces.'
  }
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function About() {
  const [terminalOutput, setTerminalOutput] = useState(null);

  const runCliCmd = (cmd) => {
    if (cmd === 'clear') {
      setTerminalOutput(null);
      return;
    }

    let out = null;
    if (cmd === 'neofetch') {
      out = (
        <div className="cli-neofetch-output">
          <pre className="ascii-art text-teal">
{`      /\\
     /  \\
    / /\\ \\
   / /  \\ \\
  / /    \\ \\
 / /_/\\   \\ \\
/______\\   \\_\\`}
          </pre>
          <div className="neofetch-specs font-mono">
            <span className="text-amber-light">mutsambiwa@fedora</span>
            <span>-----------------</span>
            <span>OS: Fedora Linux 40</span>
            <span>WM: bspwm (Night Rain)</span>
            <span>Shell: zsh 5.9</span>
            <span>Kernel: 6.10.3-fs</span>
            <span>Memory: 4892MiB / 16000MiB</span>
          </div>
        </div>
      );
    } else if (cmd === 'cat') {
      out = (
        <p className="cli-bio-text font-mono">
          I&apos;m a developer and CS student who loves bridging the gap between high-level system logic and pixel-perfect design. I spend my time tweaking dotfiles, studying database design, and writing clean React applications. I believe visual polish is just as important as clean code under the hood.
        </p>
      );
    } else if (cmd === 'git') {
      out = (
        <div className="cli-git-output font-mono">
          <span>On branch master</span>
          <span>Your branch is up to date with &apos;origin/master&apos;.</span>
          <br />
          <span>Active Projects: 6 Curated Enterprise & Apps</span>
          <span>Availability: Available for work</span>
          <span className="text-amber-light">nothing to commit, working tree clean</span>
        </div>
      );
    }

    setTerminalOutput(out);
  };

  return (
    <section className="section about-section">
      <div className="about-grid">
        {/* COLUMN 1: Personal Dossier & Timeline */}
        <motion.div 
          className="about-dossier" 
          variants={stagger} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
        >
          <motion.span className="section-number" variants={fadeUp}>03</motion.span>
          <motion.span className="section-label" variants={fadeUp}>About</motion.span>

          <motion.h2 className="about-heading font-heading" variants={fadeUp}>
            A night owl who codes <br />
            <span className="text-gradient">in the quiet.</span>
          </motion.h2>

          <motion.div className="about-quote interactive" variants={fadeUp} whileHover={{ y: -3 }}>
            <div className="quote-accent" />
            <div className="quote-body">
              <p className="quote-text">&quot;You have to believe in yourself when no one else does — that makes you a winner right there.&quot;</p>
              <span className="quote-attr font-mono">— Lewis Hamilton</span>
            </div>
          </motion.div>

          <motion.p className="about-bio" variants={fadeUp}>
            I&apos;m a developer and CS student who loves bridging the gap between high-level system logic and pixel-perfect design. I spend my time tweaking dotfiles, studying database design, and writing clean React applications. I believe visual polish is just as important as clean code under the hood.
          </motion.p>

          {/* Timeline Layout */}
          <div className="about-timeline">
            <h3 className="timeline-title font-mono">/ HISTORY_TIMELINE</h3>
            <div className="timeline-items">
              {timeline.map((item, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-dot-connector">
                    <div className="timeline-dot" />
                    {idx < timeline.length - 1 && <div className="timeline-connector" />}
                  </div>
                  <div className="timeline-content">
                    <span className="timeline-year font-mono">{item.year}</span>
                    <h4 className="timeline-role font-heading">{item.role}</h4>
                    
                    <span className="timeline-company">
                      {item.links ? (
                        <>
                          {item.links.map((link, lIdx) => (
                            <span key={link.url}>
                              <a 
                                href={link.url} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="timeline-link interactive"
                              >
                                {link.label}
                              </a>
                              {lIdx < item.links.length - 1 && ' & '}
                            </span>
                          ))}
                        </>
                      ) : item.company}
                    </span>

                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* COLUMN 2: Split Visual Experience (Terminal / Linux Setup Gallery) */}
        <motion.div 
          className="about-system-col"
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* 1. Mobile & Tablet Only Viewport: Retro Unix CLI Terminal */}
          <div className="terminal-window mobile-tablet-only">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="terminal-title font-mono">mutsambiwa@fedora:~</span>
            </div>
            
            <div className="terminal-cli-screen font-mono">
              {terminalOutput ? (
                <div className="cli-output">{terminalOutput}</div>
              ) : (
                <span className="cli-placeholder">&gt; click a command protocol below...</span>
              )}
            </div>
            
            <div className="cli-btn-group">
              <button onClick={() => runCliCmd('neofetch')} className="cli-btn font-mono interactive">neofetch</button>
              <button onClick={() => runCliCmd('cat')} className="cli-btn font-mono interactive">cat bio.md</button>
              <button onClick={() => runCliCmd('git')} className="cli-btn font-mono interactive">git status</button>
              <button onClick={() => runCliCmd('clear')} className="cli-btn font-mono interactive">clear</button>
            </div>
          </div>

          {/* 2. Desktop Only Viewport: Linux Dotfiles Setup Gallery */}
          <div className="setup-gallery-desktop desktop-only">
            <div className="gallery-header-tab font-mono">
              <span>CONFIG: bspwm // polybar // night-rain</span>
            </div>
            
            <div className="setup-screens-grid">
              {/* Screen 1: bspwm + neofetch */}
              <div className="setup-window">
                <div className="setup-window-header">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                  <span className="setup-window-title font-mono">neofetch</span>
                </div>
                <div className="setup-window-content font-mono">
                  <div className="ascii-logo">
                    <span>      /\</span>
                    <span>     /  \</span>
                    <span>    / /\ \</span>
                    <span>   / /  \ \</span>
                    <span>  / /    \ \</span>
                    <span> / /_/\   \ \</span>
                    <span>/______\   \_\</span>
                  </div>
                  <div className="sys-info">
                    <span className="text-teal font-bold">mutsambiwa@fedora</span>
                    <span>-----------------</span>
                    <span>OS: Fedora Workstation</span>
                    <span>Kernel: 6.10.3-fs</span>
                    <span>WM: bspwm</span>
                    <span>Shell: zsh</span>
                    <span>Theme: Night Rain</span>
                  </div>
                </div>
              </div>

              {/* Screen 2: Compilation / Coding */}
              <div className="setup-window">
                <div className="setup-window-header">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                  <span className="setup-window-title font-mono">gcc compile</span>
                </div>
                <div className="setup-window-content font-mono code-compiling">
                  <span className="text-muted">[01:14:28] compiling core.c...</span>
                  <span className="text-teal">&gt; gcc -o main core.c -lreact</span>
                  <span className="text-amber-light">&gt; status: 100% build success</span>
                  <span className="text-muted">system parameters active.</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tech stack marquee */}
      <motion.div
        className="tech-marquee"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="tech-marquee-track">
          {[...techStack, ...techStack, ...techStack].map((tech, i) => {
            const Icon = tech.icon;
            return (
              <div key={`${tech.name}-${i}`} className="tech-marquee-item font-mono">
                <Icon size={20} style={{ color: tech.color }} />
                <span>{tech.name}</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
