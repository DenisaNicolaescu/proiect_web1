# Decisions — proiect_web1

<!-- graffino-agentic:begin v1 -->
> Constraints the code must obey. Status: `approved` (obey) · `proposed` (do not
> build on it) · `superseded-by <ID>` (kept to explain old code).
> Adding or changing an entry needs the user's OK (AGENTS.md → The gate).
<!-- graffino-agentic:end -->

## Index
- D-001 · Primary git branch is main
- D-002 · Full-stack technology stack (Node.js, React, PostgreSQL/PostGIS)
- D-004 · 14 Primăria categories and Romanian statutory working-day SLA engine
- D-005 · Spatial duplicate detection and reversible merge architecture
- D-006 · Mandatory authentication with public anonymity and anti-spam rate limiting
- D-007 · Email confirmation is mandatory at registration
- D-008 · Account roles are hierarchical
- D-009 · Neighbourhood area is the owner-drawn polygon, without buffer

---

## D-001 · Primary git branch is main
- **Status:** approved
- **Date:** 2026-11-05
- **Rule:** The primary development branch is `main`. All features and fixes integrate into `main`.
- **Why:** Standard repository convention for GitHub projects and coursework submissions.
- **Rejected:** Using master or develop without release branching.
- **Evidence:** `git branch --show-current`
- **Source:** git · confidence high

## D-002 · Full-stack technology stack (Node.js, React, PostgreSQL/PostGIS)
- **Status:** approved
- **Date:** 2026-11-19
- **Confirmed:** 2026-11-19
- **Rule:** The system is built with Node.js and TypeScript (Express or Fastify) for the server, React with TypeScript (Vite) and Leaflet.js with OpenStreetMap for the client, PostgreSQL with PostGIS (geography type, GIST spatial index) for persistence, and sharp + exifr + heic-convert for server-side image processing.
- **Why:** Delivers fast geospatial queries (ST_DWithin, ST_Contains) at scale, robust EXIF metadata stripping, responsive map clustering, and typed contracts between client and server.
- **Rejected:** SQLite without spatial extensions, client-side only mock data, native mobile apps.
- **Evidence:** User approval of D-002 proposal; [brief.md](file:///home/deny/proiect_web1/docs/brief.md#L22); [Interview.md](file:///home/deny/proiect_web1/Interview.md).
- **Source:** interview · confidence high

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

## D-006 · Mandatory authentication with public anonymity and anti-spam rate limiting
- **Status:** approved
- **Date:** 2026-11-19
- **Confirmed:** 2026-11-19
- **Rule:** All mutating actions (reporting, voting, commenting, following) require an authenticated user account (user_id). Citizens can opt to submit a report anonymously ("Raportează anonim"), which conceals their identity from public views and exports (rendered as "Cetățean anonim") while retaining accountability in the database. Rate limits are strictly enforced: max 5 reports, 30 votes, 10 comments per 10 minutes per user/IP, with hidden honeypot fields on forms.
- **Why:** Protects neighbor privacy (Neighbor #2 V.D.), enforces "one vote per user", and prevents automated spam and vandalism without requiring intrusive CAPTCHAs.
- **Rejected:** Unauthenticated guest submissions, completely untracked anonymous database records, third-party CAPTCHA challenges.
- **Evidence:** User approval of D-006 proposal; [Interview.md](file:///home/deny/proiect_web1/Interview.md#L15-L18); [brief.md](file:///home/deny/proiect_web1/docs/brief.md#L12-L24).
- **Source:** interview · confidence high

## D-007 · Email confirmation is mandatory at registration
- **Status:** approved
- **Date:** 2026-11-25
- **Confirmed:** 2026-11-25
- **Rule:** A new account must confirm its email address through the link sent at registration. Until it is confirmed, the account can sign in but cannot report, vote, comment or follow. One email address can hold only one account. Confirmation is a state of DS-007 ("Verifică-ți emailul", resend link, expired link), not a separate screen. Extends D-006.
- **Why:** Anti-spam and "one vote per person": without confirmation, one person could open several accounts and vote several times.
- **Rejected:** Registration without email confirmation; a separate confirmation screen.
- **Evidence:** Q-008 answer; user approval of the D-007 proposal (2026-11-25).
- **Source:** interview · confidence high

## D-008 · Account roles are hierarchical
- **Status:** approved
- **Date:** 2026-11-25
- **Confirmed:** 2026-11-25
- **Rule:** Account roles are hierarchical: Cetățean < Operator < Admin. Each role can do everything the role below it can. An Operator can do everything a Cetățean does, plus change status, merge and unmerge sesizări. An Admin can do everything an Operator does, plus manage categories, SLAs, users and roles. An account has exactly one role. The Vizitator (unauthenticated) is not an account role.
- **Why:** One permission level per account is simple to check on the server, and an Admin can triage when no Operator is available.
- **Rejected:** Separate, non-overlapping roles.
- **Evidence:** Q-009 answer; user approval of the D-008 proposal (2026-11-25).
- **Source:** interview · confidence high

## D-009 · Neighbourhood area is the owner-drawn polygon, without buffer
- **Status:** approved
- **Date:** 2026-11-26
- **Confirmed:** 2026-11-26
- **Rule:** Aria cartierului is exactly the polygon in `docs/design/cartier.geojson` (drawn by the project owner on geojson.io), with no buffer. That file is the only source of the polygon for the client, the server and the seed. A sesizare outside it cannot be reported: the pin is blocked on client and server with the message "Locația selectată este în afara ariei Cartierului Tineretului". The polygon is outlined on the map. Field reports outside it stay in Field.md, marked "în afara ariei proiectului – exclusă din seed" with their distance to the polygon, and are not seeded. Supersedes D-003.
- **Why:** The owner drew the real neighbourhood boundary; one exact polygon is simple to check and the same everywhere. It keeps 22 of the 24 field reports, above the brief's minimum of 20.
- **Rejected:** A 50–100 m buffer around the surveyed streets (D-003); deleting the excluded reports from Field.md.
- **Evidence:** User approval of the D-009 proposal (2026-11-26); Q-014; `docs/design/cartier.geojson`; [Field.md](file:///home/deny/proiect_web1/Field.md) (#06 0.1 m and #24 7.0 m outside).
- **Source:** interview · confidence high
