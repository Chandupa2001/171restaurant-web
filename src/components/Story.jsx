import Media from './Media.jsx';

/** 2. STORY */
export default function Story() {
  return (
    <section className="story section glow glow--right" id="story" aria-labelledby="story-title">
      <div className="story__grid">
        <Media
          className="story__media reveal"
          src="images/story.jpg"
          alt="A chef tossing vegetables in a flaming wok, with bowls of chopped chillies, garlic and spices on the counter"
          width={2000}
          height={1493}
        />

        <div className="story__text">
          <p className="eyebrow reveal"><span>01</span>Our story</p>
          <h2 className="display reveal" id="story-title">Simple ingredients.<br /><em>Authentic recipes.</em></h2>
          <p className="lead reveal">Some things don’t need reinventing. We start with good produce, cook it the way it has always been cooked, and let the flavour speak for itself.</p>
          <p className="reveal">Recipes that stand the test of time, served without fuss. Come hungry, stay a while.</p>
        </div>
      </div>
    </section>
  );
}
