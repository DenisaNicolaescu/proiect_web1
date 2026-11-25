# Open questions · Accounts, roles and anonymity

> Index and rules: [OPEN-QUESTIONS.md](../OPEN-QUESTIONS.md).

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

## Q-018 · How is an anonymous author shown, and who sees the real one?
- **Status:** answered
- **Blocks:** the author line of DS-002, exports, the operator view
- **Who answers:** project owner
- **Context:** CONTEXT.md ("Raportare opțional anonimă") and D-006 render an anonymous author as "Cetățean anonim"; the DS-002 brief asks for "Raportată anonim". D-006 keeps the real author in the database but does not say whether an Operator or Admin sees it in the app.
- **Proposed answer:** On the detail, the author line reads "Raportată anonim"; "Cetățean anonim" stays the name in lists and exports. Nobody sees the real author in the app; it is kept only in the database for accountability. Not confirmed; DS-002 shows "Raportată anonim" to every role.
- **Answer:** The proposed answer, accepted by the owner: on the detail the author line reads "Raportată anonim"; lists and exports show "Cetățean anonim". Nobody sees the real author in the app; it is kept only in the database.
- **Date:** 2026-11-26
