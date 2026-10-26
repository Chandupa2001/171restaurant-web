import { useCallback, useEffect, useRef, useState } from 'react';
import { CONTACT } from '../content.js';
import { useScrollFrame } from '../hooks/motion.js';
import Icon, { external } from './Icon.jsx';

const NAV_LINKS = [
  ['#story', '01', 'Our story'],
  ['#kitchen', '02', 'From the kitchen'],
  ['#gallery', '03', 'Gallery'],
  ['#guests', '04', 'Guests'],
  ['#visit', '05', 'Visit us'],
];

/**
 * Fixed header (gains a solid background after scrolling) and the
 * full-screen overlay navigation opened by the MENU button.
 * While the menu is open, App makes everything behind it inert.
 */
export default function Header({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);

  useScrollFrame(useCallback(() => setScrolled(window.scrollY > 40), []));

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', menuOpen);
    if (!menuOpen) return undefined;

    firstLinkRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen, setMenuOpen]);

  const closeOnLink = (e) => { if (e.target.closest('a')) setMenuOpen(false); };

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="site-header__inner">
          <a className="brand" href="#top" aria-label="171 Restaurant, back to top">
            <Icon name="logo" className="brand__logo" />
            <span className="brand__name" aria-hidden="true">171 Restaurant</span>
          </a>

          <div className="site-header__actions">
            <a className="btn btn--ghost btn--sm" href={CONTACT.phoneHref}>
              <Icon name="i-phone" />
              <span>Call</span>
            </a>
            <a className="btn btn--ghost btn--sm header-wa" href={CONTACT.whatsappHref} {...external}>
              <Icon name="i-whatsapp" />
              <span>WhatsApp</span>
            </a>
            <button
              ref={toggleRef}
              className="menu-toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="site-nav"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="menu-toggle__label">{menuOpen ? 'Close' : 'Menu'}</span>
              <span className="menu-toggle__icon" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <nav
        className={`nav-overlay${menuOpen ? ' is-open' : ''}`}
        id="site-nav"
        aria-label="Main"
        inert={!menuOpen}
        onClick={closeOnLink}
      >
        <div className="nav-overlay__inner">
          <ol className="nav-overlay__links">
            {NAV_LINKS.map(([href, num, label], i) => (
              <li key={href}>
                <a href={href} ref={i === 0 ? firstLinkRef : undefined}><span>{num}</span>{label}</a>
              </li>
            ))}
          </ol>
          <div className="nav-overlay__contact">
            <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
            <a href={CONTACT.whatsappHref} {...external}>WhatsApp {CONTACT.whatsappDisplay}</a>
            <a href={CONTACT.facebookHref} {...external}>Facebook</a>
            <a href={CONTACT.googleHref} {...external}>Google</a>
          </div>
        </div>
      </nav>
    </>
  );
}
