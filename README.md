# Priya Kumari — Portfolio (plain HTML/CSS/JS)

The same portfolio site as the React version, rebuilt with plain HTML, CSS, and
JavaScript — no installation, no build step, no terminal required.

## How to run it

Just open `index.html` in a web browser:

- **Double-click `index.html`** in your file explorer, or
- Right-click it → "Open with" → your browser of choice.

That's it — no Node.js, no npm, nothing to install. An internet connection is
needed the first time it loads (for the Google Fonts), otherwise it falls
back to your system font.

## Putting it online

Since there's no build step, you can host these files as-is on any static
host:

- **GitHub Pages**: push this folder to a repo and enable Pages in the repo
  settings (Settings → Pages → deploy from branch).
- **Netlify / Vercel**: drag-and-drop this whole folder onto their site
  import page.
- Any basic web host: upload the files via FTP — it's just static HTML/CSS/JS.

## Files

- `index.html` — all page content and structure
- `style.css` — all styling (colors/fonts as CSS variables at the top)
- `script.js` — mobile menu toggle, scroll-spy nav highlighting, footer year
- `Priya_Kumari_Resume.pdf` — linked from the "Résumé" buttons
- `favicon.svg` — browser tab icon

## Editing content

Everything is hand-written directly in `index.html` — search for the section
you want to change (each is clearly commented, e.g. `<!-- ============
PROJECTS ============ -->`) and edit the text in place. Colors, fonts, and
spacing are controlled by the CSS variables at the top of `style.css`.

## Note

There's also a React + Vite version of this same site (in the other zip) if
you'd rather work with components and a dev server with hot reload. This
plain version is the simpler option when you just want something that works
immediately with zero setup.
