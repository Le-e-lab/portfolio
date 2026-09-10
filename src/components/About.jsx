import { useState } from 'react';
import useReveal from '../hooks/useReveal';
import TestimonialCard from './TestimonialCard';
import './About.css';

const techStack = [
  { name: 'React', mono: 'Re', color: '#61dafb' },
  { name: 'JavaScript', mono: 'JS', color: '#f7df1e' },
  { name: 'Node.js', mono: 'No', color: '#68a063' },
  { name: 'Python', mono: 'Py', color: '#3776ab' },
  { name: 'Linux', mono: 'Lx', color: '#fcc624' },
  { name: 'Fedora', mono: 'Fe', color: '#51a2da' },
  { name: 'Git', mono: 'Gi', color: '#f05032' },
  { name: 'MongoDB', mono: 'Mo', color: '#47a248' },
  { name: 'Tailwind', mono: 'Tw', color: '#38bdf8' },
  { name: 'TypeScript', mono: 'TS', color: '#3178c6' },
];

const timeline = [
  {
    year: '2025 — Present',
    role: 'Graphic Designer',
    company: 'Studio & Freelance',
    desc: 'Crafting premium brand identities, logos, and visual systems. Design-first thinking applied to every pixel.',
  },
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
];

const testimonials = [
  {
    quote: "Lesley didn't just build a website — he translated our vision into something we couldn't have articulated ourselves. The creative direction, the attention to detail, the way every pixel serves a purpose. Closest thing to having an in-house design team.",
    name: "Tarisai Team",
    role: "Tech Company",
    company: "Zimbabwe",
  },
  {
    quote: "We needed something that looked premium and actually worked. Lesley delivered both — a system our team uses daily and clients constantly compliment. It doesn't look like something from Zimbabwe. It looks like something from anywhere.",
    name: "Elevate Value Partners",
    role: "Enterprise Client",
    company: "Zimbabwe",
  },
];

export default function About() {
  const [activeTab, setActiveTab] = useState(null);
  const headerRef = useReveal();
  const timelineRef = useReveal();
  const asideRef = useReveal();
  const techRef = useReveal();

  return (
    <section className="section about-section">
      <div className="about-container">
        {/* Header */}
        <div ref={headerRef} className="reveal about-header">
          <span className="section-number">03</span>
          <span className="section-label">About</span>
          <h2 className="about-heading">
            A designer who can build <span className="text-gradient">what they draw.</span>
          </h2>
          <p className="about-bio">
            CS student at Africa University. I design brand identities and build full-stack applications — the visual and the technical, working as one. When I&apos;m not designing, I&apos;m shipping products or configuring my Linux setup.
          </p>
        </div>

        {/* Two-column content */}
        <div className="about-grid">
          {/* Timeline */}
          <div ref={timelineRef} className="reveal about-timeline">
            <h3 className="timeline-title">Experience</h3>
            <div className="timeline-items">
              {timeline.map((item, idx) => (
                <div key={idx} className="timeline-item">
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
                </div>
              ))}
            </div>
          </div>

          {/* Quote + Terminal */}
          <div ref={asideRef} className="reveal about-aside">
            <div className="about-quote interactive">
              <div className="quote-accent" />
              <div className="quote-body">
                <p className="quote-text">&quot;Design is not just what it looks like and feels like. Design is how it works.&quot;</p>
                <span className="quote-attr font-mono">— Steve Jobs</span>
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
          </div>
        </div>

        {/* Tech stack */}
        <div ref={techRef} className="reveal tech-grid">
          {techStack.map((tech) => (
            <div key={tech.name} className="tech-item">
              <span className="tech-mono" style={{ backgroundColor: `${tech.color}1f`, color: tech.color, borderColor: `${tech.color}44` }}>
                {tech.mono}
              </span>
              <span className="tech-name font-mono">{tech.name}</span>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="testimonials-section">
          <h3 className="testimonials-title">What Clients Say</h3>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}