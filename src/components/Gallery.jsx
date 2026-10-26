import { useCallback, useEffect, useRef, useState } from 'react';
import { GALLERY } from '../content.js';
import { prefersReducedMotion } from '../hooks/motion.js';
import Icon from './Icon.jsx';
import Media from './Media.jsx';

const pad3 = (n) => String(n).padStart(3, '0');

/** 4. GALLERY: horizontal strip with arrows and a 001 / 008 counter */
export default function Gallery() {
  const stripRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const scrollPad = (strip) => parseFloat(getComputedStyle(strip).scrollPaddingLeft) || 0;

  /** Index of the frame closest to the strip's snap start. */
  const activeIndex = useCallback(() => {
    const strip = stripRef.current;
    const items = [...strip.children];
    const max = strip.scrollWidth - strip.clientWidth;
    if (strip.scrollLeft >= max - 4) return items.length - 1;
    const start = strip.getBoundingClientRect().left + scrollPad(strip);
    let best = 0;
    let bestDist = Infinity;
    items.forEach((item, i) => {
      const dist = Math.abs(item.getBoundingClientRect().left - start);
      if (dist < bestDist) { bestDist = dist; best = i; }
    });
    return best;
  }, []);

  useEffect(() => {
    const strip = stripRef.current;
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = strip.scrollWidth - strip.clientWidth;
      setIndex(activeIndex());
      setAtStart(strip.scrollLeft <= 4);
      setAtEnd(strip.scrollLeft >= max - 4);
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    strip.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => {
      strip.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, [activeIndex]);

  const go = (dir) => {
    const strip = stripRef.current;
    const items = strip.children;
    const target = items[Math.max(0, Math.min(items.length - 1, activeIndex() + dir))];
    strip.scrollBy({
      left: target.getBoundingClientRect().left - strip.getBoundingClientRect().left - scrollPad(strip),
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  return (
    <section className="gallery section glow glow--left" id="gallery" aria-labelledby="gallery-title">
      <div className="container gallery__head">
        <div>
          <p className="eyebrow reveal"><span>03</span>Gallery</p>
          <h2 className="title reveal" id="gallery-title">The room, the table, the plate</h2>
        </div>
        <div className="gallery__controls reveal">
          <span className="gallery__count" aria-hidden="true">
            <span>{pad3(index + 1)}</span> / <span>{pad3(GALLERY.length)}</span>
          </span>
          <button className="icon-btn" type="button" aria-label="Previous photos" disabled={atStart} onClick={() => go(-1)}>
            <Icon name="i-arrow" className="icon icon--flip" />
          </button>
          <button className="icon-btn" type="button" aria-label="Next photos" disabled={atEnd} onClick={() => go(1)}>
            <Icon name="i-arrow" />
          </button>
        </div>
      </div>

      <div className="strip reveal" tabIndex={0} role="region" aria-label="Gallery photos, scroll sideways" ref={stripRef}>
        {GALLERY.map((photo) => (
          <Media
            key={photo.image}
            className="strip__item"
            src={photo.image}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
          />
        ))}
      </div>
    </section>
  );
}
