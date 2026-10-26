# 171 Restaurant website

A single-page site built with **React + Vite**.

```
index.html              page shell: SEO tags, social sharing tags, structured data, fonts
src/content.js          menu highlights, reviews, rating, opening hours, gallery, contact links
src/styles.css          all styling (colours and fonts are set at the top)
src/App.jsx             page layout (which sections appear, in what order)
src/components/         one file per section (Header, Hero, Story, Kitchen, Gallery, Guests, Visit, Closing, Footer, ActionBar)
src/hooks/              opening-hours badge, scroll reveals, scroll helpers
public/favicon.svg      logo / browser tab icon
public/images/          photos (see "Photo slots" below)
```

## Running it

Requires [Node.js](https://nodejs.org) 22 or newer.

```bash
npm install        # first time only
npm run dev        # local dev server with live reload (http://localhost:5173)
npm run build      # production build into dist/
npm run preview    # serve the dist/ build locally to check it
```

To publish, upload the **contents of `dist/`** to your web host. All paths are relative, so it works from the domain root or from a sub-folder. Opening `dist/index.html` straight from disk (`file://`) does not work, because browsers block module scripts there. Use `npm run preview` to view it locally.

## Common edits

**Photos.** Drop files into `public/images/` using the names in the table below, then rebuild. No code changes are needed.

**Signature dishes.** Edit `MENU` in `src/content.js`: the name, a one-line note, an optional price, and the image file. Delete `placeholder: true` from each entry once it's real.

**Full menu link.** In `src/content.js`, set `FULL_MENU_URL` (for example `'menu.pdf'` after placing `menu.pdf` in `public/`). While it's empty, the link reads "Ask about today's menu" and opens WhatsApp.

**Google reviews.** In `src/content.js`, add real reviews to `REVIEWS` and set `GOOGLE_RATING` if wanted. While these are empty, only the "Read our reviews on Google" button is shown.

**Phone, WhatsApp, email, map and social links.** Edit `CONTACT` in `src/content.js`. They update everywhere on the page.

**Opening hours.** These appear in four places; keep them in sync:
1. `HOURS` in `src/content.js` (drives the Open now / Closed now badge)
2. the Visit card in `src/components/Visit.jsx`
3. the footer in `src/components/Footer.jsx`
4. `openingHoursSpecification` in the structured data in `index.html`

**Price range.** In `index.html`, find `TODO: add "priceRange"` and add a `"priceRange"` line to the structured data once confirmed.

**Domain.** Once the site has a web address, find-and-replace `https://YOUR-DOMAIN.example` in `index.html` (canonical link, social sharing tags, structured data).

**Colours and fonts.** These are the variables at the top of `src/styles.css` (`--sand`, `--olive`, `--ink-900`, …).

## Photo slots

Until a file exists, the site shows a dark "PHOTO · file-name.jpg" placeholder in its place.

| File name (in `public/images/`) | Where it appears | Shape | Suggested size | Suggested subject |
|---|---|---|---|---|
| `hero.jpg` | Full-screen opening image | Landscape | 2400 × 1600 | The dining room in the evening, warm low light. Keep the lower-left area calm, because the name and buttons sit there. |
| `story.jpg` | "Our story" (left half on desktop) | Portrait 4:5 | 1200 × 1500 | Hands at work in the kitchen, ingredients, or a detail of the room. |
| `dish-1.jpg` … `dish-6.jpg` | "From the kitchen" cards | Portrait 4:5 | 800 × 1000 | One signature dish per photo, shot close on a dark surface. |
| `gallery-1.jpg`, `-3`, `-5` | Gallery strip (tall frames) | Portrait 3:4 | 900 × 1200 | The space, the people, the details. |
| `gallery-2.jpg`, `-4`, `-6` | Gallery strip (wide frames) | Landscape 4:3 | 1200 × 900 | Tables, the room, plated food. |

To add more gallery photos (e.g. `gallery-7.jpg`), add an entry to `GALLERY` in `src/content.js`. Frames alternate tall and wide, so keep portrait photos in odd positions and landscape photos in even ones.
| `og-image.jpg` | Preview when the link is shared (WhatsApp, Facebook) | Landscape | 1200 × 630 | Your strongest single photo. |

- Export as **JPG at about 80% quality** and keep each file under about 400 KB (hero under about 600 KB). [Squoosh](https://squoosh.app) works well for this.
- Use the `.jpg` extension exactly as listed. File names are case-sensitive on most web hosts.
- If the hero crops awkwardly, find `--hero-focus` in `src/styles.css` and set, for example, `--hero-focus: 50% 30%;` (horizontal, vertical). The story photo has the same setting, `--story-focus`.
- Keep full-size originals in `originals/`, outside `public/`, so they aren't published with the site.
- After adding photos, update the alt text (search the `src/` folder for `TODO: describe`). Dish photos use the dish name from `MENU` automatically.

## Testing the Open/Closed badge
Add `?time=HH:MM` to the page address to simulate a Sri Lanka time, for example `http://localhost:5173/?time=16:30` shows "Closed now · opens again at 18:00". Without it, the badge uses the real time in Sri Lanka (Asia/Colombo) and updates every minute.
