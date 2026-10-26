# 171 Restaurant website

A single-page static site: plain HTML, CSS and a small vanilla JavaScript file. There is no build step. Open `index.html` in a browser to view it.

```
index.html        page content, SEO tags, structured data
css/styles.css    all styling (colours and fonts are set at the top)
js/main.js        menu highlights, reviews, opening hours (edit the CONTENT block at the top)
favicon.svg       logo / browser tab icon
images/           photos (see images/README.md for the file names)
```

## Common edits

**Photos.** Drop files into `images/` using the names listed in [images/README.md](images/README.md). No code changes are needed.

**Signature dishes.** Open `js/main.js` and edit `MENU` at the top: the name, a one-line note, an optional price, and the image file. Delete `placeholder: true` from each entry once it's real.

**Full menu link.** In `js/main.js`, set `FULL_MENU_URL` (for example `'menu.pdf'` after placing `menu.pdf` next to `index.html`). While it's empty, the button reads "Ask about today's menu" and opens WhatsApp.

**Google reviews.** In `js/main.js`, add real reviews to `REVIEWS` and set `GOOGLE_RATING` if wanted. While these are empty, only the "Read our reviews on Google" button is shown.

**Opening hours.** These appear in four places; keep them in sync:
1. `HOURS` in `js/main.js` (drives the Open now / Closed now badge)
2. the Visit card in `index.html`
3. the footer in `index.html`
4. `openingHoursSpecification` in the structured data in `index.html`

**Price range.** In `index.html`, find `TODO: add "priceRange"` and add a `"priceRange"` line to the structured data once confirmed.

**Domain.** Once the site has a web address, find-and-replace `https://YOUR-DOMAIN.example` in `index.html` (canonical link, social sharing tags, structured data).

**Colours and fonts.** These are the variables at the top of `css/styles.css` (`--sand`, `--olive`, `--ink-900`, …).

## Testing the Open/Closed badge
Add `?time=HH:MM` to the page address to simulate a Sri Lanka time, for example `index.html?time=16:30` shows "Closed now · opens again at 18:00". Without it, the badge uses the real time in Sri Lanka (Asia/Colombo) and updates every minute.
