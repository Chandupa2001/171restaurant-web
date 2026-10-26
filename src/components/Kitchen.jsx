import { CONTACT, FULL_MENU_URL, MENU } from '../content.js';
import Icon, { external } from './Icon.jsx';
import Media from './Media.jsx';

/** Card rows rise in left to right, resetting every 3 cards. */
export const rowDelay = (i) => ({ '--delay': `${(i % 3) * 0.12}s` });

/** 3. MENU HIGHLIGHTS: cards come from MENU in src/content.js */
export default function Kitchen() {
  return (
    <section className="kitchen section" id="kitchen" aria-labelledby="kitchen-title">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow reveal"><span>02</span>From the kitchen</p>
          <h2 className="title reveal" id="kitchen-title">Signature plates</h2>
        </header>

        <div className="dishes">
          {MENU.map((dish, i) => (
            <article className="dish reveal" style={rowDelay(i)} key={i}>
              <Media className="dish__media" src={dish.image} alt={dish.name} width={1000} height={1339} />
              <div className="dish__head">
                <h3 className="dish__name">{dish.name}</h3>
                {dish.price && <span className="dish__price">{dish.price}</span>}
              </div>
              {dish.note && <p className="dish__note">{dish.note}</p>}
              {dish.placeholder && <span className="tag">Placeholder</span>}
            </article>
          ))}
        </div>

        <div className="section-foot reveal">
          {/* Links to FULL_MENU_URL when set, otherwise falls back to WhatsApp */}
          <a className="link-arrow" href={FULL_MENU_URL || CONTACT.whatsappMenuHref} {...external}>
            <span>{FULL_MENU_URL ? 'View the full menu' : 'Ask about today’s menu'}</span>
            <Icon name="i-arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
