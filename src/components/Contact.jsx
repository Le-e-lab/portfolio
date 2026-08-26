import { motion } from 'framer-motion';
import { useState } from 'react';
import { HiOutlineEnvelope, HiOutlineMapPin } from 'react-icons/hi2';
import { HiDownload } from 'react-icons/hi';
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import './Contact.css';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const reasons = [
  {
    svg: (
      <svg className="reason-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="4" rx="1" />
        <rect x="3" y="10" width="18" height="4" rx="1" />
        <rect x="3" y="16" width="18" height="4" rx="1" />
        <circle cx="6" cy="6" r="1" fill="currentColor" />
        <circle cx="6" cy="12" r="1" fill="currentColor" />
        <circle cx="6" cy="18" r="1" fill="currentColor" />
      </svg>
    ),
    title: 'Full-Stack Capable',
    desc: 'React frontends to Node.js backends and Python scripts.'
  },
  {
    svg: (
      <svg className="reason-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <circle cx="5" cy="5" r="2" />
        <circle cx="19" cy="5" r="2" />
        <circle cx="5" cy="19" r="2" />
        <circle cx="19" cy="19" r="2" />
        <line x1="6.5" y1="6.5" x2="10" y2="10" />
        <line x1="17.5" y1="6.5" x2="14" y2="10" />
        <line x1="6.5" y1="17.5" x2="10" y2="14" />
        <line x1="17.5" y1="17.5" x2="14" y2="14" />
      </svg>
    ),
    title: 'Problem Solver',
    desc: 'I solve business problems with efficient, scalable logic.'
  },
  {
    svg: (
      <svg className="reason-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Quick Learner',
    desc: 'Adapting to new stacks is second nature.'
  },
  {
    svg: (
      <svg className="reason-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="9" y1="3" x2="9" y2="21" />
        <line x1="15" y1="3" x2="15" y2="21" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
      </svg>
    ),
    title: 'Design Sensibility',
    desc: 'Clean aesthetics, glassmorphism, and smooth animations.'
  },
];

const socials = [
  { icon: FaGithub, href: 'https://github.com/Le-e-lab', label: 'GitHub' },
  { icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/lesley-mutsambiwa/', label: 'LinkedIn' },
  { icon: FaXTwitter, href: 'https://x.com', label: 'X' },
  { icon: HiOutlineEnvelope, href: 'https://mail.google.com/mail/?view=cm&fs=1&to=lesleymutsambiwa@gmail.com', label: 'Email' },
];

export default function Contact() {
  const [formState, setFormState] = useState('idle'); // 'idle', 'sending', 'sent'

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => {
      setFormState('sent');
    }, 1500);
  };

  return (
    <section className="section contact-section">
      <div className="contact-grid-container">
        {/* LEFT COLUMN: dossier, details, resume ticket */}
        <motion.div 
          className="contact-info-col" 
          variants={stagger} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
        >
          <motion.span className="section-number" variants={fadeUp}>04</motion.span>
          <motion.span className="section-label" variants={fadeUp}>Contact</motion.span>

          <motion.h2 className="contact-heading" variants={fadeUp}>
            Let&apos;s build <span className="text-gradient">something</span><br />together.
          </motion.h2>

          <motion.p className="contact-desc" variants={fadeUp}>
            I&apos;m always down to collaborate on open-source tools, full-stack systems, or visual design work. If you want to talk systems, Linux configs, or have an interesting role, drop me a line.
          </motion.p>

          <motion.div className="freelance-badge" variants={fadeUp}>
            <span className="freelance-dot" />
            <span>Available for work</span>
          </motion.div>

          <motion.div className="location-block" variants={fadeUp}>
            <h3 className="location-title font-mono">/ PRIMARY_LOCATION</h3>
            <div className="location-details">
              <div className="loc-item">
                <HiOutlineMapPin size={15} />
                <span>Harare, Zimbabwe</span>
              </div>
              <div className="loc-item">
                <HiOutlineEnvelope size={15} />
                <span>lesleymutsambiwa@gmail.com</span>
              </div>
            </div>
          </motion.div>

          {/* Dossier Ticket for Resume Download */}
          <motion.div 
            className="resume-dossier-ticket interactive"
            variants={fadeUp}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3 }}
          >
            <div className="ticket-header">
              <span className="ticket-label font-mono">DOC_RELEASE // v6.0</span>
              <span className="ticket-status font-mono">APPROVED</span>
            </div>
            
            <div className="ticket-body">
              <div className="ticket-details">
                <h4 className="ticket-title">Lesley_Mutsambiwa_Resume.docx</h4>
                <div className="ticket-meta">
                  <span className="font-mono">SIZE: 24.5 KB</span>
                  <span className="font-mono">TYPE: DOCX</span>
                  <span className="font-mono">LOC: ZW.HRE</span>
                </div>
              </div>
              
              <a 
                href="/portfolio/Lesley_Mutsambiwa_Resume.docx"
                download="Lesley_Mutsambiwa_CV.docx"
                className="ticket-download-btn interactive"
                title="Download CV"
              >
                <HiDownload size={18} />
              </a>
            </div>

            <div className="ticket-barcode-wrap">
              <div className="barcode">
                <div className="bar thin"></div>
                <div className="bar thick"></div>
                <div className="bar mid"></div>
                <div className="bar thin"></div>
                <div className="bar thin"></div>
                <div className="bar thick"></div>
                <div className="bar mid"></div>
                <div className="bar thick"></div>
                <div className="bar thin"></div>
                <div className="bar thin"></div>
                <div className="bar thick"></div>
              </div>
              <span className="barcode-text font-mono">*LESLEY-MUTSAMBIWA-RESUME*</span>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: Minimal form in glass container */}
        <motion.div 
          className="contact-form-col"
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="contact-glass-form-container">
            <h3 className="glass-form-title font-mono">{'// INITIATE_CONTACT_PROTOCOL'}</h3>
            
            {formState === 'sent' ? (
              <motion.div 
                className="contact-success-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="success-icon-wrap">
                  <svg viewBox="0 0 50 50" className="success-svg-check">
                    <motion.circle 
                      cx="25" cy="25" r="20" 
                      stroke="var(--tangerine)" 
                      strokeWidth="2" 
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                    <motion.path 
                      d="M 15 25 L 22 32 L 35 18" 
                      stroke="var(--tangerine)" 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, delay: 0.6, ease: "easeInOut" }}
                    />
                  </svg>
                </div>
                <h4 className="success-title font-mono">TRANSMISSION_SECURED</h4>
                <p className="success-text">
                  Protocol initiated successfully. Message encrypted and dispatched to Lesley.
                </p>
                <div className="success-logs font-mono">
                  <span className="log-line">&gt; CONNECTING_SECURE_SERVER... OK</span>
                  <span className="log-line">&gt; ROTATING_CRYPT_KEYS... OK</span>
                  <span className="log-line">&gt; DISPATCHING_ENCRYPTED_PACKET... OK</span>
                  <span className="log-line">&gt; STATUS: PENDING_RESPONSE</span>
                </div>
                <button 
                  onClick={() => setFormState('idle')} 
                  className="success-reset-btn interactive font-mono"
                >
                  RE-OPEN_CHANNEL
                </button>
              </motion.div>
            ) : (
              <form className="contact-glass-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <input 
                    type="text" 
                    id="form-name" 
                    required 
                    placeholder=" " 
                    className="glass-input"
                    disabled={formState === 'sending'}
                  />
                  <label htmlFor="form-name" className="glass-label font-mono">YOUR NAME</label>
                  <span className="input-line"></span>
                </div>

                <div className="input-group">
                  <input 
                    type="email" 
                    id="form-email" 
                    required 
                    placeholder=" " 
                    className="glass-input"
                    disabled={formState === 'sending'}
                  />
                  <label htmlFor="form-email" className="glass-label font-mono">EMAIL ADDRESS</label>
                  <span className="input-line"></span>
                </div>

                <div className="input-group">
                  <input 
                    type="text" 
                    id="form-subject" 
                    required 
                    placeholder=" " 
                    className="glass-input"
                    disabled={formState === 'sending'}
                  />
                  <label htmlFor="form-subject" className="glass-label font-mono">SUBJECT</label>
                  <span className="input-line"></span>
                </div>

                <div className="input-group textarea-group">
                  <textarea 
                    id="form-message" 
                    required 
                    placeholder=" " 
                    className="glass-input"
                    rows={5}
                    disabled={formState === 'sending'}
                  />
                  <label htmlFor="form-message" className="glass-label font-mono">YOUR MESSAGE</label>
                  <span className="input-line"></span>
                </div>

                <div className="form-submit-row">
                  <motion.button 
                    type="submit" 
                    className="glass-submit-btn interactive"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={formState === 'sending'}
                  >
                    <span className="btn-text">
                      {formState === 'sending' ? 'TRANSMITTING...' : 'SEND PROTOCOL'}
                    </span>
                    <HiOutlineEnvelope size={14} className="btn-icon" />
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      {/* WHY WORK WITH ME */}
      <div className="contact-block why-block">
        <div className="block-header-wrap">
          <h3 className="contact-subtitle">{'// PERF_CAPABILITIES'}</h3>
        </div>
        
        <div className="reasons-grid">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              className="reason-card interactive"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              whileHover={{ y: -3 }}
            >
              <div className="reason-svg-wrapper">
                {r.svg}
              </div>
              <h4 className="reason-title">{r.title}</h4>
              <p className="reason-desc">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Social links circles */}
      <div className="contact-footer-wrap">
        <div className="contact-socials">
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
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3, scale: 1.08 }}
                title={s.label}
              >
                <Icon size={16} />
              </motion.a>
            );
          })}
        </div>

        <footer className="site-footer">
          <p className="footer-text">Designed & built by Lesley · © {new Date().getFullYear()}</p>
          <p className="footer-sub font-mono">SYSTEM_ID: LSL-ZW-6.0 // REACT-CORE</p>
        </footer>
      </div>
    </section>
  );
}
