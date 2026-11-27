# Decisions · Categories, SLA, duplicates and workflow

> Index and rules: [DECISIONS.md](../DECISIONS.md).

## D-004 · 14 Primăria categories and Romanian statutory working-day SLA engine
- **Status:** approved
- **Date:** 2026-11-25
- **Confirmed:** 2026-11-25
- **Rule:** The system implements all 14 official categories and their subcategories from Primăria Municipiului Sibiu response no. 93006/16.11.2026; Construcții and Diverse are separate categories. SLAs in working days are the project owner's own estimates, derived from the range Primăria gave ("de la 1–3 zile lucrătoare la 6 luni – 1 an"); Primăria did not communicate them and they are not yet validated (Q-007). Default values: Animale pe domeniu public 3 · Salubritate 3 · Utilități 5 · Trafic auto, semne de circulație și parcări 5 · Fumat în spații interzise 5 · Transport în comun 10 · Angajați în serviciul public 10 · Vandalism 15 · Parcuri și spații verzi 15 · Bicicliști 15 · Protecția Mediului 15 · Străzi și iluminat 30 · Construcții 30 · Diverse 30. The SLA is set on the main category and inherited by its subcategories. An Admin can change a category's SLA from the admin panel; an Operator cannot change an SLA or override a computed deadline. Deadlines and overdue status are computed excluding weekends and Romanian statutory non-working holidays (including Orthodox Easter and Pentecost via the Meeus/Jones/Butcher algorithm).
- **Why:** Follows Primăria Sibiu's official taxonomy, keeps SLA calculation objective and testable, and states honestly that the SLA values are estimates.
- **Rejected:** Operator deadline overrides, calendar-day SLAs without holiday awareness, presenting the estimated SLAs as communicated by Primăria.
- **Evidence:** User approval of the D-004 change (2026-11-25); [Interview.md](file:///home/deny/proiect_web1/Interview.md) (Primăria reply, points 1 and 2); [brief.md](file:///home/deny/proiect_web1/docs/brief.md); Q-007.
- **Source:** interview · confidence high

## D-005 · Spatial duplicate detection and reversible merge architecture
- **Status:** approved
- **Date:** 2026-11-25
- **Confirmed:** 2026-11-25
- **Rule:** Duplicate suggestions trigger at <50m and <30 days in the same category during reporting, presenting a suggestion card while allowing explicit submission. Duplicate thresholds are fixed: same main category, under 50 m, within the last 30 calendar days. They are set in the server configuration, not from the user interface; no role, including Admin, can change them from the app. Operators can merge duplicate issues into a primary issue: the merged issue takes status fuzionată with merged_into_id, its pin is hidden from the main map, and comments/photos/followers are aggregated with source badges. Vote records remain untouched, with active votes calculated as COUNT(DISTINCT user_id). Unmerging is fully supported, restoring original vote tallies, comments, followers, and previous status.
- **Why:** Avoids duplicate clutter on the map, prevents vote destruction, and allows non-destructive rollback of accidental operator merges.
- **Rejected:** Destructive vote merging (deleting duplicate vote rows), permanent irreversible merging.
- **Evidence:** User approval of the D-005 change (2026-11-25); User approval of D-005 proposal; [brief.md](file:///home/deny/proiect_web1/docs/brief.md#L16-L28).
- **Source:** interview · confidence high

## D-015 · Status workflow steps, reopening, and emails at a merge
- **Status:** approved
- **Date:** 2026-11-27
- **Confirmed:** 2026-11-27
- **Rule:** Only an Operator or Admin changes a status, one allowed step at a time: nouă → confirmată or respinsă; confirmată → în lucru or respinsă; în lucru → rezolvată or respinsă; rezolvată or respinsă → confirmată (reopening). A reason is required to reject and to reopen, and is shown in the sesizare's timeline; a photo is required to resolve (resized and stripped of EXIF, D-011). A fuzionată sesizare has no steps of its own. At a reopening, the SLA starts again from the date of the reopening. The average resolution time in the public statistics (DS-005) runs from the report to the last resolution. Every status change emails the Cetățeni who follow the sesizare, grouped (one email for up to 10 changes in 5 minutes, DS-014). A merge and an unmerge count as a status change of the secondary sesizare: its followers get "#N a fost unită cu #M" / "#N nu mai e unită cu #M" in the same grouped email; the followers of the primary sesizare get nothing, as its status does not change.
- **Why:** The brief gives only the forward chain; DS-002 already shows nouă → respinsă; a neighbour can say a problem is back, and an operator can close a sesizare by mistake. Restarting the SLA keeps the queue honest after a reopening, and measuring to the last resolution keeps the statistics honest.
- **Rejected:** Respinsă only from în lucru; final closed statuses without reopening; no email at a merge; emailing the primary's followers at a merge; keeping the original SLA after a reopening.
- **Evidence:** Q-023 and Q-024 answers (2026-11-27); user approval of the D-015 proposal with its two additions (2026-11-27); [brief.md](file:///home/deny/proiect_web1/docs/brief.md); `docs/design/mocks/DS-011.html`, `DS-012.html`.
- **Source:** interview · confidence high
