import { CONTACT } from '../content.js';
import Icon, { external } from './Icon.jsx';

/** 7. CLOSING PROMPT */
export default function Closing() {
  return (
    <section className="closing section glow glow--center" aria-labelledby="closing-title">
      <div className="container closing__inner">
        <span className="closing__num" aria-hidden="true">171</span>
        <h2 className="statement reveal" id="closing-title">Come as you are.<br /><em>We’ll keep a table warm.</em></h2>
        <p className="closing__sub reveal">Call, message, or simply stop by. Lunch from 11:00, dinner from 18:00, every day.</p>
        <div className="btn-row btn-row--center reveal">
          <a className="btn btn--primary" href={CONTACT.phoneHref}>
            <Icon name="i-phone" /><span>Call now</span>
          </a>
          <a className="btn btn--ghost" href={CONTACT.whatsappHref} {...external}>
            <Icon name="i-whatsapp" /><span>WhatsApp us</span>
          </a>
          <a className="btn btn--ghost" href={CONTACT.directionsHref} {...external}>
            <Icon name="i-pin" /><span>Get directions</span>
          </a>
        </div>
      </div>
    </section>
  );
}
