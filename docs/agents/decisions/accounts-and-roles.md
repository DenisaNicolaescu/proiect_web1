# Decisions · Accounts, roles and anonymity

> Index and rules: [DECISIONS.md](../DECISIONS.md).

## D-006 · Mandatory authentication with public anonymity and anti-spam rate limiting
- **Status:** approved
- **Date:** 2026-11-19
- **Confirmed:** 2026-11-19
- **Rule:** All mutating actions (reporting, voting, commenting, following) require an authenticated user account (user_id). Citizens can opt to submit a report anonymously ("Raportează anonim"), which conceals their identity from public views and exports (rendered as "Cetățean anonim") while retaining accountability in the database. Rate limits are strictly enforced: max 5 reports, 30 votes, 10 comments per 10 minutes per user/IP, with hidden honeypot fields on forms.
- **Why:** Protects neighbor privacy (Neighbor #2 V.D.), enforces "one vote per user", and prevents automated spam and vandalism without requiring intrusive CAPTCHAs.
- **Rejected:** Unauthenticated guest submissions, completely untracked anonymous database records, third-party CAPTCHA challenges.
- **Evidence:** User approval of D-006 proposal; [Interview.md](file:///home/deny/proiect_web1/Interview.md#L15-L18); [brief.md](file:///home/deny/proiect_web1/docs/brief.md#L12-L24).
- **Source:** interview · confidence high

## D-012 · Account roles are hierarchical, and only a Cetățean votes and follows
- **Status:** approved
- **Date:** 2026-11-26
- **Confirmed:** 2026-11-26
- **Rule:** Account roles go Cetățean < Operator < Admin, and each role can do everything the role below it can, with one exception: Operators and Admins do not vote ("Mă afectează și pe mine") and do not follow sesizări; they track sesizări from the triage queue (DS-004). An Operator reports and comments like a Cetățean, and also changes status, merges and unmerges sesizări. An Admin can do everything an Operator does, plus manage categories, SLAs, users and roles. Where a Cetățean sees the vote button, an Operator or Admin sees only the number of people affected, and no "Urmărește"; the server refuses a vote or a follow from an Operator or Admin. A sesizare reported by an Operator or Admin does not count as its author's vote (Q-016 applies to a Cetățean author only). Votes an account cast as a Cetățean do not count while the account is Operator or Admin; they are not deleted and count again if the role goes back to Cetățean (votes are counted as COUNT(DISTINCT user_id) over Cetățean accounts, D-005). In the same way, follows an account made as a Cetățean stay but send no email while the account is Operator or Admin, and work again if the role goes back to Cetățean. A sesizare an Operator or Admin reports is not followed automatically, with no exception for their own reports. On DS-009 the "Urmărite" tab is hidden for Operators and Admins. An Operator or Admin who lives in the neighbourhood votes and follows with a separate Cetățean account under another email address (D-007: one account per email). An account has exactly one role. The Vizitator (unauthenticated) is not an account role. Supersedes D-008.
- **Why:** Whoever triages must not affect a sesizare's priority by voting; the triage queue is where Operators and Admins track sesizări, so a follow and its emails would repeat it. One permission level per account stays simple to check on the server, and an Admin can still triage when no Operator is available.
- **Rejected:** Operators and Admins voting or following like a Cetățean (D-008); deleting the votes or follows of an account promoted to Operator or Admin; Operators following only the sesizări they reported; separate, non-overlapping roles.
- **Evidence:** User approval of the D-012 proposal and of points 1–4 (2026-11-26); user approval of the follow amendment and its points 1–3 (2026-11-26); Q-009; Q-016.
- **Source:** interview · confidence high

## D-017 · Email confirmation is mandatory, and an unconfirmed account can change its address
- **Status:** approved
- **Date:** 2026-11-27
- **Confirmed:** 2026-11-27
- **Rule:** A new account must confirm its email address through the link sent at registration. Until it is confirmed, the account can sign in but cannot report, vote, comment or follow. One email address can hold only one account. Confirmation is a state of DS-007 ("Verifică-ți emailul", resend link, expired link), not a separate screen. While an account is not confirmed, its owner can change the email address from DS-007 ("Schimbă adresa"): a new confirmation link goes to the new address, the old link stops working, and the old address is freed for another account. The new address must not belong to another account. Once the account is confirmed, the address does not change from DS-007. Extends D-006. Supersedes D-007.
- **Why:** Anti-spam and "one vote per person" (D-007); a typo in the address should not force a second account, and a freed address keeps "one address, one account" true.
- **Rejected:** Registration without email confirmation; a separate confirmation screen; "creează contul din nou cu adresa bună" to fix a wrong address.
- **Evidence:** User approval of the D-007 change as D-017 (2026-11-27); D-007; Q-008.
- **Source:** interview · confidence high
