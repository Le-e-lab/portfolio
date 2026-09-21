import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import useReveal from '../hooks/useReveal';
import './About.css';

/* ═══ About ═══
   - Big statement
   - Bio narrative (lead paragraph, "why both" line, personal life line)
   - Pull-quote
   - 3-stage timeline 01 Study / 02 Design / 03 Developer — vertical line
     draws in as you scrub (motion/react scroll scrub)
   - ToolBox: Frontend / Backend / Design & Tools / AI & APIs (staggered) */

const timeline = [
  {
    num: '01',
    tag: 'Study',
    role: 'Computer Science Student',
    company: 'Africa University',
    desc: 'Deepening my understanding of software engineering, database architectures, and algorithms.',
  },
  {
    num: '02',
    tag: 'Design',
    role: 'Graphic Designer',
    company: 'Studio & Freelance',
    desc: 'Crafting premium brand identities, logos, and visual systems. Design-first thinking applied to every pixel.',
  },
  {
    num: '03',
    tag: 'Developer',
    role: 'Full-Stack Developer',
    company: 'Tarisai & Elevate Value Partners',
    desc: 'Directing system architectures and engineering pipelines. Built client web portals, API routing layers, and secure databases.',
    links: [
      { label: 'Tarisai', url: 'https://www.tarisai.co.zw/' },
      { label: 'Elevate Value Partners', url: 'https://www.elevatevaluepartners.co.zw/' },
    ],
  },
];

const toolGroups = [
  {
    title: 'Frontend Tools',
    tools: ['React', 'Next.js', 'JavaScript (ES6+)', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'Backend Tools',
    tools: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'REST APIs'],
  },
  {
    title: 'Design & Platform',
    tools: ['Linux (Fedora)', 'Git/GitHub', 'Vite'],
  },
  {
    title: 'AI & APIs',
    tools: ['Gemini API', 'LLM Integration'],
  },
];

function TimelineRow({ item }) {
  const rowRef = useReveal();
  return (
    <div ref={rowRef} className="reveal about-timeline-row">
      <div className="about-timeline-rail" aria-hidden="true">
        <span className="about-timeline-dot" />
      </div>
      <div className="about-timeline-body">
        <span className="mono about-timeline-tag">
          {item.num} · {item.tag}
        </span>
        <h4 className="about-timeline-role">{item.role}</h4>
        <span className="about-timeline-company">
          {item.links ? (
            item.links.map((link, idx) => (
              <span key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="about-timeline-link interactive"
                >
                  {link.label}
                </a>
                {idx < item.links.length - 1 && ' & '}
              </span>
            ))
          ) : (
            item.company
          )}
        </span>
        <p className="about-timeline-desc">{item.desc}</p>
      </div>
    </div>
  );
}

export default function About() {
  const headingRef = useReveal();
  const quoteRef = useReveal();
  const toolGroupRefs = [useReveal(), useReveal(), useReveal(), useReveal()];
  const timelineRef = useRef(null);

  // Scrub line-draw for the timeline: scaleY follows scroll progress through
  // the timeline element (spec — Pin + Transform / scrub).
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 70%', 'end 55%'],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.6,
  });

  return (
    <>
      {/* ═══ Header / statement ═══ */}
      <section className="about-header-section">
        <div className="page about-header page--center" ref={headingRef}>
          <p className="section-label">
            <span className="mono section-label__num">03</span>
            About
          </p>
          <h1 className="about-statement">
            I design identities, build systems, ship experiences.
          </h1>
        </div>
      </section>

      {/* ═══ Narrative + portrait ═══ */}
      <section className="page about-narrative">
        <div className="about-narrative-grid">
          <div className="about-portrait">
            <img
              src="/images/hero-portrait.webp"
              alt="Portrait of Lesley Mutsambiwa"
              loading="lazy"
              className="about-portrait-img"
            />
            <span className="about-portrait-frame" aria-hidden="true" />
          </div>

          <div className="about-copy">
            <p className="about-para about-para--lead">
              I&apos;m a Computer Science student at Africa University, based in
              Harare, Zimbabwe. I work across the full spectrum: brand
              identities on one end, full-stack applications on the other, and
              everything visual-technical in between.
            </p>
            <p className="about-para">
              Design is how I understand a problem; code is how I solve it.
              Most people pick one. I&apos;ve spent the last few years refusing
              to.
            </p>
            <p className="about-para about-para--life">
              When I&apos;m not designing or shipping, I&apos;m usually
              configuring my Linux setup (bspwm on Fedora, if you&apos;re
              curious), exploring why a tool works the way it does, or
              sketching ideas that never make it to production.
            </p>
          </div>
        </div>

        {/* Pull-quote */}
        <blockquote className="about-pullquote" ref={quoteRef}>
          <p>
            &ldquo;Turning ideas into products the real world can use is the
            whole game.&rdquo;
          </p>
          <cite className="mono">— Lesley, Designer &amp; Developer</cite>
        </blockquote>
      </section>

      {/* ═══ Timeline ═══ */}
      <section className="page about-timeline-section" ref={timelineRef}>
        <div className="about-timeline-head">
          <h3 className="mono about-timeline-kicker">The story so far</h3>
          <p className="about-timeline-sub">
            Foundation, craft, and client work — the order I grew in.
          </p>
        </div>

        <div className="about-timeline">
          {/* Scrub line — draws as you scroll through the timeline */}
          <div className="about-timeline-line" aria-hidden="true">
            <motion.div
              className="about-timeline-line__fill"
              style={{ scaleY: lineProgress, transformOrigin: 'top' }}
            />
          </div>
          {timeline.map((item) => (
            <TimelineRow key={item.num} item={item} />
          ))}
        </div>
      </section>

      {/* ═══ Toolbox ═══ */}
      <section className="page about-tools-section">
        <div className="about-tools-head">
          <h3 className="about-tools-title">ToolBox</h3>
          <p className="about-tools-sub">The stack I ship production work with.</p>
        </div>

        <div className="tool-groups">
          {toolGroups.map((group, idx) => (
            <div
              key={group.title}
              className={`tool-group reveal reveal-delay-${(idx % 4) + 1}`}
              ref={toolGroupRefs[idx]}
            >
              <h4 className="mono tool-group-title">{group.title}</h4>
              <div className="tool-chips">
                {group.tools.map((tool) => (
                  <span key={tool} className="tool-chip">{tool}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}