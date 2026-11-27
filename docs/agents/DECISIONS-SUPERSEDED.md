# Decisions superseded — proiect_web1

<!-- graffino-agentic:begin v1 -->
> Decisions that no longer apply. **Never obeyed**; read only to explain old code or a
> past choice. Each points to the entry that replaced it. `ledger-lint.py --fix`
> keeps this file in sync: superseded entries move here from `DECISIONS.md`, and
> their index lines move here from its index.
<!-- graffino-agentic:end -->

## Index
- D-003 · Cartierul Tineretului polygon boundary enforcement · _superseded-by D-009_
- D-008 · Account roles are hierarchical · _superseded-by D-012_
- D-013 · The pin is the source of the location; the street is a list, deduced from the pin · _superseded-by D-014_
- D-007 · Email confirmation is mandatory at registration · _superseded-by D-017_

---

## D-003 · Cartierul Tineretului polygon boundary enforcement
- **Status:** superseded-by D-009
- **Date:** 2026-11-19
- **Rule:** The platform scope is strictly bounded to Cartierul Tineretului via a closed polygon enclosing the surveyed streets from Field.md with a 50-100m buffer. Pins outside this boundary are strictly blocked on both client and server with the error message "Locația selectată este în afara ariei Cartierului Tineretului". The polygon is visibly outlined on the map.
- **Why:** Prevents off-target submissions and keeps the platform scoped to the neighborhood association.
- **Rejected:** Soft warnings without blocking, unbound city-wide reporting, automatic silent rejection.
- **Evidence:** User approval of D-003 proposal; [Field.md](file:///home/deny/proiect_web1/Field.md); [brief.md](file:///home/deny/proiect_web1/docs/brief.md#L9).
- **Source:** interview · confidence high

## D-008 · Account roles are hierarchical
- **Status:** superseded-by D-012
- **Date:** 2026-11-25
- **Rule:** Account roles are hierarchical: Cetățean < Operator < Admin. Each role can do everything the role below it can. An Operator can do everything a Cetățean does, plus change status, merge and unmerge sesizări. An Admin can do everything an Operator does, plus manage categories, SLAs, users and roles. An account has exactly one role. The Vizitator (unauthenticated) is not an account role.
- **Why:** One permission level per account is simple to check on the server, and an Admin can triage when no Operator is available.
- **Rejected:** Separate, non-overlapping roles.
- **Evidence:** Q-009 answer; user approval of the D-008 proposal (2026-11-25).
- **Source:** interview · confidence high

## D-013 · The pin is the source of the location; the street is a list, deduced from the pin
- **Status:** superseded-by D-014
- **Date:** 2026-11-26
- **Rule:** The report form (DS-003) asks for the photo, the pin, the category, the subcategory, the title (Q-020), the description and the street; the reper and "Raportează anonim" are optional. (1) The coordinates come only from the pin (placed by hand, from the photo's EXIF GPS or from the browser's GPS); nobody types them. (2) Pin → street: whenever the pin moves inside the area, the "Stradă" field takes the nearest street of the list, computed locally as the distance from the point to the street's line segments, with no geocoding service, and shows "Dedusă din pin". A street the person chose by hand stays if the pin is at most 10 m from it; otherwise it is replaced by the nearest street, "Dedusă din pin". (3) Street → map: choosing a street from the list centres the map on it and highlights it, with "Atinge pe [strada] locul exact"; the pin does not move. (4) "Stradă" is a list of the 16 named streets that have a part inside the polygon of `docs/design/cartier.geojson` (D-009): Aleea Monet, Strada Boticelli (the OSM spelling), Cuptorului, El Greco, Klagenfurt, Landshut, Leonardo da Vinci, Lisabona, Michelangelo, Orhideelor, Oslo, Picasso, Rembrandt, Roma, Rubens, Viena; the server accepts only these values. (5) "Reper" is a separate, optional free-text field ("în fața nr. 12", "intersecția cu Strada Lisabona"); an intersection goes there, as the form takes one street. (6) The street lines are stored once, in `docs/design/strazi.geojson`, extracted from OpenStreetMap (Overpass, 2026-11-26, query in the file) with the attribution "© OpenStreetMap contributors, ODbL"; it is the only source for the mocks (a copy in `mocks/seed.js`), the client, the server and the seed. The seed keeps the Field.md street text unchanged, including "Strada Oslo / Strada Klagenfurt" (#12) and "Strada Orhideelor / Strada Lisabona" (#9).
- **Why:** A free-text street and the pin could disagree, which was confusing; a list deduced from the pin keeps them in step and can be checked. Tested on the 22 seed sesizări: the nearest street is the Field.md street for all of them, and at intersections the two streets are 3–6 m apart, hence the 10 m threshold.
- **Rejected:** A free-text "Stradă sau reper" field (the Q-021 answer); reverse geocoding through an external service (Nominatim); the pin jumping to a street chosen from the list.
- **Evidence:** User approval of the D-013 proposal and of points 1–5 (2026-11-26); Q-020; Q-021; `docs/design/strazi.geojson`; the nearest-street test on `mocks/seed.js` (0 of 22 different).
- **Source:** interview · confidence high

## D-007 · Email confirmation is mandatory at registration
- **Status:** superseded-by D-017
- **Date:** 2026-11-25
- **Rule:** A new account must confirm its email address through the link sent at registration. Until it is confirmed, the account can sign in but cannot report, vote, comment or follow. One email address can hold only one account. Confirmation is a state of DS-007 ("Verifică-ți emailul", resend link, expired link), not a separate screen. Extends D-006.
- **Why:** Anti-spam and "one vote per person": without confirmation, one person could open several accounts and vote several times.
- **Rejected:** Registration without email confirmation; a separate confirmation screen.
- **Evidence:** Q-008 answer; user approval of the D-007 proposal (2026-11-25).
- **Source:** interview · confidence high
