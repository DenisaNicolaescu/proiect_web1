# P08 · Harta sesizărilor din cartier cu workflow
> **Cartierul Tineretului, Sibiu** — Platformă civică locală pentru raportarea, votarea, trierea și urmărirea problemelor din cartier, integrată cu workflow administrativ, SLA în zile lucrătoare și detecție spațială a duplicatelor.

---

## 1. Prezentare generală

Aplicația este construită pe baza cerințelor din [docs/brief.md](file:///home/deny/proiect_web1/docs/brief.md) și a cercetării reale de teren desfășurate în **Cartierul Tineretului, Sibiu**:
- **Cercetare de teren:** 24 de sesizări reale culese la fața locului, dintre care 22 sunt în aria proiectului și intră în seed (#06 și #24 sunt în afara poligonului, D-009) (gropi, capace de canal, trotuare surpate, mașini pe trotuar, cabluri electrice expuse, animale fără stăpân) documentate cu coordonate GPS, descrieri și fotografii în [Field.md](file:///home/deny/proiect_web1/Field.md) și [docs/field_photos/](file:///home/deny/proiect_web1/docs/field_photos/) (originalele .heic, cu EXIF și GPS, sunt doar locale, D-010; în repo sunt doar imagini fără EXIF).
- **Interviuri cu cetățenii:** 5 vecini intervievați din Cartierul Tineretului (Aleea Monet, Str. Viena), evidențiind bariere reale: lipsa de feedback, teama de tensiuni între vecini (necesitatea raportării anonime) și dorința de a susține problemele printr-un simplu vot ([Interview.md](file:///home/deny/proiect_web1/Interview.md)).
- **Validare administrativă:** Răspunsul oficial al Primăriei Municipiului Sibiu (înregistrat cu nr. **93006/16.11.2026** în [Interview.md](file:///home/deny/proiect_web1/Interview.md)), oferind taxonomia completă de 14 categorii oficiale și intervalul general de intervenție („de la 1–3 zile lucrătoare la 6 luni – 1 an”). SLA-urile pe categorie sunt estimări proprii ale proiectului, încă nevalidate (Q-007).

---

## 2. Variabilele de proiect (P08)

### 2.1. Aria cartierului (Neighborhood Polygon)
- **Delimitare:** Poligon închis ce cuprinde străzile din Cartierul Tineretului documentate în cercetarea de teren (~10 străzi: *Aleea Monet, Str. Viena, Str. Rembrandt, Str. Michelangelo, Str. Orhideelor, Str. Oslo, Str. Klagenfurt, Str. Picasso, Str. Lisabona* etc.), desenat pe geojson.io; aria este exact acest poligon, fără buffer.
- **Validare strictă:** Poligonul este afișat pe hartă. Orice încercare de raportare sau plasare a pin-ului în afara acestui perimetru este **blocată strict** atât pe client, cât și pe server, afișând mesajul explicit:
  > *"Locația selectată este în afara ariei Cartierului Tineretului"*.
- **Fișier:** `docs/design/cartier.geojson` — singura sursă a poligonului pentru client, server și seed.
- **Sesizări în afara ariei:** #06 (0,1 m) și #24 (7,0 m) rămân în Field.md, marcate „în afara ariei proiectului – exclusă din seed”.
- **Decizie:** [D-009](file:///home/deny/proiect_web1/docs/agents/DECISIONS.md#d-009--neighbourhood-area-is-the-owner-drawn-polygon-without-buffer), care înlocuiește [D-003](file:///home/deny/proiect_web1/docs/agents/DECISIONS.md#d-003--cartierul-tineretului-polygon-boundary-enforcement).

### 2.2. Taxonomie categorii & Motor de calcul SLA în zile lucrătoare
- **Categorii oficiale:** Sunt implementate toate cele 14 categorii și subcategoriile aferente comunicate de Primăria Sibiu.
- **SLA-uri (estimări proprii):** Valorile de mai jos au fost stabilite de autoare pornind de la intervalul comunicat de Primărie („de la 1–3 zile lucrătoare la 6 luni – 1 an”). Nu sunt comunicate de Primărie și urmează să fie validate cu Primăria sau asociația ([Q-007](docs/agents/questions/data-and-seed.md)).
  1. *Animale pe domeniu public* — **3 zile lucrătoare**
  2. *Salubritate* — **3 zile lucrătoare**
  3. *Utilități (apă, canalizare, gaz, electricitate)* — **5 zile lucrătoare**
  4. *Trafic auto, semne de circulație și parcări* — **5 zile lucrătoare**
  5. *Fumat în spații interzise* — **5 zile lucrătoare**
  6. *Transport în comun* — **10 zile lucrătoare**
  7. *Angajați în serviciul public* — **10 zile lucrătoare**
  8. *Vandalism* — **15 zile lucrătoare**
  9. *Parcuri și spații verzi* — **15 zile lucrătoare**
  10. *Bicicliști* — **15 zile lucrătoare**
  11. *Protecția Mediului* — **15 zile lucrătoare**
  12. *Străzi și iluminat* (gropi, trotuare, iluminat defect) — **30 zile lucrătoare**
  13. *Construcții* — **30 zile lucrătoare**
  14. *Diverse* — **30 zile lucrătoare**
- **SLA Granularity:** SLA-ul este configurat la nivelul categoriei principale și moștenit de subcategorii.
- **Calcul zile lucrătoare:** Zilele lucrătoare sunt calculate strict excluzând weekend-urile și sărbătorile legale din România (inclusiv sărbătorile cu dată mobilă: Paștele ortodox și Rusaliile, calculate prin algoritmul Meeus/Jones/Butcher).
- **Integritate:** Adminul poate modifica SLA-ul unei categorii din panoul de administrare. Operatorii nu pot modifica SLA-ul și nu pot suprascrie manual termenul calculat, asigurând indicatori obiectivi de depășire și statistici publice reale.
- **Decizie:** [D-004](file:///home/deny/proiect_web1/docs/agents/DECISIONS.md#d-004--12-primăria-categories-and-romanian-statutory-working-day-sla-engine).

### 2.3. Detecție duplicate & Fuziune reversibilă (Twist P08)
- **Praguri fixe:** Aceeași categorie principală, distanță `< 50 m`, înregistrată în ultimele `30 de zile calendaristice`. Pragurile sunt setate în configurarea serverului, nu din interfață.
- **Flux la raportare:** La detectarea duplicatelor, cetățeanului i se afișează un card de sugestie: *"Există deja o sesizare similară în apropiere — votează-o pentru a crește prioritatea"*, având opțiunea de a vota sesizarea existentă sau de a confirma explicit *"Este o problemă diferită, trimite oricum"*.
- **Fuziune reversibilă (Operator):**
  - Sesizarea secundară (B) este unită în sesizarea principală (A): statusul lui B devine `fuzionată`, pin-ul lui B este ascuns de pe harta principală pentru a evita aglomerarea, iar pagina lui B afișează un banner cu trimitere către A și opțiunea de unmerge.
  - **Păstrarea voturilor:** Rândurile de vot din baza de date **nu se șterg și nu se rescriu**. Voturile unice pe sesizarea A sunt calculate dinamic ca `COUNT(DISTINCT user_id)` peste A și sesizările fuzionate în ea (dacă Utilizatorul X a votat ambele sesizări, se contorizează ca 1 singur vot unic).
  - **Comentarii, fotografii și urmăritori:** Sunt agregate pe sesizarea A cu etichetă de proveniență (*"Din sesizarea #B"*). Urmăritorii lui B primesc notificări când A își schimbă statusul.
  - **Desfacerea fuziunii (Unmerge):** La desfacerea fuziunii, sesizarea B își recapătă statusul anterior (ex. `nouă` sau `confirmată`), voturile fiecărei sesizări revin la valorile originale, iar comentariile și urmăritorii revin la sesizarea lor de origine.
- **Decizie:** [D-005](file:///home/deny/proiect_web1/docs/agents/DECISIONS.md#d-005--spatial-duplicate-detection-and-reversible-merge-architecture).

### 2.4. Autentificare, Confidențialitate (Raportare Anonimă) & Anti-Spam
- **Autentificare obligatorie:** Toate acțiunile cu impact (raportare, vot, comentarii, abonare notificări) necesită cont autentificat (`user_id`).
- **Raportare opțional anonimă:** La raportare, cetățeanul poate bifa *"Raportează anonim"*. Numele și emailul său sunt ascunse complet de pe hartă, detaliul sesizării și exporturile publice (afișat ca *"Cetățean anonim"*), protejând intimitatea vecinilor (solicitare Neighbor #2 V.D.), în timp ce sistemul păstrează identificatorul intern pentru responsabilitate și anti-spam.
- **Confirmarea emailului:** Obligatorie la înregistrare. Până la confirmare, contul se poate autentifica, dar nu poate raporta, vota, comenta sau urmări. O adresă de email are un singur cont ([D-007](file:///home/deny/proiect_web1/docs/agents/DECISIONS.md)).
- **Roluri ierarhice:** Cetățean < Operator < Admin; fiecare rol poate face tot ce face rolul de sub el, cu o excepție: operatorul și adminul nu votează și nu urmăresc sesizări, ca triajul să nu influențeze prioritatea (văd doar numărul de persoane afectate și urmăresc sesizările din coada de triaj). Vizitatorul (nelogat) doar vizualizează și nu este un rol de cont ([D-012](file:///home/deny/proiect_web1/docs/agents/DECISIONS.md)).
- **Un vot per utilizator:** Garantat prin constrângere unică pe `(issue_id, user_id)`.
- **Rate limiting anti-spam:**
  - Raportare: maximum 5 sesizări / 10 minute per utilizator / IP.
  - Votare: maximum 30 voturi / 10 minute per utilizator / IP.
  - Comentarii: maximum 10 comentarii / 10 minute per utilizator / IP.
  - Protecție împotriva roboților: câmp ascuns honeypot pe formulare (fără CAPTCHA intruziv).
- **Decizie:** [D-006](file:///home/deny/proiect_web1/docs/agents/DECISIONS.md#d-006--mandatory-authentication-with-public-anonymity-and-anti-spam-rate-limiting).

---

## 3. Arhitectură și Stack Tehnologic

- **Server:** Node.js cu TypeScript (Express sau Fastify), API RESTful modular.
- **Client:** React cu TypeScript (Vite), Tailwind CSS / tokens de design, Leaflet.js cu OpenStreetMap și clustering de markere.
- **Bază de date:** PostgreSQL cu extensia **PostGIS** (`geography(Point, 4326)` cu index spațial `GIST` pentru interogări instantanee `ST_DWithin` la 50m și `ST_Contains` pentru poligon).
- **Procesare imagini:** `sharp` + `exifr` + `heic-convert` pe server:
  1. Extracția automată a coordonatelor GPS din metadatele EXIF ale fotografiilor (inclusiv formate `.heic` culese pe teren) ca sugestie de locație.
  2. Ștergerea completă a metadatelor EXIF (inclusiv GPS) înainte de salvarea publică.
  3. Redimensionare și optimizare web (JPEG/WebP).
  - Seed-ul trece prin același proces ca o poză încărcată (D-011); GPS-ul din EXIF doar verifică coordonatele din Field.md (abatere > 10 m oprește seed-ul). Fără originale, seed-ul folosește JPEG-urile fără EXIF din repo.
- **Notificări prin email:** Job de fundal ce rulează la 5 minute, grupând până la 10 schimbări de status per utilizator într-o singură notificare. Mediu de dezvoltare configurat implicit cu transport local (Mailpit / preview log).
- **Decizie:** [D-002](file:///home/deny/proiect_web1/docs/agents/DECISIONS.md#d-002--full-stack-technology-stack-nodejs-react-postgresqlpostgis).

---

## 4. Ecrane (Views)

Lista completă, cu ID-uri DS-, este în [docs/design/registry.yaml](file:///home/deny/proiect_web1/docs/design/registry.yaml). Fiecare rol vede și ecranele rolurilor de sub el (D-012).

- **Public (Vizitator):** DS-001 Hartă și listă (filtre, clustere, export CSV / GeoJSON) · DS-002 Detaliu sesizare (cu variante pe roluri) · DS-005 Statistici publice.
- **Autentificare (Vizitator):** DS-007 Autentificare și înregistrare (cu confirmarea emailului) · DS-008 Resetare parolă.
- **Cetățean:** DS-003 Raportare (cu sugestia „există deja, votează-o”) · DS-009 Sesizările mele (raportate și urmărite) · DS-010 Profil și notificări · DS-014 Emailul de notificare grupată.
- **Operator:** DS-004 Coada de triaj · DS-011 Schimbare status · DS-012 Unire și anulare unire; panoul operatorului din DS-002.
- **Admin:** DS-006 Categorii și SLA · DS-013 Utilizatori și roluri.

---

## 5. Ce este explicit în afara scopului (OUT OF SCOPE)

Pentru a menține proiectul focalizat pe cerințele academice și ale asociației de cartier:
- **Integrarea directă prin API cu sistemele interne ale Primăriei Sibiu / Sibiu City App:** Platforma este independentă, dedicată asociației de cartier.
- **Aplicații native de mobil (iOS / Android):** Se construiește o aplicație web complet responsivă (mobile-friendly).
- **Notificări prin SMS:** Notificările se transmit exclusiv prin email (job grupat).
- **Procesare de plăți / donații:** Nu există tranzacții financiare în aplicație.

---

## 6. Comenzi utile & Ghid de dezvoltare

```bash
# Verificare integritate ledger (decizii, patterns, întrebări)
python3 docs/agents/tools/ledger-lint.py

# Reconstruire index ledger
python3 docs/agents/tools/ledger-lint.py --fix
```

Toate regulile de dezvoltare și constrângerile sunt guvernate în [AGENTS.md](file:///home/deny/proiect_web1/AGENTS.md), [docs/agents/DECISIONS.md](file:///home/deny/proiect_web1/docs/agents/DECISIONS.md), [docs/agents/PATTERNS.md](file:///home/deny/proiect_web1/docs/agents/PATTERNS.md) și [CONTEXT.md](file:///home/deny/proiect_web1/CONTEXT.md).
