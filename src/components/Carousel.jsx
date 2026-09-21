import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Icon from './Icon';
import './Carousel.css';

/* Shared Embla carousel — the mockup treatment is a centered active slide
   with the NEXT card peeking in, so slides are sized at ~62% and aligned
   center with loop. Keyboard accessible (next/prev focus on the count
   buttons which are reachable via Tab; the carousel itself is drag +
   native touch scroll). Buttons are implemented as a segmented prev/track/
   next control with a readable "n / total" counter. */

export default function Carousel({
  slides,
  renderSlide,
  label = 'carousel',
  loop = true,
  className = '',
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop,
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: true,
    skipSnaps: false,
  });
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
    setCount(emblaApi.scrollSnapList().length);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // First paint: seed the counter asynchronously so we don't setState
    // synchronously inside the effect body (avoids cascading renders in the
    // same commit; the select/reInit listeners do the real work afterwards).
    const t = window.setTimeout(onSelect, 0);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      window.clearTimeout(t);
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => (e) => {
    e.preventDefault();
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => (e) => {
    e.preventDefault();
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className={`carousel ${className}`}>
      <div className="carousel__viewport" ref={emblaRef}>
        <div className="carousel__container">
          {slides.map((slide, i) => (
            <div
              className={`carousel__slide ${selected === i ? 'carousel__slide--active' : ''}`}
              key={i}
            >
              {renderSlide(slide, i)}
            </div>
          ))}
        </div>
      </div>

      <div className="carousel__controls">
        <button
          type="button"
          className="carousel__arrow"
          onClick={scrollPrev()}
          aria-label={`Previous ${label}`}
        >
          <Icon name="chevron-left" size={16} />
        </button>
        <p className="carousel__count mono">
          <span className="carousel__count-current">{String(selected + 1).padStart(2, '0')}</span>
          <span className="carousel__count-sep">/</span>
          {String(count).padStart(2, '0')}
        </p>
        <button
          type="button"
          className="carousel__arrow"
          onClick={scrollNext()}
          aria-label={`Next ${label}`}
        >
          <Icon name="chevron-right" size={16} />
        </button>
      </div>
    </div>
  );
}