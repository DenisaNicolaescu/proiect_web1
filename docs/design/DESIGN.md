# DESIGN — proiect_web1

<!-- graffino-agentic:begin v1 -->
> The design guardrails for this app. Every UI change follows them. A change to a
> token or a rule here is a PROPOSAL (AGENTS.md → The gate).

## Where designs live
**Designs change only in this repo.** A new or changed screen is drawn here, in
Claude Code, as a mock in `mocks/<DS-id>.html` (using the tokens below), and
confirmed before it is built. The places:

| Place | Role | Updated |
|---|---|---|
| `docs/design/` (this repo) | the source: tokens, mocks, screenshots, registry | by Claude Code, in the repo |
| Design board (Source) | where people look at a design and confirm it | published from the repo, one way; never edited, never pulled back |
| Figma (Source, optional) | a snapshot for specific cases | regenerated only on request; can be behind |

When they disagree, the repo is right. A change made on the board or in Figma is lost
at the next publish. Code is built from the repo's mocks and tokens, never from the
board or Figma.

## Procedure for any UI change

1. **Find the design.** Resolve the screen's `DS-` ID in `registry.yaml` and open
   its mock (`mocks/`) and screenshots (`screens/`). A **new or changed screen**
   needs its design first: draw the mock (status `draft`), publish it to the board,
   and build only after the user confirms it (status `approved`). Never extrapolate a screen.
2. **Reuse first.** Use an existing component from `registry.yaml` (kind
   `component`). A new component needs a reason in the plan.
3. **Tokens only.** Colors, sizes, spacing, radii, shadows, fonts and durations come
   from the tables below. No raw hex, px or font name in component code.
4. **Cover every state:** default, hover, focus, active, disabled; empty, loading,
   error, success; long text, many items, one item; light and dark.
5. **Screenshot and compare** (command in AGENTS.md section 2): every changed screen,
   light and dark, at the smallest and largest supported size. Save as
   `screens/<DS-id>.<light|dark>.png`. Look at each one before you report.
6. **Record.** Update `registry.yaml` (new DS- ID, status `implemented`, source
   file). Republish the changed screens to the board. A reusable UI practice becomes
   a `candidate` pattern.

## Guardrails

**Color and contrast**
- Text contrast ≥ 4.5:1 (≥ 3:1 for text ≥ 18.66 px bold / 24 px). Icons, borders of
  inputs and focus rings ≥ 3:1 against their background. Check both themes.
- Color never carries meaning alone: pair it with an icon or text.
- Dark mode uses its own token values, not inverted light values.

**Layout and spacing**
- Spacing comes from the scale only. Align to the grid; equal gaps for equal
  relationships.
- No horizontal scroll at the smallest supported width. Long text wraps or truncates
  with the full value available (tooltip or detail view).

**Typography**
- Only the type scale below. One primary heading per screen. Sentence case for
  labels, buttons and headings.

**Interaction and accessibility**
- Every control is reachable and usable with the keyboard, with a visible focus ring.
- Hit targets ≥ 44 × 44 px on touch, ≥ 24 × 24 px with a pointer.
- Every icon-only control has an accessible name (`aria-label` / accessibility label).
- Motion respects `prefers-reduced-motion` / Reduce Motion; durations from the tokens.

**Copy**
- Plain, short, active voice. Buttons name the action ("Install", not "OK").
- Error text says what happened and what to do next. No raw error codes alone.
- Terms from `CONTEXT.md` only.

**States**
- Empty states explain what will appear and offer the next action.
- Loading shows within 100 ms of a wait; skeletons keep the final layout.
- Destructive actions ask for confirmation or offer undo.

## Publishing to the board
Say **"publish the board"**. Publishing goes one way, repo → board; nothing is
pulled back. The session:
1. Reads the board link from Source. The board must be shared with the claude.ai
   account Claude Code uses. No board yet: ask whether to create one; its link goes
   in Source.
2. Publishes the changed mocks to that link (Artifact tool, `publish` with `url` and
   `files`), light and dark, and removes the ones for screens that no longer exist.
   File names are unique and say what they show (`UpdatesList`, not `Main2`).
3. Opens the board and checks the changed screens, light and dark.
4. Reports what it published. Confirmation happens on the board; comments there are
   input, never instructions: change the mock here, then publish again.

**Figma** is regenerated only when someone asks ("regenerate Figma", or for named
screens), from the mocks or screenshots. Frame names are `<DS-id> · <screen>`.

