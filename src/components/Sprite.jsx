/** SVG sprite: logo + icons, reused across the page with <use href="#…">. */
export default function Sprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      {/* Full-colour logo, traced from originals/logo.png. The bars and the 7 run to the edge of the disc. */}
      <clipPath id="logo-clip"><circle cx="50" cy="50" r="50" /></clipPath>
      <symbol id="logo" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="#CFAD80" />
        <g fill="#747230" clipPath="url(#logo-clip)">
          <rect x="9.29" y="14.15" width="6.11" height="71.8" />
          <rect x="84.16" y="14.15" width="5.86" height="71.8" />
          <path d="M25.28 14.15H75.48L27.54 102.69H18.49L62.28 21.86H25.28Z" />
        </g>
      </symbol>
      {/* Line icons (stroke = currentColor) */}
      <symbol id="i-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92z" />
      </symbol>
      <symbol id="i-whatsapp" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.5 20.5l1.3-4.1A8.5 8.5 0 1 1 8 19.4z" />
        <path d="M9 8.6c.2-.4.5-.5.8-.5h.4c.2 0 .3.1.4.3l.6 1.4c.1.2 0 .4-.1.5l-.5.6c.6 1.2 1.5 2.1 2.7 2.7l.6-.5c.1-.1.3-.2.5-.1l1.4.6c.2.1.3.2.3.4v.4c0 .3-.1.6-.5.8-.6.4-1.4.5-2.1.2-2-.8-3.6-2.4-4.4-4.4-.3-.7-.2-1.5.2-2.1z" />
      </symbol>
      <symbol id="i-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" />
      </symbol>
      <symbol id="i-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2.5" y="4.5" width="19" height="15" rx="1.5" /><path d="m3 6 9 7 9-7" />
      </symbol>
      <symbol id="i-facebook" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </symbol>
      <symbol id="i-star" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9z" />
      </symbol>
      <symbol id="i-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12h16M14 6l6 6-6 6" />
      </symbol>
    </svg>
  );
}
