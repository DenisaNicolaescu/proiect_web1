# Open questions — proiect_web1

<!-- graffino-agentic:begin v1 -->
> Unknowns. Work that depends on an open question is out of scope until it is
> answered. Only the user answers; an agent never answers by guessing. An agent may
> write a `Proposed answer` the evidence supports; the question stays
> `investigating` until the user confirms it.
> Answered entries stay, with the answer and date, and usually become a D- or PATTERN-.
<!-- graffino-agentic:end -->

## Index
- Q-001 · What technology stack and web frameworks are required for this project? · _answered_
- Q-002 · How should seed data from Field.md and docs/field_photos be ingested? · _answered_
- Q-003 · What email transport should be used for status notifications in dev vs prod? · _answered_
- Q-004 · Should citizen comments support image attachments or remain text-only?
- Q-005 · Which map tile provider should be used for Leaflet to ensure quota-free evaluation? · _answered_
- Q-006 · How do we take screenshots of the app for the design check?
- Q-007 · Are the per-category SLA values validated by Primăria Sibiu or the neighbourhood association?
- Q-008 · Is email confirmation required at registration? · _answered_
- Q-009 · Can an Admin do everything an Operator does, or are the roles separate? · _answered_
- Q-010 · What does each role see differently on DS-001 (Map & List)? · _answered_
- Q-011 · Which intervals does the age filter ("vârstă") on DS-001 offer? · _answered_
- Q-012 · Which statuses does DS-001 show by default, and in what order is the list? · _answered_
- Q-013 · How does a map pin carry its status name, as DESIGN.md requires? · _answered_
- Q-014 · The neighbourhood polygon leaves 4 field reports outside: change the polygon or D-003? · _answered_
- Q-015 · In what order is the list on DS-001? · _answered_

---

## Q-001 · What technology stack and web frameworks are required for this project?
- **Status:** answered
- **Blocks:** project scaffolding, dependencies, and build configuration
- **Who answers:** project owner
- **Proposed answer:** Node.js / TypeScript or standard HTML/CSS/JavaScript with a lightweight backend
- **Answer:** Node.js with TypeScript for the backend server, React with TypeScript (Vite) + Leaflet.js for the client, PostgreSQL with PostGIS for geospatial persistence, and sharp + exifr + heic-convert for the server-side image pipeline.
- **Date:** 2026-11-19
- **Recorded as:** D-002

## Q-002 · How should seed data from Field.md and docs/field_photos be ingested?
- **Status:** answered
- **Blocks:** database seeding and initial presentation of 20+ issues
- **Who answers:** project owner / brief
- **Proposed answer:** Automated database seed script
- **Answer:** An automated seed script (`npm run db:seed`) parses `Field.md`, converts the 24 `.heic` photos in `docs/field_photos/` to optimized web formats (JPEG/WebP) via `heic-convert` and `sharp` while stripping EXIF, and inserts the issues with their exact GPS coordinates into PostgreSQL/PostGIS along with default users and the 14 categories.
- **Date:** 2026-11-19
- **Note (2026-11-26):** The seed contains only the 22 field reports inside aria cartierului (D-009). #06 and #24 stay in Field.md, marked as excluded, and are not seeded.

## Q-003 · What email transport should be used for status notifications in dev vs prod?
- **Status:** answered
- **Blocks:** notification service implementation
- **Who answers:** project owner
- **Proposed answer:** Local preview/log for dev, SMTP for prod
- **Answer:** Local development uses an emulated transport (Mailpit / in-memory DB notification log / Nodemailer stream) to inspect the 5-minute / 10-change batching job without external dependencies; production uses standard SMTP configured via `.env`.
- **Date:** 2026-11-19

## Q-004 · Should citizen comments support image attachments or remain text-only?
- **Status:** open
- **Blocks:** comment data model & UI
- **Who answers:** project owner / UI design
- **Proposed answer:** Text-only to prevent unmoderated media spam and storage abuse; citizen photos are uploaded at report creation, while resolution evidence photos are uploaded exclusively by operators.

