import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import './ContactPage.css';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const socialLinks = [
        {
            icon: FaGithub,
            label: 'GitHub',
            url: 'https://github.com/Le-e-lab',
            color: '#333'
        },
        {
            icon: FaLinkedin,
            label: 'LinkedIn',
            url: 'https://www.linkedin.com/in/lesley-mutsambiwa/',
            color: '#0077b5'
        },
        {
            icon: FaTwitter,
            label: 'Twitter',
            url: 'https://twitter.com',
            color: '#1da1f2'
        },
        {
            icon: FaEnvelope,
            label: 'Email',
            url: 'mailto:lesleymutsambiwa@gmail.com',
            color: '#ea4335'
        },
    ];

    return (
        <div className="contact-page">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="page-title">Get In Touch</h2>
                <p className="page-subtitle">
                    Let's build something together. Feel free to reach out for collaborations,
                    job opportunities, or questions.
                </p>
            </motion.div>

            <div className="contact-content">
                <motion.form
                    className="contact-form"
                    action="https://formspree.io/f/manrdqqq"
                    method="POST"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Your Name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="you@email.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            placeholder="What's this about?"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Hi, I'd like to connect regarding..."
                            rows="6"
                            required
                        />
                    </div>

                    <motion.button
                        type="submit"
                        className="submit-button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Send Message
                    </motion.button>
                </motion.form>

                <motion.div
                    className="social-links"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h3 className="social-title">Find me elsewhere</h3>
                    <div className="social-grid">
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.url}
                                className="social-link"
                                whileHover={{ scale: 1.1, y: -5 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <social.icon size={24} style={{ color: social.color }} />
                                <span>{social.label}</span>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactPage;
