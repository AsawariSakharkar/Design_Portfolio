# folio

Personal portfolio site for **Asawari Sakharkar** — a fast, framework-free
static site built to be hosted on **GitHub Pages** and easy to maintain.

## Why this setup

- **No build step, no dependencies.** Just HTML, CSS, and a little vanilla JS.
  What you see in the repo is exactly what ships. Perfect for GitHub Pages.
- **All content lives in one file.** Edit `assets/js/content.js` to change text,
  links, images, and the expertise tags — no markup edits required.
- **Placeholders you can swap in one line.** Images are lightweight SVGs until
  you add the real Figma exports.

## Project structure

```
folio/
├── index.html                  # page skeleton (rarely needs editing)
├── .nojekyll                   # tells GitHub Pages to skip Jekyll processing
├── .github/workflows/deploy.yml# auto-deploys to Pages on push to main
└── assets/
    ├── css/styles.css          # all styling + design tokens (top of file)
    ├── js/
    │   ├── content.js          # ← EDIT THIS: all your content
    │   ├── icons.js            # inline SVG social icons
    │   └── main.js             # renderer (usually leave alone)
    └── images/
        ├── hero-locket.svg     # placeholder for the hero artwork
        ├── favicon.svg         # tab icon
        └── README.md           # how to replace images
```

## Editing your content

Open `assets/js/content.js`. It's commented and covers:

- name, greeting, tagline
- the Resume button (link to your PDF)
- social links (set a `url`, or leave blank to hide)
- the "My Expertise" tags (add/remove freely)
- hero image path

## Replacing images

See `assets/images/README.md`. Short version: drop your file in
`assets/images/`, then point to it in `content.js`. For the resume, add your
PDF at `assets/resume.pdf`.

## Run locally

Any static server works. From the project root:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. (Opening `index.html` directly also works,
but a server matches the hosted behavior more closely.)

## Deploy to GitHub Pages

You have two options — pick one.

### Option A — GitHub Actions (recommended, already configured)

1. Push this repo to GitHub with the default branch named `main`.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Every push to `main` now auto-deploys via `.github/workflows/deploy.yml`.

### Option B — Deploy from a branch (no Actions)

1. Push to GitHub.
2. **Settings → Pages → Source → Deploy from a branch**.
3. Select branch `main` and folder `/ (root)`, then Save.

Your site publishes at `https://<username>.github.io/<repo>/`. If you use a
project repo (not `<username>.github.io`), the relative asset paths in this
project already work under that subpath — no changes needed.

### Custom domain (optional)

Add a `CNAME` file at the repo root containing your domain (e.g.
`asawari.design`) and configure DNS per GitHub's docs.
```