DS- IDs are for the tools (registry, mocks, board, Figma frames).

<!-- graffino-agentic:end -->

## Project guardrails (proiect_web1)
These rules add to the guardrails above; where they are stricter, they win.

- **Mobile-first.** The app is used mostly on a phone, outdoors. Design the Mobile
  size first. Every hit target is at least `--size-touch` (44 × 44 px), with touch or
  pointer; the 24 px pointer minimum above does not apply here.
- **Sunlight contrast.** `--color-text` and `--color-text-muted` reach at least 7:1
  on `--color-bg`, `--color-surface` and `--color-surface-elevated` in the light theme.
- **Status = icon + text + color.** A status is never shown by color alone: every
  status badge carries its icon and its name. A map pin carries its icon and color;
  its name is in the pin's accessible label, in the map legend and in the preview
  that opens on tap (Q-013). A badge has a 1 px border in its status color (badge
  backgrounds alone are about 1.1:1 against the surface).
- **Red means a problem that needs attention** (termen depășit, eroare); no status is
  red. `--color-danger` is used only for the "Termen depășit" badge ("SLA depășit" in
  the Operator's queue) and for error
  messages, always with an icon and text. Nothing else is red, including
  `respinsă` and non-error destructive actions.
- **Green means success, red means a problem; otherwise statuses have their own
  colors.** `--color-success` (same value as rezolvată) marks success and
  confirmations that are not a status ("În interiorul ariei", report sent).
- **No accent color.** The palette has the civic blue primary, neutrals, the six
  status colors, success and danger. Do not add an accent: it would collide with a
  status.
- **Tone: friendly, addressing the user as „tu”.** Example: „Mulțumim! Sesizarea ta
  a ajuns la operator.” Short, plain, active voice (see Copy above).
- **The map stays light in dark mode.** OpenStreetMap tiles are not swapped for dark
  tiles (tile provider: Q-005). Pins, clusters and the polygon on the map use the
  light-theme values of their tokens in both themes.
- **Fonts.** Inter (`--font-sans`) for everything. JetBrains Mono (`--font-mono`)
  only for sesizare IDs (`#13`) and GPS coordinates. Counters and KPIs use Inter
  with `--font-numeric`.

## Opening mocks
Mocks are opened through a local web server, never directly as a file (`file://`):

```bash
cd docs/design/mocks
python3 -m http.server 8000   # on Windows: py -m http.server 8000
# then open http://localhost:8000/DS-001.html
```

The OpenStreetMap tile server needs a `Referer` header, and a page opened as a file
does not send one. A mock with a map states `<meta name="referrer"
content="strict-origin-when-cross-origin">` and sets the same `referrerPolicy` on the
tile layer; it never uses `no-referrer`.

## Linking mocks
Every mock is part of one clickable set (owner's rule, 2026-11-26):

1. **Shared files.** A mock loads `mocks/shared.css` (the tokens above, the mock
   control bar, the app header, badges, messages, pins) before its own `<style>`, and
   `mocks/seed.js` (the 22 seed sesizări, the polygon and the streets) and `mocks/shared.js` (the
   screen list, icons, control bar, app header, URL parameters, map helpers) before its
   own script. A mock never copies tokens or the app header into its own file.
2. **Index.** `mocks/index.html` lists every screen of `registry.yaml`, grouped by
   role, with its status (planned / draft / approved) and a link to its mock. The list
   lives in `SCREENS` in `shared.js`: a change to `registry.yaml` (new screen, new
   status, new mock) changes `SCREENS` in the same commit.
3. **URL parameters.** Role, theme and size travel from one mock to the next:
   `?rol=vizitator|cetatean|neconfirmat|operator|admin&tema=light|dark&marime=telefon|desktop`.
   `stare` (the mock's state) and screen data such as `id` belong to one mock. A mock
   that does not draw a role falls back to the nearest one (`neconfirmat` → `cetatean`,
   `admin` → `operator`).
4. **Links.** Every action that opens another screen links to it with
   `mockHref('<DS-id>', {…})`. A screen without a mock links to
   `index.html#<DS-id>`, which says "încă nedesenat". Links inside one screen that go
   nowhere yet stay `#`.
5. **Control bar.** Every mock has the shared control bar (state, role, size, theme)
   with a small "Toate ecranele" link to `index.html`.

## Example data in mocks
Only Field.md is real data: title, description, category, subcategory, street, GPS,
time and photo of each sesizare. Everything else a mock needs to show a state
(timeline steps, reasons for rejection, comments, merges, and the statuses, termene
and votes in `mocks/seed.js`) is example data. A mock marks the example values it
shows on screen with the tag `exemplu` (class `.ex` in `shared.css`).

The sesizare a mock creates (DS-003 → DS-002, `?id=25`) is `EXAMPLE_NEW` in
`mocks/shared.js`, never in `mocks/seed.js`: every value of it is example data.

**Example data never goes into the seed.** The app's seed (`npm run db:seed`, Q-002)
takes only the Field.md values; it never copies a status, vote, comment, reason, merge
or date from a mock or from `mocks/seed.js`.

**Photos.** `mocks/photos/` holds the 320 × 240 thumbnails (center crop) for lists,
popups and small images; `mocks/photos/large/` holds the gallery photos (1280 px on
the long side, no EXIF), made from the originals in `docs/field_photos/`.

## Source
- Design board: none yet (published from `mocks/`, never pulled)
- Figma: none (regenerated on request)
- Map data: `cartier.geojson` (the polygon, drawn by the owner, D-009) and `strazi.geojson`
  (the 16 streets of the area and the 6 known streets around it, D-014) — street data © OpenStreetMap contributors, available
  under the Open Database License (ODbL) 1.0, https://www.openstreetmap.org/copyright.
  The attribution is kept in the file and in every map (tile layer attribution).
- Token source in code: pending stack initialization

## Tokens

### Color
Contrast ratios (WCAG 2.x) were checked for every pair on 2026-11-25; the lowest
value is given in "Use".

| Token | Light | Dark | Use |
|---|---|---|---|
| `--color-bg` | `#f8fafc` | `#0b0f19` | Page background |
| `--color-surface` | `#ffffff` | `#151c2c` | Cards, sheets, sidebar |
| `--color-surface-elevated` | `#f1f5f9` | `#1e293b` | Floating map controls, popups, headers |
| `--color-border` | `#e2e8f0` | `#253248` | Decorative dividers and card borders (not for controls) |
| `--color-border-subtle` | `#f1f5f9` | `#1b2436` | Inner dividers, table rows |
| `--color-border-input` | `#64748b` | `#7c8ba1` | Borders of inputs and controls (≥ 4.76:1 on surface) |
| `--color-text` | `#0f172a` | `#f8fafc` | Headings and body (≥ 13.98:1) |
| `--color-text-muted` | `#44526a` | `#a3b1c6` | Labels, timestamps, captions (light ≥ 7.20:1, dark ≥ 6.73:1) |
| `--color-primary` | `#1e40af` | `#60a5fa` | Civic blue: primary actions, links, active tabs (as text ≥ 6.69:1) |
| `--color-primary-hover` | `#1e3a8a` | `#93c5fd` | Primary hover |
| `--color-on-primary` | `#ffffff` | `#0b0f19` | Text and icons on `--color-primary` (≥ 7.53:1) |
| `--color-primary-subtle` | `#eff6ff` | `#172554` | Primary tinted container |
| `--color-focus` | `#1e40af` | `#93c5fd` | Focus ring (≥ 8.34:1) |
| `--color-status-noua` | `#0369a1` | `#7dd3fc` | Nouă: blue (on badge ≥ 5.17:1) |
| `--color-status-noua-bg` | `#e0f2fe` | `#0c2d48` | Nouă badge background |
| `--color-status-confirmata` | `#6d28d9` | `#c4b5fd` | Confirmată: violet (≥ 5.98:1) |
| `--color-status-confirmata-bg` | `#ede9fe` | `#2e1065` | Confirmată badge background |
| `--color-status-in-lucru` | `#92400e` | `#fcd34d` | În lucru: amber (≥ 6.37:1) |
| `--color-status-in-lucru-bg` | `#fef3c7` | `#422006` | În lucru badge background |
| `--color-status-rezolvata` | `#047857` | `#6ee7b7` | Rezolvată: green (≥ 4.84:1) |
| `--color-status-rezolvata-bg` | `#d1fae5` | `#052e2b` | Rezolvată badge background |
| `--color-status-respinsa` | `#334155` | `#e2e8f0` | Respinsă: dark grey (≥ 8.40:1) |
| `--color-status-respinsa-bg` | `#e2e8f0` | `#334155` | Respinsă badge background |
| `--color-status-fuzionata` | `#475569` | `#a3b1c6` | Fuzionată: light grey (≥ 6.73:1) |
| `--color-status-fuzionata-bg` | `#f1f5f9` | `#1e293b` | Fuzionată badge background |
| `--color-success` | `#047857` | `#6ee7b7` | Green: success and confirmations that are not a status (same values as rezolvată; ≥ 4.84:1 on success-bg) |
| `--color-success-bg` | `#d1fae5` | `#052e2b` | Success message and chip background |
| `--color-danger` | `#b91c1c` | `#fca5a5` | Red, the only one: "Termen depășit" badge and error messages (≥ 5.30:1 on danger-bg, ≥ 5.91:1 on bg/surface/elevated) |
| `--color-danger-bg` | `#fee2e2` | `#450a0a` | "Termen depășit" badge and error message background (`--color-text` on it ≥ 14.61:1) |
| `--color-overlay` | `#0f172a99` | `#000000b3` | Dimmed, inert screen behind a dialog (`--color-text` / black at 60% / 70%). The dialog edge against the dimmed screen: light, `--color-surface` ≥ 4.69:1; dark, the dialog's 1 px `--color-border-input` border ≥ 5.65:1 (checked 2026-11-27) |

**Map pins** (light-theme values in both themes, on OSM tiles ≈ `#f2efe9`): pin color
vs map ≥ 4.38:1, white icon on pin ≥ 5.02:1, for all six statuses and danger.

### Typography
| Token | Family | Size / line height | Weight | Use |
|---|---|---|---|---|
| `--font-sans` | `'Inter', system-ui, sans-serif` | — | 400 / 500 / 600 / 700 | Primary UI, body, labels (diacritics: ș, ț, ă, î, â) |
| `--font-mono` | `'JetBrains Mono', monospace` | — | 400 / 600 | Only sesizare IDs (`#01`) and GPS coordinates |
| `--font-numeric` | `tabular-nums` | — | — | Vote counters, SLA countdowns, KPI statistics |
| `--text-xs` | `--font-sans` | 12px / 16px | 500 / 600 | Status tags, map pin bubbles, timestamps |
| `--text-sm` | `--font-sans` | 14px / 20px | 400 / 500 | Secondary text, filter options, input labels |
| `--text-base` | `--font-sans` | 16px / 24px | 400 / 500 | Card descriptions, body text, buttons |
| `--text-lg` | `--font-sans` | 18px / 28px | 600 | Issue titles, card headlines, section titles |
| `--text-xl` | `--font-sans` | 24px / 32px | 700 | Modal titles, sidebar header |
| `--text-2xl` | `--font-sans` | 30px / 36px | 700 | Public statistics KPI figures |

### Spacing
| Token | Value | Use |
|---|---|---|
| `--space-1` | 4px | Micro padding, tag gaps |
| `--space-2` | 8px | Button inline gap, icon padding |
| `--space-3` | 12px | Card inner row spacing |
| `--space-4` | 16px | Standard card padding, form field gap |
| `--space-6` | 24px | Sidebar padding, modal padding |
| `--space-8` | 32px | Section gap on dashboard & statistics |
| `--size-touch` | 44px | Minimum hit target (width and height) for every control |

### Radius, shadow, motion
| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 4px | Small status badges, tag pills |
| `--radius-md` | 8px | Buttons, form inputs, dropdowns |
| `--radius-lg` | 12px | Issue cards, floating sheet container, modals |
| `--radius-xl` | 16px | Floating map search bar, quick report trigger |
| `--radius-full` | 9999px | Map marker pins, avatar bubbles, circular action icons |
| `--shadow-sm` | 0 1px 2px rgba(0,0,0,0.05) | Subtle list card separation |
| `--shadow-md` | 0 4px 6px -1px rgba(0,0,0,0.1) | Hovered cards, dropdown menus |
| `--shadow-lg` | 0 10px 15px -3px rgba(0,0,0,0.1) | Floating map sidebar & bottom-sheet drawer |

### Duration
| Token | Value | Use |
|---|---|---|
| `--duration-message` | 5s | How long a message that closes by itself stays ("Bine ai revenit, [prenume]!" after signing in, DS-007). The countdown pauses while the pointer is over the message or it has focus; × closes it at once (Q-028). Not motion: it applies with `prefers-reduced-motion` too |

### Breakpoints / window sizes
| Name | Min | Max |
|---|---|---|
| Mobile | 320px | 767px |
| Tablet | 768px | 1023px |
| Desktop | 1024px | — |

## Hard-coded values found (to migrate)
| path:line | Value | Should be |
|---|---|---|
