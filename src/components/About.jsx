import useReveal from '../hooks/useReveal';
import LiquidDivider from './LiquidDivider';
import './About.css';

/* Honest phase labels instead of invented dates. Order reads as a journey:
   foundation, craft, client work, current focus. */
const timeline = [
  {
    tag: '01 · Study',
    role: 'Computer Science Student',
    company: 'Africa University',
    desc: 'Deepening understanding of software engineering, database architectures, and algorithms.',
  },
  {
    tag: '02 · Design',
    role: 'Graphic Designer',
    company: 'Studio & Freelance',
    desc: 'Crafting premium brand identities, logos, and visual systems. Design-first thinking applied to every pixel.',
  },
  {
    tag: '03 · Client',
    role: 'Developer',
    company: 'Tarisai & Elevate Value Partners',
    desc: 'Directing system architectures and engineering pipelines. Architected client web portals, API routing layers, and secure databases.',
    links: [
      { label: 'Tarisai', url: 'https://www.tarisai.co.zw/' },
      { label: 'Elevate Value Partners', url: 'https://www.elevatevaluepartners.co.zw/' }
    ]
  },
  {
    tag: '04 · Now',
    role: 'Full-Stack Developer',
    company: 'Freelance & Open Source',
    desc: 'Designing and deploying web applications with React, Node.js, and Python.',
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
];

/* Editorial timeline row: phase tag rail + body. Each row owns its reveal
   observer so entries enter one by one as they scroll into view. */
function TimelineRow({ item }) {
  const rowRef = useReveal();

  return (
    <div ref={rowRef} className="reveal about-row">
      <span className="about-row-tag font-mono">{item.tag}</span>
      <div className="about-row-body">
        <h4 className="about-row-role font-heading">{item.role}</h4>
        <span className="about-row-company">
          {item.links ? (
            item.links.map((link, lIdx) => (
              <span key={link.url}>
                <a href={link.url} target="_blank" rel="noreferrer" className="about-row-link interactive">
                  {link.label}
                </a>
                {lIdx < item.links.length - 1 && ' & '}
              </span>
            ))
          ) : item.company}
        </span>
        <p className="about-row-desc">{item.desc}</p>
      </div>
    </div>
  );
}

export default function About() {
  const headerRef = useReveal();
  const narrativeRef = useReveal();
  const timelineRef = useReveal();
  const toolsRef = useReveal();

  return (
    <>
      {/* ═══ CREAM HEADER ZONE ═══ */}
      <section className="section--light about-zone about-zone--header">
        <div className="about-container">
          <div ref={headerRef} className="reveal about-header">
            <span className="section-number">03</span>
            <span className="section-label">About</span>
            <h1 className="about-statement font-heading">
              I design identities, build systems, ship experiences.
            </h1>
          </div>
        </div>
      </section>

      {/* Liquid blend into dark narrative zone */}
      <LiquidDivider fill="var(--bg)" variant={0} />

      {/* ═══ DARK JOURNEY ZONE ═══ */}
      <section className="section--dark about-zone about-zone--journey">
        <div className="about-container">
          <div className="about-journey">
            {/* Sticky chapter rail — decorative index of the journey */}
            <aside className="about-rail" aria-hidden="true">
              <span className="about-chapter">01 · Origin</span>
              <span className="about-chapter">02 · Where I&apos;ve been</span>
            </aside>

            <div className="about-journey-body">
              {/* Chapter 01 — Origin: portrait + narrative */}
              <div ref={narrativeRef} className="reveal about-origin">
                <div className="about-portrait">
                  <img
                    src="/images/hero-portrait.jpg"
                    alt="Portrait of Lesley Mutsambiwa"
                    loading="lazy"
                    className="about-portrait-img"
                  />
                  <span className="about-portrait-scrim" aria-hidden="true" />
                </div>

                <div className="about-narrative-copy">
                  <p className="about-para about-para--lead">
                    I&apos;m a Computer Science student at Africa University, based in Harare,
                    Zimbabwe. I work across the full spectrum: brand identities on one end,
                    full-stack applications on the other, and everything visual-technical in
                    between.
                  </p>
                  <p className="about-para">
                    Design is how I understand a problem; code is how I solve it. Most people
                    pick one. I&apos;ve spent the last few years refusing to.
                  </p>
                  <p className="about-para about-para--life">
                    When I&apos;m not designing or shipping, I&apos;m usually configuring my Linux
                    setup (bspwm on Fedora, if you&apos;re curious), exploring why a tool works
                    the way it does, or sketching ideas that never make it to production.
                  </p>
                </div>
              </div>

              {/* Chapter 02 — Where I've been: editorial timeline rows */}
              <div ref={timelineRef} className="reveal about-timeline">
                <h3 className="timeline-kicker font-mono">The story so far</h3>
                <div className="about-timeline-rows">
                  {timeline.map((item) => (
                    <TimelineRow key={item.tag} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Liquid blend into cream tools zone */}
      <LiquidDivider fill="var(--bg-light)" variant={1} />

      {/* ═══ CREAM TOOLS ZONE (Chapter 03 — Toolbox) ═══ */}
      <section className="section--light about-zone about-zone--tools">
        <div className="about-container">
          <div ref={toolsRef} className="reveal about-tools">
            <div className="about-tools-header">
              <h3 className="about-tools-title font-heading">03 · Toolbox</h3>
              <p className="about-tools-sub">
                The stack I ship production work with.
              </p>
            </div>
            {toolGroups.map((group) => (
              <div key={group.title} className="tool-group">
                <h4 className="tool-group-title font-heading">{group.title}</h4>
                <div className="tool-chips">
                  {group.tools.map((tool) => (
                    <span key={tool} className="tool-chip">{tool}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Liquid blend back to the dark page end */}
      <LiquidDivider fill="var(--bg)" variant={2} />
    </>
  );
}