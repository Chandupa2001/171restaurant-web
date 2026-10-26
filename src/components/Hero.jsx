import { useCallback, useRef } from 'react';
import { CONTACT } from '../content.js';
import { prefersReducedMotion, useScrollFrame } from '../hooks/motion.js';
import Icon, { external } from './Icon.jsx';
import Media from './Media.jsx';

/** Hero lines rise in one after another. */
const delay = (i) => ({ '--delay': `${0.3 + i * 0.15}s` });

/** 1. HERO: drop your photo in as public/images/hero.jpg */
export default function Hero() {
  const heroRef = useRef(null);
  const mediaRef = useRef(null);

  // Gentle parallax on the photo, capped at a small offset
  useScrollFrame(useCallback(() => {
    const y = window.scrollY;
    if (!heroRef.current || !mediaRef.current || y > heroRef.current.offsetHeight) return;
    mediaRef.current.style.transform = `translate3d(0, ${Math.min(y * 0.25, 220)}px, 0)`;
  }, []), !prefersReducedMotion());

  return (
    <section className="hero" aria-labelledby="hero-title" ref={heroRef}>
      {/* TODO: describe photo */}
      <Media
        ref={mediaRef}
        className="hero__media"
        src="images/hero.jpg"
        alt="A candle-lit table set with a bowl of prawn curry and rice, a brass oil lamp and a cup of tea"
        width={1264}
        height={848}
        eager
      />
      <div className="hero__scrim" aria-hidden="true" />

      <div className="hero__content container">
        <p className="eyebrow eyebrow--plain reveal" style={delay(0)}>Navinna · Maharagama</p>
        <h1 className="hero__title reveal" id="hero-title" style={delay(1)}>
          <span className="hero__num">171</span>
          {' '}
          <span className="hero__word">Restaurant</span>
        </h1>
        <p className="hero__tagline reveal" style={delay(2)}>Simple ingredients and authentic recipes that stand the test of time</p>
        <div className="btn-row reveal" style={delay(3)}>
          <a className="btn btn--primary" href={CONTACT.phoneHref}>
            <Icon name="i-phone" />
            <span>Call now</span>
          </a>
          <a className="btn btn--ghost" href={CONTACT.whatsappHref} {...external}>
            <Icon name="i-whatsapp" />
            <span>WhatsApp us</span>
          </a>
        </div>
      </div>

      <a className="hero__scroll" href="#story" aria-label="Scroll to our story">
        <span>Scroll</span>
      </a>
    </section>
  );
}
