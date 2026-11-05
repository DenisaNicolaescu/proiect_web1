# Patterns — proiect_web1

<!-- graffino-agentic:begin v1 -->
> How we build things here. Copy only `approved` entries. `candidate` = seen once or
> not yet confirmed; agents add these freely. Promotion needs the user's OK.
<!-- graffino-agentic:end -->

## Index
- PATTERN-001 · Plan-then-build workflow · approved

---

## PATTERN-001 · Plan-then-build workflow
- **Status:** approved
- **Use when:** Implementing any feature, refactor, or multi-line change
- **How:** Create a plan using `/plan` outlining approach, affected files, tests, and risks; obtain user approval before executing `/build`
- **Example:** `AGENTS.md:23`
- **Why:** Prevents regressions and unauthorized architecture drift
- **Source:** docs · confidence high
