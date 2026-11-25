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

---

## Sesiunea 2 — 25 noiembrie 2026

- **Data:** 2026-11-25
- **Ce am cerut (What I asked):**  
  Am cerut citirea documentației proiectului (`AGENTS.md`, `README.md`, `CONTEXT.md`, `docs/brief.md`, `Field.md`, `Interview.md`, ledger-ul și `docs/design/DESIGN.md`) și un rezumat al deciziilor aprobate, al întrebărilor deschise, al scope-ului și al rolurilor. Am stabilit regula ca orice decizie de design sau tehnică să fie scrisă ca PROPOSAL și să aștepte aprobarea mea, iar ce nu știu încă să devină întrebare Q-.

- **Ce am primit (What I received):**  
  Rezumatul cerut și o listă de neconcordanțe între documente: SLA-urile erau prezentate ca venind de la Primărie, deși răspunsul nr. 93006/16.11.2026 dă doar un interval („de la 1–3 zile lucrătoare la 6 luni – 1 an”); numărul de categorii era greșit; patru sesizări din `Field.md` aveau categorii sau subcategorii duble; rolul de vizitator nu era definit; pragurile de duplicat erau descrise diferit în README și în D-005. Pentru D-004 și D-005 am primit propuneri formale (PROPOSAL). Asistentul a propus inițial 13 categorii, apoi și-a semnalat singur greșeala: răspunsul Primăriei conține 14 categorii principale.

- **Ce am făcut cu răspunsul (What I did with the response):**  
  Am decis și am aprobat următoarele:
  - **SLA-uri (D-004):** valorile (3–30 de zile lucrătoare) sunt estimările mele, pornind de la intervalul comunicat de Primărie, nu valori comunicate de Primărie. Adminul poate modifica SLA-ul unei categorii din panoul de administrare; operatorul nu poate modifica SLA-ul sau termenul calculat.
  - **Categorii (D-004):** cele 14 categorii ale Primăriei; Construcții și Diverse sunt categorii separate, ambele cu SLA de 30 de zile lucrătoare.
  - **Field.md:** sesizările 02 și 08 → Parcuri și spații verzi / Spațiu verde neîngrijit; sesizările 07 și 12 → Capac canalizare lipsă / defect.
  - **Vizitator:** utilizatorul nelogat, care vede harta, lista, detaliul, statisticile și exportul, dar nu modifică nimic. Nu este un rol de cont; rolurile de cont rămân cetățean, operator și admin. Termenul a fost adăugat în `CONTEXT.md`.
  - **Praguri duplicate (D-005):** fixe (aceeași categorie, sub 50 m, ultimele 30 de zile), setate în configurarea serverului, nu din interfață; nimeni nu le poate modifica din aplicație.
  - **Q-007 (deschisă):** validarea SLA-urilor cu Primăria sau cu asociația de proprietari.
  
  Modificările au fost aplicate în `docs/agents/DECISIONS.md`, `docs/agents/OPEN-QUESTIONS.md`, `README.md`, `CONTEXT.md`, `Field.md`, `docs/design/registry.yaml` și mock-ul `docs/design/mocks/DS-003.html`, apoi verificate cu `python3 docs/agents/tools/ledger-lint.py`.
