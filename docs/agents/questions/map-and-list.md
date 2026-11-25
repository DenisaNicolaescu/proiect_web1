# Open questions · DS-001 map and list

> Index and rules: [OPEN-QUESTIONS.md](../OPEN-QUESTIONS.md).

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

## Q-015 · In what order is the list on DS-001?
- **Status:** answered
- **Blocks:** list order on DS-001 and its server query
- **Who answers:** project owner
- **Proposed answer:** Newest first, by report date. Split from Q-012, whose other half was answered.
- **Answer:** Newest first, by report date. Confirmed with the approved DS-001 mock.
- **Date:** 2026-11-26
