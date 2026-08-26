import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';
import './Work.css';

const fallbackProjects = [
  {
    tag: 'Lead Developer',
    title: 'Tarisai Portal',
    description: 'Enterprise ERP and visual scaling portal for Tarisai. Engineered secure routing architectures, dashboard visualizers, and API integrations.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Security'],
    color: '#10b981',
    link: 'https://www.tarisai.co.zw/',
    category: 'software'
  },
  {
    tag: 'Lead Developer',
    title: 'Elevate Partners',
    description: 'Interactive business management system and analytics suite developed for Elevate Value Partners, built for enterprise scalability.',
    tech: ['Next.js', 'Tailwind', 'Node.js', 'Analytics'],
    color: '#86efac',
    link: 'https://www.elevatevaluepartners.co.zw/',
    category: 'software'
  },
  {
    tag: 'Group Project',
    title: 'UPath',
    description: 'University Portal Simulation with attendance tracking, QR code scanning, and role-based access for Students and Lecturers.',
    tech: ['React', 'Node.js', 'Express', 'QR'],
    color: '#10b981',
    link: 'https://github.com/Le-e-lab/upath-simulation',
    category: 'software'
  },
  {
    tag: 'Project',
    title: "The Chef's Muse",
    description: 'AI-powered recipe generator that creates meals from your inventory. Features calorie scanning with Gemini Vision.',
    tech: ['React', 'Tailwind', 'Gemini API'],
    color: '#86efac',
    link: 'https://le-e-lab.github.io/chefs-muse/',
    category: 'software'
  },
  {
    tag: 'Project',
    title: 'Team-AI',
    description: 'Collaborative AI workspace for team project management and intelligent resource allocation.',
    tech: ['AI', 'Collaboration', 'Management'],
    color: '#10b981',
    link: 'https://github.com/Le-e-lab/team-ai',
    category: 'software'
  },
  {
    tag: 'Project',
    title: 'Task Manager CLI',
    description: 'A minimal command-line task manager built with Python — clean, fast, and Unix-philosophy inspired.',
    tech: ['Python', 'CLI', 'SQLite'],
    color: '#86efac',
    link: 'https://github.com/Le-e-lab/task-cli',
    category: 'software'
  },
];

/* ─── Design placeholders — drop images in public/images/ and set `image` field ─── */
const designProjects = [
  {
    title: 'Tarisai Visual Identity',
    description: 'Brand system for Tarisai\'s enterprise portal — geometric mark, dark palette, and structured grid language across digital touchpoints.',
    image: '',
    color: '#10b981',
    category: 'design'
  },
  {
    title: 'Elevate Value Partners Brand Kit',
    description: 'Corporate identity package for Elevate — growth-oriented color system, typography scale, and presentation templates.',
    image: '',
    color: '#86efac',
    category: 'design'
  },
];

