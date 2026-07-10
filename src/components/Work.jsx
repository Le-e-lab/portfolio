import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';
import './Work.css';

const fallbackProjects = [
  {
    tag: 'Group Project',
    title: 'UPath',
    description: 'University Portal Simulation with attendance tracking, QR code scanning, and role-based access for Students and Lecturers.',
    tech: ['React', 'Node.js', 'Express', 'QR'],
    color: '#3a8a8a',
    link: 'https://github.com/Le-e-lab/upath-simulation'
  },
  {
    tag: 'Project',
    title: "The Chef's Muse",
    description: 'AI-powered recipe generator that creates meals from your inventory. Features calorie scanning with Gemini Vision.',
    tech: ['React', 'Tailwind', 'Gemini API'],
    color: '#c9a87c',
    link: 'https://le-e-lab.github.io/chefs-muse/'
  },
  {
    tag: 'Project',
    title: 'Team-AI',
    description: 'Collaborative AI workspace for team project management and intelligent resource allocation.',
    tech: ['AI', 'Collaboration', 'Management'],
    color: '#5a9a9a',
    link: 'https://github.com/Le-e-lab/team-ai'
  },
  {
    tag: 'Learning',
    title: 'GitHub Skills',
    description: 'Collection of interactive learning repositories for mastering GitHub Copilot and core Git workflows.',
    tech: ['GitHub', 'Copilot', 'Education'],
    color: '#4a8a6a',
    link: 'https://github.com/Le-e-lab/github-skills'
  },
  {
    tag: 'Experiment',
    title: 'Linux Rice Config',
    description: 'Custom Fedora & CachyOS dotfiles with bspwm, polybar, and a night-rain themed terminal setup.',
    tech: ['Linux', 'Bash', 'Config'],
    color: '#6a8a7a',
    link: 'https://github.com/Le-e-lab/dotfiles'
  },
  {
    tag: 'Project',
    title: 'Task Manager CLI',
    description: 'A minimal command-line task manager built with Python — clean, fast, and Unix-philosophy inspired.',
    tech: ['Python', 'CLI', 'SQLite'],
    color: '#8a7a5a',
    link: 'https://github.com/Le-e-lab/task-cli'
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } },
};

export default function Work() {
  const [projects, setProjects] = useState(fallbackProjects);

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
          if (!response.ok) throw new Error('Failed');
          const allRepos = await response.json();
          // Filter: skip forks and tiny config repos, keep the rest
          repos = allRepos.filter(r =>
            !r.fork &&
            !r.name.includes('dotfiles') &&
            !r.name.includes('skills') &&
            !r.name.includes('learning') &&
            !r.name.includes('.github')
          ).slice(0, 8);
        }

        const formatted = Array.isArray(repos) ? await Promise.all(
          repos.map(async (repo, i) => {
            let desc = repo.description;
            if (!desc) {
              try {
                const r = await fetch(`https://api.github.com/repos/Le-e-lab/${repo.name}/readme`, { headers: { Accept: 'application/vnd.github.v3.raw' } });
                if (r.ok) {
                  const t = await r.text();
                  const clean = t.replace(/^#+.*$/gm, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/!\[([^\]]*)\]\([^)]+\)/g, '').replace(/<[^>]*>?/gm, '').trim();
                  const lines = clean.split('\n').filter(l => l.trim().length > 0);
                  if (lines.length > 0) desc = lines[0].slice(0, 120) + (lines[0].length > 120 ? '...' : '');
                }
              } catch { /* skip */ }
            }
            return {
              tag: repo.private ? 'Private' : (repo.fork ? 'Fork' : 'Public'),
              title: repo.name.replace(/-/g, ' '),
              description: desc || 'No description provided.',
              tech: repo.topics?.length > 0 ? repo.topics.slice(0, 3) : (repo.language ? [repo.language] : ['Code']),
              color: ['#3a8a8a', '#c9a87c', '#5a9a9a', '#4a8a6a', '#6a8a7a', '#8a7a5a'][i % 6],
              link: repo.html_url
            };
          })
        ) : fallbackProjects;

        setProjects(formatted);
      } catch { /* use fallback */ }
    };
    fetchProjects();
  }, []);

  return (
    <section className="section work-section">
      <motion.div variants={container} initial="hidden" animate="visible">
        <motion.span className="section-number" variants={fadeUp}>02</motion.span>
        <motion.span className="section-label" variants={fadeUp}>Work</motion.span>

        <motion.h2 className="work-heading" variants={fadeUp}>
          Selected <span className="text-gradient">Projects</span>
        </motion.h2>

        <motion.p className="work-desc" variants={fadeUp}>
          Real projects, real problems, real solutions. From full-stack apps
          to developer tools — each built with intention.
        </motion.p>

        <div className="work-grid">
          {projects.map((project, i) => (
            <motion.a
              key={project.link + i}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="work-card interactive"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              <div className="work-card-top">
                <span className="work-card-num">{String(i + 1).padStart(2, '0')}</span>
                <span
                  className="work-card-tag"
                  style={{ color: project.color, borderColor: `${project.color}44` }}
                >
                  {project.tag}
                </span>
              </div>

              <h3 className="work-card-title">{project.title}</h3>
              <p className="work-card-desc">{project.description}</p>

              <div className="work-card-bottom">
                <div className="work-card-tech">
                  {project.tech.map(t => (
                    <span key={t} className="work-tech-pill">{t}</span>
                  ))}
                </div>
                <HiOutlineArrowUpRight size={16} className="work-card-arrow" />
              </div>

              <div
                className="work-card-accent"
                style={{ background: `linear-gradient(90deg, ${project.color}33, transparent)` }}
              />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
