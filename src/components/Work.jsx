import { useState, useEffect, useCallback } from 'react';
import Icon from './Icon';
import useReveal from '../hooks/useReveal';
import './Work.css';

/* ─── Fallback design projects (used if JSON fetch fails) ─── */
const fallbackDesign = [
  {
    title: 'Studio Logo',
    category: 'Logo',
    description: 'Black and white minimal studio identity — clean geometry, timeless type.',
    image: '/portfolio/images/studio-logo.jpg',
    featured: true
  },
  {
    title: 'Gold Brand Piece',
    category: 'Brand Identity',
    description: 'Premium gold-toned brand asset — rich palette with editorial structure.',
    image: '/portfolio/images/gold.jpg',
    featured: true
  },
  {
    title: 'Logo Design',
    category: 'Logo',
    description: 'Custom logomark — geometric precision meets bold visual identity.',
    image: '/portfolio/images/logo.jpg',
    featured: true
  },
];

/* ─── Curated "big" software projects ─── */
const curatedProjects = [
  {
    tag: 'Developer',
    title: 'Tarisai Portal',
    description: 'Enterprise ERP and visual scaling portal. Secure routing, dashboards, and API integrations.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Security'],
    color: '#E8650A',
    link: 'https://www.tarisai.co.zw/',
    category: 'software'
  },
  {
    tag: 'Developer',
    title: 'Elevate Partners',
    description: 'Business management system and analytics suite built for enterprise scalability.',
    tech: ['Next.js', 'Tailwind', 'Node.js', 'Analytics'],
    color: '#FF8C38',
    link: 'https://www.elevatevaluepartners.co.zw/',
    category: 'software'
  },
  {
    tag: 'Project',
    title: "The Chef's Muse",
    description: 'AI-powered recipe generator with calorie scanning via Gemini Vision.',
    tech: ['React', 'Tailwind', 'Gemini API'],
    color: '#E8650A',
    link: 'https://le-e-lab.github.io/chefs-muse/',
    category: 'software'
  },
];

const filterOptions = [
  { key: 'design', label: 'Graphic Design' },
  { key: 'software', label: 'Software' },
  { key: 'all', label: 'All' },
];

export default function Work() {
  const [githubProjects, setGithubProjects] = useState([]);
  const [designProjects, setDesignProjects] = useState(fallbackDesign);
  const [filter, setFilter] = useState('design'); // design-first default
  const [lightbox, setLightbox] = useState(null);
  const headingRef = useReveal();
  const designRef = useReveal();
  const softwareRef = useReveal();

  /* Fetch design projects from static JSON */
  useEffect(() => {
    const fetchDesign = async () => {
      try {
        const res = await fetch('/portfolio/design-projects.json');
        if (res.ok) {
          const data = await res.json();
          if (data.projects?.length) setDesignProjects(data.projects);
        }
      } catch { /* fallback already set */ }
    };
    fetchDesign();
  }, []);

  /* Fetch GitHub repos for software projects */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        let repos;
        try {
          const jsonRes = await fetch('/portfolio/projects.json');
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
            tech: repo.topics?.length > 0 ? repo.topics.slice(0, 3) : (repo.language ? [repo.language] : ['Code']),
            color: ['#E8650A', '#FF8C38', '#E8650A', '#FF8C38'][i % 4],
            link: repo.html_url,
            category: 'software'
          }));

          const merged = [...curatedProjects];
          formatted.forEach(fetched => {
            const isDuplicate = curatedProjects.some(
              fp => fp.link.toLowerCase() === fetched.link.toLowerCase() ||
                    fp.title.toLowerCase().replace(/\s+/g, '') === fetched.title.toLowerCase().replace(/\s+/g, '')
            );
            if (!isDuplicate) merged.push(fetched);
          });
          setGithubProjects(merged);
        }
      } catch { /* silent */ }
    };
    fetchProjects();
  }, []);

  /* Lightbox keyboard dismiss */
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const softwareProjects = (githubProjects.length > 0 ? githubProjects : curatedProjects)
    .filter(p => p.category === 'software');
  const showDesign = filter === 'all' || filter === 'design';
  const showSoftware = filter === 'all' || filter === 'software';

  return (
    <section className="section work-section">
      <div className="work-intro-wrapper">
        <div ref={headingRef} className="reveal work-heading-block">
          <span className="section-number">02</span>
          <span className="section-label">Work</span>
          <h2 className="work-heading font-heading">
            Selected <span className="text-gradient">Design Work</span>
          </h2>
          <p className="work-desc">
            Brand identities and visual systems first — then the applications that power them.
          </p>
        </div>

        <div className="filter-wrapper">
          {filterOptions.map(opt => (
            <button
              key={opt.key}
              onClick={() => setFilter(opt.key)}
              className={`filter-btn font-mono interactive ${filter === opt.key ? 'active' : ''}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ══════ GRAPHIC DESIGN SHOWCASE ══════ */}
      {showDesign && designProjects.length > 0 && (
        <div id="design" className="work-category-block">
          <div ref={designRef} className="reveal design-masonry">
            {designProjects.map((project, i) => (
              <button
                key={project.title}
                className={`design-tile interactive ${project.featured ? 'design-tile--featured' : ''}`}
                onClick={() => setLightbox(project)}
                aria-label={`View ${project.title}`}
              >
                <div className="design-tile-thumb">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="design-tile-img"
                    loading="lazy"
                    width={800}
                    height={i === 0 ? 1000 : 800}
                  />
                  <div className="design-tile-overlay">
                    <div className="design-tile-meta">
                      <span className="design-tile-cat font-mono">{project.category}</span>
                      <h3 className="design-tile-title">{project.title}</h3>
                    </div>
                    <Icon name="arrow-up-right" size={18} className="design-tile-arrow" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ══════ SOFTWARE PROJECTS (secondary) ══════ */}
      {showSoftware && softwareProjects.length > 0 && (
        <div id="software" className="work-category-block">
          <div className="software-subhead">
            <span className="software-subhead-line" />
            <span className="software-subhead-label font-mono">Software Engineering</span>
            <span className="software-subhead-line" />
          </div>
          <div ref={softwareRef} className="reveal work-grid">
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
                  <div className="work-card-tech">
                    {project.tech.map(t => (
                      <span key={t} className="work-tech-pill font-mono">{t}</span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ══════ LIGHTBOX MODAL ══════ */}
      {lightbox && (
        <div
          className="lightbox-backdrop"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
        >
          <div
            className="lightbox-card lightbox-card-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="lightbox-close interactive" onClick={closeLightbox} aria-label="Close">
              <Icon name="x" size={18} />
            </button>
            <div className="lightbox-image-wrap">
              <img src={lightbox.image} alt={lightbox.title} className="lightbox-image" />
            </div>
            <div className="lightbox-meta">
              <span className="lightbox-cat font-mono">{lightbox.category}</span>
              <h3 className="lightbox-title">{lightbox.title}</h3>
              <p className="lightbox-desc">{lightbox.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}