# Decisions — proiect_web1

<!-- graffino-agentic:begin v1 -->
> Constraints the code must obey. Status: `approved` (obey) · `proposed` (do not
> build on it) · `superseded-by <ID>` (kept to explain old code).
> Adding or changing an entry needs the user's OK (AGENTS.md → The gate).
<!-- graffino-agentic:end -->

## Index
- D-001 · Primary git branch is main
- D-002 · Full-stack technology stack (Node.js, React, PostgreSQL/PostGIS)
- D-003 · Cartierul Tineretului polygon boundary enforcement
- D-004 · 12 Primăria categories and Romanian statutory working-day SLA engine
- D-005 · Spatial duplicate detection and reversible merge architecture
- D-006 · Mandatory authentication with public anonymity and anti-spam rate limiting

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

## D-003 · Cartierul Tineretului polygon boundary enforcement
- **Status:** approved
- **Date:** 2026-11-19
- **Confirmed:** 2026-11-19
- **Rule:** The platform scope is strictly bounded to Cartierul Tineretului via a closed polygon enclosing the surveyed streets from Field.md with a 50-100m buffer. Pins outside this boundary are strictly blocked on both client and server with the error message "Locația selectată este în afara ariei Cartierului Tineretului". The polygon is visibly outlined on the map.
- **Why:** Prevents off-target submissions and keeps the platform scoped to the neighborhood association.
- **Rejected:** Soft warnings without blocking, unbound city-wide reporting, automatic silent rejection.
- **Evidence:** User approval of D-003 proposal; [Field.md](file:///home/deny/proiect_web1/Field.md); [brief.md](file:///home/deny/proiect_web1/docs/brief.md#L9).
- **Source:** interview · confidence high

## D-004 · 12 Primăria categories and Romanian statutory working-day SLA engine
- **Status:** approved
- **Date:** 2026-11-19
- **Confirmed:** 2026-11-19
- **Rule:** The system implements all 12 official categories and their subcategories from Primăria Municipiului Sibiu response no. 93006/16.11.2026. SLAs in working days (ranging from 3 to 30 days) are configured at the main category level and inherited by subcategories. Overdue status is computed algorithmically accounting for Romanian statutory non-working holidays (including Orthodox Easter and Pentecost via Meeus/Jones/Butcher algorithm). Operators cannot manually override the computed SLA deadline.
- **Why:** Complies with Primăria Sibiu official taxonomy while guaranteeing objective, testable SLA calculation and overdue indicators.
- **Rejected:** Arbitrary manual operator deadline overrides, calendar-day SLAs without holiday awareness.
- **Evidence:** User approval of D-004 proposal; [Interview.md](file:///home/deny/proiect_web1/Interview.md#L68-L140); [brief.md](file:///home/deny/proiect_web1/docs/brief.md#L28).
- **Source:** interview · confidence high

## D-005 · Spatial duplicate detection and reversible merge architecture
- **Status:** approved
- **Date:** 2026-11-19
- **Confirmed:** 2026-11-19
- **Rule:** Duplicate suggestions trigger at <50m and <30 days in the same category during reporting, presenting a suggestion card while allowing explicit submission. Operators can merge duplicate issues into a primary issue: the merged issue takes status fuzionată with merged_into_id, its pin is hidden from the main map, and comments/photos/followers are aggregated with source badges. Vote records remain untouched, with active votes calculated as COUNT(DISTINCT user_id). Unmerging is fully supported, restoring original vote tallies, comments, followers, and previous status.
- **Why:** Avoids duplicate clutter on the map, prevents vote destruction, and allows non-destructive rollback of accidental operator merges.
- **Rejected:** Destructive vote merging (deleting duplicate vote rows), permanent irreversible merging.
- **Evidence:** User approval of D-005 proposal; [brief.md](file:///home/deny/proiect_web1/docs/brief.md#L16-L28).
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
