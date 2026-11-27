# Decisions · Stack and tooling

> Index and rules: [DECISIONS.md](../DECISIONS.md).

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
