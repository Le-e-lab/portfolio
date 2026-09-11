import { useEffect, useRef } from 'react';
import HexGlowPattern from './HexGlowPattern';
import { galleryPlaceholders } from './galleryData';
import './GallerySection.css';

/* Scatter gallery — interchangeable with a StackSpread-look scroll collage.
   Cards sit at alternating offsets + gentle rotation; a native scroll-scrub
   animation (CSS `animation-timeline: view()`) drifts each card as it enters
   the viewport, giving depth without any scroll JS.

   Reveal uses one IntersectionObserver over the section (per-card observers
   would need a hook per card — illegal in a loop, so we observe after mount).

   Until real project images land in galleryData, cells show labeled gradient
   placeholders — swap `image` in and the hover-zoom behavior takes over. */

export default function GallerySection({ onOpen }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.scatter-card');
    if (!('IntersectionObserver' in window)) {
      cards.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    cards.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const openProject = (p) => {
    onOpen?.({
      title: p.title,
      category: p.category,
      client: p.client || 'Design Work',
      year: p.year || '2026',
      description: p.description || `Brand surface for ${p.title} — visual direction, palette, and typography.`,
      image: p.image || null,
      gradient: p.gradient || null,
    });
  };

  return (
    <section className="section section--dark gallery-section" ref={sectionRef}>
      <HexGlowPattern className="hex-pattern--parallax" stroke="#E8650A" glowColor="#e8703a" idleOpacity={0.18} glowRadius={110} />
      <div className="gallery-container">
        <div className="reveal is-revealed gallery-header">
          <span className="section-number">Gallery</span>
          <h2 className="gallery-heading">
            Visual <span className="text-gradient">Experiments</span>
          </h2>
          <p className="gallery-sub">
            A growing collection of brand, logo, and visual work — scattered as they land.
          </p>
        </div>

        <div className="scatter-grid">
          {galleryPlaceholders.map((p, i) => (
            <div className="scatter-cell" key={p.id}>
              <article
                className={`scatter-card interactive reveal-delay-${(i % 5) + 1}`}
                role="button"
                tabIndex={0}
                aria-label={`Open ${p.title} — ${p.category}`}
                onClick={() => openProject(p)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openProject(p);
                  }
                }}
              >
                <div className="scatter-media">
                  {p.image ? (
                    <img src={p.image} alt={p.title} loading="lazy" />
                  ) : (
                    <div className="scatter-placeholder" style={{ background: p.gradient }} />
                  )}
                </div>
                <div className="scatter-label">
                  <span className="scatter-title font-heading">{p.title}</span>
                  <span className="scatter-category font-mono">{p.category}</span>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}