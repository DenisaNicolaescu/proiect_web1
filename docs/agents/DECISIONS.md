# Decisions — proiect_web1

<!-- graffino-agentic:begin v1 -->
> Constraints the code must obey. Status: `approved` (obey) · `proposed` (do not
> build on it) · `superseded-by <ID>` (kept to explain old code).
> Adding or changing an entry needs the user's OK (AGENTS.md → The gate).
<!-- graffino-agentic:end -->

## Index
- D-001 · Primary git branch is main

---

## D-001 · Primary git branch is main
- **Status:** approved
- **Date:** 2026-11-05
- **Rule:** The primary development branch is `main`. All features and fixes integrate into `main`.
- **Why:** Standard repository convention for GitHub projects and coursework submissions.
- **Rejected:** Using master or develop without release branching.
- **Evidence:** `git branch --show-current`
- **Source:** git · confidence high
