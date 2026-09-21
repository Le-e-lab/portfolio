import { useRef, useState } from 'react';
import Carousel from './Carousel';
import Icon from './Icon';
import useReveal from '../hooks/useReveal';
import './Contact.css';

/* ═══ Contact ═══
   - Staggered "Let's build something together" heading
   - Availability pill, location, email
   - Release card (real CV: 1.6 MB DOCX) with press+spring download feedback
   - Web3Forms contact form (falls back to mail client during local dev)
   - Q&A carousel + why-work-with-me cards */

const reasons = [
  {
    title: 'Full-Stack Capable',
    desc: 'React frontends to Node.js backends and Python scripts.',
    icon: 'code-bracket',
  },
  {
    title: 'Problem Solver',
    desc: 'I solve business problems with efficient, scalable logic.',
    icon: 'map-pin',
  },
  {
    title: 'Quick Learner',
    desc: 'Adapting to new stacks is second nature.',
    icon: 'arrow-up-right',
  },
  {
    title: 'Design Sensibility',
    desc: 'Clean aesthetics, deliberate motion, and strong type.',
    icon: 'user',
  },
];

const qaPairs = [
  {
    q: 'What do you actually do?',
    a: 'Brand identities and visual design on one end, full-stack web apps on the other. Most projects live somewhere in between.',
  },
  {
    q: 'Do you take on freelance work?',
    a: 'Yes. I work with clients on brand systems, websites, and web applications — juggling it with my CS degree at Africa University.',
  },
  {
    q: 'What stack do you ship with?',
    a: 'React and Next.js up front, Node.js/Python and PostgreSQL in the back, deployed calmly and reliably.',
  },
  {
    q: 'How fast do you respond?',
    a: 'Within a day or two. If I am in exams week, I will tell you when to expect a real reply.',
  },
];

const socials = [
  { icon: 'github', href: 'https://github.com/Le-e-lab', label: 'GitHub' },
  { icon: 'linkedin', href: 'https://www.linkedin.com/in/lesley-mutsambiwa/', label: 'LinkedIn' },
  { icon: 'envelope', href: 'mailto:lesleymutsambiwa@gmail.com', label: 'Email' },
];

const serviceOptions = [
  'Brand Identity',
  'Logo Design',
  'Website Design',
  'Full-Stack Development',
  'UI/UX Design',
  'Other',
];

// Public Web3Forms access key. When unset, the form falls back to the
// visitor's mail client so it never dead-ends during local development.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

