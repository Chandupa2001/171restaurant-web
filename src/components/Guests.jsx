import { CONTACT, GOOGLE_RATING, REVIEWS } from '../content.js';
import Icon, { external } from './Icon.jsx';
import { rowDelay } from './Kitchen.jsx';

/** 5. REVIEWS: real reviews go in REVIEWS in src/content.js */
export default function Guests() {
  return (
    <section className="guests section" id="guests" aria-labelledby="guests-title">
      <div className="container guests__inner">
        <p className="eyebrow eyebrow--center reveal"><span>04</span>Guests</p>
        <h2 className="statement reveal" id="guests-title"><em>Hear it from our guests.</em></h2>

        {GOOGLE_RATING && (
          <p className="guests__rating reveal">
            {GOOGLE_RATING.score} / 5 on Google · {GOOGLE_RATING.count} reviews
          </p>
        )}

        <div className="reviews">
          {REVIEWS.map((r, i) => {
            const stars = Math.max(0, Math.min(5, Math.round(r.stars || 0)));
            return (
              <figure className="review reveal" style={rowDelay(i)} key={i}>
                <p className="review__stars" aria-label={`${stars} out of 5 stars`}>{'★'.repeat(stars)}</p>
                <blockquote className="review__text">{r.text}</blockquote>
                <figcaption className="review__name">{r.name}</figcaption>
              </figure>
            );
          })}
        </div>

        <div className="btn-row btn-row--center reveal">
          <a className="btn btn--ghost" href={CONTACT.googleHref} {...external}>
            <Icon name="i-star" />
            <span>Read our reviews on Google</span>
          </a>
        </div>
      </div>
    </section>
  );
}
