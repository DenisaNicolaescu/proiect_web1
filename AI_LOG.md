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

---

## Sesiunea 3 — 25–26 noiembrie 2026

- **Data:** 2026-11-25 – 2026-11-26
- **Ce am cerut (What I asked):**  
  Mock-ul DS-001 (Hartă și listă), status `draft`, doar cu tokenii din `docs/design/DESIGN.md`: toate stările (gol, încărcare, eroare, succes, text lung), light și dark, telefon și desktop, variantele pentru vizitator, cetățean și operator. Apoi harta reală (Leaflet + tile-uri OpenStreetMap), cele 24 de sesizări din `Field.md` la coordonatele lor, poligonul cartierului desenat de mine pe geojson.io și verificarea că toate sesizările sunt în interior.

- **Ce am primit (What I received):**  
  Mock-ul `docs/design/mocks/DS-001.html`, cu capturi verificate în toate combinațiile, și întrebările deschise Q-010…Q-015. Verificarea poligonului: primul poligon lăsa în afară #14–#17; al doilea, redesenat, includea #14–#17, dar lăsa în afară #06 (0,1 m) și #24 (7,0 m). Asistentul a semnalat că poligonul contrazice bufferul de 50–100 m din D-003 și a scris un PROPOSAL pentru înlocuirea lui D-003.

- **Ce am făcut cu răspunsul (What I did with the response):**  
  Am decis și am aprobat următoarele:
  - **Aria cartierului (D-009, înlocuiește D-003):** aria este exact poligonul meu din `docs/design/cartier.geojson`, fără buffer. O sesizare din afara lui nu poate fi raportată.
  - **#06 și #24:** rămân în `Field.md`, marcate „în afara ariei proiectului – exclusă din seed”, cu distanța față de poligon; miniaturile lor fără EXIF sunt în `docs/field_photos/`. Seed-ul și harta conțin 22 de sesizări, peste minimul de 20 din fișă.
  - **Q-005:** tile-uri OpenStreetMap, cu atribuirea vizibilă. **Q-011:** filtrul „Raportată” (Oricând, Ultimele 7 zile, Ultimele 30 de zile, Ultimele 3 luni, Mai vechi de 3 luni). **Q-012:** implicit niciun status ales, deci se văd toate.
  - **Ton:** cetățenii și vizitatorii văd „termen” („Termen depășit cu N zile lucrătoare”), nu „SLA”; termenul „Termen” a fost adăugat în `CONTEXT.md`.
  - Mock-urile se deschid prin `python3 -m http.server` din `docs/design/mocks` (notat în `DESIGN.md`).
  
  Modificările au fost verificate cu `python3 docs/agents/tools/ledger-lint.py`.

---

## Sesiunea 4 — 26 noiembrie 2026

- **Data:** 2026-11-26
- **Ce am cerut (What I asked):**  
  Mock-ul DS-002 (detaliul unei sesizări), status `draft`, în stilul DS-001 și doar cu tokenii din `DESIGN.md`: galerie, titlu, categorie, descriere, adresă, hartă mică cu pinul și conturul cartierului, status și cronologie, termen („Mai sunt N zile lucrătoare” / „Termen depășit…”, SLA doar pentru operator), vot „Mă afectează și pe mine”, urmărire, comentarii doar text, autor sau „Raportată anonim”, buton înapoi. Variante pentru vizitator, cetățean, cont neconfirmat și operator (panou de triaj cu „Schimbă statusul”, „Posibile duplicate” și „Anulează unirea”), toate stările de bază și cele speciale (respinsă, rezolvată, fuzionată, prea multe voturi). Apoi legarea mock-urilor: fișiere comune, pagina cu toate ecranele, rolul / tema / mărimea păstrate în URL. Am cerut apoi pozele mari pentru galerie, verificarea sesizărilor #17 și #23, marcarea datelor de exemplu, recomandări pentru Q-016…Q-018 și împărțirea `OPEN-QUESTIONS.md`.