export default function Contact() {
  const [formState, setFormState] = useState('idle');
  const [sentVia, setSentVia] = useState('web3forms');
  const [subject, setSubject] = useState('');
  const [dlState, setDlState] = useState('idle'); // idle → downloading → downloaded
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const msgRef = useRef(null);
  const infoRef = useReveal();
  const formRef = useReveal();
  const reasonsRef = useReveal();
  const socialsRef = useReveal();

  const handleDownload = () => {
    if (dlState !== 'idle') return;
    setDlState('downloading');
    window.setTimeout(() => setDlState('downloaded'), 1500);
    window.setTimeout(() => setDlState('idle'), 4200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current?.value || '';
    const email = emailRef.current?.value || '';
    const message = msgRef.current?.value || '';
    if (!name || !email || !message) return;
    setFormState('sending');

    if (WEB3FORMS_KEY) {
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: subject || 'Portfolio inquiry',
            from_name: name,
            email,
            message,
          }),
        });
        const data = await res.json();
        if (!res.ok || data.success === false) {
          throw new Error(data.message || 'Submission failed');
        }
        setSentVia('web3forms');
        setFormState('sent');
      } catch {
        setFormState('error');
      }
      return;
    }

    setSentVia('mailto');
    setFormState('sent');
    setTimeout(() => {
      const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      const a = document.createElement('a');
      a.href = `mailto:lesleymutsambiwa@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio inquiry')}&body=${encodeURIComponent(body)}`;
      a.rel = 'noreferrer';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }, 400);
  };

  return (
    <section className="contact-section">

      {/* ── Heading + info column ── */}
      <div className="page contact-grid" ref={infoRef}>
        <div className="contact-info">
          <p className="section-label">
            <span className="mono section-label__num">04</span>
            Contact
          </p>
          <h1 className="contact-heading" aria-label="Let's build something together.">
            {'Let\u2019s build'.split('').map((ch, i) => (
              <span key={`l${i}`} className="contact-heading__char" style={{ '--char-i': i }}>
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
            <br />
            {'something'.split('').map((ch, i) => (
              <span key={`s${i}`} className="contact-heading__char contact-heading__char--accent" style={{ '--char-i': i }}>
                {ch}
              </span>
            ))}
            <br />
            {'together.'.split('').map((ch, i) => (
              <span key={`t${i}`} className="contact-heading__char" style={{ '--char-i': i }}>
                {ch}
              </span>
            ))}
          </h1>

          <p className="contact-desc">
            I&apos;m always down to collaborate on brand identities, visual
            design, or full-stack systems. If you want to talk design, systems,
            or have an interesting project, drop me a line.
          </p>

          <div className="freelance-badge">
            <span className="freelance-dot" aria-hidden="true" />
            <span>Available for work</span>
          </div>

          <div className="location-block">
            <h3 className="mono location-title">/ PRIMARY_LOCATION</h3>
            <div className="location-details">
              <div className="loc-item">
                <Icon name="map-pin" size={15} />
                <span>Harare, Zimbabwe</span>
              </div>
              <a className="loc-item interactive" href="mailto:lesleymutsambiwa@gmail.com">
                <Icon name="envelope" size={15} />
                <span>lesleymutsambiwa@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Release card — the real CV, honest size */}
          <a
            className={`resume-ticket interactive ${dlState === 'downloading' ? 'is-downloading' : ''} ${dlState === 'downloaded' ? 'is-downloaded' : ''}`}
            href="/Lesley_Mutsambiwa_Resume.docx"
            download="Lesley_Mutsambiwa_CV.docx"
            onClick={handleDownload}
          >
            <div className="ticket-header">
              <span className="mono ticket-label">DOC_RELEASE // v6.0</span>
              <span className="mono ticket-status">APPROVED</span>
            </div>
            <div className="ticket-body">
              <div className="ticket-details">
                <h4 className="ticket-title">Lesley_Mutsambiwa_Resume.docx</h4>
                <div className="ticket-meta">
                  <span className="mono ticket-meta__size">
                    {dlState === 'idle' ? 'SIZE: 1.6 MB' : dlState === 'downloading' ? 'DOWNLOADING...' : 'DOWNLOADED ✓'}
                  </span>
                  <span className="mono">TYPE: DOCX</span>
                  <span className="mono">LOC: ZW.HRE</span>
                </div>
              </div>
              <span className="ticket-download-btn" aria-hidden="true">
                <Icon name="download" size={18} />
              </span>
            </div>
            <div className="ticket-barcode-wrap">
              <div className="barcode" aria-hidden="true">
                <span className="bar thin" />
                <span className="bar thick" />
                <span className="bar mid" />
                <span className="bar thin" />
                <span className="bar thin" />
                <span className="bar thick" />
                <span className="bar mid" />
                <span className="bar thick" />
                <span className="bar thin" />
                <span className="bar thin" />
                <span className="bar thick" />
              </div>
              <span className="mono barcode-text">*LESLEY-MUTSAMBIWA-RESUME*</span>
            </div>
          </a>
        </div>

        {/* ── Form column ── */}
        <div className="contact-form-col" ref={formRef}>
          <div className="contact-form-panel">
            <h3 className="mono glass-form-title">Send a message</h3>

            {formState === 'sent' ? (
              <div className="contact-success-screen">
                <div className="success-icon-wrap">
                  <svg viewBox="0 0 50 50" className="success-svg-check">
                    <circle cx="25" cy="25" r="20" stroke="var(--accent-light)" strokeWidth="2" fill="none" strokeDasharray="126" strokeDashoffset="126">
                      <animate attributeName="stroke-dashoffset" from="126" to="0" dur="0.8s" fill="freeze" />
                    </circle>
                    <path d="M 15 25 L 22 32 L 35 18" stroke="var(--accent-light)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeDasharray="30" strokeDashoffset="30">
                      <animate attributeName="stroke-dashoffset" from="30" to="0" dur="0.6s" begin="0.6s" fill="freeze" />
                    </path>
                  </svg>
                </div>
                <h4 className="mono success-title">
                  {sentVia === 'mailto' ? 'Message ready' : 'Message sent'}
                </h4>
                <p className="success-text">
                  {sentVia === 'mailto'
                    ? 'Your mail client has opened with your message pre-filled. Hit send there to deliver it to Lesley.'
                    : 'Protocol initiated successfully. Message encrypted and dispatched to Lesley.'}
                </p>
                <div className="success-logs mono">
                  {sentVia === 'mailto' ? (
                    <>
                      <span className="log-line">Mail client opened</span>
                      <span className="log-line">Message pre-filled</span>
                      <span className="log-line">Status: hit send to deliver</span>
                    </>
                  ) : (
                    <>
                      <span className="log-line">Connected securely</span>
                      <span className="log-line">Message dispatched</span>
                      <span className="log-line">Status: awaiting reply</span>
                    </>
                  )}
                </div>
                <button onClick={() => setFormState('idle')} className="mono success-reset-btn interactive">
                  Send another
                </button>
              </div>
            ) : (
              <>
                <div className="service-options">
                  <span className="mono service-options-label">What can I help with?</span>
                  <div className="service-chips">
                    {serviceOptions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`service-chip interactive ${subject === s ? 'active' : ''}`}
                        onClick={() => setSubject(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="input-group">
                    <input ref={nameRef} type="text" id="form-name" required placeholder=" " className="glass-input" disabled={formState === 'sending'} />
                    <label htmlFor="form-name" className="mono glass-label">YOUR NAME</label>
                    <span className="input-line" aria-hidden="true" />
                  </div>
                  <div className="input-group">
                    <input ref={emailRef} type="email" id="form-email" required placeholder=" " className="glass-input" disabled={formState === 'sending'} />
                    <label htmlFor="form-email" className="mono glass-label">EMAIL ADDRESS</label>
                    <span className="input-line" aria-hidden="true" />
                  </div>
                  <div className="input-group">
                    <input type="text" id="form-subject" required placeholder=" " className="glass-input" value={subject} onChange={(e) => setSubject(e.target.value)} disabled={formState === 'sending'} />
                    <label htmlFor="form-subject" className="mono glass-label">SUBJECT</label>
                    <span className="input-line" aria-hidden="true" />
                  </div>
                  <div className="input-group textarea-group">
                    <textarea ref={msgRef} id="form-message" required placeholder=" " className="glass-input" rows={5} disabled={formState === 'sending'} />
                    <label htmlFor="form-message" className="mono glass-label">YOUR MESSAGE</label>
                    <span className="input-line" aria-hidden="true" />
                  </div>
                  <div className="form-submit-row">
                    <button type="submit" className="glass-submit-btn interactive" disabled={formState === 'sending'}>
                      <span className="btn-text">
                        {formState === 'sending' ? 'Sending...' : formState === 'error' ? 'Try again' : 'Send message'}
                      </span>
                      <Icon name="envelope" size={14} className="btn-icon" />
                    </button>
                  </div>
                  {formState === 'error' && (
                    <div className="contact-error-banner" role="alert">
                      <span className="mono error-banner-symbol">!</span>
                      <div className="error-banner-copy">
                        <span className="mono error-banner-title">Something went wrong</span>
                        <span className="error-banner-desc">Message failed to dispatch. Check your connection and try again.</span>
                      </div>
                    </div>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Q&A carousel ── */}
      <section className="page contact-qa-section">
        <div className="contact-qa-head">
          <p className="section-label">Q&amp;A</p>
          <h2 className="contact-qa-title">Quick answers</h2>
        </div>
        <Carousel
          slides={qaPairs}
          label="Q and A"
          renderSlide={(item) => (
            <article className="qa-card">
              <h3 className="qa-card__q">{item.q}</h3>
              <p className="qa-card__a">{item.a}</p>
            </article>
          )}
        />
      </section>

      {/* ── Why work with me ── */}
      <div className="page contact-why" ref={reasonsRef}>
        <div className="block-header-wrap">
          <h3 className="mono contact-subtitle">{'// PERF_CAPABILITIES'}</h3>
        </div>
        <div className="reasons-grid">
          {reasons.map((r) => (
            <div key={r.title} className="reason-card interactive">
              <div className="reason-icon-wrap">
                <Icon name={r.icon} size={18} />
              </div>
              <h4 className="reason-title">{r.title}</h4>
              <p className="reason-desc">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Socials strip ── */}
      <div className="page contact-socials" ref={socialsRef}>
        {socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="social-circle interactive" title={s.label}>
            <Icon name={s.icon} size={16} />
            <span>{s.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}