# Portfolio

A config-driven, single-page personal portfolio built with **Vite 6 + React 18**, styled with **CSS Modules + CSS custom properties**, and deployed to **GitHub Pages**.

- All copy lives in **one file**: `src/data/portfolio.js`.
- All visual decisions live in **one file**: `src/styles/design-tokens.css`.
- Any section can be switched off. A hidden section disappears from both the page and the nav.

This is the **Sage** design, spec-sheet edition, drawn from the Wise palette (`../design-md/wise/DESIGN.md`). A sticky sidebar shows your name, role and a section index with a 000–100 reading readout for each section. The content reads like a technical data sheet: ruled tables, mono data, square corners and square status marks. Every job and project leads with one large figure: the result. The sister design, **Index**, lives in `../portfolio/`.

---

## 1. Run it

Requires **Node 20**.

```bash
npm install
npm run dev
```

```bash
npm run build     # production build into dist/
npm run preview   # serve dist/ locally
```

No environment variables are required to build.

## 2. Edit your content

Open **`src/data/portfolio.js`**. It is the only content file.

| Export         | What it controls                                                                               |
| -------------- | ---------------------------------------------------------------------------------------------- |
| `profile`      | Identity: name, the one `role` this portfolio targets, `timeZone` for the live clock (e.g. `"Africa/Harare"`), headline, summary, location, email, phone, availability, resume. Used by the hero, contact, footer, page title and JSON-LD. |
| `socials`      | `links: [{ id, label, url }]`. Remove networks you don't use; don't leave empty strings.       |
| `skills`       | Skill `categories`, each shown as a numbered card in a grid (one column on phones, two on tablets, three on desktop) with its skills as compact tags. Keep about 5–8 skills per card. |
| `experience`   | Jobs, newest first. Each job's `impact` lists what changed because of your work. The optional `metric: { value, label }` is the big figure at the start of the row. |
| `education`    | Degrees, newest first. `gpa: { value, scale }` prints at least two decimals and never rounds a more precise value (3.966 stays 3.966). |
| `projects`     | Each project is a spec block showing `metric` (big figure), `name`, `outcome`, `role`, `start`/`end`, `skills` and `links`. **Open spec** unfolds `summary`, `problem`, `approach`, `results[]` and `impact`. |
| `credentials`  | `kind: "certification" \| "competition" \| "membership" \| "award" \| "volunteering"`, grouped and filterable separately on the page. Optional `issuer`, `issued`, `summary`, `credentialUrl` and `links`. |
| `publications` | Citation list: `authors`, `date`, `title`, `status` (`published` / `accepted`), `keyFinding`, and `url` for the Source link (optional `sourceLabel`, e.g. "Read paper"). |
| `blogs`, `talks`, `podcast`, `twitter`, `openSource` | Optional sections, off by default.                     |
| `splashScreen` | `enabled` and `duration` (ms).                                                                  |

**"View all":** `projects`, `credentials` and `publications` take an `initialCount`. The first N entries show, and a "View all" button reveals the rest. Remove `initialCount` to always show everything.

**Turning sections off:** set that object's `display` to `false` (a real boolean, not the string `"false"`).

**Figures must be real.** Every `metric` should be a number you can back up; delete it if not. Without one, a job shows its start year and a project its year.

**One portfolio per role.** Set `profile.role` to the job you're targeting, and pick the skills, jobs and projects that support it. For another role, duplicate the repo (or this data file) and tailor it.

**Dates** are ISO `YYYY-MM`. A current role or degree uses `end: null` and renders as "Jan 2024 – Present". When a start date is unknown, use `start: null`: the row shows only the end date ("Aug 2025"), or "In progress" if `end` is also `null`.

**Skills** are plain strings grouped into categories. To show a level, write `{ name: "SQL", level: "advanced" }` (`expert` | `advanced` | `working`); it appears as a quiet label on the tag. Don't add percentage bars: they can't be verified, and reviewers read them as decoration.

**Availability** takes one of three values:

- `"open"` shows a green "Open to opportunities" badge.
- `"selective"` shows "Open to selected roles".
- `"not-looking"` hides the badge.

Also update the static `<title>` and `<meta name="description">` in `index.html`. Crawlers that don't run JavaScript read those tags. The app sets the title at runtime to `displayName - role` (a plain hyphen), so keep the static title in that same form.

## 3. Change the look

The design system ("Sage") is documented in **[DESIGN.md](DESIGN.md)**: concept, colour roles for both themes, type, layout, every component, motion, accessibility and do's and don'ts.


Replace **`src/styles/design-tokens.css`**. It has two layers:

1. `--palette-*`: raw values taken from the design system.
2. Semantic roles such as `--color-bg`, `--color-text`, `--color-accent`, `--font-display`, `--space-*` and `--radius-*`.

