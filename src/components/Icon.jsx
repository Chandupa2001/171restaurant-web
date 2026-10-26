/** Inline icon from the sprite in Sprite.jsx, e.g. <Icon name="i-phone" />. */
export default function Icon({ name, className = 'icon' }) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`#${name}`} />
    </svg>
  );
}

/** Props for links that open in a new tab. */
export const external = { target: '_blank', rel: 'noopener' };
