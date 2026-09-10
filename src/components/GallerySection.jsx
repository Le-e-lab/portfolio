import HexGlowPattern from './HexGlowPattern';
import HoneycombGrid from './HoneycombGrid';
import { galleryPlaceholders } from './galleryData';
import useReveal from '../hooks/useReveal';
import './GallerySection.css';

/* Gallery of 10 honeycomb cells below the hero. Cells are gradient
   placeholders until real project images are added to galleryData —
   drop an image path in and the hex shows the work. */

export default function GallerySection({ onOpen }) {
  const headerRef = useReveal();
  const combRef = useReveal();

  return (
    <section className="section section--dark gallery-section">
      <HexGlowPattern stroke="#E8650A" glowColor="#e8703a" idleOpacity={0.18} glowRadius={110} />
      <div className="gallery-container">
        <div ref={headerRef} className="reveal gallery-header">
          <span className="section-number">Gallery</span>
          <h2 className="gallery-heading">
            Visual <span className="text-gradient">Experiments</span>
          </h2>
          <p className="gallery-sub">
            A growing collection of brand, logo, and visual work — more pieces landing soon.
          </p>
        </div>
        <div ref={combRef} className="reveal">
          <HoneycombGrid
            variant="gallery"
            cols={4}
            projects={galleryPlaceholders}
            onOpen={onOpen}
          />
        </div>
      </div>
    </section>
  );
}