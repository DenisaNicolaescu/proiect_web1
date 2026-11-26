# Decisions superseded — proiect_web1

<!-- graffino-agentic:begin v1 -->
> Decisions that no longer apply. **Never obeyed**; read only to explain old code or a
> past choice. Each points to the entry that replaced it. `ledger-lint.py --fix`
> keeps this file in sync: superseded entries move here from `DECISIONS.md`, and
> their index lines move here from its index.
<!-- graffino-agentic:end -->

## Index
- D-003 · Cartierul Tineretului polygon boundary enforcement · _superseded-by D-009_
- D-008 · Account roles are hierarchical · _superseded-by D-012_

---

## D-003 · Cartierul Tineretului polygon boundary enforcement
- **Status:** superseded-by D-009
- **Date:** 2026-11-19
- **Rule:** The platform scope is strictly bounded to Cartierul Tineretului via a closed polygon enclosing the surveyed streets from Field.md with a 50-100m buffer. Pins outside this boundary are strictly blocked on both client and server with the error message "Locația selectată este în afara ariei Cartierului Tineretului". The polygon is visibly outlined on the map.
- **Why:** Prevents off-target submissions and keeps the platform scoped to the neighborhood association.
- **Rejected:** Soft warnings without blocking, unbound city-wide reporting, automatic silent rejection.
- **Evidence:** User approval of D-003 proposal; [Field.md](file:///home/deny/proiect_web1/Field.md); [brief.md](file:///home/deny/proiect_web1/docs/brief.md#L9).
- **Source:** interview · confidence high

## D-008 · Account roles are hierarchical
- **Status:** superseded-by D-012
- **Date:** 2026-11-25
- **Rule:** Account roles are hierarchical: Cetățean < Operator < Admin. Each role can do everything the role below it can. An Operator can do everything a Cetățean does, plus change status, merge and unmerge sesizări. An Admin can do everything an Operator does, plus manage categories, SLAs, users and roles. An account has exactly one role. The Vizitator (unauthenticated) is not an account role.
- **Why:** One permission level per account is simple to check on the server, and an Admin can triage when no Operator is available.
- **Rejected:** Separate, non-overlapping roles.
- **Evidence:** Q-009 answer; user approval of the D-008 proposal (2026-11-25).
- **Source:** interview · confidence high
