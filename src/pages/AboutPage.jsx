import React from 'react';
import { motion } from 'framer-motion';
import { FaGamepad, FaCar, FaLaptopCode } from 'react-icons/fa';
import './AboutPage.css';

const AboutPage = () => {
    const interests = [
        { icon: FaGamepad, label: 'Anime', color: '#f093fb' },
        { icon: FaCar, label: 'Cars', color: '#4facfe' },
        { icon: FaLaptopCode, label: 'Technology', color: '#43e97b' },
    ];

    return (
        <div className="about-page">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="page-title">About Me</h2>
                <p className="page-subtitle">
                    A brief, compelling narrative covering my multi-disciplinary background
                </p>
            </motion.div>

            <div className="about-content">
                {/* Left side - Image placeholder */}
                <motion.div
                    className="about-image-section"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="image-container">
                        <img
                            src="./Image/Pic.jpg"
                            alt="Lesley Mutsambiwa"
                            className="profile-image"
                        />
                    </div>

                    {/* Interests below image */}
                    <div className="interests-section">
                        <h3 className="interests-title">Interests</h3>
                        <div className="interests-grid">
                            {interests.map((interest, index) => (
                                <motion.div
                                    key={index}
                                    className="interest-card"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <div className="interest-icon" style={{ color: interest.color }}>
                                        <interest.icon size={30} />
                                    </div>
                                    <span className="interest-label">{interest.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Right side - Text content */}
                <motion.div
                    className="about-text-section"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <p className="about-paragraph">
                        I'm a <strong>Mobile Developer</strong>, <strong>Backend Developer</strong>,
                        and <strong>Cyber Analyst</strong> passionate about building and securing
                        technology from the ground up. I thrive at the intersection of creation and
                        protection, bringing a unique perspective to every project.
                    </p>

                    <p className="about-paragraph">
                        Currently studying at <strong>Africa University</strong>, I'm an active
                        follower of tech trends and constantly exploring new frameworks, languages,
                        and security methodologies. My goal is to create secure, scalable, and
                        user-friendly products that make a real impact.
                    </p>

                    <p className="about-paragraph">
                        When I'm not coding or analyzing security vulnerabilities, you'll find me
                        watching anime, exploring automotive technology, or diving deep into the
                        latest tech innovations. I believe in continuous learning and pushing the
                        boundaries of what's possible.
                    </p>

                    {/* GDG Leadership Highlight */}
                    <div className="leadership-section">
                        <div className="leadership-badge">
                            <div className="badge-icon">🎯</div>
                            <div className="badge-content">
                                <h4 className="badge-title">Google Developer Groups</h4>
                                <p className="badge-subtitle">Board Member | Community & Code Lead</p>
                                <p className="badge-description">
                                    Leading the developer community at my university, organizing events,
                                    workshops, and fostering collaboration among aspiring technologists.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Resume Download Button */}
                    <motion.a
                        href="./resume.pdf"
                        download="Lesley_Mutsambiwa_Resume.pdf"
                        className="resume-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaLaptopCode size={20} />
                        <span>Download Resume</span>
                    </motion.a>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutPage;
