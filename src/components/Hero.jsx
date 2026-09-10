import { useState } from 'react';
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

  return (
    <>
      {/* ═══ HERO — photo + intro over hexagon pattern ═══ */}
      <section className="hero section--dark">
        <HexGlowPattern stroke="#E8650A" glowColor="#e8703a" idleOpacity={0.24} glowRadius={130} />
        <div className="hero-grid">
          {/* Left: Text content */}
          <div className="hero-text-col">
            <div className="hero-status hero-anim" style={{ animationDelay: '0.05s' }}>
              <span className="hero-dot" />Available for work
            </div>

            <h1 className="hero-name hero-anim" style={{ animationDelay: '0.12s' }}>
              Lesley
            </h1>

            <p className="hero-role hero-anim" style={{ animationDelay: '0.2s' }}>
              Designer <span className="hero-amp">&</span> Developer
            </p>

            <p className="hero-desc hero-anim" style={{ animationDelay: '0.28s' }}>
              Brand identity, visual design, and full-stack applications — from concept to shipped product. CS student at Africa University, building from Harare to the world.
            </p>

            <div className="hero-pills hero-anim" style={{ animationDelay: '0.36s' }}>
              {['Brand Identity', 'UI Design', 'React', 'Node.js'].map((t) => (
                <span key={t} className="hero-pill">{t}</span>
              ))}
            </div>

            <div className="hero-ctas hero-anim" style={{ animationDelay: '0.44s' }}>
              <button className="cta-primary" onClick={() => navigate('/work')}>
                View Design Work
              </button>
              <button className="cta-secondary" onClick={() => navigate('/contact')}>
                Let&apos;s Talk
              </button>
            </div>

            <div className="hero-socials hero-anim" style={{ animationDelay: '0.52s' }}>
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

          {/* Right: Portrait image */}
          <div className="hero-image-col hero-image-anim">
            <div className="hero-portrait-frame">
              <img
                src="/images/hero-portrait.jpg"
                alt="Lesley Mutsambiwa at his desk"
                className="hero-portrait-img"
                width={1200}
                height={1609}
                fetchPriority="high"
              />
              <div className="hero-portrait-glow" />
            </div>
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