- **Ce am primit (What I received):**  
  `docs/design/mocks/DS-002.html`, fișierele comune `shared.css`, `shared.js` și `seed.js`, `docs/design/mocks/index.html`, DS-001 mutat pe fișierele comune, regula „Linking mocks” și „Example data in mocks” în `DESIGN.md`, pozele mari în `docs/design/mocks/photos/large/` (1280 px pe latura lungă, fără EXIF, din originalele .heic) și întrebările Q-016 (retragerea votului), Q-017 (acțiuni pe sesizări închise sau fuzionate) și Q-018 („Raportată anonim” vs. „Cetățean anonim”). Asistentul a semnalat că pozele de teren sunt în portret și că miniaturile de 320 × 240 sunt decupate pe centru. Verificarea automată prin capturi nu a rulat (comanda a fost blocată de permisiuni), deci mock-urile trebuie verificate manual în browser.

- **Ce am făcut cu răspunsul (What I did with the response):**  
  Am decis următoarele:
  - **Autorul sesizărilor din seed:** contul „Denisa N.” – eu am documentat toate sesizările pe teren. În cronologie, schimbările de status apar cu rolul „Operator”, fără nume.
  - **Q-004:** comentariile sunt doar text.
  - **#17 și #23:** aceeași problemă, cu descriere identică intenționat; sunt la 244 m una de alta (peste pragul de 50 m), deci nu sunt duplicat. Am adăugat o notă în `Field.md` la ambele.
  - **Date de exemplu:** cronologia, motivul respingerii, comentariile și unirea #15 → #14 sunt marcate vizibil „exemplu” în mock și nu intră niciodată în seed.
  - `OPEN-QUESTIONS.md` a fost împărțit pe topicuri în `docs/agents/questions/`.
  - **Q-016, Q-017, Q-018 (închise):** votul se poate retrage („Retrage votul”), iar autorul nu are buton de vot pe sesizarea lui (raportarea e votul lui); rezolvată și respinsă păstrează votul, comentariile și urmărirea, fuzionata trimite la sesizarea principală; pe detaliu „Raportată anonim”, în liste și exporturi „Cetățean anonim”, nimeni nu vede autorul real în aplicație. DS-002 și `CONTEXT.md` au fost actualizate.
  - **Fotografii originale (D-010):** cele 24 de .heic (cu EXIF și GPS) erau în git și pe GitHub (repo public). Le-am scos din repo (`.gitignore` + `git rm --cached`); rămân doar local. Istoricul git rămâne neschimbat.
  - **Seed (D-011):** seed-ul trece prin același proces ca o poză încărcată (citire GPS → redimensionare → ștergere EXIF); GPS-ul din EXIF doar verifică coordonatele din `Field.md` (abatere > 10 m oprește seed-ul). Fără originale, seed-ul folosește JPEG-urile fără EXIF din repo și coordonatele din `Field.md`.
  - **#20 (Q-019):** comparația GPS din EXIF cu `Field.md` a arătat că poza lui #20 era de fapt a doua poză a lui #11. #20 e o problemă separată pe Strada Rembrandt; am înlocuit poza cu cea corectă (acum la 0,2 m de coordonatele din `Field.md`). Numărul de sesizări rămâne 22. Asistentul a refăcut miniatura și varianta mare pentru #20.

  - **Verificare în browser:** am verificat eu DS-001 și DS-002. DS-002 este confirmat (`approved`); DS-001 rămâne `approved` după mutarea pe fișierele comune.
  - Am șters din `docs/field_photos/` două fișiere rămase de la copierea pe Windows (un `.TMP` cu o copie HEIF și un `:Zone.Identifier`) și le-am adăugat tiparele în `.gitignore`.

  Modificările au fost verificate cu `python3 docs/agents/tools/ledger-lint.py`, apoi salvate pe branch-ul `chore/ds-002-mock`, unite în `main` și trimise pe GitHub.

