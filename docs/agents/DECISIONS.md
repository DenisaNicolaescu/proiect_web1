# Decisions — proiect_web1

<!-- graffino-agentic:begin v1 -->
> Constraints the code must obey. Status: `approved` (obey) · `proposed` (do not
> build on it) · `superseded-by <ID>` (kept to explain old code).
> Adding or changing an entry needs the user's OK (AGENTS.md → The gate).
<!-- graffino-agentic:end -->

## Index
### [Accounts and roles](decisions/accounts-and-roles.md)
- D-006 · Mandatory authentication with public anonymity and anti-spam rate limiting
- D-012 · Account roles are hierarchical, and only a Cetățean votes and follows
- D-017 · Email confirmation is mandatory, and an unconfirmed account can change its address

### [Data and seed](decisions/data-and-seed.md)
- D-009 · Neighbourhood area is the owner-drawn polygon, without buffer
- D-010 · The .heic originals stay out of the public repo
- D-011 · The seed uses the same image pipeline as an upload

### [Reporting](decisions/reporting.md)
- D-014 · The street is a text field with suggestions, checked against the area's streets

### [Stack and tooling](decisions/stack-and-tooling.md)
- D-001 · Primary git branch is main
- D-002 · Full-stack technology stack (Node.js, React, PostgreSQL/PostGIS)

### [Statistics and security](decisions/statistics-and-security.md)
- D-016 · Public statistics definitions and account security values

### [Triage and workflow](decisions/triage-and-workflow.md)
- D-004 · 14 Primăria categories and Romanian statutory working-day SLA engine
- D-005 · Spatial duplicate detection and reversible merge architecture
- D-015 · Status workflow steps, reopening, and emails at a merge

