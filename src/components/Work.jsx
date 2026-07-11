import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';
import './Work.css';

const fallbackProjects = [
  {
    tag: 'Lead Developer',
    title: 'Tarisai Portal',
    description: 'Enterprise ERP and visual scaling portal for Tarisai. Engineered secure routing architectures, dashboard visualizers, and API integrations.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Security'],
    color: '#10b981',
    link: 'https://www.tarisai.co.zw/'
  },
  {
    tag: 'Lead Developer',
    title: 'Elevate Partners',
    description: 'Interactive business management system and analytics suite developed for Elevate Value Partners, built for enterprise scalability.',
    tech: ['Next.js', 'Tailwind', 'Node.js', 'Analytics'],
    color: '#86efac',
    link: 'https://www.elevatevaluepartners.co.zw/'
  },
  {
    tag: 'Group Project',
    title: 'UPath',
    description: 'University Portal Simulation with attendance tracking, QR code scanning, and role-based access for Students and Lecturers.',
    tech: ['React', 'Node.js', 'Express', 'QR'],
    color: '#10b981',
    link: 'https://github.com/Le-e-lab/upath-simulation'
  },
  {
    tag: 'Project',
    title: "The Chef's Muse",
    description: 'AI-powered recipe generator that creates meals from your inventory. Features calorie scanning with Gemini Vision.',
    tech: ['React', 'Tailwind', 'Gemini API'],
    color: '#86efac',
    link: 'https://le-e-lab.github.io/chefs-muse/'
  },
  {
    tag: 'Project',
    title: 'Team-AI',
    description: 'Collaborative AI workspace for team project management and intelligent resource allocation.',
    tech: ['AI', 'Collaboration', 'Management'],
    color: '#10b981',
    link: 'https://github.com/Le-e-lab/team-ai'
  },
  {
    tag: 'Project',
    title: 'Task Manager CLI',
    description: 'A minimal command-line task manager built with Python — clean, fast, and Unix-philosophy inspired.',
    tech: ['Python', 'CLI', 'SQLite'],
    color: '#86efac',
    link: 'https://github.com/Le-e-lab/task-cli'
  },
];

