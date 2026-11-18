P08 · Harta sesizărilor din cartier cu workflow

Pe scurt: platformă de sesizări civice pentru cartierul tău: raportezi cu poză și locație, votezi, urmărești statusul, iar un "operator" le triază cu termene de rezolvare.

Input uman obligatoriu
Fișa de teren: te plimbi prin cartierul tău și documentezi minim 20 de probleme reale (gropi, iluminat, gunoi, trotuare, graffiti, bănci rupte) cu poză, coordonate și data; ele devin seed-ul. Interviu cu 5 vecini: ce i-ar face să raporteze, de ce nu sună la primărie. Încerci să vorbești cu cineva de la primărie / asociația de proprietari / un ONG local despre cum ar tria sesizările; dacă nu reușești, documentezi încercarea (cui ai scris, când). FIELD.md + INTERVIEW.md.

Context real
Platformele naționale există, dar nimeni din cartier nu le folosește și nimeni nu știe dacă s-a rezolvat ceva. Tu faci versiunea pentru 10 străzi, cu suficient workflow cât să poată fi preluată de o asociație de cartier.

Cerințe funcționale (must)
Raportare: categorie, descriere, poză (upload), locație (pin pe hartă sau GPS din browser), optional anonim.
Harta cu clustere, filtre pe categorie / status / vârstă, listă și detaliu per sesizare.
Vot "mă afectează și pe mine" (un vot per utilizator), comentarii, urmărire (notificare la schimbare de status).
Workflow de status: nouă → confirmată → în lucru → rezolvată / respinsă, cu motiv la respingere și poză la rezolvare; doar operatorii schimbă statusul.
Detecție de duplicate la raportare (aceeași categorie, sub 50 m, în ultimele 30 de zile) cu sugestie "există deja, votează-o"; operatorul poate uni două sesizări păstrând voturile și comentariile.
Termene (SLA) per categorie (ex: groapă 30 de zile lucrătoare), indicator de depășire, pagină publică de statistici (timp mediu de rezolvare, procent rezolvate, pe categorie).
Export CSV / GeoJSON pentru toate sesizările publice.
Roluri: cetățean, operator, admin (categorii, SLA-uri, utilizatori).

Cerințe tehnice specifice
Interogări geospațiale: "sesizări pe o rază de 50 m" cu PostGIS sau cu formula haversine + index; test pe un set de puncte cunoscute.
Pozele: redimensionare pe server, ștergerea metadatelor EXIF (inclusiv GPS) înainte de a le servi public; extragerea GPS-ului din EXIF se face înainte, ca sugestie de locație.
Rate limiting pe raportare și vot (anti-spam).
Notificări prin email la schimbări de status, din job, cu grupare (o singură notificare la 10 schimbări în 5 minute).

Twist: zile lucrătoare, duplicate și fuziuni
SLA-ul se calculează în zile lucrătoare, deci ai nevoie de calendarul sărbătorilor legale din România (inclusiv cele variabile: Paștele ortodox, Rusaliile) și de o funcție testată "adaugă N zile lucrătoare". Duplicatele se detectează spatial și temporal, iar fuziunea a două sesizări trebuie să păstreze voturile unice (același om a votat pe amândouă = un vot), comentariile, urmăritorii și istoricul de status, și să fie reversibilă (un operator a unit greșit).

Variabilele tale
Cartierul (poligonul lui pe hartă) și cele 20 de sesizări reale.
Categoriile și SLA-urile (ideal, validate de cineva de la primărie / asociație).
Pragul de distanță și de timp pentru duplicate.

Definition of Done
Cele 20 de sesizări reale sunt pe hartă live, cu poze fără EXIF.
Duplicatele sunt sugerate la raportare; fuziunea păstrează corect voturile (teste).
SLA-ul în zile lucrătoare e corect în jurul Paștelui și al 1 Decembrie (teste).
Un operator poate tria o săptămână de sesizări doar din aplicație.
Statisticile publice se calculează din date, nu sunt hardcodate.

La susținere te întrebăm
Cum găsești sesizările pe o rază de 50 m și cât costă interogarea la 10.000 de sesizări?
Cum calculezi Paștele ortodox și unde ai testul?
Ce se întâmplă cu voturile când unești două sesizări și apoi le desfaci?