## Q-005 · Which map tile provider should be used for Leaflet to ensure quota-free evaluation?
- **Status:** answered
- **Blocks:** client map layer configuration
- **Who answers:** project owner
- **Proposed answer:** Standard OpenStreetMap tile server (`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`) with standard attribution, avoiding external API key requirements during academic demo evaluation.
- **Answer:** OpenStreetMap tiles, with the attribution visible on the map. The mock uses the current URL without subdomains, `https://tile.openstreetmap.org/{z}/{x}/{y}.png`, and "© OpenStreetMap contributors".
- **Date:** 2026-11-25

## Q-006 · How do we take screenshots of the app for the design check?
- **Status:** open
- **Blocks:** the screenshot step of `/build` and DESIGN.md (AGENTS.md section 2 has no command)
- **Who answers:** project owner, once the client is scaffolded
- **Proposed answer:** A Playwright script against the Vite dev server, light and dark, saved to `docs/design/screens/<DS-id>.<light|dark>.png`. Not confirmed; no client exists yet.

## Q-007 · Are the per-category SLA values validated by Primăria Sibiu or the neighbourhood association?
- **Status:** open
- **Blocks:** final SLA values in the seed and the claim of validated SLAs (the brief's "ideal, validate de cineva de la primărie / asociație"); the SLA engine itself is not blocked
- **Who answers:** project owner, after contacting Primăria Sibiu or the asociația de proprietari
- **Context:** The SLA values (3 to 30 working days) are the project owner's own estimates, derived from Primăria's reply no. 93006/16.11.2026, which gives only a range ("de la 1–3 zile lucrătoare la 6 luni – 1 an"). Primăria did not provide per-category deadlines.

## Q-008 · Is email confirmation required at registration?
- **Status:** answered
- **Blocks:** registration flow (DS-007), account model
- **Who answers:** project owner
- **Answer:** Yes. Email confirmation is mandatory at registration (anti-spam, one vote per person). It is a state of DS-007, not a separate screen.
- **Date:** 2026-11-25
- **Recorded as:** D-007

## Q-009 · Can an Admin do everything an Operator does, or are the roles separate?
- **Status:** answered
- **Blocks:** role checks on the server, which screens each role sees (DS-004, DS-011, DS-012)
- **Who answers:** project owner
- **Answer:** Roles are hierarchical: an Admin can do everything an Operator does.
- **Date:** 2026-11-25
- **Recorded as:** D-008

## Q-010 · What does each role see differently on DS-001 (Map & List)?
- **Status:** answered
- **Blocks:** approval of the DS-001 mock (role variants)
- **Who answers:** project owner
- **Proposed answer:** Map, list, filters and export are the same for every role. Vizitator: the report action reads "Intră în cont ca să raportezi" and opens DS-007 (D-006: reporting needs an account). Cetățean: "Raportează o problemă" (DS-003) and "Sesizările mele" (DS-009). Operator: everything a Cetățean sees (D-008) plus "Triere" (DS-004). On a phone, Statistici, Sesizările mele and the account sit in one menu; "Triere" stays in the bar. Drawn this way in `docs/design/mocks/DS-001.html`.
- **Answer:** Map, list, filters and export are the same for every role. Vizitator: the report action reads "Intră în cont ca să raportezi" and opens DS-007 (D-006: reporting needs an account). Cetățean: "Raportează o problemă" (DS-003) and "Sesizările mele" (DS-009). Operator: everything a Cetățean sees (D-008) plus "Triere" (DS-004). On a phone, Statistici, Sesizările mele and the account sit in one menu; "Triere" stays in the bar. Drawn this way in `docs/design/mocks/DS-001.html`. Confirmed with the approved DS-001 mock.
- **Date:** 2026-11-26

## Q-011 · Which intervals does the age filter ("vârstă") on DS-001 offer?
- **Status:** answered
- **Blocks:** the age filter on DS-001 and its server query
- **Who answers:** project owner
- **Proposed answer:** Oricând (default), Ultimele 7 zile, Ultimele 30 de zile, Mai vechi de 30 de zile, counted in calendar days from the report date. The brief only says "filtre pe … vârstă".
- **Answer:** The filter is labelled "Raportată", with the options Oricând, Ultimele 7 zile, Ultimele 30 de zile, Ultimele 3 luni, Mai vechi de 3 luni.
- **Date:** 2026-11-25

## Q-012 · Which statuses does DS-001 show by default, and in what order is the list?
- **Status:** answered
- **Blocks:** default filters and list order on DS-001
- **Who answers:** project owner
- **Proposed answer:** All five statuses are on by default (nouă, confirmată, în lucru, rezolvată, respinsă); fuzionată is not a filter option because merged pins are hidden from the map (D-005). The list is ordered newest first.
- **Answer:** No status filter is selected by default, and then every status is shown. A status filter that is not selected has a neutral outline; a selected one is colored and carries a check. The list order is not answered here: see Q-015.
- **Date:** 2026-11-25

## Q-013 · How does a map pin carry its status name, as DESIGN.md requires?
- **Status:** answered
- **Blocks:** the pin design on DS-001 and DS-002
- **Who answers:** project owner
- **Context:** DESIGN.md (project guardrails) says every status badge and pin carries its icon and its name. A visible name on every pin would cover the map at neighbourhood zoom.
- **Proposed answer:** The pin shows the status icon and color; the name is in the pin's accessible label, in the always-reachable map legend, and in the preview that opens on tap. An overdue pin adds a red "!" mark, explained in the legend as "Termen depășit".
- **Answer:** The pin shows the status icon and color; the name is in the pin's accessible label, in the always-reachable map legend, and in the preview that opens on tap. An overdue pin adds a red "!" mark, explained in the legend as "Termen depășit". Confirmed with the approved DS-001 mock.
- **Date:** 2026-11-26

## Q-014 · The neighbourhood polygon leaves 4 field reports outside: change the polygon or D-003?
- **Status:** answered
- **Blocks:** the seed of the 24 field reports (Q-002) and the polygon check of D-003, in the client and on the server
- **Who answers:** project owner
- **Context:** The polygon in `docs/design/cartier.geojson` (drawn by the project owner on geojson.io, 2026-11-25) leaves sesizările #14 (31 m), #15 (44 m), #16 (58 m) and #17 (21 m) from Field.md outside it, on Strada Picasso and Strada Klagenfurt. D-003 asks for a polygon around the surveyed streets with a 50–100 m buffer and blocks every pin outside it, so the app would reject these four. Several reports inside are also closer than 50 m to the edge (#06 at 0.9 m, #24 at 7.3 m, #07 at 5.3 m, #10 at 8.7 m).
- **Proposed answer:** Extend the polygon to enclose Strada Picasso and Strada Klagenfurt with at least 50 m beyond the outermost report, as D-003 states.
- **Answer:** Neither: the owner redrew the polygon (it now contains #14–#17) and dropped the buffer. Aria cartierului is exactly the polygon in `docs/design/cartier.geojson`. #06 (0.1 m) and #24 (7.0 m) fall outside it: they stay in Field.md, marked as excluded, and are not seeded; 22 field reports remain.
- **Date:** 2026-11-26
- **Recorded as:** D-009

## Q-015 · In what order is the list on DS-001?
- **Status:** answered
- **Blocks:** list order on DS-001 and its server query
- **Who answers:** project owner
- **Proposed answer:** Newest first, by report date. Split from Q-012, whose other half was answered.
- **Answer:** Newest first, by report date. Confirmed with the approved DS-001 mock.
- **Date:** 2026-11-26
