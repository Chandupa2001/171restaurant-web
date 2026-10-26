import { CONTACT } from '../content.js';
import Icon, { external } from './Icon.jsx';

/** MOBILE ACTION BAR (hidden on wide screens) */
export default function ActionBar({ inert }) {
  return (
    <nav className="action-bar" aria-label="Quick contact" inert={inert}>
      <a href={CONTACT.phoneHref}>
        <Icon name="i-phone" /><span>Call</span>
      </a>
      <a href={CONTACT.whatsappHref} {...external}>
        <Icon name="i-whatsapp" /><span>WhatsApp</span>
      </a>
      <a href={CONTACT.directionsHref} {...external}>
        <Icon name="i-pin" /><span>Directions</span>
      </a>
    </nav>
  );
}
