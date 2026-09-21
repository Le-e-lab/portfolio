import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import HexPattern from './HexPattern';
import MeshDrift from './MeshDrift';
import Carousel from './Carousel';
import Icon from './Icon';
import useReveal from '../hooks/useReveal';
import './Hero.css';

/* ═══ Home — Hero ═══
   Composition per mockup (Home page.png):
   - Mesh-drift WebGL field (brand-adapted): cursor-reactive violet mesh
   - Top bar: "Available" pill (left) + GitHub / mail / LinkedIn icons (right)
   - Giant serif wordmark "Mutsambiwa" centered; portrait overlaps the center
     glyphs (text behind, person in front)
   - "Designer & Developer" overlay in the portrait's chest area
   - CTA: "Let's Talk" → contact, "View Work" → work
   - Graphic-work carousel (real brand assets, center-active + next peek)
   - What I Do: ideology line + three capability cards */

const socials = [
  { href: 'https://github.com/Le-e-lab', label: 'GitHub', icon: 'github' },
  { href: 'mailto:lesleymutsambiwa@gmail.com', label: 'Email', icon: 'envelope' },
  { href: 'https://www.linkedin.com/in/lesley-mutsambiwa/', label: 'LinkedIn', icon: 'linkedin' },
];

const designWork = [
  { src: '/images/design/work/africa-university-flyer.webp', title: 'Africa University Flyer', tag: 'Flyer Design' },
  { src: '/images/design/work/gdg-1.webp', title: 'GDG Campus Poster 01', tag: 'Poster Design' },
  { src: '/images/design/work/gdg-2.webp', title: 'GDG Campus Poster 02', tag: 'Poster Design' },
  { src: '/images/design/work/gdg-3.webp', title: 'GDG Campus Poster 03', tag: 'Poster Design' },
  { src: '/images/design/work/join-93-8.webp', title: 'Join GDG Campus', tag: 'Poster Design' },
  { src: '/images/design/work/gold-brand.webp', title: 'Gold Brand Piece', tag: 'Brand Design' },
  { src: '/images/design/work/logo-93-8.webp', title: 'Logo Concept', tag: 'Logo Design' },
  { src: '/images/design/work/studio-logo.webp', title: 'Studio Logo', tag: 'Logo Design' },
  { src: '/images/design/work/studio-2.webp', title: 'Studio Identity 02', tag: 'Brand Design' },
  { src: '/images/design/work/studio-add-a-heading.webp', title: 'Studio Identity 01', tag: 'Brand Design' },
  { src: '/images/design/work/the-hub.webp', title: 'The Hub', tag: 'Brand Design' },
];

const skillCards = [
  {
    num: '01',
    title: 'Brand Identity',
    body: 'Premium visual identities and brand systems that hold up in the real world — names, marks, and the guidelines that keep them consistent.',
  },
  {
    num: '02',
    title: 'Visual Design',
    body: 'High-fidelity UI and web design — wireframe to polished interface, walking the same design-first path on every screen.',
  },
  {
    num: '03',
    title: 'Full-Stack Engineering',
    body: 'Production web applications — React, Node.js, and databases wired into systems people actually use every day.',
  },
];

