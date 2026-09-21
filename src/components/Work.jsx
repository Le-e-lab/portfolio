import { useEffect, useState } from 'react';
import Icon from './Icon';
import HexPattern from './HexPattern';
import useReveal from '../hooks/useReveal';
import './Work.css';

/* ═══ Projects — 01 Guardian / 02 Chef's Muse / 03 GyMPal ═══
   Content reflects the LIVE sites (verified), not stale prose:
   - Guardian is an AI-native cyber defense platform (Next.js, formerly Sentari)
   - Chef's Muse is an AI recipe generator (TypeScript, deployed demo)
   - GyMPal is an offline-first workout PWA (JavaScript, deployed demo) */

const projects = [
  {
    num: '01',
    title: 'Guardian',
    subtitle: 'Cyber Defense Platform',
    description:
      'Built in Harare. Built for Zimbabwe. Guardian scans websites the way an attacker would, then reports what is exposed and how to fix it \u2014 with plain-language guidance built around Zimbabwe\u2019s data protection law.',
    image: '/images/projects/guardian.webp',
    alt: 'Guardian cybersecurity platform home screen',
    tech: ['Next.js', 'AI Validation', 'Compliance'],
    year: '2026',
    links: [
      { label: 'Open Live Demo', url: 'https://sentari-seven.vercel.app' },
      { label: 'More on GitHub', url: 'https://github.com/Le-e-lab/guardian' },
    ],
  },
  {
    num: '02',
    title: 'Chef\u2019s Muse',
    subtitle: 'AI Recipe Generator',
    description:
      'Generate recipes instantly from ingredients you have. Calculate calories, get cooking tips, and reduce food waste with AI.',
    image: '/images/projects/chefs-muse.webp',
    alt: 'Chef\u2019s Muse recipe generator interface showing ingredient input',
    tech: ['TypeScript', 'Gemini API', 'PWA'],
    year: '2026',
    links: [
      { label: 'Open GitHub Repository', url: 'https://github.com/Le-e-lab/chefs-muse' },
      { label: 'Open Live Demo', url: 'https://le-e-lab.github.io/chefs-muse/' },
    ],
  },
  {
    num: '03',
    title: 'GyMPal',
    subtitle: 'Workout Tracker PWA',
    description:
      'Track workouts, build habits, and level up your life. Free, offline-first PWA, no accounts needed.',
    image: '/images/projects/gympal.webp',
    alt: 'GyMPal workout tracking interface',
    tech: ['JavaScript', 'PWA', 'Offline-first'],
    year: '2026',
    links: [
      { label: 'Open GitHub Repository', url: 'https://github.com/Le-e-lab/GyMPal' },
      { label: 'Open Live Demo', url: 'https://gympal-nine.vercel.app' },
    ],
  },
];

function ProjectRow({ project, index }) {
  const rowRef = useReveal();
  const flip = index % 2 === 1 ? 'project-row--flip' : '';

  return (
    <article ref={rowRef} className={`project-row reveal ${flip}`}>
      <div className="project-row__media">
        <a
          href={project.links[0].url}
          target="_blank"
          rel="noopener noreferrer"
          className="project-row__browser"
          aria-label={`Open ${project.title} demo`}
        >
          <span className="project-row__chrome mono" aria-hidden="true">
            <span className="project-row__dots">
              <i /><i /><i />
            </span>
            <span className="project-row__url">{project.links[0].url.replace(/^https?:\/\//, '')}</span>
            <Icon name="external" size={13} />
          </span>
          <img src={project.image} alt={project.alt} loading="lazy" className="project-row__img" />
        </a>
        <span className="project-row__ghost mono" aria-hidden="true">{project.num}</span>
      </div>

      <div className="project-row__body">
        <div className="project-row__heading">
          <Icon name="code-bracket" size={16} className="project-row__code" />
          <span className="mono project-row__eyebrow">{project.subtitle}</span>
        </div>
        <h2 className="project-row__title">{project.title}</h2>
        <p className="project-row__desc">{project.description}</p>

        <div className="project-row__meta">
          <span className="mono project-row__year">{project.year}</span>
          <div className="project-row__tech">
            {project.tech.map((t) => (
              <span key={t} className="work-tech-pill">{t}</span>
            ))}
          </div>
        </div>

        <div className="project-row__links">
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
      </div>
    </article>
  );
}

function DiagonalDivider() {
  const ref = useReveal();
  return (
    <div ref={ref} className="work-diagonal reveal" aria-hidden="true">
      <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="work-diagonal__svg">
        <line x1="0" y1="60" x2="100" y2="0" />
      </svg>
    </div>
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
        const featured = projects.map((p) => norm(p.title));

        const rows = repos
          .filter(
            (repo) =>
              !featured.some(
                (f) => f.includes(norm(repo.name)) || norm(repo.name).includes(f)
              )
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
      <HexPattern className="work-section__hex" opacity={0.08} />

      <div className="page work-heading-block" ref={headingRef}>
        <p className="section-label">
          <span className="mono section-label__num">02</span>
          Projects
        </p>
        <h1 className="work-heading">My Projects</h1>
        <p className="work-desc">
          From contractor tools to AI-powered cooking. Every build here solves a
          real problem with design and speed.
        </p>
      </div>

      <div className="page work-projects">
        {projects.map((project, i) => (
          <div className="work-project-group" key={project.num}>
            {i > 0 && <DiagonalDivider />}
            <ProjectRow project={project} index={i} />
          </div>
        ))}
      </div>

      {/* Compact "More on GitHub" block */}
      {moreRepos.length > 0 && (
        <div className="page more-github">
          <h3 className="mono more-github-title">More on GitHub</h3>
          <div className="more-github-list">
            {moreRepos.map((repo) => (
              <a
                key={repo.url}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="more-github-row interactive"
              >
                <span
                  className="more-github-dot"
                  style={{
                    background:
                      repo.language === 'JavaScript'
                        ? '#f1e05a'
                        : repo.language === 'TypeScript'
                          ? '#3178c6'
                          : 'var(--accent-light)',
                  }}
                />
                <span className="more-github-name">{repo.name}</span>
                <span className="more-github-desc">{repo.description}</span>
                <Icon name="arrow-up-right" size={14} className="more-github-arrow" />
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}