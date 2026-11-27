# Open questions · DS-004, DS-011, DS-012 triage: queue, status workflow, merge

> Index and rules: [OPEN-QUESTIONS.md](../OPEN-QUESTIONS.md).

## Q-023 · Which status changes are allowed from each status?
- **Status:** answered
- **Blocks:** the steps DS-011 offers, the status workflow on the server
- **Who answers:** project owner
- **Context:** The brief gives only "nouă → confirmată → în lucru → rezolvată / respinsă". DS-002 (approved) already shows #10 going straight from nouă to respinsă. Nothing says whether a closed sesizare can be reopened.
- **Proposed answer:** Forward one step, and respinsă from any open status: nouă → confirmată or respinsă; confirmată → în lucru or respinsă; în lucru → rezolvată or respinsă. Rezolvată and respinsă are final.
- **Answer:** The proposed steps, plus reopening: a rezolvată or respinsă sesizare can go back to confirmată, with a required reason. Drawn in `docs/design/mocks/DS-011.html`.
- **Date:** 2026-11-27
- **Note (2026-11-27):** Recorded in D-015.

## Q-024 · Do followers get an email when a sesizare is merged or unmerged?
- **Status:** answered
- **Blocks:** the email note on DS-012, the notification job, DS-014
- **Who answers:** project owner
- **Context:** The brief asks for a grouped email at a status change; a merge moves the secondary sesizare to fuzionată, and an unmerge moves it back, but nothing says whether that sends an email.
- **Answer:** Yes, like any status change: the followers of the secondary sesizare get "#15 a fost unită cu #14" at a merge and "#15 nu mai e unită cu #14" at an unmerge, in the same grouped email (DS-014). The followers of the primary sesizare get nothing: its status does not change.
- **Date:** 2026-11-27
- **Note (2026-11-27):** Recorded in D-015.

## Q-025 · What does the triage queue show by default, and how are ties ordered?
- **Status:** answered
- **Blocks:** the default filter and the order of DS-004
- **Who answers:** project owner
- **Context:** The owner asked for the queue ordered by SLA: depășit first, then closest to the deadline. Many seed sesizări share the same SLA (five are 3 working days over), and closed sesizări (rezolvată, respinsă) have no SLA.
- **Proposed answer:** By default the queue shows the open statuses (nouă, confirmată, în lucru); the status filter adds rezolvată and respinsă, which come last, newest first. Fuzionată never appears in the queue. Order: SLA depășit by the most working days over, then the fewest working days left; on a tie, more people affected first, then the lower #id. Drawn this way in `docs/design/mocks/DS-004.html`.
- **Answer:** The proposed answer, confirmed by the owner: by default only the open sesizări; on the same SLA, more people affected first, then the lower #id.
- **Date:** 2026-11-27
