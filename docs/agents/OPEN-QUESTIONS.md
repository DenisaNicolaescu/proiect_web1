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
- Q-005 · Which map tile provider should be used for Leaflet to ensure quota-free evaluation?
- Q-006 · How do we take screenshots of the app for the design check?
- Q-007 · Are the per-category SLA values validated by Primăria Sibiu or the neighbourhood association?
- Q-008 · Is email confirmation required at registration? · _answered_
- Q-009 · Can an Admin do everything an Operator does, or are the roles separate? · _answered_

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
- **Status:** open
- **Blocks:** client map layer configuration
- **Who answers:** project owner
- **Proposed answer:** Standard OpenStreetMap tile server (`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`) with standard attribution, avoiding external API key requirements during academic demo evaluation.

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
