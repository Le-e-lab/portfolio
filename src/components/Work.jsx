import { useState, useEffect } from 'react';
import Icon from './Icon';
import useReveal from '../hooks/useReveal';
import LiquidDivider from './LiquidDivider';
import './Work.css';

/* ─── Curated "big" software projects ─── */
const curatedProjects = [
  {
    tag: 'Developer',
    title: 'Tarisai Portal',
    description: 'Enterprise ERP and visual scaling portal. Secure routing, dashboards, and API integrations for a Zimbabwean tech company.',
    client: 'Tarisai',
    year: '2025',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Security'],
    color: '#E8650A',
    link: 'https://www.tarisai.co.zw/',
    category: 'software'
  },
  {
    tag: 'Developer',
    title: 'Elevate Partners',
    description: 'Business management system and analytics suite built for enterprise scalability and strategic decision-making.',
    client: 'Elevate Value Partners',
    year: '2025',
    tech: ['Next.js', 'Tailwind', 'Node.js', 'Analytics'],
    color: '#FF8C38',
    link: 'https://www.elevatevaluepartners.co.zw/',
    category: 'software'
  },
  {
    tag: 'Project',
    title: "The Chef's Muse",
    description: 'AI-powered recipe generator with calorie scanning via Gemini Vision. A personal project exploring AI in everyday tools.',
    client: 'Personal Project',
    year: '2025',
    tech: ['React', 'Tailwind', 'Gemini API'],
    color: '#E8650A',
    link: 'https://le-e-lab.github.io/chefs-muse/',
    category: 'software'
  },
];

export default function Work() {
  const [githubProjects, setGithubProjects] = useState([]);
  const headingRef = useReveal();
  const projectsRef = useReveal();

  /* Fetch GitHub repos for software projects (coding-only) */
  useEffect(() => {
    const fetchProjects = async () => {
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
            repos = allRepos.filter(r =>
              !r.fork &&
              r.language !== null && /* coding-only: skip docs/config/markdown-only repos */
              !r.name.includes('.github') &&
              !r.name.toLowerCase().includes('dotfiles') &&
              !r.name.toLowerCase().includes('config') &&
              !r.name.toLowerCase().includes('settings') &&
              !r.name.toLowerCase().includes('skills') &&
              !r.name.toLowerCase().includes('learning') &&
              !r.name.toLowerCase().includes('test') &&
              !r.name.toLowerCase().includes('portfolio') &&
              !r.name.toLowerCase().includes('introduction') &&
              !r.name.toLowerCase().includes('copilot') &&
              !r.name.toLowerCase().includes('group') &&
              !r.name.toLowerCase().includes('gdg') &&
              !r.name.toLowerCase().includes('gym') &&
              r.description !== null
            );
          }
        }

        if (Array.isArray(repos)) {
          const formatted = repos.map((repo, i) => ({
            tag: repo.language || 'Repository',
            title: repo.name.replace(/-/g, ' ').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            description: repo.description || 'GitHub public repository.',
            client: 'Open Source',
            year: new Date(repo.updated_at || Date.now()).getFullYear().toString(),
            tech: repo.topics?.length > 0 ? repo.topics.slice(0, 3) : (repo.language ? [repo.language] : ['Code']),
            color: ['#E8650A', '#FF8C38', '#E8650A', '#FF8C38'][i % 4],
            link: repo.html_url,
            category: 'software'
          }));

          const merged = [...curatedProjects];
          const norm = (t) => t.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/^the/, '');
          formatted.forEach(fetched => {
            const isDuplicate = curatedProjects.some(
              fp => norm(fp.link) === norm(fetched.link) ||
                    norm(fp.title) === norm(fetched.title)
            );
            if (!isDuplicate) merged.push(fetched);
          });
          setGithubProjects(merged);
        }
      } catch { /* silent */ }
    };
    fetchProjects();
  }, []);

  const softwareProjects = githubProjects.length > 0 ? githubProjects : curatedProjects;

  return (
    <section className="work-section">
      {/* ══════ CREAM INTRO ZONE ══════ */}
      <div className="section--light work-zone work-zone--intro">
        <div className="work-zone-inner">
          <div ref={headingRef} className="reveal work-heading-block">
            <span className="section-number">02</span>
            <span className="section-label">Projects</span>
            <h2 className="work-heading font-heading">
              Projects <span className="text-gradient">& Builds</span>
            </h2>
            <p className="work-desc">
              The applications and systems I design, build, and ship — full-stack work from concept to production.
            </p>
          </div>
        </div>
      </div>

      {/* Liquid blend into the dark projects zone */}
      <LiquidDivider fill="var(--bg)" variant={0} />

      {/* ══════ DARK PROJECTS ZONE ══════ */}
      <div className="section--dark work-zone work-zone--projects">
        <div className="work-zone-inner">
          {softwareProjects.length > 0 && (
            <div ref={projectsRef} className="reveal work-grid">
              {softwareProjects.map((project) => (
                <a
                  key={project.link}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-card interactive"
                >
                  <div className="work-card-accent" style={{ background: `linear-gradient(135deg, ${project.color}22, transparent)` }} />
                  <div className="work-card-body">
                    <div className="work-card-top">
                      <span className="work-card-tag font-mono" style={{ color: project.color, borderColor: `${project.color}33` }}>
                        {project.tag}
                      </span>
                      <Icon name="arrow-up-right" size={16} className="work-card-arrow" />
                    </div>
                    <h3 className="work-card-title">{project.title}</h3>
                    <p className="work-card-desc">{project.description}</p>
                    <div className="work-card-meta">
                      <span className="work-card-client">{project.client}</span>
                      {project.year && <span className="work-card-year font-mono">{project.year}</span>}
                    </div>
                    <div className="work-card-tech">
                      {project.tech.map(t => (
                        <span key={t} className="work-tech-pill font-mono">{t}</span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}