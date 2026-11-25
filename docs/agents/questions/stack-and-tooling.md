# Open questions · Stack and tooling

> Index and rules: [OPEN-QUESTIONS.md](../OPEN-QUESTIONS.md).

## Q-001 · What technology stack and web frameworks are required for this project?
- **Status:** answered
- **Blocks:** project scaffolding, dependencies, and build configuration
- **Who answers:** project owner
- **Proposed answer:** Node.js / TypeScript or standard HTML/CSS/JavaScript with a lightweight backend
- **Answer:** Node.js with TypeScript for the backend server, React with TypeScript (Vite) + Leaflet.js for the client, PostgreSQL with PostGIS for geospatial persistence, and sharp + exifr + heic-convert for the server-side image pipeline.
- **Date:** 2026-11-19
- **Recorded as:** D-002

## Q-003 · What email transport should be used for status notifications in dev vs prod?
- **Status:** answered
- **Blocks:** notification service implementation
- **Who answers:** project owner
- **Proposed answer:** Local preview/log for dev, SMTP for prod
- **Answer:** Local development uses an emulated transport (Mailpit / in-memory DB notification log / Nodemailer stream) to inspect the 5-minute / 10-change batching job without external dependencies; production uses standard SMTP configured via `.env`.
- **Date:** 2026-11-19

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
