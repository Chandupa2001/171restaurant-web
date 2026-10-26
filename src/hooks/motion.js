import { useEffect } from 'react';

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Scroll reveals (fade + rise, once) for every `.reveal` element on the page.
 * Stagger delays are set per element with the `--delay` CSS variable.
 */
export function useReveals() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.is-visible)');
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return undefined;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/** Calls `onScroll` at most once per animation frame while the window scrolls. */
export function useScrollFrame(onScroll, enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined;
    let ticking = false;
    const handler = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; onScroll(); });
    };
    onScroll();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [onScroll, enabled]);
}
