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

## Source
- Design board: none yet (published from `mocks/`, never pulled)
- Figma: none (regenerated on request)
- Token source in code: pending stack initialization

## Tokens

### Color
| Token | Light | Dark | Use |
|---|---|---|---|
| `--color-bg` | `#f8fafc` | `#0b0f19` | Main page & map canvas background |
| `--color-surface` | `#ffffff` | `#151c2c` | Card & sidebar sheet surface |
| `--color-surface-elevated` | `#f1f5f9` | `#1e293b` | Floating map controls, popups, headers |
| `--color-border` | `#e2e8f0` | `#253248` | Card borders, dividers |
| `--color-border-subtle` | `#f1f5f9` | `#1b2436` | Subtle inner dividers, table rows |
| `--color-text` | `#0f172a` | `#f8fafc` | Primary text headings and body |
| `--color-text-muted` | `#64748b` | `#94a3b8` | Secondary labels, timestamps, captions |
| `--color-primary` | `#1e40af` | `#3b82f6` | Sibiu Civic Blue — Primary actions, active tabs |
| `--color-primary-hover` | `#1d4ed8` | `#60a5fa` | Primary hover state |
| `--color-primary-subtle` | `#eff6ff` | `#1e293b` | Primary tinted container background |
| `--color-accent` | `#d97706` | `#fbbf24` | Sibiu Gold/Amber — Highlights, stars, badges |
| `--color-accent-subtle` | `#fef3c7` | `#451a03` | Amber badge background |
| `--color-status-noua` | `#0284c7` | `#38bdf8` | Sky Blue — Sesizare nouă / primită |
| `--color-status-noua-bg` | `#f0f9ff` | `#082f49` | Nouă badge background |
| `--color-status-confirmata` | `#4f46e5` | `#818cf8` | Royal Indigo — Sesizare confirmată |
| `--color-status-confirmata-bg` | `#eef2ff` | `#1e1b4b` | Confirmată badge background |
| `--color-status-in-lucru` | `#d97706` | `#fbbf24` | Warning Amber — Sesizare în lucru |
| `--color-status-in-lucru-bg` | `#fffbeb` | `#451a03` | În lucru badge background |
| `--color-status-rezolvata` | `#059669` | `#34d399` | Success Emerald — Sesizare rezolvată |
| `--color-status-rezolvata-bg` | `#ecfdf5` | `#064e3b` | Rezolvată badge background |
| `--color-status-respinsa` | `#dc2626` | `#f87171` | Destructive Crimson — Sesizare respinsă |
| `--color-status-respinsa-bg` | `#fef2f2` | `#450a0a` | Respinsă badge background |
| `--color-status-fuzionata` | `#64748b` | `#94a3b8` | Neutral Slate — Sesizare fuzionată (duplicat) |
| `--color-status-fuzionata-bg` | `#f1f5f9` | `#1e293b` | Fuzionată badge background |
| `--color-sla-overdue` | `#be123c` | `#fb7185` | High-alert Crimson — SLA depășit alert ring |
| `--color-sla-overdue-bg` | `#fff1f2` | `#4c0519` | SLA depășit badge background |

### Typography
| Token | Family | Size / line height | Weight | Use |
|---|---|---|---|---|
| `--font-sans` | `'Inter', system-ui, sans-serif` | — | 400 / 500 / 600 / 700 | Primary UI, body, labels (diacritics: ș, ț, ă, î, â) |
| `--font-mono` | `'JetBrains Mono', monospace` | — | 400 / 600 | GPS coordinates, issue IDs (`#01`) |
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

### Breakpoints / window sizes
| Name | Min | Max |
|---|---|---|
| Mobile | 320px | 767px |
| Tablet | 768px | 1023px |
| Desktop | 1024px | — |

## Hard-coded values found (to migrate)
| path:line | Value | Should be |
|---|---|---|
