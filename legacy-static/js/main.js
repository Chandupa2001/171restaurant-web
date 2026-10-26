/* ==========================================================================
   171 Restaurant: site script (vanilla JS, no dependencies)
   ========================================================================== */

/* ==========================================================================
   CONTENT: edit this block to update the site.
   ========================================================================== */

/**
 * MENU HIGHLIGHTS (shown in "From the kitchen").
 * Replace each placeholder with a real dish and delete `placeholder: true`.
 *   name:  dish name
 *   note:  one short line about the dish
 *   price: e.g. "Rs. 1,450" (leave "" to hide)
 *   image: drop the photo in /images with this file name
 */
const MENU = [
  { name: 'Signature dish', note: 'Add a one-line description.', price: '', image: 'images/dish-1.jpg', placeholder: true },
  { name: 'Signature dish', note: 'Add a one-line description.', price: '', image: 'images/dish-2.jpg', placeholder: true },
  { name: 'Signature dish', note: 'Add a one-line description.', price: '', image: 'images/dish-3.jpg', placeholder: true },
  { name: 'Signature dish', note: 'Add a one-line description.', price: '', image: 'images/dish-4.jpg', placeholder: true },
  { name: 'Signature dish', note: 'Add a one-line description.', price: '', image: 'images/dish-5.jpg', placeholder: true },
  { name: 'Signature dish', note: 'Add a one-line description.', price: '', image: 'images/dish-6.jpg', placeholder: true },
];

/** Link to a full menu (PDF or page). Leave '' to show "Ask about today's menu" (WhatsApp) instead. */
const FULL_MENU_URL = '';

/**
 * GOOGLE REVIEWS. Paste real reviews only, copied from the Google Business Profile.
 * Shape: { text: 'Review text…', name: 'Reviewer name', stars: 5 }
 * Leave empty to show just the "Read our reviews on Google" button.
 */
const REVIEWS = [];

/** Google rating, e.g. { score: 4.6, count: 312 }. Leave null to hide. */
const GOOGLE_RATING = null;

/** Opening hours, the same every day: [openHour, openMin, closeHour, closeMin] in Sri Lanka time. */
const HOURS = [
  [11, 0, 15, 0],
  [18, 0, 22, 0],
];

/* ==========================================================================
   Behaviour (no need to edit below this line)
   ========================================================================== */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const escapeHTML = (str) =>
  String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- Menu highlights ---------- */
function renderMenu() {
  const wrap = document.querySelector('[data-menu]');
  if (!wrap) return;

  wrap.innerHTML = MENU.map((dish) => {
    const slot = dish.image.split('/').pop();
    return `
      <article class="dish reveal">
        <figure class="dish__media media" data-slot="${escapeHTML(slot)}">
          <img src="${escapeHTML(dish.image)}" alt="${escapeHTML(dish.name)}" width="800" height="1000"
               loading="lazy" decoding="async" onerror="this.closest('figure').classList.add('is-placeholder')">
        </figure>
        <div class="dish__head">
          <h3 class="dish__name">${escapeHTML(dish.name)}</h3>
          ${dish.price ? `<span class="dish__price">${escapeHTML(dish.price)}</span>` : ''}
        </div>
        <p class="dish__note">${escapeHTML(dish.note)}</p>
        ${dish.placeholder ? '<span class="tag">Placeholder</span>' : ''}
      </article>`;
  }).join('');

  if (FULL_MENU_URL) {
    const link = document.querySelector('[data-menu-link]');
    link.href = FULL_MENU_URL;
    link.querySelector('span').textContent = 'View the full menu';
  }
}

/* ---------- Reviews ---------- */
function renderReviews() {
  const wrap = document.querySelector('[data-reviews]');
  if (wrap && REVIEWS.length) {
    wrap.innerHTML = REVIEWS.map((r) => {
      const stars = Math.max(0, Math.min(5, Math.round(r.stars || 0)));
      return `
        <figure class="review reveal">
          <p class="review__stars" aria-label="${stars} out of 5 stars">${'★'.repeat(stars)}</p>
          <blockquote class="review__text">${escapeHTML(r.text)}</blockquote>
          <figcaption class="review__name">${escapeHTML(r.name)}</figcaption>
        </figure>`;
    }).join('');
  }

  const rating = document.querySelector('[data-rating]');
  if (rating && GOOGLE_RATING) {
    rating.textContent = `${GOOGLE_RATING.score} / 5 on Google · ${GOOGLE_RATING.count} reviews`;
    rating.hidden = false;
  }
}

/* ---------- Open now / Closed now (Asia/Colombo) ---------- */
const pad = (n) => String(n).padStart(2, '0');
const fmt = (mins) => `${pad(Math.floor(mins / 60))}:${pad(mins % 60)}`;

/** Minutes since midnight in Sri Lanka. For testing, add ?time=HH:MM to the URL. */
function colomboMinutes() {
  const test = new URLSearchParams(location.search).get('time');
  if (test && /^\d{1,2}:\d{2}$/.test(test)) {
    const [h, m] = test.split(':').map(Number);
    return h * 60 + m;
  }
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Colombo', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (type) => Number(parts.find((p) => p.type === type).value);
  return get('hour') * 60 + get('minute');
}

