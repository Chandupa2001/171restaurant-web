# Photo slots

Drop each photo into this folder **using exactly the file name below**. The site picks it up automatically, with no code changes. Until a file exists, the site shows a dark "PHOTO · file-name.jpg" placeholder in its place.

| File name | Where it appears | Shape | Suggested size | Suggested subject |
|---|---|---|---|---|
| `hero.jpg` | Full-screen opening image | Landscape | 2400 × 1600 | The dining room in the evening, warm low light. Keep the lower-left area calm, because the name and buttons sit there. |
| `story.jpg` | "Our story" (left half on desktop) | Portrait 4:5 | 1200 × 1500 | Hands at work in the kitchen, ingredients, or a detail of the room. |
| `dish-1.jpg` … `dish-6.jpg` | "From the kitchen" cards | Portrait 4:5 | 800 × 1000 | One signature dish per photo, shot close on a dark surface. |
| `gallery-1.jpg`, `-3`, `-5`, `-7` | Gallery strip (tall frames) | Portrait 3:4 | 900 × 1200 | The space, the people, the details. |
| `gallery-2.jpg`, `-4`, `-6`, `-8` | Gallery strip (wide frames) | Landscape 4:3 | 1200 × 900 | Tables, the room, plated food. |
| `og-image.jpg` | Preview when the link is shared (WhatsApp, Facebook) | Landscape | 1200 × 630 | Your strongest single photo. |

## Tips
- Export as **JPG at about 80% quality** and keep each file under about 400 KB (hero under about 600 KB). [Squoosh](https://squoosh.app) works well for this.
- Use the `.jpg` extension exactly as listed. File names are case-sensitive on most web hosts.
- If the hero crops awkwardly, change where it is framed in `css/styles.css`: find `--hero-focus` and set, for example, `--hero-focus: 50% 30%;` (horizontal, vertical).
- After adding photos, update the alt text in `index.html` (search for `TODO: describe photo`). Dish photos use the dish name from `js/main.js` automatically.
