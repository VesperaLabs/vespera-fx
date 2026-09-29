# Vespera FX

Vespera FX is a fast, static website for original dark and minimal mobile wallpapers. It is hosted with GitHub Pages.

**Live site:** https://vesperalabs.github.io/vespera-fx/

## How the site is organized

- `index.html` — latest wallpapers, newest first
- `categories.html` — category picker
- `category-*.html` — individual wallpaper galleries
- `privacy.html` — privacy policy
- `styles.css` — shared visual styling for every page
- `script.js` — lightbox viewer, downloads, search, and keyboard support
- `images/` — full-resolution wallpaper JPGs
- `images/thumbs/` — compressed preview thumbnails only
- `sitemap.xml` and `robots.txt` — search-engine discovery files

There is no framework or build step. The browser reads the HTML, CSS, and JavaScript files directly.

## Previewing changes locally

Open the project folder in your editor and start any simple static-file preview server. Then check the homepage, a category page, and the privacy page at phone, tablet, and desktop widths.

## Adding a wallpaper

1. Keep the original full-resolution JPG in `images/` unchanged.
2. Create a smaller compressed JPG thumbnail in `images/thumbs/`.
3. Add the card to the top of `index.html` and to the relevant category page.
4. Use accurate resolution and file-size metadata plus descriptive alt text.
5. Confirm the thumbnail and full-image paths work in the lightbox.

## Editing shared files

When `styles.css` changes, update the `styles.css?v=N` reference in every HTML page. When `script.js` changes, update `script.js?v=N` on every gallery page that loads it. This makes sure visitors receive the newest file instead of a browser-cached copy.

## Publishing

Review the changed files first, then commit and push to the `main` branch. GitHub Pages deploys the site automatically.
