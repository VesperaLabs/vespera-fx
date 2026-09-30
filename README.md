# Vespera FX

Vespera FX is a fast, static website for original dark and minimal mobile wallpapers (101 original 2K & 4K wallpapers). It is hosted with GitHub Pages.

**Live site:** https://vesperalabs.github.io/vespera-fx/

## How the site is organized

- `index.html` — latest wallpapers (newest first), instant category filter chips, and enhanced search bar
- `categories.html` — category picker
- `category-*.html` — individual wallpaper galleries with scoped search
- `privacy.html` — privacy policy
- `styles.css` — shared visual styling and design system for every page (current: `styles.css?v=14`)
- `script.js` — lightbox viewer, lock screen preview, downloads, category filter chips, search, and keyboard support (current: `script.js?v=10`)
- `images/` — full-resolution wallpaper JPGs
- `images/thumbs/` — compressed preview thumbnails only
- `sitemap.xml` and `robots.txt` — search-engine discovery files

There is no framework or build step. The browser reads the HTML, CSS, and JavaScript files directly.

## Key Features

- **101 Original Wallpapers:** Curated across 6 distinct categories (AMOLED, Night Sky, Abstract, Heroic, Architecture, Landscape).
- **Instant Category Filter Chips:** Switch categories smoothly on the homepage with live counts and unified real-time text search.
- **Enhanced Search Bar:** Frosted glass box with SVG search icon, `/` keyboard shortcut, `<kbd>/</kbd>` shortcut indicator, and instant circular clear (`×`) button.
- **"Test on Lock Screen" Preview:** Interactive phone lock screen preview directly inside the lightbox viewer with live clock, date, lock icon, and bottom action controls.
- **Accessible & Keyboard Friendly:** Full keyboard navigation (`Tab`, `Escape`, `/` search focus, card activation).

## Previewing changes locally

Open the project folder in your editor and start any simple static-file preview server. Then check the homepage, a category page, and the privacy page at phone, tablet, and desktop widths.

## Adding a wallpaper

1. Keep the original full-resolution JPG in `images/` unchanged.
2. Create a smaller compressed JPG thumbnail in `images/thumbs/`.
3. Add the card to the top of `index.html` and to the relevant category page. Include `data-category="<category>"`, `data-resolution`, and `data-size`.
4. Use accurate resolution and file-size metadata plus descriptive alt text.
5. Confirm the thumbnail and full-image paths work in the lightbox.

## Editing shared files

When `styles.css` changes, update the `styles.css?v=N` reference in every HTML page. When `script.js` changes, update `script.js?v=N` on every gallery page that loads it. This makes sure visitors receive the newest file instead of a browser-cached copy.

## Publishing

Review the changed files first, then commit and push to the `main` branch. GitHub Pages deploys the site automatically.

