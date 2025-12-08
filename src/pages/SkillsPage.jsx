import React from 'react';
import { motion } from 'framer-motion';
import {
    SiHtml5, SiCss3, SiJavascript, SiReact, SiPython,
    SiFlutter, SiGit, SiDocker, SiMongodb, SiPostgresql
} from 'react-icons/si';
import './SkillsPage.css';

const SkillsPage = () => {
    const skills = [
        { name: 'HTML', icon: SiHtml5, level: 'Proficient', color: '#E34F26' },
        { name: 'CSS', icon: SiCss3, level: 'Proficient', color: '#1572B6' },
        { name: 'JavaScript', icon: SiJavascript, level: 'Advanced', color: '#F7DF1E' },
        { name: 'React', icon: SiReact, level: 'Advanced', color: '#61DAFB' },
        { name: 'React Native', icon: SiReact, level: 'Intermediate', color: '#61DAFB' },
        { name: 'Flutter', icon: SiFlutter, level: 'Intermediate', color: '#02569B' },
        { name: 'Python', icon: SiPython, level: 'Proficient', color: '#3776AB' },
        { name: 'Git', icon: SiGit, level: 'Proficient', color: '#F05032' },
        { name: 'Docker', icon: SiDocker, level: 'Intermediate', color: '#2496ED' },
        { name: 'MongoDB', icon: SiMongodb, level: 'Intermediate', color: '#47A248' },
        { name: 'PostgreSQL', icon: SiPostgresql, level: 'Intermediate', color: '#4169E1' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="skills-page">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="page-title">My Arsenal</h2>
                <p className="page-subtitle">
                    Specializing in mobile, backend, and security
                </p>
            </motion.div>

            <motion.div
                className="skills-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        className="skill-card"
                        variants={itemVariants}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: `0 10px 30px ${skill.color}40`
                        }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <div className="skill-icon" style={{ color: skill.color }}>
                            <skill.icon size={50} />
                        </div>
                        <h3 className="skill-name">{skill.name}</h3>
                        <span className="skill-level">{skill.level}</span>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default SkillsPage;
