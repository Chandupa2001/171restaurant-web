import { CONTACT } from '../content.js';
import Icon, { external } from './Icon.jsx';

/** FOOTER */
export default function Footer({ inert }) {
  return (
    <footer className="site-footer" inert={inert}>
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Icon name="logo" className="site-footer__logo" />
          <p className="site-footer__name">171 Restaurant</p>
          <p className="muted">Simple ingredients and authentic recipes that stand the test of time.</p>
        </div>

        <div>
          <h2 className="micro">Find us</h2>
          <address>171, Old Kottawa Road,<br />Navinna, Maharagama,<br />Sri Lanka</address>
        </div>

        <div>
          <h2 className="micro">Hours</h2>
          <p>Every day<br />11:00 – 15:00<br />18:00 – 22:00</p>
        </div>

        <div>
          <h2 className="micro">Contact</h2>
          <ul className="plain-list">
            <li><a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a></li>
            <li><a href={CONTACT.whatsappHref} {...external}>WhatsApp {CONTACT.whatsappDisplay}</a></li>
            <li><a href={CONTACT.emailHref}>{CONTACT.emailDisplay}</a></li>
          </ul>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <p>© {new Date().getFullYear()} 171 Restaurant</p>
        <div className="site-footer__social">
          <a className="icon-btn" href={CONTACT.facebookHref} {...external} aria-label="171 Restaurant on Facebook">
            <Icon name="i-facebook" />
          </a>
          <a className="icon-btn" href={CONTACT.googleHref} {...external} aria-label="171 Restaurant on Google">
            <Icon name="i-star" />
          </a>
        </div>
      </div>
    </footer>
  );
}