- **Continuare (26 noiembrie 2026) — operatorul nu votează (D-012, înlocuiește D-008):**  
  Am cerut ca operatorul și adminul să nu voteze, ca triajul să nu influențeze prioritatea, și am aprobat PROPOSAL-ul D-012 cu toate cele patru recomandări: raportarea unui operator sau admin nu contează ca vot; voturile date ca cetățean nu se numără cât timp contul e operator sau admin (nu se șterg și contează din nou dacă rolul revine la cetățean); un operator care locuiește în cartier votează cu un cont separat de cetățean, cu alt email; în DS-003, varianta de operator („Vezi sesizarea existentă”) e doar notată în registry până la mutarea pe fișierele comune. DS-002 arată la operator doar numărul de persoane afectate; varianta Cetățean păstrează „Ai votat” → „Retrage votul”. DS-002 a revenit pe `draft` până îl reconfirm. Am actualizat `CONTEXT.md`, `README.md` și `registry.yaml`; DS-001 nu avea buton de vot. Verificat cu `python3 docs/agents/tools/ledger-lint.py`; fără commit până verific DS-002 în browser.

- **Continuare (26 noiembrie 2026) — rolul Admin în mock-uri și urmărirea (D-012, completată):**  
  Am cerut rolul „Admin” în bara de control comună (DS-001, DS-002, `index.html`), cu linkul „Administrare” în antet (spre DS-006, încă nedesenat). Pe DS-002 adminul vede la fel ca operatorul și nu votează. Am aprobat completarea lui D-012: operatorul și adminul nici nu urmăresc sesizări, le urmăresc din coada de triaj (DS-004); urmăririle făcute ca cetățean se păstrează, dar nu trimit emailuri cât timp contul e operator sau admin; în DS-009 tabul „Urmărite” e ascuns pentru ei; fără excepție pentru sesizările raportate de ei. Am actualizat `CONTEXT.md`, `README.md`, `registry.yaml` (DS-002, DS-009, DS-014) și DS-002. Verificat cu `python3 docs/agents/tools/ledger-lint.py`. Am verificat DS-002 în browser și l-am reconfirmat (`approved`); modificările au fost salvate pe branch-ul `chore/d-012-roles`, unite în `main` și trimise pe GitHub.

## Sesiunea 5 — 26 noiembrie 2026

- **Data:** 2026-11-26
- **Ce am cerut (What I asked):**  
  Punctul de plecare: DS-001 și DS-002 erau `approved`, iar DS-002 fusese reconfirmat după D-012 (operatorul și adminul nu votează și nu urmăresc, vezi Sesiunea 4). Am cerut să aduc la zi mock-ul DS-003 (raportarea), desenat înainte de fișierele comune și de mai multe decizii. Statusul rămâne `draft` și se folosesc doar tokenii din `DESIGN.md`. Concret: mutarea pe `shared.css` / `shared.js` / `seed.js` și pe regula de legare, cu bara de control comună și toate rolurile (vizitator, cetățean, cont neconfirmat, operator, admin). Am cerut și verificarea față de deciziile actuale: aria exactă din `cartier.geojson` (D-009), duplicatele calculate pe seed (D-005), GPS-ul din EXIF propus ca locație și ștergerea EXIF-ului înainte de publicare (D-011), contul neconfirmat (D-007), raportarea anonimă (Q-018), limita de raportări (D-006), „Termen” în loc de „SLA” pentru cetățean. Pe lângă acestea: variantele pe roluri, toate stările (inclusiv cele speciale), light / dark, telefon / desktop cu ținte de minimum 44 px, linkurile spre DS-001, DS-002 și DS-007 și datele de exemplu marcate „exemplu”.

