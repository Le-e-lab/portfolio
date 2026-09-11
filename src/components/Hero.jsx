import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from './Icon';
import HexGlowPattern from './HexGlowPattern';
import ServicesSection from './ServicesSection';
import GallerySection from './GallerySection';
import { galleryPlaceholders } from './galleryData';
import LiquidDivider from './LiquidDivider';
import ProjectWindow from './ProjectWindow';
import './Hero.css';

export default function Hero() {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const ctasRef = useRef(null);

  const openGalleryPlaceholder = (p) => {
    const idx = galleryPlaceholders.findIndex((g) => g.id === p.id);
    setSelectedProject({
      title: p.title,
      category: 'Coming Soon',
      client: 'In progress',
      year: '2026',
      description: `This gallery slot (${idx + 1} of 10) is reserved for a new design piece. It will be filled with a real project image and story shortly.`,
      image: null,
      gradient: p.gradient,
    });
  };

  /* Law 03 — magnetic CTA: primary buttons lean toward the cursor within a
     small radius. The transform lives on the wrapper (.magnetic-btn) so it
     never fights the button's own hover lift / press scale. Skipped when the
     visitor prefers reduced motion. */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const container = ctasRef.current;
    if (!container) return;
    const btns = [...container.querySelectorAll('.magnetic-btn')];
    const STRENGTH = 0.16;
    const MAX = 16;
    const onMove = (e) => {
      for (const btn of btns) {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * STRENGTH;
        const dy = (e.clientY - (r.top + r.height / 2)) * STRENGTH;
        btn.style.transform = `translate3d(${Math.max(-MAX, Math.min(MAX, dx))}px, ${Math.max(-MAX, Math.min(MAX, dy))}px, 0)`;
      }
    };
    const onLeave = () => {
      for (const btn of btns) btn.style.transform = 'translate3d(0, 0, 0)';
    };
    container.addEventListener('pointermove', onMove, { passive: true });
    container.addEventListener('pointerleave', onLeave);
    return () => {
      container.removeEventListener('pointermove', onMove);
      container.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <>
      {/* ═══ HERO — typography-overlap + portrait ═══ */}
      <section className="hero section--dark">
        <HexGlowPattern className="hex-pattern--parallax" stroke="#E8650A" glowColor="#e8703a" idleOpacity={0.28} glowRadius={140} />

        <div className="hero-inner">
          {/* Status pill */}
          <div className="hero-status hero-anim" style={{ animationDelay: '0.05s' }}>
            <span className="hero-dot" />Available for work
          </div>

          {/* ═══ Name — massive stacked typography ═══ */}
          <div className="hero-name-stack">
            <h1 className="hero-name-first hero-anim" style={{ animationDelay: '0.12s' }}>
              Lesley
            </h1>

            {/* Circular portrait overlaps the name */}
            <div className="hero-portrait hero-image-anim" style={{ animationDelay: '0.18s' }}>
              <div className="hero-portrait-ring">
                <img
                  src="/images/hero-portrait.jpg"
                  alt="Lesley Mutsambiwa at his desk"
                  className="hero-portrait-img"
                  width={320}
                  height={320}
                  fetchPriority="high"
                />
              </div>
            </div>

            <span className="hero-name-second hero-anim" style={{ animationDelay: '0.22s' }}>
              Mutsambiwa
            </span>
          </div>

          {/* Subtitle */}
          <p className="hero-role hero-anim" style={{ animationDelay: '0.3s' }}>
            Designer <span className="hero-amp">&</span> Developer
          </p>

          {/* Description */}
          <p className="hero-desc hero-anim" style={{ animationDelay: '0.38s' }}>
            Brand identity, visual design, and full-stack applications — from concept to shipped product. CS student at Africa University, building from Harare to the world.
          </p>

          {/* Tech pills */}
          <div className="hero-pills hero-anim" style={{ animationDelay: '0.44s' }}>
            {['Brand Identity', 'UI Design', 'React', 'Node.js'].map((t) => (
              <span key={t} className="hero-pill">{t}</span>
            ))}
          </div>

          {/* CTAs */}
          <div ref={ctasRef} className="hero-ctas hero-anim" style={{ animationDelay: '0.5s' }}>
            <span className="magnetic-btn">
              <button className="cta-primary" onClick={() => navigate('/work')}>
                View Design Work
              </button>
            </span>
            <span className="magnetic-btn">
              <button className="cta-secondary" onClick={() => navigate('/contact')}>
                Let&apos;s Talk
              </button>
            </span>
          </div>

          {/* Socials */}
          <div className="hero-socials hero-anim" style={{ animationDelay: '0.56s' }}>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=lesleymutsambiwa@gmail.com" className="hero-social interactive">
              <Icon name="envelope" size={14} /> <span>Email</span>
            </a>
            <a href="https://github.com/Le-e-lab" target="_blank" rel="noreferrer" className="hero-social interactive">
              <Icon name="github" size={14} /> <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/lesley-mutsambiwa/" target="_blank" rel="noreferrer" className="hero-social interactive">
              <Icon name="linkedin" size={14} /> <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ GALLERY — 10 hexagon cells (placeholders for now) ═══ */}
      <GallerySection onOpen={openGalleryPlaceholder} />

      {/* Liquid blend into cream services */}
      <LiquidDivider fill="var(--bg-light)" variant={1} />

      <ServicesSection />

      {/* Liquid blend back to the dark page end */}
      <LiquidDivider fill="var(--bg)" variant={2} />

      <ProjectWindow project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
