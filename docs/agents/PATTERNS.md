# Patterns — proiect_web1

<!-- graffino-agentic:begin v1 -->
> How we build things here. Copy only `approved` entries. `candidate` = seen once or
> not yet confirmed; agents add these freely. Promotion needs the user's OK.
<!-- graffino-agentic:end -->

## Index
- PATTERN-001 · Plan-then-build workflow · approved
- PATTERN-002 · Mocks share shared.css, shared.js and seed.js and are linked by URL · approved
- PATTERN-003 · A dialog mock opens over its origin screen and goes back to it · approved

---

## PATTERN-001 · Plan-then-build workflow
- **Status:** approved
- **Use when:** Implementing any feature, refactor, or multi-line change
- **How:** Create a plan using `/plan` outlining approach, affected files, tests, and risks; obtain user approval before executing `/build`
- **Example:** `AGENTS.md:23`
- **Why:** Prevents regressions and unauthorized architecture drift
- **Source:** docs · confidence high

## PATTERN-002 · Mocks share shared.css, shared.js and seed.js and are linked by URL
- **Status:** approved
- **Confirmed:** 2026-11-26
- **Use when:** Drawing or changing any mock in `docs/design/mocks/`
- **How:** Load `shared.css` before the mock's own `<style>`, and `seed.js` then `shared.js` before its script. Take the state from `mockState()`, render the bar with `mockBar()` and the header with `appbar()`, and link every other screen with `mockHref('<DS-id>', {…})`, which carries `rol`, `tema` and `marime`. A screen without a mock links to `index.html#<DS-id>`. Add the screen to `SCREENS` in `shared.js` with its registry status.
- **Example:** `docs/design/mocks/DS-002.html`, `docs/design/mocks/DS-001.html`
- **Why:** Every mock looks the same and keeps the reviewer's role, theme and size from one screen to the next (owner's request, 2026-11-26).
- **Source:** interview · confidence medium

## PATTERN-003 · A dialog mock opens over its origin screen and goes back to it
- **Status:** approved
- **Confirmed:** 2026-11-27
- **Use when:** Drawing a dialog in `docs/design/mocks/` that more than one screen opens
- **How:** The link that opens the dialog passes `din=<DS-id>` (and the screen's data, e.g. `id`) through `mockHref`. The dialog reads it with `dialogOrigin()`, draws the origin behind itself with `dialogBackdrop()` (dimmed with `--color-overlay`, `inert`, `aria-hidden`), and every way out ("Renunță", "×", the button after success) links back to the origin with `mockHref`. Phone: the dialog covers the screen; desktop: centred. Styles `.dialog`, `.choice` in `shared.css`.
- **Example:** `docs/design/mocks/DS-011.html`, `docs/design/mocks/DS-012.html`
- **Why:** The owner asked that after every dialog the reviewer goes back where they were (2026-11-27); one helper keeps DS-011 and DS-012 the same.
- **Source:** interview · confidence medium