- **Ce am primit (What I received):**  
  Un DS-003 rescris pe fișierele comune, cu stările gol, încărcare poză, se trimite, eroare, succes, text lung, GPS din poză, în afara ariei, duplicat găsit, stradă din listă și prea multe raportări. Asistentul a listat ce nu se potrivea în vechiul mock:
  - tokeni copiați și valori brute (px, hex, rgba), poligon SVG desenat de mână care cita D-003, înlocuită;
  - un duplicat inventat („18 m, acum 4 zile”), fără variantă de operator și cu butoane care nu duceau nicăieri;
  - GPS-ul din poză folosit automat, fără întrebare, și poze de pe Unsplash;
  - lipseau contul neconfirmat, vizitatorul și limita de raportări;
  - subcategoriile nu erau cele ale Primăriei;
  - ținte de 28 px și text de 14 px;
  - un contor „0 / 500” și o dată-limită neaprobate;
  - lipsea câmpul de titlu.
  
  Asistentul a mai semnalat că, în DS-002, cetățeanul autor nu urmărea automat sesizarea lui și că în `DESIGN.md` lipsea rolul `admin` din regula URL. A propus apoi ca strada să fie dedusă din pin și a extras din OpenStreetMap străzile cu o porțiune în poligon. Testul pe cele 22 de sesizări din seed a arătat că strada cea mai apropiată de pin e la toate strada din Field.md, iar la intersecții cele două străzi sunt la 3–6 m.

