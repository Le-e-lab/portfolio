import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from './Icon';
import DotGrid from './DotGrid';
import ServicesSection from './ServicesSection';
import HoneycombGrid from './HoneycombGrid';
import ProjectWindow from './ProjectWindow';
import useDesignProjects from '../hooks/useDesignProjects';
import useReveal from '../hooks/useReveal';
import './Hero.css';

export default function Hero() {
  const navigate = useNavigate();
  const designProjects = useDesignProjects();
  const [selectedProject, setSelectedProject] = useState(null);
  const featuredRef = useReveal();

  return (
    <>
      <section className="hero section--dark">
        <DotGrid
          dotColor="#E8650A"
          dotSize={2.5}
          dotSpacing={30}
          orbitSpeed={1.2}
          impactRadius={120}
          scaleOnHover={1.6}
        />
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

          {/* Right: Honeycomb hex cluster of design work */}
          <div className="hero-image-col hero-image-anim">
            <HoneycombGrid
              variant="hero"
              cols={2}
              projects={designProjects.slice(0, 3)}
              onOpen={setSelectedProject}
            />
          </div>
        </div>
      </section>

      <ServicesSection />

      {/* ══════ FEATURED WORK — honeycomb below services ══════ */}
      <section className="section section--dark featured-section">
        <DotGrid
          dotColor="#E8650A"
          dotSize={2}
          dotSpacing={44}
          orbitSpeed={0.8}
          impactRadius={140}
          scaleOnHover={1.4}
        />
        <div className="featured-container">
          <div ref={featuredRef} className="reveal featured-header">
            <span className="section-number">Featured Work</span>
            <h2 className="featured-heading">
              Selected <span className="text-gradient">Design Work</span>
            </h2>
            <p className="featured-sub">
              A taste of the brand identities and visual systems — hover to explore, click to see the story behind each piece.
            </p>
          </div>
          <HoneycombGrid
            variant="featured"
            cols={3}
            projects={designProjects.slice(0, 6)}
            onOpen={setSelectedProject}
          />
        </div>
      </section>

      <ProjectWindow project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}