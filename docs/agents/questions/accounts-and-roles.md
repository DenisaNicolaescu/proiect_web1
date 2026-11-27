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

## Q-027 · What are the password rule, the sign-in attempt limit and the link lifetimes?
- **Status:** answered
- **Blocks:** DS-007, DS-008, the authentication endpoints
- **Who answers:** project owner
- **Context:** DS-007 needs the "parolă prea slabă" and "prea multe încercări" errors and DS-007 / DS-008 the expired-link states. D-006 limits reports, votes and comments, not sign-in; D-007 does not say how long a confirmation link is valid.
- **Answer:** Password: at least 8 characters and not one of the very common passwords ("12345678"); no uppercase or symbol rules (NIST guideline). After 5 wrong attempts in 10 minutes, per email or IP: "încearcă din nou peste 10 minute". The confirmation link is valid 24 hours, the reset link 1 hour; a new link cancels the old one. Resending an email: once a minute.
- **Date:** 2026-11-27
- **Recorded as:** D-016
- **Note (2026-11-27):** Drawn in `docs/design/mocks/DS-007.html` and `DS-008.html`.

## Q-028 · How long does the "Bine ai revenit" message stay after signing in?
- **Status:** answered
- **Blocks:** the message after signing in (DS-007), and any other message that closes by itself
- **Who answers:** project owner
- **Context:** The owner asked (2026-11-27) that after signing in the person goes straight back where they were, with a short "Bine ai revenit, [prenume]!" that disappears by itself. DESIGN.md has no duration token.
- **Proposed answer:** It stays 5 seconds, the countdown pauses while the pointer is over it or it has focus, and × closes it at once; it is announced to screen readers (`role="status"`) and never carries the only way to do something. A duration token would be a DESIGN.md PROPOSAL.
- **Answer:** 5 seconds, paused while the pointer is over it or it has focus, plus × to close it at once. The duration is a DESIGN.md token, `--duration-message` (5 s).
- **Date:** 2026-11-27

