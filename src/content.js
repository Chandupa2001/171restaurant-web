/* ==========================================================================
   CONTENT: edit this file to update the site.
   ========================================================================== */

/**
 * MENU HIGHLIGHTS (shown in "From the kitchen").
 * Replace each placeholder with a real dish and delete `placeholder: true`.
 *   name:  dish name
 *   note:  one short line about the dish (leave "" to hide)
 *   price: e.g. "Rs. 1,450" (leave "" to hide)
 *   image: drop the photo in public/images with this file name
 *
 * TODO: add a one-line note and price for each dish from the printed menu.
 */
export const MENU = [
  { name: 'Seafood Paella', note: 'A traditional Spanish rice dish infused with the delicate flavors of saffron and a hint of Pernod, featuring a medley of fresh seafood simmered to perfection.', price: '', image: 'images/dish-1.jpg' },
  { name: 'Penne all’Arrabbiata', note: 'Classic penne pasta tossed in a mildly spiced tomato concassé sauce, infused with garlic and chili. Choose from tender chicken, succulent seafood, or seasonal vegetables to complement this Roman-inspired dish.', price: '', image: 'images/dish-2.jpg' },
  { name: 'Lasagna al Forno', note: 'Layers of tender corn-fed chicken slow-cooked in a fragrant rosemary-infused Bolognese sauce, nestled between sheets of pasta and creamy béchamel, then baked to golden perfection.', price: '', image: 'images/dish-3.jpg' },
  { name: 'Chicken Escalope', note: 'Tender chicken escalope, pan-seared to golden perfection, topped with a rich blend of five cheeses, roasted garlic, and fresh parsley.', price: '', image: 'images/dish-4.jpg' },
  { name: 'Masala Macaroni', note: 'Elbow pasta tossed in a spiced Indian masala sauce, featuring sautéed vegetables and your choice of eggs, seafood, or chicken. Finished with a creamy or tomato based sauce, this Indo-Italian fusion dish offers a harmonious blend of flavors.', price: '', image: 'images/dish-5.jpg' },
  { name: 'Fettuccine', note: 'Silky fettuccine ribbons tossed in a rich Alfredo sauce, complemented by succulent prawns and crispy chicken bacon, offering a harmonious blend of flavors in true Italian tradition.', price: '', image: 'images/dish-6.jpg' },
];

/** Link to a full menu (PDF or page). Leave '' to show "Ask about today's menu" (WhatsApp) instead. */
export const FULL_MENU_URL = '';

/**
 * GOOGLE REVIEWS. Paste real reviews only, copied from the Google Business Profile.
 * Shape: { text: 'Review text…', name: 'Reviewer name', stars: 5 }
 * Leave empty to show just the "Read our reviews on Google" button.
 */
export const REVIEWS = [
  {text: "Nice place. Good atmosphere. Food is delicious and portion sizes are decent depending on the prices. One portion is sufficient for three people in some dishes. Food arrives within short time period but can take much time in rush hours. Customer service is also really good. There is designated parking area which is very convenient. But can be unavailable at rush hours.", name: 'Osanda Maleesha', stars: '4'},
  {text: "The menu lacked healthy options, otherwise great vibes, nice interior design and friendly service. Also parking is hassle free. A good restaurant for family/friends outing, just that it's not our type due to lack of protein rich, less carbs menu options.", name: 'Sudheera Senaratne', stars: '3'}
];

/** Google rating, e.g. { score: 4.6, count: 312 }. Leave null to hide. */
export const GOOGLE_RATING = { score: 4.1, count: 176 };

/** Opening hours, the same every day: [openHour, openMin, closeHour, closeMin] in Sri Lanka time. */
export const HOURS = [
  [11, 0, 15, 0],
  [18, 0, 22, 0],
];

/**
 * GALLERY strip (public/images/gallery-*.jpg). Frames alternate tall, wide, tall…,
 * so keep portrait photos in odd positions and landscape photos in even ones.
 * Add or remove entries freely; the 001 / 006 counter follows the list.
 */
export const GALLERY = [
  { image: 'images/gallery-1.jpg', alt: 'Lounge with green velvet sofas, a walnut-panelled wall and the round 171 mirror under warm spotlights', width: 900, height: 1205 },
  { image: 'images/gallery-2.jpg', alt: 'Guests choosing pastries at the lit bakery counter beside the ground-floor dining tables', width: 1200, height: 896 },
  { image: 'images/gallery-3.jpg', alt: 'A table set with brown placemats and patterned glasses in front of a sculpted green feature wall', width: 900, height: 1205 },
  { image: 'images/gallery-4.jpg', alt: 'Cheese-sauce fries and a chocolate milkshake on a table, with the green lounge behind', width: 1200, height: 896 },
  { image: 'images/gallery-5.jpg', alt: 'The glass-walled upper floor at night, with high stools, a snake plant and the illuminated 171 sign', width: 900, height: 1205 },
  { image: 'images/gallery-6.jpg', alt: 'Dining room with cream and tan leather chairs, a sculpted green wall and hanging plants overhead', width: 1200, height: 896 },
];

/* ---------- Contact details and links (used across the whole page) ---------- */
const ADDRESS_QUERY = '171%2C%20Old%20Kottawa%20Road%2C%20Navinna%2C%20Maharagama%2C%20Sri%20Lanka';

export const CONTACT = {
  phoneHref: 'tel:+94112844848',
  phoneDisplay: '+94 112 844 848',
  whatsappHref: "https://wa.me/94703462010?text=Hi%20171%20Restaurant%2C%20I'd%20like%20to%20ask%20about%20a%20table.",
  whatsappMenuHref: "https://wa.me/94703462010?text=Hi%20171%20Restaurant%2C%20what's%20on%20the%20menu%20today%3F",
  whatsappDisplay: '+94 70 346 2010',
  emailHref: 'mailto:eat@171restaurant.com',
  emailDisplay: 'eat@171restaurant.com',
  directionsHref: `https://www.google.com/maps/dir/?api=1&destination=${ADDRESS_QUERY}`,
  mapEmbedSrc: `https://www.google.com/maps?q=${ADDRESS_QUERY}&output=embed`,
  facebookHref: 'https://www.facebook.com/171Restaurant/',
  googleHref: 'https://share.google/6zd9uMjul3UUdJNAN',
};

/** Resolves a path inside public/ against the site's base URL. */
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`;