const filterOptions = [
  { key: 'all', label: 'All' },
  { key: 'software', label: 'Software Engineering' },
  { key: 'design', label: 'Graphic Design' },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Work() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [filter, setFilter] = useState('all');

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
              !r.name.toLowerCase().includes('portfolio')
            );
          }
        }

        if (Array.isArray(repos)) {
          const formatted = repos.map((repo, i) => {
            const cleanTitle = repo.name
              .replace(/-/g, ' ')
              .replace(/_/g, ' ')
              .replace(/\b\w/g, c => c.toUpperCase());
            return {
              tag: repo.language || 'Repository',
              title: cleanTitle,
              description: repo.description || 'GitHub public repository.',
              tech: repo.topics?.length > 0 ? repo.topics.slice(0, 3) : (repo.language ? [repo.language] : ['Code']),
              color: ['#1e5335', '#22c55e', '#1e5335', '#22c55e'][i % 4],
              link: repo.html_url,
              category: 'software'
            };
          });

          const merged = [...fallbackProjects];
          formatted.forEach(fetched => {
            const isDuplicate = fallbackProjects.some(
              fp => fp.link.toLowerCase() === fetched.link.toLowerCase() ||
                    fp.title.toLowerCase().replace(/\s+/g, '') === fetched.title.toLowerCase().replace(/\s+/g, '')
            );
            if (!isDuplicate) {
              merged.push(fetched);
            }
          });
          setProjects(merged);
        } else {
          setProjects(fallbackProjects);
        }
      } catch {
        setProjects(fallbackProjects);
      }
    };
    fetchProjects();
  }, []);

  const softwareProjects = projects.filter(p => p.category === 'software');
  const filteredSoftware = filter === 'all' || filter === 'software' ? softwareProjects : [];
  const filteredDesign = filter === 'all' || filter === 'design' ? designProjects : [];

  return (
    <section className="section work-section">
      <div className="work-intro-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="work-heading-block"
        >
          <span className="section-number">02</span>
          <span className="section-label">Work</span>

          <h2 className="work-heading font-heading">
            Selected <span className="text-gradient">Projects</span>
          </h2>

          <p className="work-desc">
            Real projects, real problems, real solutions. From full-stack apps
            to brand design — each built with intention.
          </p>
        </motion.div>

        <div className="work-controls">
          {/* Category filter buttons */}
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
      </div>

      {/* ══════ SOFTWARE PROJECTS ══════ */}
      {filteredSoftware.length > 0 && (
        <div id="software" className="work-category-block">
          <motion.div
            className="work-grid"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {filteredSoftware.map((project) => (
              <motion.a
                key={project.link}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="work-card interactive"
                variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
              >
                {/* Mock IDE Editor Frame */}
                <div className="card-mock-ide">
                  <div className="ide-header">
                    <div className="ide-dots">
                      <span className="dot red"></span>
                      <span className="dot yellow"></span>
                      <span className="dot green"></span>
                    </div>
                    <span className="ide-tab font-mono">{project.title.toLowerCase().replace(/\s+/g, '_')}.jsx</span>
                  </div>

                  <div className="ide-workspace">
                    <div className="ide-sidebar">
                      <div className="ide-sidebar-item active"></div>
                      <div className="ide-sidebar-item"></div>
                      <div className="ide-sidebar-item"></div>
                    </div>

                    <div className="ide-code font-mono">
                      <div className="code-line"><span className="token keyword">import</span> React <span className="token keyword">from</span> <span className="token string">&apos;react&apos;</span>;</div>
                      <div className="code-line"><span className="token keyword">const</span> {project.title.replace(/\s+/g, '')} = () =&gt; &#123;</div>
                      <div className="code-line indent"><span className="token keyword">return</span> (</div>
                      <div className="code-line indent-2">&lt;<span className="token tag">div</span> className=<span className="token string">&quot;app&quot;</span>&gt;</div>
                      <div className="code-line indent-3">{project.tech[0]} core active</div>
                      <div className="code-line indent-2">&lt;/<span className="token tag">div</span>&gt;</div>
                      <div className="code-line indent font-mono">);</div>
                      <div className="code-line">&#125;;</div>
                    </div>
                  </div>

                  <div className="work-card-overlay">
                    <span className="work-card-overlay-text font-mono">
                      View Project <HiOutlineArrowUpRight size={12} />
                    </span>
                  </div>
                </div>

                <div className="work-card-body">
                  <div className="work-card-top">
                    <span
                      className="work-card-tag font-mono"
                      style={{ color: project.color, borderColor: `${project.color}33` }}
                    >
                      {project.tag}
                    </span>
                  </div>

                  <h3 className="work-card-title font-heading">{project.title}</h3>
                  <p className="work-card-desc">{project.description}</p>

                  <div className="work-card-bottom">
                    <div className="work-card-tech">
                      {project.tech.map(t => (
                        <span key={t} className="work-tech-pill font-mono">{t}</span>
                      ))}
                    </div>
                    <HiOutlineArrowUpRight size={16} className="work-card-arrow" />
                  </div>
                </div>

                <div
                  className="work-card-accent"
                  style={{ background: `linear-gradient(90deg, ${project.color}22, transparent)` }}
                />
              </motion.a>
            ))}
          </motion.div>
        </div>
      )}

      {/* ══════ DESIGN PROJECTS ══════ */}
      {filteredDesign.length > 0 && (
        <div id="design" className="work-category-block">
          <div className="design-grid">
            {filteredDesign.map((project, i) => (
              <motion.div
                key={project.title}
                className="design-card interactive"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
              >
                {/* Thumbnail area */}
                <div
                  className="design-thumb"
                  style={{
                    background: project.image
                      ? 'none'
                      : `linear-gradient(135deg, ${project.color}33, ${project.color}0a)`,
                  }}
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="design-thumb-img"
                      loading="lazy"
                    />
                  ) : (
                    <div className="design-thumb-placeholder">
                      <svg viewBox="0 0 100 100" fill="none" stroke={project.color} strokeWidth="1.2" className="design-placeholder-svg">
                        <rect x="15" y="15" width="70" height="70" rx="4" strokeDasharray="4 4" />
                        <path d="M 30 65 L 45 42 L 55 55 L 70 32" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="68" cy="33" r="3" fill={project.color} />
                        <line x1="15" y1="80" x2="85" y2="80" strokeWidth="0.8" opacity="0.3" />
                      </svg>
                      <span className="design-thumb-label font-mono">Drop image here</span>
                    </div>
                  )}
                </div>

                {/* Caption / storytelling */}
                <div className="design-card-body">
                  <h3 className="design-card-title font-heading">{project.title}</h3>
                  <p className="design-card-desc">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

/* ─── SVG helpers (unchanged) ─── */

