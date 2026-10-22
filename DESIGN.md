---
version: 2.0
name: Sage — spec-sheet edition
description: A light, exact design system for a single-page personal portfolio. The structure is a sticky sidebar plus a reading column of rows; the components read like a technical data sheet, with ruled tables, mono data, square corners, square status marks and IDs. Each job and project leads with one large result figure. One identity colour, lime, is used only for marks and progress. Palette from design-md/wise/DESIGN.md; values marked "derived" are not in that spec.

colors:
  lime: "#9fe870"            # marks, progress bars, loader cells
  forest: "#163300"          # lime's outline and links on light
  ink: "#0e0f0c"             # text, heavy rules, primary button
  body: "#454745"
  mute-strong: "#5f615d"     # derived: AA muted text
  sage: "#e8ebe6"            # sidebar, figure cells, category cells
  canvas: "#f3f5f1"          # derived: page
  warning: "#ffd11a"         # the square competition-result chip
  night: "#0e0f0c"           # dark theme (derived from ink)

typography:
  display: "Archivo (variable width 62–125, weight 100–900), name and titles set at 112% width"
  mono: "JetBrains Mono 400/500 for every piece of data: dates, IDs, labels, counts, links"
  mega:    { size: "clamp(48px, 7.5vw, 104px)", weight: 500, lineHeight: 0.92 }
  section: { size: "clamp(28px, 3.4vw, 40px)", weight: 500 }
  figure:  { size: "clamp(40px, 5vw, 60px)", weight: 500, lineHeight: 0.95, numerals: tabular }
  row:     { size: "clamp(20px, 2.2vw, 24px)", weight: 500 }
  mono:    { size: "12–14px", weight: 400 }

rounded: 0 everywhere
rules: { heavy: "1.5px ink", light: "1px ink at 16%" }
spacing: { base: 4px, column: 992px, rail: 304px, figure-col: 192px, thumb: 112px }
motion: { reveal: "fade + 16px rise", spec: "400ms grid-rows 0fr→1fr", loader: "20 cells over splashScreen.duration (1600ms by default), then a 600ms clip-path lift" }
---

# Sage — spec-sheet edition

The second design for Kumbirai Muhwati's portfolio. It keeps Sage's structure (a sticky sidebar and a column of rows) and rebuilds every component as a **spec sheet** plus an **evidence ledger**. Tokens live in [`src/styles/design-tokens.css`](src/styles/design-tokens.css). The sister design, **Index**, lives in `../portfolio/`.

## 1. Concept

The page reads like the data sheet for a person: every claim sits in a ruled cell, every piece of data is set in mono, and every job and project starts with the result it produced.

### Signature touches (the only three)

1. **Results first.** Jobs and projects open with a big figure cell (`40%` / *faster reporting*). When there is no figure, the cell falls back to a quiet mono year. Degrees always show the quiet year cell; big figures are kept for results.
2. **Ruled tables, square everything.** Heavy 1.5px ink rules open each section and table; hairlines separate rows. There are no radii, shadows or cards.
3. **Square lime marks.** A small lime square with a forest outline is the only bullet or status dot. The loader and the sidebar's reading bars use the same lime.

### Principles

- Data is set in mono and prose in Archivo; never mix them inside one cell.
- There are no icons. Arrows are text: `↗` opens elsewhere, `→` writes to someone, `↓` opens something here.
- Every number shown must be real. The figure cells are the page's claim to credibility.

## 2. Colour

| Role | Light | Use |
| --- | --- | --- |
| `--color-bg` | canvas | page |
| `--color-rail` / `--color-surface` | sage | sidebar, figure cells, skill categories |
| `--color-text` / `--color-rule` | ink | text, heavy rules |
| `--color-border` | ink 16% | hairlines |
| `--color-mark` / `--color-mark-edge` | lime / forest | square marks, progress, loader |
| `--color-action` | ink | primary button and Open spec (it inverts on hover) |
| `--color-link` | forest | underlined mono links |
| `--color-highlight` | yellow | competition result chip |

