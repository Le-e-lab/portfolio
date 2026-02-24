import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';
import './Projects.css';

const fallbackProjects = [
  {
    tag: 'Group Project',
    title: 'UPath',
    description: 'University Portal Simulation with attendance tracking, QR code scanning, and role-based access for Students and Lecturers.',
    tech: ['React', 'Node.js', 'Express', 'QR'],
    color: '#3b82f6',
    link: 'https://github.com/Le-e-lab/upath-simulation'
  },
  {
    tag: 'Project',
    title: "The Chef's Muse",
    description: 'AI-powered recipe generator that creates meals from your inventory. Features calorie scanning with Gemini Vision.',
    tech: ['React', 'Tailwind', 'Gemini API'],
    color: '#f97316',
    link: 'https://le-e-lab.github.io/chefs-muse/'
  },
  {
    tag: 'Project',
    title: 'Team-AI',
    description: 'Collaborative AI workspace for team project management and intelligent resource allocation.',
    tech: ['AI', 'Collaboration', 'Management'],
    color: '#8b5cf6',
    link: 'https://github.com/Le-e-lab/team-ai'
  },
  {
    tag: 'Learning',
    title: 'GitHub Skills',
    description: 'Collection of interactive learning repositories for mastering GitHub Copilot and core Git workflows.',
    tech: ['GitHub', 'Copilot', 'Education'],
    color: '#2ea44f',
    link: 'https://github.com/Le-e-lab/github-skills'
  },
  {
    tag: 'Experiment',
    title: 'Linux Rice Config',
    description: 'Custom Fedora & CachyOS dotfiles with bspwm, polybar, and a night-rain themed terminal setup.',
    tech: ['Linux', 'Bash', 'Config'],
    color: '#34d399',
    link: 'https://github.com/Le-e-lab/dotfiles'
  },
  {
    tag: 'Project',
    title: 'Task Manager CLI',
    description: 'A minimal command-line task manager built with Python — clean, fast, and Unix-philosophy inspired.',
    tech: ['Python', 'CLI', 'SQLite'],
    color: '#d4a574',
    link: 'https://github.com/Le-e-lab/task-cli'
  },
];

const presetColors = ['#3b82f6', '#f97316', '#8b5cf6', '#2ea44f', '#34d399', '#d4a574', '#ec4899', '#06b6d4'];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Projects() {
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Le-e-lab/repos?sort=updated&per_page=6');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        
        const formattedProjects = await Promise.all(
          data.map(async (repo, index) => {
            let description = repo.description;

            // If no description, try fetching the README
            if (!description) {
              try {
                const readmeRes = await fetch(
                  `https://api.github.com/repos/Le-e-lab/${repo.name}/readme`,
                  {
                    headers: { Accept: 'application/vnd.github.v3.raw' },
                  }
                );
                
                if (readmeRes.ok) {
                  const readmeText = await readmeRes.text();
                  
                  // Basic text extraction: remove markdown headers, links, images, and HTML tags
                  const cleanText = readmeText
                    .replace(/^#+.*$/gm, '') // Remove headers
                    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Extract text from links
                    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // Remove images
                    .replace(/<[^>]*>?/gm, '') // Remove HTML tags
                    .trim();
                  
                  const lines = cleanText.split('\n').filter(line => line.trim().length > 0);
                  if (lines.length > 0) {
                    description = lines[0].slice(0, 120) + (lines[0].length > 120 ? '...' : '');
                  }
                }
              } catch (err) {
                console.error(`Failed to fetch readme for ${repo.name}:`, err);
              }
            }

            return {
              tag: repo.private ? 'Private' : 'Public',
              title: repo.name.replace(/-/g, ' '),
              description: description || 'No description provided.',
              tech: repo.topics && repo.topics.length > 0 
                ? repo.topics.slice(0, 3) 
                : (repo.language ? [repo.language] : ['Code']),
              color: presetColors[index % presetColors.length],
              link: repo.html_url
            };
          })
        );
        
        setProjects(formattedProjects);
      } catch (error) {
        console.error('Error fetching projects, falling back to static list:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="section projects-section">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.span className="section-label" variants={fadeUp}>
          Projects
        </motion.span>

        <motion.h2 className="projects-heading" variants={fadeUp}>
          My Feed
        </motion.h2>

        <motion.p className="projects-desc" variants={fadeUp}>
          Automatically synced with my latest GitHub activity. A collection of projects and experiments — from full-stack apps to configuration scripts.
        </motion.p>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <motion.a
              key={project.link + i}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card glass"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.3 + i * 0.1,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -8,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
              style={{ display: 'flex', flexDirection: 'column' }} // Ensure flex layout for anchor
            >
              <div className="project-header">
                <span
                  className="project-tag"
                  style={{
                    background: `${project.color}18`,
                    color: project.color,
                    borderColor: `${project.color}33`,
                  }}
                >
                  {project.tag}
                </span>
                <motion.div
                  className="project-arrow"
                  whileHover={{ x: 3, y: -3 }}
                >
                  <HiOutlineArrowUpRight size={16} />
                </motion.div>
              </div>

              <h3 className="project-title" style={{ textTransform: 'capitalize' }}>{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-tech">
                {project.tech.map((t) => (
                  <span key={t} className="project-tech-tag">
                    {t}
                  </span>
                ))}
              </div>

              <div
                className="project-gradient-bar"
                style={{
                  background: `linear-gradient(90deg, ${project.color}44, transparent)`,
                }}
              />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
