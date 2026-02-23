import { motion } from 'framer-motion';
import { useState } from 'react';
import { HiOutlineEnvelope, HiOutlineMapPin } from 'react-icons/hi2';
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import './Contact.css';

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

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/Le-e-lab', label: 'GitHub' },
  { icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/lesley-mutsambiwa/', label: 'LinkedIn' },
  { icon: FaXTwitter, href: 'https://x.com', label: 'X / Twitter' },
  { icon: HiOutlineEnvelope, href: 'https://mail.google.com/mail/?view=cm&fs=1&to=lesleymutsambiwa@gmail.com', label: 'Email' },
];

export default function Contact() {
  const [focused, setFocused] = useState(null);

  return (
    <section className="section contact-section">
      <motion.div
        className="contact-content"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.span className="section-label" variants={fadeUp}>
          Contact
        </motion.span>

        <motion.h2 className="contact-heading" variants={fadeUp}>
          Let&apos;s build <span className="text-gradient">something</span>
          <br />together.
        </motion.h2>

        <motion.p className="contact-desc" variants={fadeUp}>
          I&apos;m always looking for new opportunities, collaborations, and
          startup teams to join. Whether you have a project idea or just want
          to say hi — my inbox is open.
        </motion.p>

        {/* Contact Info */}
        <motion.div className="contact-info" variants={fadeUp}>
          <div className="contact-info-item">
            <HiOutlineEnvelope size={18} />
            <span>lesleymutsambiwa@gmail.com</span>
          </div>
          <div className="contact-info-item">
            <HiOutlineMapPin size={18} />
            <span>Africa University, Zimbabwe</span>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          className="contact-form"
          variants={fadeUp}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="form-row">
            <div className={`form-group ${focused === 'name' ? 'focused' : ''}`}>
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                type="text"
                placeholder="Your name"
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
              />
            </div>
            <div className={`form-group ${focused === 'email' ? 'focused' : ''}`}>
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                placeholder="you@email.com"
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
              />
            </div>
          </div>

          <div className={`form-group ${focused === 'message' ? 'focused' : ''}`}>
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              rows={5}
              placeholder="Tell me about your project or idea..."
              onFocus={() => setFocused('message')}
              onBlur={() => setFocused(null)}
            />
          </div>

          <motion.button
            className="submit-btn"
            type="submit"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Send Message
            <HiOutlineEnvelope size={16} />
          </motion.button>
        </motion.form>

        {/* Social Links */}
        <motion.div className="contact-socials" variants={fadeUp}>
          {socialLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="contact-social-btn"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.08, type: 'spring', stiffness: 200 }}
                whileHover={{ y: -3, scale: 1.1 }}
                title={link.label}
              >
                <Icon size={18} />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Footer */}
        <motion.div className="footer" variants={fadeUp}>
          <p className="footer-text">
            Designed & built by Lesley · © {new Date().getFullYear()}
          </p>
          <p className="footer-sub">
            Crafted with React, Framer Motion & late-night ambition.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