export default function Hero() {
  const rootRef = useRef(null);
  const carouselRef = useReveal();
  const headingRef = useReveal();
  const ideologyRef = useReveal();
  const cardRefs = [useReveal(), useReveal(), useReveal()];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger entrance choreography a frame after mount (keeps SSR/CSR parity
    // and lets the browser compute layout before transitions run).
    const t = window.setTimeout(() => setMounted(true), 60);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Magnetic top-bar icons: small translate toward the cursor, then glide
    // back to rest. Never moves the pill — only the three icon links.
    const icons = root.querySelectorAll('.hero-top__icon');
    const onMove = (e) => {
      icons.forEach((icon) => {
        const rect = icon.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / 14;
        const dy = (e.clientY - cy) / 14;
        icon.style.transform = `translate(${dx}px, ${dy}px)`;
      });
    };
    const onLeave = () => {
      icons.forEach((icon) => { icon.style.transform = ''; });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      <section className="hero" ref={rootRef}>
        <MeshDrift className="hero__mesh" />

        {/* Top utility bar */}
        <header className={`hero-top ${mounted ? 'is-in' : ''}`}>
          <div className="hero-top__pill">
            <span className="hero-top__dot" aria-hidden="true" />
            <span>Available</span>
          </div>
          <div className="hero-top__icons">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="hero-top__icon"
                aria-label={s.label}
              >
                <Icon name={s.icon} size={17} />
              </a>
            ))}
          </div>
        </header>

        {/* Wordmark + portrait overlap — lockup keeps the ratio stable at any size */}
        <div className={`hero-stage ${mounted ? 'is-in' : ''}`}>
          <div className="hero-lockup">
            <h1 className="hero-name" aria-label="Mutsambiwa">
              <span className="hero-name__char hero-name__char--1">M</span>
              <span className="hero-name__char hero-name__char--2">u</span>
              <span className="hero-name__char hero-name__char--3">t</span>
              <span className="hero-name__char hero-name__char--4">s</span>
              <span className="hero-name__char hero-name__char--5">a</span>
              <span className="hero-name__char hero-name__char--6">m</span>
              <span className="hero-name__char hero-name__char--7">b</span>
              <span className="hero-name__char hero-name__char--8">i</span>
              <span className="hero-name__char hero-name__char--9">w</span>
              <span className="hero-name__char hero-name__char--10">a</span>
            </h1>

            <div className="hero-portrait-wrap">
              <img
                src="/images/hero-portrait.webp"
                alt="Lesley Mutsambiwa — designer and developer"
                className="hero-portrait"
                loading="eager"
                fetchPriority="high"
              />
              <p className="hero-subtitle">Designer &amp; Developer</p>
            </div>

            {/* Call to action — the two real next steps a visitor can take */}
            <div className="hero-cta">
              <Link to="/contact" className="hero-cta__primary">
                Let&apos;s Talk
                <Icon name="arrow-up-right" size={16} />
              </Link>
              <Link to="/work" className="hero-cta__ghost">
                View Work
              </Link>
            </div>
          </div>
        </div>

        {/* Graphic work carousel */}
        <section className="hero-carousel-section reveal" ref={carouselRef}>
          <div className="carousel-caption">
            <span className="carousel-caption__label mono">Graphic Work</span>
            <p className="carousel-caption__hint">
              Brand identities, posters, and flyers from studio work.
            </p>
          </div>
          <Carousel
            slides={designWork}
            label="graphic work"
            renderSlide={(slide) => (
              <figure className="work-card">
                <div className="work-card__frame">
                  <img
                    src={slide.src}
                    alt={slide.title}
                    loading="lazy"
                    className="work-card__img"
                  />
                </div>
                <figcaption className="work-card__meta">
                  <span className="work-card__title">{slide.title}</span>
                  <span className="work-card__tag mono">{slide.tag}</span>
                </figcaption>
              </figure>
            )}
          />
        </section>
      </section>

      {/* What I Do */}
      <section className="whatido section" id="what-i-do">
        <HexPattern className="whatido__hex" opacity={0.09} />
        <div className="page whatido__inner">
          <div className="whatido__heading reveal" ref={headingRef}>
            <p className="section-label">What I Do</p>
            <h2>Premium Design &amp; Robust Code</h2>
          </div>

          <blockquote className="whatido__ideology reveal" ref={ideologyRef}>
            <p>
              &ldquo;My ideology is turning an idea into a product that can be
              used in the real world.&rdquo;
            </p>
          </blockquote>

          <div className="whatido__cards">
            {skillCards.map((card, idx) => (
              <article
                key={card.num}
                className={`whatido__card reveal reveal-delay-${(idx % 3) + 1}`}
                ref={cardRefs[idx]}
              >
                <span className="whatido__num mono">{card.num}</span>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>

          <p className="whatido__outro mono">
            From Thought to Real World Application.
          </p>
        </div>
      </section>
    </>
  );
}