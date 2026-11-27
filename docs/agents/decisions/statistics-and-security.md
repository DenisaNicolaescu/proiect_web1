# Decisions · Public statistics and account security values

> Index and rules: [DECISIONS.md](../DECISIONS.md).

## D-016 · Public statistics definitions and account security values
- **Status:** approved
- **Date:** 2026-11-27
- **Confirmed:** 2026-11-27
- **Rule:** (1) Public statistics (DS-005), computed from the data, never hard-coded, overall and per category, each figure with the number of sesizări it comes from: % rezolvate = rezolvate / all sesizări except fuzionate (respinse count in the total); a fuzionată counts once, through its primary. "Termen depășit" = open sesizări (nouă, confirmată, în lucru) whose termen is over now. "Rezolvate în termen: X din Y rezolvate" = rezolvate whose resolution time is at most the category's SLA. The resolution time is in working days, from the report to the last resolution (D-015). A category with 0–2 sesizări shows "Prea puține date" instead of figures. (2) Accounts (DS-007, DS-008): a password has at least 8 characters and is not one of the very common passwords, with no uppercase or symbol rules (NIST guideline). After 5 wrong sign-in attempts in 10 minutes, per email or IP, sign-in waits 10 minutes. The confirmation link is valid 24 hours, the password reset link 1 hour; a new link cancels the old one. An email can be resent once every 60 seconds. The reset request never says whether the address has an account. Extends D-006.
- **Why:** The brief asks for statistics computed from data but does not define them; counting respinse and only open overdue sesizări keeps the figures honest and simple. Sign-in needs its own limit (D-006 covers reports, votes and comments); length-only password rules are the current NIST guidance.
- **Rejected:** % resolved without respinse; counting sesizări resolved late as "termen depășit"; a 10-character password with composition rules, a 15-minute lockout and 48 h / 30 min links.
- **Evidence:** Q-026 and Q-027 answers (2026-11-27); user approval of the D-016 proposal (2026-11-27); `docs/design/mocks/DS-005.html`, `DS-007.html`, `DS-008.html`; `docs/design/mocks/tests/workdays.test.js`.
- **Source:** interview · confidence high
