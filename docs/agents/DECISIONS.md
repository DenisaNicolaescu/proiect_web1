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
- D-009 · Neighbourhood area is the owner-drawn polygon, without buffer
- D-010 · The .heic originals stay out of the public repo
- D-011 · The seed uses the same image pipeline as an upload
- D-012 · Account roles are hierarchical, and only a Cetățean votes and follows
- D-014 · The street is a text field with suggestions, checked against the area's streets
- D-015 · Status workflow steps, reopening, and emails at a merge

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

## D-009 · Neighbourhood area is the owner-drawn polygon, without buffer
- **Status:** approved
- **Date:** 2026-11-26
- **Confirmed:** 2026-11-26
- **Rule:** Aria cartierului is exactly the polygon in `docs/design/cartier.geojson` (drawn by the project owner on geojson.io), with no buffer. That file is the only source of the polygon for the client, the server and the seed. A sesizare outside it cannot be reported: the pin is blocked on client and server with the message "Locația selectată este în afara ariei Cartierului Tineretului". The polygon is outlined on the map. Field reports outside it stay in Field.md, marked "în afara ariei proiectului – exclusă din seed" with their distance to the polygon, and are not seeded. Supersedes D-003.
- **Why:** The owner drew the real neighbourhood boundary; one exact polygon is simple to check and the same everywhere. It keeps 22 of the 24 field reports, above the brief's minimum of 20.
- **Rejected:** A 50–100 m buffer around the surveyed streets (D-003); deleting the excluded reports from Field.md.
- **Evidence:** User approval of the D-009 proposal (2026-11-26); Q-014; `docs/design/cartier.geojson`; [Field.md](file:///home/deny/proiect_web1/Field.md) (#06 0.1 m and #24 7.0 m outside).
- **Source:** interview · confidence high

## D-010 · The .heic originals stay out of the public repo
- **Status:** approved
- **Date:** 2026-11-26
- **Confirmed:** 2026-11-26
- **Rule:** The .heic originals of the field photos (with EXIF and GPS) live only on the owner's machine, in `docs/field_photos/`, with a private backup. `.gitignore` holds `docs/field_photos/*.heic`; they were taken out of the index with `git rm --cached`. Only EXIF-free images are committed. The git history is not rewritten: the originals stay readable in commit 59242c1.
- **Why:** The brief asks for EXIF, including GPS, to be removed before photos are shown publicly, and the GitHub repo is public.
- **Rejected:** Rewriting the history (`git filter-repo` and a force-push) for now: the GPS in the originals repeats the coordinates already published in Field.md (all within 0.7 m, checked 2026-11-26).
- **Evidence:** User approval of the D-010 proposal (2026-11-26); `git ls-files docs/field_photos` and `origin/main` held the 24 .heic files; repo visibility PUBLIC.
- **Source:** interview · confidence high

## D-011 · The seed uses the same image pipeline as an upload
- **Status:** approved
- **Date:** 2026-11-26
- **Confirmed:** 2026-11-26
- **Rule:** The seed calls the same server image module as a user upload: read GPS from EXIF → resize (1280 px on the long side, plus a 320 × 240 thumbnail) → strip all EXIF → save. For the seed, the pin comes from Field.md; the GPS read from EXIF is only a check, and a difference above 10 m stops the seed with a message naming the sesizare. Without the originals (a fresh clone, D-010), the seed uses the EXIF-free JPEGs committed to the repo (`docs/design/mocks/photos/large/`) with the Field.md coordinates, and skips only the GPS step.
- **Why:** One module means one place where EXIF is stripped and tested; the check catches data mistakes in Field.md (it caught the wrong photo of #20, Q-019); the fallback lets an evaluator run the seed from a clone.
- **Rejected:** A separate seed-only conversion; a seed that stops when the originals are missing.
- **Evidence:** User approval of the D-011 proposal with option (b) (2026-11-26); [brief.md](file:///home/deny/proiect_web1/docs/brief.md); Q-002; Q-019.
- **Source:** interview · confidence high

## D-012 · Account roles are hierarchical, and only a Cetățean votes and follows
- **Status:** approved
- **Date:** 2026-11-26
- **Confirmed:** 2026-11-26
- **Rule:** Account roles go Cetățean < Operator < Admin, and each role can do everything the role below it can, with one exception: Operators and Admins do not vote ("Mă afectează și pe mine") and do not follow sesizări; they track sesizări from the triage queue (DS-004). An Operator reports and comments like a Cetățean, and also changes status, merges and unmerges sesizări. An Admin can do everything an Operator does, plus manage categories, SLAs, users and roles. Where a Cetățean sees the vote button, an Operator or Admin sees only the number of people affected, and no "Urmărește"; the server refuses a vote or a follow from an Operator or Admin. A sesizare reported by an Operator or Admin does not count as its author's vote (Q-016 applies to a Cetățean author only). Votes an account cast as a Cetățean do not count while the account is Operator or Admin; they are not deleted and count again if the role goes back to Cetățean (votes are counted as COUNT(DISTINCT user_id) over Cetățean accounts, D-005). In the same way, follows an account made as a Cetățean stay but send no email while the account is Operator or Admin, and work again if the role goes back to Cetățean. A sesizare an Operator or Admin reports is not followed automatically, with no exception for their own reports. On DS-009 the "Urmărite" tab is hidden for Operators and Admins. An Operator or Admin who lives in the neighbourhood votes and follows with a separate Cetățean account under another email address (D-007: one account per email). An account has exactly one role. The Vizitator (unauthenticated) is not an account role. Supersedes D-008.
- **Why:** Whoever triages must not affect a sesizare's priority by voting; the triage queue is where Operators and Admins track sesizări, so a follow and its emails would repeat it. One permission level per account stays simple to check on the server, and an Admin can still triage when no Operator is available.
- **Rejected:** Operators and Admins voting or following like a Cetățean (D-008); deleting the votes or follows of an account promoted to Operator or Admin; Operators following only the sesizări they reported; separate, non-overlapping roles.
- **Evidence:** User approval of the D-012 proposal and of points 1–4 (2026-11-26); user approval of the follow amendment and its points 1–3 (2026-11-26); Q-009; Q-016.
- **Source:** interview · confidence high

## D-014 · The street is a text field with suggestions, checked against the area's streets
- **Status:** approved
- **Date:** 2026-11-26
- **Confirmed:** 2026-11-26
- **Rule:** The report form (DS-003) asks for the photo, the pin, the category, the subcategory, the title (Q-020), the description and the street; the reper and "Raportează anonim" are optional. (1) The pin is the only source of the coordinates (placed by hand, from the photo's EXIF GPS or from the browser's GPS); nobody types them. (2) "Stradă" is a text field with suggestions (a combobox), not a drop-down list: while the person types, the valid streets whose name contains the text appear under the field, all of them, alphabetically, each row at least 44 px; the person picks one (tap, or arrows and Enter) or types the whole name; Escape closes the suggestions. (3) Matching ignores case, diacritics, punctuation and the prefixes "Strada", "Str.", "Str", "Aleea", "Al."; a text that is exactly a street's name once normalised becomes its official name when the person leaves the field ("str oslo" → "Strada Oslo"). "Botticelli" is accepted as another name of "Strada Boticelli" (the OSM spelling). (4) The valid streets are exactly the 16 streets with a part inside the polygon of `docs/design/cartier.geojson` (D-009): Aleea Monet, Strada Boticelli, Cuptorului, El Greco, Klagenfurt, Landshut, Leonardo da Vinci, Lisabona, Michelangelo, Orhideelor, Oslo, Picasso, Rembrandt, Roma, Rubens, Viena; the server accepts only these. (5) A text that is one of the 6 known streets around the area (Londra, Țiglari, Deventer, Bratislava, Lacul lui Binder, Madrid; same OSM extract, no part inside the polygon) gets "Strada nu e în aria Cartierului Tineretului."; a text that matches no street gets "Nu am găsit strada. Verifică numele sau mută pinul pe hartă." These messages appear when the person leaves the field or presses "Trimite", never while typing; an invalid text blocks sending like an empty field; the pin does not move. (6) Pin → street: whenever the pin moves inside the area, the field takes the nearest valid street, computed locally as the distance from the point to the street's line segments, with no geocoding service, and shows "Dedusă din pin"; it overwrites the typed text. A street the person typed or picked stays if the pin is at most 10 m from it; otherwise it is replaced by the nearest street, "Dedusă din pin". (7) Street → map: a valid street typed or picked by hand centres the map on it and highlights it, with "Atinge pe [strada] locul exact"; the pin does not move. (8) "Reper" is a separate, optional free-text field; an intersection goes there. (9) The street lines are stored once, in `docs/design/strazi.geojson` (the 16 with `in_area: true`, the 6 with `in_area: false`, the aliases), extracted from OpenStreetMap (Overpass, 2026-11-26, query in the file) with the attribution "© OpenStreetMap contributors, ODbL"; it is the only source for the mocks (a copy in `mocks/seed.js`), the client, the server and the seed. The seed keeps the Field.md street text unchanged, including #9 and #12 (two streets each). Supersedes D-013.
- **Why:** A drop-down list of 16 names is slow to use on a phone, outdoors; typing with suggestions is faster, and the check against known streets keeps the street and the pin in step. On the 22 seed sesizări the nearest street is the Field.md street for all of them; at intersections the two streets are 3–6 m apart, hence the 10 m threshold.
- **Rejected:** The drop-down list of D-013; free text without a check (the Q-021 answer); reverse geocoding through an external service; a wider extract of Sibiu streets for the "not in the area" message; the pin jumping to a typed street.
- **Evidence:** User approval of the D-014 proposal and of points 1–3 (2026-11-26); D-013; Q-020; Q-021; `docs/design/strazi.geojson`; the nearest-street test on `mocks/seed.js` (0 of 22 different).
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

