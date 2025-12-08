import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import './ProjectsPage.css';

const ProjectsPage = () => {
    const projects = [
        {
            title: 'Secure Messaging App',
            description: 'End-to-end encrypted chat application for iOS and Android with real-time messaging and file sharing.',
            tech: ['React Native', 'Node.js', 'Socket.io', 'MongoDB'],
            category: 'Mobile Development',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
        {
            title: 'E-commerce API',
            description: 'Scalable RESTful API for high-traffic e-commerce platform with payment integration and inventory management.',
            tech: ['Python', 'FastAPI', 'PostgreSQL', 'Redis'],
            category: 'Backend Development',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        },
        {
            title: 'Network Intrusion Detection',
            description: 'AI-powered system for monitoring and analyzing network traffic to detect potential security threats.',
            tech: ['Python', 'TensorFlow', 'Wireshark', 'Docker'],
            category: 'Cybersecurity',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        },
        {
            title: 'Task Management Dashboard',
            description: 'Full-stack web application for organizing tasks and tracking project progress with team collaboration features.',
            tech: ['React', 'Node.js', 'Express', 'MongoDB'],
            category: 'Full-Stack',
            gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <div className="projects-page">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="page-title">Featured Projects</h2>
                <p className="page-subtitle">
                    Building solutions across mobile, backend, and security
                </p>
            </motion.div>

            <motion.div
                className="projects-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        className="project-card"
                        variants={itemVariants}
                        whileHover={{ y: -10 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <div className="project-header" style={{ background: project.gradient }}>
                            <span className="project-category">{project.category}</span>
                        </div>

                        <div className="project-content">
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-description">{project.description}</p>

                            <div className="project-tech">
                                {project.tech.map((tech, i) => (
                                    <span key={i} className="tech-tag">{tech}</span>
                                ))}
                            </div>

                            <div className="project-links">
                                <button className="project-link">
                                    <FiGithub size={18} />
                                    <span>Code</span>
                                </button>
                                <button className="project-link">
                                    <FiExternalLink size={18} />
                                    <span>Demo</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default ProjectsPage;
