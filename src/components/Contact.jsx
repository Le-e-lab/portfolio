import { motion } from 'framer-motion';
import { useState } from 'react';
import { HiOutlineEnvelope, HiOutlineMapPin } from 'react-icons/hi2';
import { HiDownload } from 'react-icons/hi';
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import './Contact.css';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } },
};

const reasons = [
  { icon: '💻', title: 'Full-Stack Capable', desc: 'React frontends to Node.js backends and Python scripts.' },
  { icon: '🧩', title: 'Problem Solver', desc: 'I solve business problems with efficient, scalable logic.' },
  { icon: '⚡', title: 'Quick Learner', desc: 'Adapting to new stacks is second nature.' },
  { icon: '🎨', title: 'Design Sensibility', desc: 'Clean aesthetics, glassmorphism, and smooth animations.' },
];

const socials = [
  { icon: FaGithub, href: 'https://github.com/Le-e-lab', label: 'GitHub' },
  { icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/lesley-mutsambiwa/', label: 'LinkedIn' },
  { icon: FaXTwitter, href: 'https://x.com', label: 'X' },
  { icon: HiOutlineEnvelope, href: 'https://mail.google.com/mail/?view=cm&fs=1&to=lesleymutsambiwa@gmail.com', label: 'Email' },
];

export default function Contact() {
  const [focused, setFocused] = useState(null);

  return (
    <section className="section contact-section">
      <motion.div className="contact-content" variants={container} initial="hidden" animate="visible">
        <motion.span className="section-number" variants={fadeUp}>04</motion.span>
        <motion.span className="section-label" variants={fadeUp}>Contact</motion.span>

        <motion.h2 className="contact-heading" variants={fadeUp}>
          Let&apos;s build <span className="text-gradient">something</span><br />together.
        </motion.h2>

        <motion.p className="contact-desc" variants={fadeUp}>
          Open for <strong>freelance projects, internships, and junior roles</strong>.
          Got an idea? Need a website? Let&apos;s make it happen.
        </motion.p>

        <motion.div className="freelance-badge" variants={fadeUp}>
          <span className="freelance-dot" />
          <span>          Available for work</span>
        </motion.div>

        {/* Quick actions */}
        <motion.div className="contact-actions" variants={fadeUp}>
          <motion.a
            href="/portfolio/Lesley_Mutsambiwa_Resume.docx"
            download="Lesley_Mutsambiwa_Resume.docx"
            className="contact-btn-primary interactive"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <HiDownload size={16} />
            Download Resume
          </motion.a>
          <motion.a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=lesleymutsambiwa@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn-secondary interactive"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <HiOutlineEnvelope size={16} />
            Email Me Directly
          </motion.a>
        </motion.div>

        {/* Reasons grid */}
        <motion.div className="contact-block" variants={fadeUp}>
          <h3 className="contact-subtitle">Why work with me?</h3>
          <div className="reasons-grid">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                className="reason-card interactive"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -4 }}
              >
                <span className="reason-icon">{r.icon}</span>
                <h4 className="reason-title">{r.title}</h4>
                <p className="reason-desc">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact form — modern two-column */}
        <motion.div className="contact-block" variants={fadeUp}>
          <h3 className="contact-subtitle">Send a message</h3>

          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-grid">
              <div className="form-col">
                <div className={`form-group ${focused === 'name' ? 'focused' : ''}`}>
                  <label htmlFor="c-name">Name</label>
                  <input id="c-name" type="text" placeholder="Your name"
                    onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} />
                </div>
                <div className={`form-group ${focused === 'email' ? 'focused' : ''}`}>
                  <label htmlFor="c-email">Email</label>
                  <input id="c-email" type="email" placeholder="you@email.com"
                    onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} />
                </div>
                <div className={`form-group ${focused === 'subject' ? 'focused' : ''}`}>
                  <label htmlFor="c-subject">Subject</label>
                  <input id="c-subject" type="text" placeholder="Project inquiry"
                    onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)} />
                </div>
              </div>
              <div className="form-col">
                <div className={`form-group form-group--grow ${focused === 'msg' ? 'focused' : ''}`}>
                  <label htmlFor="c-msg">Message</label>
                  <textarea id="c-msg" rows={8} placeholder="Tell me about your project, idea, or just say hi..."
                    onFocus={() => setFocused('msg')} onBlur={() => setFocused(null)} />
                </div>
              </div>
            </div>

            <div className="form-footer">
              <div className="form-contact-info">
                <div className="form-info-item">
                  <HiOutlineEnvelope size={14} />
                  <span>lesleymutsambiwa@gmail.com</span>
                </div>
                <div className="form-info-item">
                  <HiOutlineMapPin size={14} />
                  <span>Africa University, Zimbabwe</span>
                </div>
              </div>
              <motion.button className="submit-btn interactive" type="submit" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                Send Message
                <HiOutlineEnvelope size={14} />
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Socials */}
        <motion.div className="contact-socials" variants={fadeUp}>
          {socials.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="social-circle interactive"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.08, type: 'spring', stiffness: 200 }}
                whileHover={{ y: -3, scale: 1.1 }}
                title={s.label}
              >
                <Icon size={18} />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Footer */}
        <motion.footer className="site-footer" variants={fadeUp}>
          <p className="footer-text">Designed & built by Lesley · © {new Date().getFullYear()}</p>
          <p className="footer-sub">Crafted with React, Framer Motion & late-night ambition.</p>
        </motion.footer>
      </motion.div>
    </section>
  );
}
