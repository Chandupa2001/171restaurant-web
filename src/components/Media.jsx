import { useState } from 'react';
import { asset } from '../content.js';

/**
 * Photo slot. Shows a styled "PHOTO · file.jpg" placeholder until
 * public/<src> exists (a failed load adds .is-placeholder).
 */
export default function Media({ src, alt, className = '', width, height, eager = false, ref, style }) {
  const [missing, setMissing] = useState(false);
  const slot = src.split('/').pop();

  return (
    <figure
      ref={ref}
      style={style}
      className={`${className} media${missing ? ' is-placeholder' : ''}`}
      data-slot={slot}
    >
      <img
        src={asset(src)}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? undefined : 'lazy'}
        fetchPriority={eager ? 'high' : undefined}
        decoding="async"
        onError={() => setMissing(true)}
      />
    </figure>
  );
}
