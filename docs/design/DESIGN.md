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
pulled back.

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
| `--color-bg` | `#ffffff` | `#0f172a` | Main page background |
| `--color-surface` | `#f8fafc` | `#1e293b` | Card / surface background |
| `--color-border` | `#e2e8f0` | `#334155` | Borders and dividers |
| `--color-text` | `#0f172a` | `#f8fafc` | Primary text |
| `--color-text-muted` | `#64748b` | `#94a3b8` | Secondary / muted text |
| `--color-primary` | `#2563eb` | `#3b82f6` | Brand and primary actions |

### Typography
| Token | Family | Size / line height | Weight | Use |
|---|---|---|---|---|
| `--font-sans` | system-ui, sans-serif | — | 400 / 600 | Body and UI elements |
| `--text-sm` | `--font-sans` | 14px / 20px | 400 | Secondary text, captions |
| `--text-base` | `--font-sans` | 16px / 24px | 400 | Standard body text |
| `--text-lg` | `--font-sans` | 18px / 28px | 600 | Section headers |
| `--text-xl` | `--font-sans` | 24px / 32px | 700 | Page titles |

### Spacing
| Token | Value |
|---|---|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-6` | 24px |
| `--space-8` | 32px |

### Radius, shadow, motion
| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 4px | Badges, small tags |
| `--radius-md` | 8px | Buttons, inputs |
| `--radius-lg` | 12px | Cards, modal panels |
| `--shadow-sm` | 0 1px 2px rgba(0,0,0,0.05) | Subtle element elevation |
| `--shadow-md` | 0 4px 6px -1px rgba(0,0,0,0.1) | Cards, dropdown menus |

### Breakpoints / window sizes
| Name | Min | Max |
|---|---|---|
| Mobile | 320px | 767px |
| Tablet | 768px | 1023px |
| Desktop | 1024px | — |

## Hard-coded values found (to migrate)
| path:line | Value | Should be |
|---|---|---|