Component CSS reads only the semantic roles, so swapping the palette restyles the whole site. Dark mode overrides live under `[data-theme="dark"]`. **Dark is the default theme**: first-time visitors get it whatever their system setting, and the `[ Light ]` toggle switches and remembers their choice. To change the default, edit `DEFAULT_DARK` in `src/context/ThemeContext.jsx` and the matching line in the theme script in `index.html`.

Type is **Archivo**, a variable-width grotesk; the name and titles are set wide at 112%. **JetBrains Mono** is used for all data (dates, IDs, labels, links). Both load from Google Fonts in `index.html`.

## 4. Images

Put logos and certificate images in `public/images/` and reference them from `portfolio.js` (`logo` for jobs and degrees, `image` for credentials). Credential rows show `image` as a small 4:3 thumbnail: a photo or scan of the certificate works well. Add `imageAlt` to describe it. Projects have no images. An empty, missing or broken image falls back to a letter tile and never crashes the page.

**`public/resume.pdf`** is the CV, built from the `cv/` folder of the projects workspace. `profile.resumeUrl` is `"resume.pdf"`, so the hero and contact sections link to it. `resumeUrl` can also point anywhere else, for example Google Drive. When `resumeUrl` is empty, the hero still shows a "PDF" link if a non-empty `public/resume.pdf` is deployed.

**Site icon.** `public/favicon.svg` is the tab icon: a geometric K, drawn as three shapes rather than typed in a font, on the lime square used for the header mark. `favicon.ico` (16 to 64 px) and `apple-touch-icon.png` (180 px, for phone home screens) are rendered from the same shapes. Browsers cache icons hard, so use a private window to check a new one.

## 5. Optional data: GitHub pinned repos and Medium

Copy `.env.example` to `.env`:

```
GITHUB_TOKEN=            # a classic token with read:user is enough
GITHUB_USERNAME=your-github-username
USE_GITHUB_DATA=false    # set to true to fetch pinned repos
MEDIUM_USERNAME=         # set to fetch your Medium feed
VITE_BASE=./
```

`npm run dev` and `npm run build` first run `scripts/fetch-external-data.js`, which writes `public/profile.json` and `public/blogs.json`. The script never fails the build: if a fetch fails it logs a warning and continues.

To show **Open source**:

1. Pin repositories on your GitHub profile.
2. Set `USE_GITHUB_DATA=true` together with your username and token.
3. Set `openSource.display = true` in `portfolio.js`.

`openSource.showGithubProfile = true` also shows your GitHub avatar and bio in the Contact section.

In GitHub Actions, the workflow passes `GITHUB_TOKEN` automatically. To fetch there as well, change `USE_GITHUB_DATA` to `"true"` in `.github/workflows/deploy.yml`.

To show **Writing** from Medium, set `MEDIUM_USERNAME` plus `blogs.display = true` and `blogs.useMedium = true`.

## 6. Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to the `gh-pages` branch.

Then, once: go to **GitHub → Settings → Pages → Build and deployment → Deploy from a branch → `gh-pages` / `(root)`**.

The site will be live at `https://<username>.github.io/<repo>/`. If the repo is named `<username>.github.io`, it will be live at `https://<username>.github.io/`. The relative base (`./`) works for both.

To deploy manually from your machine instead:

```bash
npm run deploy
```

### Sitemap and search

After every build, `scripts/generate-sitemap.js` writes `dist/sitemap.xml` and adds a `Sitemap:` line to `dist/robots.txt`. It needs the site's public address and takes the first of:

1. a `SITE_URL` environment variable (or `.env` entry);
2. `profile.siteUrl` in `portfolio.js`;
3. on GitHub Actions, the repository name: `<username>.github.io` gives `https://<username>.github.io/`, and any other repo gives `https://<username>.github.io/<repo>/`.

A local build with none of these skips the sitemap rather than writing a wrong address. A local `npm run deploy` therefore needs `SITE_URL` or `profile.siteUrl` set to include one.

The same step writes the schema.org `Person` data (built in `src/lib/jsonLd.js` from `profile`, `socials`, `education` and `skills`) into `dist/index.html`, so crawlers that don't run JavaScript still read it. The page refreshes the same data at runtime.

Once the site is live, add it to [Google Search Console](https://search.google.com/search-console) as a **URL prefix** property (`https://kmuhwati.github.io/`). Choose the **HTML tag** verification method, copy the `content="..."` value into `profile.googleSiteVerification`, push, wait for the deploy, then click Verify. Finally, submit `sitemap.xml` from the Sitemaps page and use URL Inspection → Request indexing for the home page. Crawlers only read `robots.txt` at the root of a domain, so on a project page (`/<repo>/`) the Search Console submission is what points Google at the sitemap.

## Project structure

```
src/
├── data/portfolio.js          ← content (the only file you must edit)
├── styles/design-tokens.css   ← design system slot
├── lib/section-registry.js    ← order, nav labels and on/off for each section
├── sections/<Name>/           ← one folder per page section
└── components/<Name>/         ← reusable, props-only building blocks
```

To add a new section, you need three things: a data export, a `src/sections/<Name>/` folder, and one row in `section-registry.js`.