/** Returns { open, label, detail } for a given minute of the day. */
function openingStatus(now) {
  const sessions = HOURS.map(([oh, om, ch, cm]) => [oh * 60 + om, ch * 60 + cm]);

  const current = sessions.find(([start, end]) => now >= start && now < end);
  if (current) return { open: true, label: 'Open now', detail: `until ${fmt(current[1])}` };

  const nextIndex = sessions.findIndex(([start]) => now < start);
  if (nextIndex === 0) return { open: false, label: 'Closed now', detail: `opens at ${fmt(sessions[0][0])}` };
  if (nextIndex > 0) return { open: false, label: 'Closed now', detail: `opens again at ${fmt(sessions[nextIndex][0])}` };
  return { open: false, label: 'Closed now', detail: `opens tomorrow at ${fmt(sessions[0][0])}` };
}

function updateStatus() {
  const el = document.querySelector('[data-status]');
  if (!el) return;
  const { open, label, detail } = openingStatus(colomboMinutes());
  el.classList.toggle('is-open', open);
  el.querySelector('[data-status-label]').textContent = label;
  el.querySelector('[data-status-detail]').textContent = `· ${detail}`;
  el.hidden = false;
}

/* ---------- Overlay navigation ---------- */
function initNav() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  const label = document.querySelector('[data-menu-label]');
  // Everything behind the overlay is made inert while it is open (keeps focus inside header + nav)
  const background = document.querySelectorAll('main, .site-footer, .action-bar, .skip-link');
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    label.textContent = open ? 'Close' : 'Menu';
    nav.classList.toggle('is-open', open);
    nav.inert = !open;
    background.forEach((el) => { el.inert = open; });
    document.documentElement.classList.toggle('menu-open', open);
    if (open) nav.querySelector('a').focus();
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
}

/* ---------- Header background after leaving the top of the hero ---------- */
function initHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- Gallery strip: arrows + 001 / 008 counter ---------- */
function initGallery() {
  const strip = document.querySelector('[data-gallery]');
  if (!strip) return;
  const items = [...strip.children];
  const prev = document.querySelector('[data-gallery-prev]');
  const next = document.querySelector('[data-gallery-next]');
  const current = document.querySelector('[data-gallery-current]');
  document.querySelector('[data-gallery-total]').textContent = pad3(items.length);

  function pad3(n) { return String(n).padStart(3, '0'); }

  const activeIndex = () => {
    const max = strip.scrollWidth - strip.clientWidth;
    if (strip.scrollLeft >= max - 4) return items.length - 1;
    const start = strip.getBoundingClientRect().left + parseFloat(getComputedStyle(strip).scrollPaddingLeft || 0);
    let best = 0;
    let bestDist = Infinity;
    items.forEach((item, i) => {
      const dist = Math.abs(item.getBoundingClientRect().left - start);
      if (dist < bestDist) { bestDist = dist; best = i; }
    });
    return best;
  };

  let ticking = false;
  const update = () => {
    ticking = false;
    const max = strip.scrollWidth - strip.clientWidth;
    current.textContent = pad3(activeIndex() + 1);
    prev.disabled = strip.scrollLeft <= 4;
    next.disabled = strip.scrollLeft >= max - 4;
  };
  strip.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);

  const go = (dir) => {
    const target = items[Math.max(0, Math.min(items.length - 1, activeIndex() + dir))];
    strip.scrollBy({
      left: target.getBoundingClientRect().left - strip.getBoundingClientRect().left
            - parseFloat(getComputedStyle(strip).scrollPaddingLeft || 0),
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };
  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
  update();
}

/* ---------- Scroll reveals (fade + rise, once) ---------- */
function initReveals() {
  const els = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  // Stagger siblings that enter together: hero lines one after another,
  // card rows left to right (resetting every 3 cards)
  document.querySelectorAll('.hero__content > .reveal').forEach((el, i) => {
    el.style.setProperty('--delay', `${0.3 + i * 0.15}s`);
  });
  document.querySelectorAll('[data-menu] > .reveal, [data-reviews] > .reveal').forEach((el) => {
    const i = [...el.parentElement.children].indexOf(el);
    el.style.setProperty('--delay', `${(i % 3) * 0.12}s`);
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

  els.forEach((el) => io.observe(el));
}

/* ---------- Gentle hero parallax ---------- */
function initParallax() {
  const media = document.querySelector('[data-parallax]');
  const hero = document.querySelector('[data-hero]');
  if (!media || !hero || reduceMotion) return;

  let ticking = false;
  const update = () => {
    ticking = false;
    const y = window.scrollY;
    if (y > hero.offsetHeight) return;
    media.style.transform = `translate3d(0, ${Math.min(y * 0.25, 220)}px, 0)`;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
}

/* ---------- Init ---------- */
renderMenu();
renderReviews();
updateStatus();
setInterval(updateStatus, 60 * 1000);
initNav();
initHeader();
initGallery();
initReveals();
initParallax();

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
