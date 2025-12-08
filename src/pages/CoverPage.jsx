import React from 'react';
import { motion } from 'framer-motion';
import './CoverPage.css';

const CoverPage = () => {
    return (
        <div className="cover-page">
            <div className="cover-content">
                <motion.p
                    className="greeting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    Hi, my name is
                </motion.p>

                <motion.h1
                    className="name"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    Lesley Mutsambiwa
                </motion.h1>

                <motion.h2
                    className="roles"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    Mobile Developer • Backend Developer • Cyber Analyst
                </motion.h2>

                <motion.p
                    className="tagline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                >
                    Building secure, scalable, and exceptional digital experiences
                </motion.p>

                <div className="cta-container">
                    <div className="scroll-hint">
                        <span>Explore My Work</span>
                        <motion.div
                            className="arrow-down"
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            ↓
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoverPage;
