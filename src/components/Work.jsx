import { useState, useEffect } from 'react';
import Icon from './Icon';
import useReveal from '../hooks/useReveal';
import LiquidDivider from './LiquidDivider';
import './Work.css';

/* ─── Brand & design pieces (real portfolio images) ─── */
const designProjects = [
  {
    tag: 'Brand Identity',
    title: 'Gold Brand Piece',
    description: 'A premium gold-toned identity study. Palette, typography, and layered mark building for a confident brand presence.',
    image: '/images/design/brand-identity/gold-brand-piece.jpg',
    alt: 'Gold brand identity piece showing palette, typography, and mark exploration',
  },
  {
    tag: 'Logo',
    title: 'Logo Design',
    description: 'A constructed logo system. Balanced geometry, consistent stroke logic, and clean application across formats.',
    image: '/images/design/logo/logo-design.jpg',
    alt: 'Constructed logo design system with geometry and lockups',
  },
  {
    tag: 'Logo',
    title: 'Studio Logo',
    description: 'A studio mark built for repetition. Icon, wordmark, and clearspace rules that hold up at any size.',
    image: '/images/design/logo/studio-logo.jpg',
    alt: 'Studio logo mark with icon and wordmark construction',
  },
];

/* ─── Engineering builds (honest typographic covers, no fake screenshots) ─── */
const softwareProjects = [
  {
    tag: 'Developer',
    title: 'Tarisai Portal',
    description: 'Enterprise ERP and visual scaling portal. Secure routing, dashboards, and API integrations for a Zimbabwean tech company.',
    client: 'Tarisai',
    year: '2025',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Security'],
    color: '#E8650A',
    links: [{ label: 'Open Live Demo', url: 'https://www.tarisai.co.zw/' }],
  },
  {
    tag: 'Developer',
    title: 'Elevate Partners',
    description: 'Business management system and analytics suite built for enterprise scalability and strategic decision-making.',
    client: 'Elevate Value Partners',
    year: '2025',
    tech: ['Next.js', 'Tailwind', 'Node.js', 'Analytics'],
    color: '#FF8C38',
    links: [{ label: 'Open Live Demo', url: 'https://www.elevatevaluepartners.co.zw/' }],
  },
  {
    tag: 'Project',
    title: "The Chef's Muse",
    description: 'AI-powered recipe generator with calorie scanning via Gemini Vision. A personal project exploring AI in everyday tools.',
    client: 'Personal Project',
    year: '2025',
    tech: ['React', 'Tailwind', 'Gemini API'],
    color: '#E8650A',
    links: [
      { label: 'Open GitHub Repository', url: 'https://github.com/Le-e-lab/chefs-muse' },
      { label: 'Open Live Demo', url: 'https://le-e-lab.github.io/chefs-muse/' },
    ],
  },
];

/* Alternate design / software for a visual-technical rhythm */
const featuredWork = [
  { type: 'design', ...designProjects[0] },
  { type: 'software', ...softwareProjects[0] },
  { type: 'design', ...designProjects[1] },
  { type: 'software', ...softwareProjects[1] },
  { type: 'design', ...designProjects[2] },
  { type: 'software', ...softwareProjects[2] },
];

/* Editorial index row: outlined numeral rail + media + body.
   Each row owns its reveal observer so rows enter as they scroll in. */
