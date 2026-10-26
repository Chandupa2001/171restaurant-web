import { CONTACT } from '../content.js';
import useOpeningStatus from '../hooks/useOpeningStatus.js';
import Icon, { external } from './Icon.jsx';

/** 6. VISIT US */
export default function Visit() {
  // Open/closed status in Asia/Colombo time
  const status = useOpeningStatus();

  return (
    <section className="visit section glow glow--center" id="visit" aria-labelledby="visit-title">
      <div className="container">
        <p className="eyebrow eyebrow--center reveal"><span>05</span>Visit us</p>

        <div className="visit__grid">
          <article className="visit-card reveal">
            <Icon name="logo" className="visit-card__logo" />
            <h2 className="title title--sm" id="visit-title">Welcome to 171</h2>

            <address className="visit-card__address">
              171, Old Kottawa Road,<br />Navinna, Maharagama,<br />Sri Lanka
            </address>

            <p className={`status${status.open ? ' is-open' : ''}`} aria-live="polite">
              <span className="status__dot" aria-hidden="true" />
              <span className="status__label">{status.label}</span>
              {' '}
              <span className="status__detail">· {status.detail}</span>
            </p>

            <dl className="hours">
              <dt>Monday – Sunday</dt>
              <dd>11:00 – 15:00<br />18:00 – 22:00</dd>
            </dl>

            <ul className="visit-card__contact">
              <li><a href={CONTACT.phoneHref}><Icon name="i-phone" />{CONTACT.phoneDisplay}</a></li>
              <li><a href={CONTACT.whatsappHref} {...external}><Icon name="i-whatsapp" />{CONTACT.whatsappDisplay}</a></li>
              <li><a href={CONTACT.emailHref}><Icon name="i-mail" />{CONTACT.emailDisplay}</a></li>
            </ul>

            <a className="btn btn--primary" href={CONTACT.directionsHref} {...external}>
              <Icon name="i-pin" />
              <span>Get directions</span>
            </a>
          </article>

          <div className="visit__map reveal">
            <iframe
              src={CONTACT.mapEmbedSrc}
              title="Map showing 171 Restaurant on Old Kottawa Road, Maharagama"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