- **Ce am făcut cu răspunsul (What I did with the response):**  
  Am decis următoarele:
  - **Q-020:** sesizarea are un titlu obligatoriu, scris de cel care raportează (DS-002 rămâne cum e).
  - **Q-021:** la început, „Stradă sau reper” ca text liber obligatoriu. Am schimbat apoi decizia, pentru că pinul și strada nu erau sincronizate.
  - **D-013 (aprobată):** pinul e sursa locației. Strada se alege dintr-o listă cu cele 16 străzi din arie și se completează din pin, cu cea mai apropiată stradă („Dedusă din pin”), calculată local, fără geocodare. O stradă aleasă de mână rămâne dacă pinul e la cel mult 10 m de ea; pragul vine din testul intersecțiilor. Alegerea unei străzi centrează și evidențiază strada pe hartă, fără să mute pinul. „Reper” e un câmp separat, opțional. Liniile străzilor sunt salvate o singură dată în `docs/design/strazi.geojson`, cu atribuirea „© OpenStreetMap contributors, ODbL”. Am păstrat Strada Roma (doar 41 m în arie) și numele din OSM „Strada Boticelli”. Seed-ul păstrează strada din Field.md, inclusiv cele două intersecții (#9 și #12).
  - **Sesizarea nou creată:** un exemplu (#25) definit în `shared.js`, nu în seed. DS-002 o arată după „Vezi sesizarea”, cu reperul pe rândul „Adresă”. DS-002 s-a schimbat puțin (#25, reperul, urmărirea automată pentru cetățeanul autor), așa că trebuie să-l reconfirm.
  - **Formularul:** erorile apar doar după „Trimite” și doar la câmpurile goale, nu peste un câmp completat.
  - **Succesul:** cardul sesizării, fără altă listă dedesubt; informația despre email rămâne doar în banner.
  - **Q-022 (deschisă):** limitele de lungime ale câmpurilor și formatele, mărimea și numărul pozelor; mock-ul nu arată nicio limită până la răspuns.

  Am actualizat `CONTEXT.md` (termenul „Reper”), `DESIGN.md` (regula URL, sursele hărții, exemplul #25), `registry.yaml` (DS-003) și ledger-ul (D-013, Q-020–Q-022). Asistentul a verificat sintaxa și randarea tuturor stărilor și rolurilor cu Node și a rulat `python3 docs/agents/tools/ledger-lint.py`. Capturile de ecran nu au rulat: browserul headless a fost blocat de permisiuni. Verific DS-003 și DS-002 în browser înainte de commit.

- **Continuare (26 noiembrie 2026) — câmpul „Stradă” cu sugestii (D-014, înlocuiește D-013):**  
  Lista derulantă cu 16 străzi era greu de folosit pe telefon, așa că am cerut un PROPOSAL pentru un câmp text cu sugestii. Am aprobat D-014:
  - „Stradă” e un câmp text. Cât scriu, sub câmp apar străzile din arie care se potrivesc; pot alege o sugestie sau pot scrie tot numele.
  - Potrivirea ignoră majusculele, diacriticele și prefixele („str oslo” → „Strada Oslo”), iar „Botticelli” e acceptat ca „Strada Boticelli”.
  - Străzile valide sunt exact cele 16 din arie.
  - Cele 6 străzi cunoscute din jurul ariei (Londra, Țiglari, Deventer, Bratislava, Lacul lui Binder, Madrid) primesc „Strada nu e în aria Cartierului Tineretului.”; un nume necunoscut primește „Nu am găsit strada. Verifică numele sau mută pinul pe hartă.”. Mesajele apar la ieșirea din câmp sau la „Trimite”, nu în timp ce scriu.
  - Restul D-013 rămâne: „Dedusă din pin”, pragul de 10 m, centrarea hărții fără să sară pinul și „Reper” opțional.
  
  D-013 rămâne în ledger ca înlocuită de D-014. În DS-003 am adăugat stările „Stradă în afara ariei” și „Stradă negăsită”; starea „Stradă din listă” a devenit „Stradă scrisă de mână”. Cele 6 străzi din jur și numele „Botticelli” sunt în `docs/design/strazi.geojson`. Am cerut și ca starea Succes să arate doar cardul sesizării, fără lista de dedesubt, cu informația despre email doar în banner. Asistentul a testat cu Node normalizarea, regula de 10 m și mesajele; `python3 docs/agents/tools/ledger-lint.py` trece. Am verificat în browser: DS-003 e confirmat (`approved`), iar DS-002 e reconfirmat după modificările din această sesiune (#25, reperul, urmărirea automată pentru cetățeanul autor). Modificările au fost salvate pe branch-ul `chore/ds-003-shared`, unite în `main` și trimise pe GitHub.

## Sesiunea 6 — 27 noiembrie 2026

- **Data:** 2026-11-27
- **Ce am cerut (What I asked):**  
  Mock-urile pentru fluxul operatorului, în stilul și cu regula de legare din DS-001, DS-002 și DS-003 (fișierele comune `shared.css`, `shared.js`, `seed.js`), cu statusul `draft` și doar cu tokenii din `DESIGN.md`:
  - **DS-004**, coada de triaj: ordonată după SLA (întâi cele depășite), filtre pe status, categorie și stradă, căutare după titlu sau #id, rânduri cu poză, #id, titlu, categorie, stradă, status, SLA, persoane afectate și „posibil duplicat”; pe telefon, carduri.
  - **DS-011**, dialogul de schimbare a statusului: doar pașii permiși, motiv obligatoriu la „respinsă”, poză obligatorie la „rezolvată” (micșorată, fără EXIF), emailul grupat către urmăritori.
  - **DS-012**, dialogul de unire și anulare a unirii: regula D-005, perechea reală #15 → #14, efectul înainte de confirmare (voturi unice, comentarii, urmăritori, istoric), anularea din istoricul sesizării principale.
  
  Pentru toate: rolurile din D-012 (operatorul și adminul văd ecranele, ceilalți „Nu ai acces la această pagină”), „SLA” în loc de „Termen”, stările de bază și cele speciale, light / dark, telefon / desktop, datele de exemplu marcate „exemplu”, linkurile între ecrane și întoarcerea după fiecare dialog acolo unde eram.

- **Ce am primit (What I received):**  
  Trei mock-uri noi (`DS-004.html`, `DS-011.html`, `DS-012.html`), legate între ele și cu DS-002. Înainte să deseneze, asistentul mi-a pus două întrebări, pe rând:
  - **Q-023:** ce pași de status sunt permiși. Brief-ul dă doar „nouă → confirmată → în lucru → rezolvată / respinsă”, iar DS-002 arăta deja #10 trecută direct din nouă în respinsă.
  - **Q-024:** dacă unirea și anularea ei trimit email.
  
  A mai semnalat:
  - perechea #15 → #14 are, în seed, 4 + 2 voturi; votul comun e contul seed care le-a raportat pe amândouă (raportarea e votul autorului, Q-016), deci 5 persoane afectate, exact ca în DS-002;
  - D-005 spune că și pozele se adună la sesizarea principală, dar DS-002 nu arată încă poza lui #15 la #14;
  - `registry.yaml` nu era YAML valid (două descrieri cu „: ” fără ghilimele, la DS-009 și DS-014);
  - `index.html` nu încărca `seed.js`, deci arunca o eroare în consolă.

- **Ce am făcut cu răspunsul (What I did with the response):**  
  Am decis următoarele:
  - **Q-023:** înainte câte un pas, „respinsă” din orice status deschis și, în plus, redeschiderea unei sesizări rezolvate sau respinse (înapoi la „confirmată”), cu motiv obligatoriu.
  - **Q-024:** da, ca la orice schimbare de status: urmăritorii sesizării secundare primesc emailul grupat; cei ai principalei, nu.
  - **Q-025 (deschisă):** ce arată coada implicit și cum se ordonează la egalitate. Propunerea, desenată în DS-004: implicit doar sesizările deschise; la același SLA, întâi cele cu mai multe persoane afectate, apoi #id-ul mai mic.
  
  Asistentul a scris o propunere de decizie (PROPOSAL) pentru Q-023 și Q-024, în așteptarea aprobării mele, și a adăugat PATTERN-003 (`candidate`): un dialog se deschide peste ecranul de unde vine și se întoarce la el. A actualizat `registry.yaml` (DS-004, DS-011, DS-012 în `draft`; DS-014 cu emailul la unire), `SCREENS` din `shared.js` și ledger-ul, și a reparat YAML-ul și `index.html`. A verificat cu Node toate stările × rolurile × mărimile celor trei mock-uri (1.620 de randări, fără erori, fără „undefined” sau „NaN”) și că DS-001, DS-002, DS-003 și `index.html` rulează cu noul `shared.js`. `python3 docs/agents/tools/ledger-lint.py` trece. Capturile de ecran nu au rulat: browserul headless a fost blocat de permisiuni. Verific mock-urile în browser înainte de commit; nimic nu e încă salvat într-un commit (branch-ul `chore/ds-004-011-012`).

- **Continuare (27 noiembrie 2026) — D-015, confirmări și DS-002:**  
  Am verificat mock-urile în browser și am decis următoarele:
  - **D-015 (aprobată):** pașii de status și emailurile la unire, din Q-023 și Q-024, cu două completări: la redeschidere, SLA-ul pornește din nou de la data redeschiderii; timpul mediu de rezolvare din statistici (DS-005) se calculează de la raportare până la ultima rezolvare.
  - **Q-025 (confirmată):** implicit, coada arată doar sesizările deschise; la același SLA, întâi cele cu mai multe persoane afectate, apoi #id-ul mai mic.
  - **PATTERN-003:** aprobat.
  - **Tokenul `--color-overlay`**, adăugat în `DESIGN.md` pentru fundalul estompat al dialogurilor: light `#0f172a99`, dark `#000000b3`. Contrastul verificat al marginii dialogului față de ecranul estompat: light, suprafața dialogului ≥ 4,69:1; dark, bordura de 1 px `--color-border-input` ≥ 5,65:1.
  - **DS-002 (rămâne `approved`):** la #14, după unire, galeria arată și poza lui #15 („Din #15”, conform D-005); starea nouă „Unire anulată” arată pasul în cronologia ambelor sesizări, marcat „exemplu”. DS-012 duce la ea după anularea unirii.
  - **DS-004, DS-011, DS-012:** confirmate (`approved`).
  
  Asistentul a verificat din nou cu Node toate stările × rolurile × mărimile celor patru mock-uri (2.340 de randări, fără erori). `python3 docs/agents/tools/ledger-lint.py` trece. Modificările au fost salvate pe branch-ul `chore/ds-004-011-012`, unite în `main` și trimise pe GitHub.
