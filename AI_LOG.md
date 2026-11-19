# AI Log — Jurnal de interacțiune cu asistentul AI

Acest fișier documentează utilizarea asistenților AI în cadrul proiectului P08 (Harta sesizărilor din cartier cu workflow — Cartierul Tineretului, Sibiu), conform cerințelor de transparență academică.

---

## Sesiunea 1 — 19 noiembrie 2026

- **Data:** 2026-11-19
- **Ce am cerut (What I asked):**  
  Am condus interviul de descoperire a proiectului P08 pe baza fișierelor `docs/brief.md`, `Interview.md` (5 interviuri cu vecinii din Cartierul Tineretului + răspunsul oficial al Primăriei Municipiului Sibiu nr. 93006/16.11.2026) și `Field.md` (24 de sesizări reale culese pe teren în Cartierul Tineretului). Am cerut adresarea întrebărilor una câte una pe variabilele proiectului și documentarea structurată a deciziilor în `README.md`, `CONTEXT.md`, `docs/agents/OPEN-QUESTIONS.md` și propunerea deciziilor formale pentru `docs/agents/DECISIONS.md`.

- **Ce am primit (What I received):**  
  5 întrebări de interviu țintite, acoperind delimitarea poligonului cartierului și tratarea pin-urilor din afara ariei, taxonomia categoriilor și SLA-urile în zile lucrătoare, detecția duplicatelor și mecanismul fuziunii reversibile, regulile de autentificare / anonimat / rate limiting, precum și stack-ul tehnologic, ecranele principale și delimitarea clară a ce este în afara scopului (out of scope). În urma răspunsurilor, am primit sinteza completă, 5 propuneri formale de decizii tehnice (`D-002` – `D-006`) și actualizarea documentației proiectului, validate de `ledger-lint.py`.

- **Ce am făcut cu răspunsul (What I did with the response):**  
  Am revizuit și rafinat fiecare răspuns (am selectat Modul A de conturi autentificate cu opțiune de anonimat public pentru a proteja intimitatea vecinilor, am păstrat toate cele 12 categorii oficiale ale Primăriei Sibiu, am aprobat conversia fotografiilor `.heic` în JPEG/WebP cu ștergerea metadatelor EXIF și am separat explicit inspirația de UX a aplicației Sibiu City App de integrarea API care este în afara scopului). Ulterior, am aprobat deciziile `D-002`–`D-006`, care au fost înregistrate în `docs/agents/DECISIONS.md` și verificate cu `python3 docs/agents/tools/ledger-lint.py --fix`.
