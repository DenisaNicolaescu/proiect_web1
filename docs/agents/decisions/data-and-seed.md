# Decisions · Data, seed and the neighbourhood area

> Index and rules: [DECISIONS.md](../DECISIONS.md).

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
