import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';
import './Work.css';

/* ─── Curated "big" projects shown first ─── */
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
    tag: 'Group Project',
    title: 'UPath',
    description: 'University portal with attendance tracking, QR scanning, and role-based access.',
    tech: ['React', 'Node.js', 'Express', 'QR'],
    color: '#E8650A',
    link: 'https://github.com/Le-e-lab/upath-simulation',
    category: 'software'
  },
  {
    tag: 'Project',
    title: "The Chef's Muse",
    description: 'AI-powered recipe generator with calorie scanning via Gemini Vision.',
    tech: ['React', 'Tailwind', 'Gemini API'],
    color: '#FF8C38',
    link: 'https://le-e-lab.github.io/chefs-muse/',
    category: 'software'
  },
];

/* ─── Design projects with actual images ─── */
const designProjects = [
  {
    title: 'Studio Logo',
    description: 'Black and white minimal studio identity — clean geometry, timeless type.',
    image: '/portfolio/images/studio-logo.png',
    color: '#E8650A',
    category: 'design'
  },
  {
    title: 'Gold Brand Piece',
    description: 'Premium gold-toned brand asset — rich palette with editorial structure.',
    image: '/portfolio/images/gold.png',
    color: '#FF8C38',
    category: 'design'
  },
  {
    title: 'Logo Design',
    description: 'Custom logomark — geometric precision meets bold visual identity.',
    image: '/portfolio/images/logo.png',
    color: '#E8650A',
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
  hidden: { opacity: 0, y: 25, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Work() {
  const [githubProjects, setGithubProjects] = useState([]);
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
          const formatted = repos.map((repo, i) => ({
            tag: repo.language || 'Repository',
            title: repo.name.replace(/-/g, ' ').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            description: repo.description || 'GitHub public repository.',
            tech: repo.topics?.length > 0 ? repo.topics.slice(0, 3) : (repo.language ? [repo.language] : ['Code']),
            color: ['#E8650A', '#FF8C38', '#E8650A', '#FF8C38'][i % 4],
            link: repo.html_url,
            category: 'software'
          }));

          /* Merge: curated first, then GitHub extras (skip duplicates) */
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

  const softwareProjects = (githubProjects.length > 0 ? githubProjects : curatedProjects)
    .filter(p => p.category === 'software');
  const filteredDesign = filter === 'all' || filter === 'design' ? designProjects : [];
  const filteredSoftware = filter === 'all' || filter === 'software' ? softwareProjects : [];

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
            Real projects, real problems, real solutions. From full-stack apps to brand design — each built with intention.
          </p>
        </motion.div>

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

      {/* ══════ SOFTWARE PROJECTS ══════ */}
      {filteredSoftware.length > 0 && (
        <div id="software" className="work-category-block">
          <motion.div
            className="work-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
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
                <div className="work-card-accent" style={{ background: `linear-gradient(135deg, ${project.color}22, transparent)` }} />
                <div className="work-card-body">
                  <div className="work-card-top">
                    <span className="work-card-tag font-mono" style={{ color: project.color, borderColor: `${project.color}33` }}>
                      {project.tag}
                    </span>
                    <HiOutlineArrowUpRight size={16} className="work-card-arrow" />
                  </div>
                  <h3 className="work-card-title">{project.title}</h3>
                  <p className="work-card-desc">{project.description}</p>
                  <div className="work-card-tech">
                    {project.tech.map(t => (
                      <span key={t} className="work-tech-pill font-mono">{t}</span>
                    ))}
                  </div>
                </div>
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
                <div className="design-thumb">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="design-thumb-img"
                    loading="lazy"
                  />
                </div>
                <div className="design-card-body">
                  <h3 className="design-card-title">{project.title}</h3>
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