Dark mode (`[data-theme="dark"]`) swaps to a night canvas; lime stays the same.

## 3. Typography

- **Name:** Archivo mega at 112% width, weight 500.
- **Section headers:** a bar made of a mono index (`03`), the title, a dotted leader and mono meta (`4 entries`), over a heavy rule.
- **Figures:** Archivo, tabular numerals, with a sans label and a mono source line beneath.
- **Data:** JetBrains Mono at 12–14px for dates, IDs (`P-01`), labels, counts and links.

## 4. Layout

- **≥1100px:** a sticky 19rem sidebar sits beside a 62rem reading column. **Below that:** a top bar with a square Menu button.
- **Ledger rows** (Experience, Education) and project sheets use `figure-col | content` at ≥768px, and stack below that.
- **Figures stay on one line.** A figure longer than about five characters shrinks to fit its cell instead of wrapping.
- **Tables** (Credentials, Research) show a mono header row at ≥768px and fold to label/value pairs on phones. There is no horizontal scroll at 375px.

## 5. Components

| Component | Spec |
| --- | --- |
| Sidebar | Name, role and a status mark. The section index has `num · label · 000–100` readouts and a lime bar per section. The foot holds resume, local time, `[ Dark ]` and links. |
| Hero | The name; ruled fact cells (Role, Based in, Status, Local time); headline and summary; buttons (View projects, Resume, PDF when a real `resume.pdf` is deployed) and social links. |
| Skills | A two-column spec table with the category and count on the left and items with `exp` / `adv` / `wkg` codes on the right. |
| Experience / Education | Evidence-ledger rows. The impact list is numbered `01 02 03` in mono. A degree's figure cell is its start year (`2024`, *to 2025*); GPA is a mono data line under the institution (`GPA 3.80 / 4.0`). |
| Projects | Ruled sheet: `■ Name ··· P-01` header; figure cell; Result, Role · period and Stack cells; **Open spec ↓** unfolds Summary, Problem, Approach, Results and Impact in place (`inert` while closed). |
| Credentials | Mono filter tabs with counts (the active tab is boxed); rows of a 4:3 thumbnail, credential, then Issuer, Date and Proof ↗. |
| Research | Year · title, authors and finding · `■ Published` / `□ Accepted` · Source ↗. |
| Contact | "Write to {name}" in mega type with an Email button, beside a ruled key/value table. |
| Buttons | Square, 1px. Primary is an ink block; secondary is outlined; text links are underlined mono. |
| Loader | Name, role, a row of 20 square cells that fill in lime, and a `000–100` readout; then the page is revealed from the bottom up. |

## 6. Motion

- Rows fade in and rise 16px as they enter the viewport.
- Project specs open with a `grid-template-rows 0fr → 1fr` transition.
- Sidebar bars track reading progress through each section as you scroll.
- `prefers-reduced-motion` removes every transition. The loader then shortens to 300ms and fades instead of clipping.

## 7. Accessibility

- Every toggle carries `aria-expanded` / `aria-pressed` and `aria-controls`, and closed panels are `inert`.
- Every link has visually hidden context, e.g. "Source for {title}".
- Marks and arrows are `aria-hidden`; status is always written in words too.
- Muted text uses mute-strong and meets AA on canvas and sage.

## 8. Do's and don'ts

- **Do** give every figure a source you could defend in an interview.
- **Do** keep module CSS on semantic roles only; no hex values.
- **Don't** add rounded corners, shadows, gradients or icon sets.
- **Don't** use lime for text or large fills; it is for marks only.

## 9. Known gaps

- The M.S. start date is not yet known, so that row shows only its end date (Aug 2025).
- Archivo and JetBrains Mono load from Google Fonts. Offline, the page falls back to system fonts.