function ProjectRow({ project, index }) {
  const rowRef = useReveal();
  const num = String(index + 1).padStart(2, '0');
  const flip = project.type === 'software' ? 'project-card--flip' : '';
  const tagStyle =
    project.type === 'software' && project.color
      ? { color: project.color, borderColor: `${project.color}44` }
      : undefined;

  return (
    <article
      ref={rowRef}
      className={`project-card project-card--${project.type} ${flip} reveal`}
    >
      <span className="work-card-index font-mono" aria-hidden="true">
        {num}
      </span>

      <div className="project-card-media">
        {project.type === 'design' ? (
          <img
            src={project.image}
            alt={project.alt}
            loading="lazy"
            className="project-card-img"
          />
        ) : (
          <div className="project-cover" style={{ '--cover-color': project.color }}>
            <span className="cover-title font-heading">{project.title}</span>
            <span className="cover-tag font-mono">{project.tag.toUpperCase()}</span>
            <span className="cover-year font-mono">{project.year}</span>
          </div>
        )}
      </div>

      <div className="project-card-body">
        <div className="project-card-top">
          <span className="work-card-tag" style={tagStyle}>
            {project.tag}
          </span>
        </div>
        <h3 className="project-card-title font-heading">{project.title}</h3>
        <p className="project-card-desc">{project.description}</p>
        {project.type === 'software' && (
          <>
            <div className="project-card-tech">
              {project.tech.map((t) => (
                <span key={t} className="work-tech-pill">{t}</span>
              ))}
            </div>
            <div className="project-card-links">
              {project.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link interactive"
                >
                  <span className="project-link-text">{link.label}</span>
                  <Icon name="arrow-up-right" size={15} className="project-link-arrow" />
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </article>
  );
}

export default function Work() {
  const [moreRepos, setMoreRepos] = useState([]);
  const headingRef = useReveal();

  /* Fetch GitHub repos for the compact "More on GitHub" block */
  useEffect(() => {
    const fetchMore = async () => {
      try {
        let repos;
        try {
          const jsonRes = await fetch('/projects.json');
          if (jsonRes.ok) {
            const data = await jsonRes.json();
            repos = data.repos || data;
          }
        } catch { /* fall through */ }

        if (!repos) {
          const response = await fetch('https://api.github.com/users/Le-e-lab/repos?sort=updated&per_page=30');
          if (response.ok) {
            const allRepos = await response.json();
            repos = allRepos.filter(
              (r) => !r.fork && r.language !== null && r.description !== null
            );
          }
        }

        if (!Array.isArray(repos)) return;

        const norm = (t) => t.toLowerCase().replace(/[^a-z0-9]/g, '');
        const featured = featuredWork
          .filter((p) => p.type === 'software')
          .map((p) => norm(p.links[0]?.url || p.title));

        const rows = repos
          .filter(
            (repo) =>
              !featured.includes(norm(repo.html_url)) &&
              !featured.includes(norm(repo.name))
          )
          .map((repo) => ({
            name: repo.name.replace(/-|_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
            description: repo.description || 'GitHub public repository.',
            language: repo.language || 'Code',
            url: repo.html_url,
          }))
          .slice(0, 5);

        setMoreRepos(rows);
      } catch { /* silent */ }
    };
    fetchMore();
  }, []);

  return (
    <section className="work-section">
      {/* ══════ CREAM INTRO ZONE ══════ */}
      <div className="section--light work-zone work-zone--intro">
        <div className="work-zone-inner">
          <div ref={headingRef} className="reveal work-heading-block">
            <span className="section-number">02</span>
            <span className="section-label">Projects</span>
            <h1 className="work-heading font-heading">My Projects</h1>
            <p className="work-desc">
              From brand identities to AI-powered systems. Every build here solves a real problem with design and speed.
            </p>
          </div>
        </div>
      </div>

      {/* Liquid blend into the dark projects zone */}
      <LiquidDivider fill="var(--bg)" variant={0} />

      {/* ══════ DARK PROJECTS ZONE ══════ */}
      <div className="section--dark work-zone work-zone--projects">
        <div className="work-zone-inner">
          <div className="work-projects">
            {featuredWork.map((project, i) => (
              <ProjectRow key={`${project.type}-${project.title}`} project={project} index={i} />
            ))}
          </div>

          {/* Compact "More on GitHub" block */}
          {moreRepos.length > 0 && (
            <div className="more-github">
              <h3 className="more-github-title font-mono">More on GitHub</h3>
              <div className="more-github-list">
                {moreRepos.map((repo) => (
                  <a
                    key={repo.url}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="more-github-row interactive"
                  >
                    <span className="more-github-dot" style={{ background: repo.language === 'JavaScript' ? '#f1e05a' : repo.language === 'TypeScript' ? '#3178c6' : 'var(--tangerine)' }} />
                    <span className="more-github-name">{repo.name}</span>
                    <span className="more-github-desc">{repo.description}</span>
                    <Icon name="arrow-up-right" size={14} className="more-github-arrow" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}