const getProjectSVG = (title, color = 'var(--teal)') => {
  const t = title.toLowerCase();
  if (t.includes('tarisai')) {
    return (
      <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="1.5">
        <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" />
        <line x1="50" y1="15" x2="50" y2="95" strokeDasharray="3 3" />
        <circle cx="50" cy="55" r="15" />
        <path d="M 40 55 L 60 55" strokeWidth="2.5" />
      </svg>
    );
  }
  if (t.includes('elevate') || t.includes('partners')) {
    return (
      <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="1.5">
        <rect x="20" y="20" width="60" height="60" rx="4" />
        <path d="M 30 65 L 45 40 L 60 55 L 75 30" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="75" cy="30" r="3" fill={color} />
      </svg>
    );
  }
  if (t.includes('upath')) {
    return (
      <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="1.5">
        <rect x="25" y="25" width="50" height="50" rx="4" opacity="0.3" />
        <path d="M 35 25 L 25 25 L 25 35" strokeWidth="2" />
        <path d="M 65 25 L 75 25 L 75 35" strokeWidth="2" />
        <path d="M 35 75 L 25 75 L 25 65" strokeWidth="2" />
        <path d="M 65 75 L 75 75 L 75 65" strokeWidth="2" />
        <circle cx="50" cy="50" r="10" strokeDasharray="3 3" />
        <line x1="50" y1="20" x2="50" y2="80" strokeDasharray="4 4" />
      </svg>
    );
  }
  if (t.includes('chef') || t.includes('muse')) {
    return (
      <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M 20 70 A 30 30 0 0 1 80 70 Z" />
        <line x1="15" y1="75" x2="85" y2="75" strokeWidth="2" />
        <path d="M 50 20 L 50 35 M 40 23 L 43 33 M 60 23 L 57 33" strokeDasharray="2 2" />
        <circle cx="50" cy="55" r="4" fill={color} />
      </svg>
    );
  }
  if (t.includes('team') || t.includes('workspace')) {
    return (
      <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="1.5">
        <circle cx="50" cy="30" r="6" />
        <circle cx="30" cy="65" r="6" />
        <circle cx="70" cy="65" r="6" />
        <line x1="50" y1="36" x2="33" y2="59" />
        <line x1="50" y1="36" x2="67" y2="59" />
        <line x1="36" y1="65" x2="64" y2="65" strokeDasharray="3 3" />
        <circle cx="50" cy="53" r="3" fill={color} />
      </svg>
    );
  }
  if (t.includes('github') || t.includes('skills')) {
    return (
      <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="1.5">
        <line x1="35" y1="80" x2="35" y2="20" strokeWidth="2" />
        <circle cx="35" cy="25" r="5" />
        <circle cx="35" cy="75" r="5" fill={color} />
        <path d="M 35 55 Q 55 55 55 40" />
        <circle cx="55" cy="35" r="5" />
      </svg>
    );
  }
  if (t.includes('linux') || t.includes('rice') || t.includes('dotfiles')) {
    return (
      <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="1.5">
        <rect x="20" y="25" width="60" height="50" rx="3" />
        <path d="M 30 45 L 38 50 L 30 55" strokeWidth="2" />
        <line x1="43" y1="55" x2="55" y2="55" strokeWidth="2" />
        <circle cx="70" cy="35" r="2" fill={color} />
      </svg>
    );
  }
  if (t.includes('task') || t.includes('cli') || t.includes('manager')) {
    return (
      <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="1.5">
        <rect x="25" y="20" width="50" height="60" rx="4" />
        <path d="M 35 35 L 40 40 L 50 30" strokeWidth="2" />
        <line x1="58" y1="35" x2="65" y2="35" />
        <path d="M 35 55 L 40 60 L 50 50" strokeWidth="2" />
        <line x1="58" y1="55" x2="65" y2="55" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="1.5">
      <polygon points="50,15 80,35 80,65 50,85 20,65 20,35" />
      <circle cx="50" cy="50" r="12" strokeDasharray="3 3" />
    </svg>
  );
};

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
  const [isGridView, setIsGridView] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 220, damping: 26 });
  const springY = useSpring(mouseY, { stiffness: 220, damping: 26 });

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsGridView(true);
    }
  }, []);

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
              link: repo.html_url
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
      } catch (err) {
        setProjects(fallbackProjects);
      }
    };
    fetchProjects();
  }, []);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX + 20);
    mouseY.set(e.clientY + 20);
  };

  return (
    <section className="section work-section" ref={containerRef} onMouseMove={handleMouseMove}>
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
            to developer tools — each built with intention.
          </p>
        </motion.div>

        {/* Grid/List layout toggle buttons */}
        <div className="layout-toggle-wrapper">
          <button 
            onClick={() => setIsGridView(false)}
            className={`layout-toggle-btn interactive ${!isGridView ? 'active' : ''}`}
            aria-label="List view"
          >
            List
          </button>
          <button 
            onClick={() => setIsGridView(true)}
            className={`layout-toggle-btn interactive ${isGridView ? 'active' : ''}`}
            aria-label="Grid view"
          >
            Grid
          </button>
        </div>
      </div>

      {isGridView ? (
        /* GRID VIEW (Code Editor IDE Mockup Layout) */
        <motion.div
          className="work-grid"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project, i) => (
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
                {/* Window Header */}
                <div className="ide-header">
                  <div className="ide-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <span className="ide-tab font-mono">{project.title.toLowerCase().replace(/\s+/g, '_')}.jsx</span>
                </div>
                
                {/* Editor Workspace */}
                <div className="ide-workspace">
                  {/* File Tree Sidebar */}
                  <div className="ide-sidebar">
                    <div className="ide-sidebar-item active"></div>
                    <div className="ide-sidebar-item"></div>
                    <div className="ide-sidebar-item"></div>
                  </div>
                  
                  {/* Code Text lines */}
                  <div className="ide-code font-mono">
                    <div className="code-line"><span className="token keyword">import</span> React <span className="token keyword">from</span> <span className="token string">'react'</span>;</div>
                    <div className="code-line"><span className="token keyword">const</span> {project.title.replace(/\s+/g, '')} = () =&gt; &#123;</div>
                    <div className="code-line indent"><span className="token keyword">return</span> (</div>
                    <div className="code-line indent-2">&lt;<span className="token tag">div</span> className=<span className="token string">"app"</span>&gt;</div>
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
      ) : (
        /* ROW-BASED CATALOG VIEW (Minimal row list layout with 3D translation) */
        <div className="work-list-catalog">
          {projects.map((project, i) => (
            <motion.a
              key={project.link}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="work-row interactive"
              onMouseEnter={() => setActiveProject(i)}
              onMouseLeave={() => setActiveProject(null)}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="row-num-title">
                <span className="row-num font-mono">{String(i + 1).padStart(2, '0')}</span>
                <span className="row-title font-heading">{project.title}</span>
              </div>

              <span 
                className="row-tag font-mono"
                style={{ color: project.color, borderColor: `${project.color}30` }}
              >
                {project.tag}
              </span>

              <div className="row-tech">
                {project.tech.map(t => (
                  <span key={t} className="row-tech-pill font-mono">{t}</span>
                ))}
              </div>

              <div className="row-action">
                <span className="row-action-lbl font-mono">Visit</span>
                <HiOutlineArrowUpRight size={16} className="row-arrow" />
              </div>

              {/* Separator line inside each catalog item */}
              <div className="row-separator" />

              {/* Grid-style background highlight on row hover */}
              <div 
                className="row-hover-bg" 
                style={{ background: `linear-gradient(90deg, ${project.color}08, transparent)` }} 
              />
            </motion.a>
          ))}

          {/* Cursor-Following Preview Card (Blur sweep transitions) */}
          <motion.div
            className="project-cursor-preview"
            style={{ 
              x: springX, 
              y: springY, 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              pointerEvents: 'none', 
              zIndex: 100 
            }}
            initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
            animate={{ 
              opacity: activeProject !== null ? 1 : 0, 
              scale: activeProject !== null ? 1 : 0.85,
              filter: activeProject !== null ? "blur(0px)" : "blur(10px)"
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {activeProject !== null && (
              <div className="preview-card-inner">
                <div 
                  className="preview-svg-container" 
                  style={{ 
                    borderColor: `${projects[activeProject].color}33`,
                    background: `linear-gradient(135deg, ${projects[activeProject].color}08, transparent)` 
                  }}
                >
                  {getProjectSVG(projects[activeProject].title, projects[activeProject].color)}
                </div>
                <div className="preview-details">
                  <span className="preview-tag font-mono" style={{ color: projects[activeProject].color }}>
                    {projects[activeProject].tag}
                  </span>
                  <h4 className="preview-title font-heading">{projects[activeProject].title}</h4>
                  <p className="preview-desc">{projects[activeProject].description}</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
}
