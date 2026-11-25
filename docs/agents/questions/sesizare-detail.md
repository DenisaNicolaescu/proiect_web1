# Open questions · DS-002 sesizare detail: comments, votes, actions

> Index and rules: [OPEN-QUESTIONS.md](../OPEN-QUESTIONS.md).

## Q-004 · Should citizen comments support image attachments or remain text-only?
- **Status:** answered
- **Blocks:** comment data model & UI
- **Who answers:** project owner / UI design
- **Proposed answer:** Text-only to prevent unmoderated media spam and storage abuse; citizen photos are uploaded at report creation, while resolution evidence photos are uploaded exclusively by operators.
- **Answer:** Comments are text only (the owner's DS-002 brief: "comentarii doar text").
- **Date:** 2026-11-26

## Q-016 · Can a vote be withdrawn, and can the author vote on their own sesizare?
- **Status:** answered
- **Blocks:** the vote button on DS-002 after "Ai votat", the vote model on the server
- **Who answers:** project owner
- **Context:** The brief and D-006 say one vote per user ("Mă afectează și pe mine"); nothing says whether a vote can be taken back, or whether the author counts as affected. The DS-002 mock draws "Ai votat" with no way to withdraw, and lets every confirmed account vote.
- **Proposed answer:** A vote can be withdrawn ("Ai votat" → "Retrage votul"); the D-006 rate limit (30 votes in 10 minutes) also counts withdrawals. Reporting a sesizare counts as its author's vote, so the author has no vote button on their own sesizare and the count includes them; after a merge, COUNT(DISTINCT user_id) (D-005) still counts the author once.
- **Answer:** The proposed answer, accepted by the owner: a vote can be withdrawn ("Retrage votul"), and withdrawals count toward the D-006 vote rate limit. Reporting counts as the author's vote: the author has no vote button on their own sesizare and is included in the count.
- **Date:** 2026-11-26

## Q-017 · Which actions stay on a rezolvată, respinsă or fuzionată sesizare?
- **Status:** answered
- **Blocks:** the actions panel and comments of DS-002 for closed and merged sesizări
- **Who answers:** project owner
- **Context:** D-005 moves votes, comments and followers of a merged sesizare to the primary one; nothing says whether people can still vote, comment or follow a rezolvată or respinsă one.
- **Proposed answer:** Rezolvată and respinsă keep vote, comment and follow (a neighbour can say the problem is back). A fuzionată sesizare has no actions of its own and sends people to the primary one, as D-005 aggregates them there. Drawn this way in `docs/design/mocks/DS-002.html`.
- **Answer:** The proposed answer, accepted by the owner: rezolvată and respinsă keep vote, comment and follow; a fuzionată sesizare has no actions of its own and sends people to the primary one.
- **Date:** 2026-11-26
