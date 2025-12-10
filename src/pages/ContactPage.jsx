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
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch(`https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
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
            url: `mailto:${import.meta.env.VITE_EMAIL}`,
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
                {status === 'success' ? (
                    <motion.div
                        className="success-message"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            textAlign: 'center',
                            padding: '3rem',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '15px',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                    >
                        <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#43e97b' }}>Message Sent!</h3>
                        <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Thank you for reaching out. I'll get back to you as soon as possible.</p>
                        <button
                            onClick={() => setStatus('idle')}
                            style={{
                                marginTop: '2rem',
                                padding: '0.8rem 2rem',
                                background: 'transparent',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '30px',
                                color: 'white',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                            onMouseOut={(e) => e.target.style.background = 'transparent'}
                        >
                            Send Another Message
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        className="contact-form"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {status === 'error' && (
                            <div style={{
                                color: '#ff6b6b',
                                marginBottom: '1rem',
                                padding: '10px',
                                background: 'rgba(255, 0, 0, 0.1)',
                                borderRadius: '8px',
                                border: '1px solid rgba(255, 0, 0, 0.2)'
                            }}>
                                Something went wrong. Please try again.
                            </div>
                        )}
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
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
                                    value={formData.email}
                                    onChange={handleChange}
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
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="What's this about?"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
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
                            disabled={status === 'submitting'}
                            style={{ opacity: status === 'submitting' ? 0.7 : 1 }}
                        >
                            {status === 'submitting' ? 'Sending...' : 'Send Message'}
                        </motion.button>
                    </motion.form>
                )}

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
