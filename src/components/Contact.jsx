import { useState } from 'react';
import Icon from './Icon';
import useReveal from '../hooks/useReveal';
import LiquidDivider from './LiquidDivider';
import './Contact.css';

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
  { icon: 'github', href: 'https://github.com/Le-e-lab', label: 'GitHub' },
  { icon: 'linkedin', href: 'https://www.linkedin.com/in/lesley-mutsambiwa/', label: 'LinkedIn' },
  { icon: 'x', href: 'https://x.com', label: 'X' },
  { icon: 'envelope', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=lesleymutsambiwa@gmail.com', label: 'Email' },
];

const serviceOptions = [
  'Brand Identity',
  'Logo Design',
  'Website Design',
  'Full-Stack Development',
  'UI/UX Design',
  'Other',
];

export default function Contact() {
  const [formState, setFormState] = useState('idle');
  const [subject, setSubject] = useState('');
  const infoRef = useReveal();
  const formRef = useReveal();
  const reasonsRef = useReveal();
  const socialsRef = useReveal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => {
      setFormState('sent');
    }, 1500);
  };

  return (
    <section className="section contact-section">
      {/* Light zone: contact info + form */}
      <div className="contact-light-zone section--light">
        <div className="contact-grid-container">
          {/* LEFT COLUMN */}
          <div ref={infoRef} className="reveal contact-info-col">
            <span className="section-number">04</span>
            <span className="section-label">Contact</span>
            <h2 className="contact-heading">
              Let&apos;s build <span className="text-gradient">something</span><br />together.
            </h2>
            <p className="contact-desc">
              I&apos;m always down to collaborate on brand identities, visual design, or full-stack systems. If you want to talk design, systems, or have an interesting project, drop me a line.
            </p>
            <div className="freelance-badge">
              <span className="freelance-dot" />
              <span>Available for work</span>
            </div>
            <div className="location-block">
              <h3 className="location-title font-mono">/ PRIMARY_LOCATION</h3>
              <div className="location-details">
                <div className="loc-item">
                  <Icon name="map-pin" size={15} />
                  <span>Harare, Zimbabwe</span>
                </div>
                <div className="loc-item">
                  <Icon name="envelope" size={15} />
                  <span>lesleymutsambiwa@gmail.com</span>
                </div>
              </div>
            </div>
            <a
              className="resume-dossier-ticket interactive"
              href="/Lesley_Mutsambiwa_Resume.docx"
              download="Lesley_Mutsambiwa_CV.docx"
              title="Download CV"
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
                <span className="ticket-download-btn interactive">
                  <Icon name="download" size={18} />
                </span>
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
            </a>
          </div>

          {/* RIGHT COLUMN */}
          <div ref={formRef} className="reveal contact-form-col">
            <div className="contact-glass-form-container">
              <h3 className="glass-form-title font-mono">{'// INITIATE_CONTACT_PROTOCOL'}</h3>

              {formState === 'sent' ? (
                <div className="contact-success-screen">
                  <div className="success-icon-wrap">
                    <svg viewBox="0 0 50 50" className="success-svg-check">
                      <circle cx="25" cy="25" r="20" stroke="var(--tangerine)" strokeWidth="2" fill="none" strokeDasharray="126" strokeDashoffset="126">
                        <animate attributeName="stroke-dashoffset" from="126" to="0" dur="0.8s" fill="freeze" />
                      </circle>
                      <path d="M 15 25 L 22 32 L 35 18" stroke="var(--tangerine)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeDasharray="30" strokeDashoffset="30">
                        <animate attributeName="stroke-dashoffset" from="30" to="0" dur="0.6s" begin="0.6s" fill="freeze" />
                      </path>
                    </svg>
                  </div>
                  <h4 className="success-title font-mono">TRANSMISSION_SECURED</h4>
                  <p className="success-text">Protocol initiated successfully. Message encrypted and dispatched to Lesley.</p>
                  <div className="success-logs font-mono">
                    <span className="log-line">&gt; CONNECTING_SECURE_SERVER... OK</span>
                    <span className="log-line">&gt; ROTATING_CRYPT_KEYS... OK</span>
                    <span className="log-line">&gt; DISPATCHING_ENCRYPTED_PACKET... OK</span>
                    <span className="log-line">&gt; STATUS: PENDING_RESPONSE</span>
                  </div>
                  <button onClick={() => setFormState('idle')} className="success-reset-btn interactive font-mono">RE-OPEN_CHANNEL</button>
                </div>
              ) : (
                <>
                  <div className="service-options">
                    <span className="service-options-label font-mono">What can I help with?</span>
                    <div className="service-chips">
                      {serviceOptions.map((s) => (
                        <button key={s} className={`service-chip interactive ${subject === s ? 'active' : ''}`} onClick={() => setSubject(s)} type="button">{s}</button>
                      ))}
                    </div>
                  </div>
                  <form className="contact-glass-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                      <input type="text" id="form-name" required placeholder=" " className="glass-input" disabled={formState === 'sending'} />
                      <label htmlFor="form-name" className="glass-label font-mono">YOUR NAME</label>
                      <span className="input-line"></span>
                    </div>
                    <div className="input-group">
                      <input type="email" id="form-email" required placeholder=" " className="glass-input" disabled={formState === 'sending'} />
                      <label htmlFor="form-email" className="glass-label font-mono">EMAIL ADDRESS</label>
                      <span className="input-line"></span>
                    </div>
                    <div className="input-group">
                      <input type="text" id="form-subject" required placeholder=" " className="glass-input" value={subject} onChange={(e) => setSubject(e.target.value)} disabled={formState === 'sending'} />
                      <label htmlFor="form-subject" className="glass-label font-mono">SUBJECT</label>
                      <span className="input-line"></span>
                    </div>
                    <div className="input-group textarea-group">
                      <textarea id="form-message" required placeholder=" " className="glass-input" rows={5} disabled={formState === 'sending'} />
                      <label htmlFor="form-message" className="glass-label font-mono">YOUR MESSAGE</label>
                      <span className="input-line"></span>
                    </div>
                    <div className="form-submit-row">
                      <button type="submit" className="glass-submit-btn interactive" disabled={formState === 'sending'}>
                        <span className="btn-text">{formState === 'sending' ? 'TRANSMITTING...' : 'SEND PROTOCOL'}</span>
                        <Icon name="envelope" size={14} className="btn-icon" />
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Liquid blend into dark capabilities + footer zone */}
      <LiquidDivider fill="var(--bg)" variant={2} />

      {/* Dark zone: capabilities + footer */}
      <div className="section--dark contact-dark-zone">
        <div className="contact-block why-block">
          <div className="block-header-wrap">
            <h3 className="contact-subtitle">{'// PERF_CAPABILITIES'}</h3>
          </div>
          <div ref={reasonsRef} className="reveal reasons-grid">
            {reasons.map((r) => (
              <div key={r.title} className="reason-card interactive">
                <div className="reason-svg-wrapper">{r.svg}</div>
                <h4 className="reason-title">{r.title}</h4>
                <p className="reason-desc">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-footer-wrap">
          <div ref={socialsRef} className="reveal contact-socials">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="social-circle interactive" title={s.label}>
                <Icon name={s.icon} size={16} />
              </a>
            ))}
          </div>
          <footer className="site-footer">
            <p className="footer-text">Designed & built by Lesley &middot; &copy; {new Date().getFullYear()}</p>
            <p className="footer-sub font-mono">SYSTEM_ID: LSL-ZW-6.0 // REACT-CORE</p>
          </footer>
        </div>
      </div>
    </section>
  );
}
