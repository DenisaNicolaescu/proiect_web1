# Open questions · Data, seed and SLA values

> Index and rules: [OPEN-QUESTIONS.md](../OPEN-QUESTIONS.md).

## Q-002 · How should seed data from Field.md and docs/field_photos be ingested?
- **Status:** answered
- **Blocks:** database seeding and initial presentation of 20+ issues
- **Who answers:** project owner / brief
- **Proposed answer:** Automated database seed script
- **Answer:** An automated seed script (`npm run db:seed`) parses `Field.md`, converts the 24 `.heic` photos in `docs/field_photos/` to optimized web formats (JPEG/WebP) via `heic-convert` and `sharp` while stripping EXIF, and inserts the issues with their exact GPS coordinates into PostgreSQL/PostGIS along with default users and the 14 categories.
- **Date:** 2026-11-19
- **Note (2026-11-26):** The seed contains only the 22 field reports inside aria cartierului (D-009). #06 and #24 stay in Field.md, marked as excluded, and are not seeded.
- **Note (2026-11-26):** The .heic originals are local only (D-010); the seed runs them through the upload image pipeline, or uses the committed EXIF-free JPEGs without them (D-011).

## Q-007 · Are the per-category SLA values validated by Primăria Sibiu or the neighbourhood association?
- **Status:** open
- **Blocks:** final SLA values in the seed and the claim of validated SLAs (the brief's "ideal, validate de cineva de la primărie / asociație"); the SLA engine itself is not blocked
- **Who answers:** project owner, after contacting Primăria Sibiu or the asociația de proprietari
- **Context:** The SLA values (3 to 30 working days) are the project owner's own estimates, derived from Primăria's reply no. 93006/16.11.2026, which gives only a range ("de la 1–3 zile lucrătoare la 6 luni – 1 an"). Primăria did not provide per-category deadlines.

## Q-014 · The neighbourhood polygon leaves 4 field reports outside: change the polygon or D-003?
- **Status:** answered
- **Blocks:** the seed of the 24 field reports (Q-002) and the polygon check of D-003, in the client and on the server
- **Who answers:** project owner
- **Context:** The polygon in `docs/design/cartier.geojson` (drawn by the project owner on geojson.io, 2026-11-25) leaves sesizările #14 (31 m), #15 (44 m), #16 (58 m) and #17 (21 m) from Field.md outside it, on Strada Picasso and Strada Klagenfurt. D-003 asks for a polygon around the surveyed streets with a 50–100 m buffer and blocks every pin outside it, so the app would reject these four. Several reports inside are also closer than 50 m to the edge (#06 at 0.9 m, #24 at 7.3 m, #07 at 5.3 m, #10 at 8.7 m).
- **Proposed answer:** Extend the polygon to enclose Strada Picasso and Strada Klagenfurt with at least 50 m beyond the outermost report, as D-003 states.
- **Answer:** Neither: the owner redrew the polygon (it now contains #14–#17) and dropped the buffer. Aria cartierului is exactly the polygon in `docs/design/cartier.geojson`. #06 (0.1 m) and #24 (7.0 m) fall outside it: they stay in Field.md, marked as excluded, and are not seeded; 22 field reports remain.
- **Date:** 2026-11-26
- **Recorded as:** D-009

## Q-019 · Sesizarea #20: the photo's GPS points to #11, 204 m away
- **Status:** answered
- **Blocks:** the seed of #20 (location, photo, time) and the DS-001 / DS-002 data for #20 and #11
- **Who answers:** project owner
- **Context:** The EXIF of `docs/field_photos/sesizare_20.heic` gives 45.814792, 24.132058 at 12:47, exactly the GPS and time of #11 (Strada Oslo), while Field.md places #20 on Strada Rembrandt (45,81658° N, 24,13263° E) at 13:00, 203.7 m away. The photo shows the same van as `sesizare_11.heic`, from another angle. Field.md calls #20 "Sesizare din unghi suplimentar". Every other photo is within 0.7 m of its Field.md coordinates (checked 2026-11-26).
- **Proposed answer:** Not proposed: either #20 is a second report of #11 (then the coordinates and time in Field.md are wrong, and #11 + #20 are a real duplicate under D-005: same category, 0 m, same day), or the wrong photo was attached to #20 (then the right photo is missing).
- **Answer:** #20 is a separate problem on Strada Rembrandt; the photo of #11 had been attached to it by mistake. The owner replaced `docs/field_photos/sesizare_20.heic` with the right photo: its EXIF GPS is now 0.2 m from Field.md, at 13:00 (checked 2026-11-26). Field.md stays as it is; 22 sesizări are seeded.
- **Date:** 2026-11-26

## Q-026 · How are the public statistics on DS-005 defined?
- **Status:** answered
- **Blocks:** the figures of DS-005 and the statistics query on the server
- **Who answers:** project owner
- **Context:** The brief asks for the average resolution time and the % resolved, per category; the registry adds sesizări over the termen. Nothing said what the % is taken over (respinse, fuzionate) or whether "termen depășit" means open sesizări now or also those resolved late. D-015 already sets the resolution time: working days from the report to the last resolution.
- **Answer:** % rezolvate = rezolvate / all sesizări except fuzionate (respinse count in the total); a fuzionată counts once, through its primary. "Termen depășit" = open sesizări (nouă, confirmată, în lucru) whose termen is over now. Plus a separate figure: "Rezolvate în termen: X din Y rezolvate" (resolved within the category's SLA, in working days). All of them per category too, computed from the data (in the mocks, from `seed.js`).
- **Date:** 2026-11-27
- **Recorded as:** D-016
- **Note (2026-11-27):** Drawn in `docs/design/mocks/DS-005.html`; a category with 0–2 sesizări shows "Prea puține date" (owner's request in the DS-005 brief).

