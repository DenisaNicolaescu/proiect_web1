/* docs/design/mocks/seed.js — the data every mock shares (rule: DESIGN.md → Linking mocks).
   The 22 sesizări of Field.md inside aria cartierului (D-009; #06 and #24 are excluded), newest first (Q-015).
   From Field.md: id, GPS, title, category, subcategory, street, time (all on 15 nov 2026) and the description, verbatim.
   Example values for the mocks (not in Field.md): st (status), sla and votes. Today in the mocks = 25 nov 2026.
   sla: {left:n} = in time (working days left), {over:n} = termen depășit; none for rezolvată / respinsă.
   Author: every seed sesizare was documented on the field by one seed account, "Denisa N." (the project owner's choice, 2026-11-26). */

// Neighbourhood polygon: copy of docs/design/cartier.geojson (a mock cannot always fetch it; the app loads the file)
const CARTIER = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[24.1319945,45.8169214],[24.1323901,45.8171144],[24.1327857,45.8166916],[24.1369003,45.8143202],[24.1344606,45.8128496],[24.1306494,45.8141824],[24.1302933,45.8146511],[24.1307285,45.8158368],[24.1308735,45.816324],[24.1319945,45.8169214]]]}}]};

const SEED_AUTHOR = 'Denisa N.';
const SEED_DATE = '15 nov 2026';

const SEED = [
    { id: 23, lat: 45.81628, lon: 24.13156, title: 'Cablu electric de încărcare auto întins pe trotuar din proprietate privată', cat: 'Străzi și iluminat', sub: 'Altele - Străzi și Iluminat', street: 'Strada Viena', st: 'noua', sla: { left: 22 }, votes: 2, time: '13:03',
      desc: 'Cablu de alimentare tras direct din curte peste întreaga lățime a trotuarului pietonal până la un autoturism staționat la bordură, fără protecție de cablu, creând pericol de împiedicare și electrocutare.' },
    { id: 22, lat: 45.81610, lon: 24.13122, title: 'Groapă dreptunghiulară pe carosabil lângă bordură', cat: 'Străzi și iluminat', sub: 'Groapă', street: 'Strada Viena', st: 'in-lucru', sla: { left: 22 }, votes: 4, time: '13:02',
      desc: 'Porțiune dreptunghiulară de asfalt decopertat în urma unor lucrări, lăsată neasfaltată și denivelată chiar în zona de viraj lângă bordură, prezentând risc pentru autovehicule și bicicliști.' },
    { id: 21, lat: 45.81651, lon: 24.13238, title: 'Autoturism parcat neregulamentar complet pe trotuar', cat: 'Trafic auto, semne de circulație și parcări', sub: 'Parcare neregulamentară', street: 'Strada Viena', st: 'noua', sla: { over: 3 }, votes: 3, time: '13:01',
      desc: 'Autoturism staționat integral pe trotuarul îngust, blocând complet trecerea pietonilor și a cărucioarelor și obligându-i să circule pe carosabil.' },
    { id: 20, lat: 45.81658, lon: 24.13263, title: 'Autoutilitară parcată pe trotuar în intersecție', cat: 'Trafic auto, semne de circulație și parcări', sub: 'Parcare neregulamentară', street: 'Strada Rembrandt', st: 'rezolvata', votes: 6, time: '13:00',
      desc: 'Sesizare din unghi suplimentar pentru autoutilitara staționată pe trotuar in intesectie, facand asigurarea soferilor aproape imposibila, la fel si trecerea pietonilor pe trotuar, fiind foratati sa mearga pe carosabil.' },
    { id: 19, lat: 45.81652, lon: 24.13270, title: 'Trotuar degradat și invadat de buruieni', cat: 'Străzi și iluminat', sub: 'Trotuar deteriorat', street: 'Strada Rembrandt', st: 'noua', sla: { left: 22 }, votes: 2, time: '13:00',
      desc: 'Trotuar pietonal foarte deteriorat, cu asfaltul distrus și vegetație/buruieni crescute pe aproape toată suprafața de mers din fața gardului.' },
    { id: 18, lat: 45.81488, lon: 24.13294, title: 'Câine de talie mare lăsat liber pe stradă', cat: 'Animale pe domeniu public', sub: 'Animal fără lesă', street: 'Strada Klagenfurt', st: 'rezolvata', votes: 3, time: '12:57',
      desc: 'Câine de talie mare nesupravegheat, fără lesă, circulând liber pe trotuar și pe partea carosabilă printre mașini.' },
    { id: 17, lat: 45.81414, lon: 24.13228, title: 'Cablu electric întins peste trotuar între proprietate și un autoturism parcat', cat: 'Străzi și iluminat', sub: 'Altele - Străzi și Iluminat', street: 'Strada Klagenfurt', st: 'confirmata', sla: { left: 22 }, votes: 11, time: '12:55',
      desc: 'Cablu de alimentare tras direct din curte peste întreaga lățime a trotuarului pietonal până la un autoturism staționat la bordură, fără protecție de cablu, creând pericol de împiedicare și electrocutare.' },
    { id: 16, lat: 45.81438, lon: 24.13122, title: 'Groapa cu nisip din locul de joacă neîngrijită, cu deșeuri și buruieni', cat: 'Parcuri și spații verzi', sub: 'Loc de joacă deteriorat', street: 'Strada Picasso', st: 'noua', sla: { left: 7 }, votes: 8, time: '12:53',
      desc: 'Groapa cu nisip din spațiul de joacă pentru copii are pahare și ambalaje aruncate în nisip, buruieni crescute în interior și margini din lemn deteriorat, prezentând risc igienic și de accidentare pentru copii.' },
    { id: 15, lat: 45.81424, lon: 24.13169, title: 'Trotuar crăpat cu o groapă interioară surpată și vegetație crescută', cat: 'Străzi și iluminat', sub: 'Trotuar deteriorat', street: 'Strada Picasso', st: 'noua', sla: { left: 22 }, votes: 2, time: '12:51',
      desc: 'Porțiune de trotuar cu asfaltul rupt și tasat de-a lungul bordurii, unde s-a format un șanț adânc cu pietriș desprins și vegetație crescută prin fisuri.' },
    { id: 14, lat: 45.81410, lon: 24.13214, title: 'Trotuar pietonal fisurat și tasat pe o porțiune extinsă', cat: 'Străzi și iluminat', sub: 'Trotuar deteriorat', street: 'Strada Picasso', st: 'confirmata', sla: { left: 22 }, votes: 4, time: '12:51',
      desc: 'Asfaltul trotuarului prezintă fisuri multiple, tasări pronunțate și buruieni crescute prin crăpături pe o lungime de câțiva metri, îngreunând deplasarea pietonilor.' },
    { id: 13, lat: 45.81434, lon: 24.13326, title: 'Groapă cu pietriș desprins', cat: 'Străzi și iluminat', sub: 'Groapă', street: 'Strada Oslo', st: 'in-lucru', sla: { left: 22 }, votes: 7, time: '12:49',
      desc: 'Groapă adâncă pe carosabil cu stratul de asfalt măcinat și pietre, însoțită de fisuri' },
    { id: 12, lat: 45.81460, lon: 24.13264, title: 'Canal astupat de noroi și adâncit în asfalt', cat: 'Străzi și iluminat', sub: 'Capac canalizare lipsă / defect', street: 'Strada Oslo / Strada Klagenfurt', st: 'noua', sla: { left: 22 }, votes: 6, time: '12:48',
      desc: 'Capac de canal acoperit aproape complet cu noroi si adancit, fiind aproape imposibil de depistat groapa pe care a format-o' },
    { id: 11, lat: 45.81479, lon: 24.13206, title: 'Autoutilitară parcată parțial pe trotuar lângă cutiile de utilități', cat: 'Trafic auto, semne de circulație și parcări', sub: 'Parcare neregulamentară', street: 'Strada Oslo', st: 'confirmata', sla: { over: 3 }, votes: 5, time: '12:47',
      desc: 'Autoutilitară parcata pe trotuar într-un punct deja îngustat de firidele de gaze/electricitate, lăsând un spațiu foarte strâmt pentru pietoni și blocând trecerea cu căruciorul.' },
    { id: 10, lat: 45.81498, lon: 24.13156, title: 'Asfalt măcinat lângă bordură', cat: 'Străzi și iluminat', sub: 'Groapă', street: 'Strada Oslo', st: 'respinsa', votes: 1, time: '12:46',
      desc: 'Asfaltul de lângă bordură este măcinat cu pietriș/asfalt desprins, iar denivelarea carosabilului prezinta un pericol pentru autovehiculele care circula in zona sau a pietonilor care coboara/urca din/in autobuz.' },
    { id: 9, lat: 45.81583, lon: 24.13289, title: 'Indicator stradal ruginit și deteriorat', cat: 'Trafic auto, semne de circulație și parcări', sub: 'Semn de circulație lipsă sau deteriorat', street: 'Strada Orhideelor / Strada Lisabona', st: 'in-lucru', sla: { over: 3 }, votes: 2, time: '12:44',
      desc: 'Plăcuța indicatoare cu numele străzii („STR. ORHIDEELOR”) este ruginită, decolorată și parțial îndoită/deteriorată, fiind greu lizibilă.' },
    { id: 8, lat: 45.81570, lon: 24.13334, title: 'Teren neîntreținut cu vegetație uscată și grămezi de pietriș', cat: 'Parcuri și spații verzi', sub: 'Spațiu verde neîngrijit', street: 'Strada Orhideelor', st: 'noua', sla: { left: 7 }, votes: 1, time: '12:43',
      desc: 'Parcelă neîmprejmuită la nivelul trotuarului, invadată de buruieni și vegetație uscată înaltă, cu grămezi de pietris lasate aproape de trotuar' },
    { id: 7, lat: 45.81460, lon: 24.13635, title: 'Capac de canalizare asfaltat peste și tasat în carosabil', cat: 'Străzi și iluminat', sub: 'Capac canalizare lipsă / defect', street: 'Strada Orhideelor', st: 'noua', sla: { left: 22 }, votes: 1, time: '12:39',
      desc: 'Capac de canal acoperit aproape complet cu asfalt, unde stratul rutier s-a fisurat circular și s-a tasat, existând riscul desprinderii bucăților de asfalt.' },
    { id: 5, lat: 45.81476, lon: 24.13595, title: 'Autoutilitară parcată complet pe trotuar', cat: 'Trafic auto, semne de circulație și parcări', sub: 'Parcare neregulamentară', street: 'Strada Orhideelor', st: 'noua', sla: { over: 3 }, votes: 9, time: '12:38',
      desc: 'Autoutilitară staționată complet pe trotuarul pietonal, blocând integral trecerea pietonilor și obligându-i să circule pe carosabil.' },
    { id: 4, lat: 45.81523, lon: 24.13476, title: 'Capac de canalizare denivelat cu asfalt măcinat pe margine', cat: 'Străzi și iluminat', sub: 'Capac canalizare lipsă / defect', street: 'Strada Orhideelor', st: 'noua', sla: { left: 22 }, votes: 3, time: '12:36',
      desc: 'Capac de canalizare situat pe banda de rulare a carosabilului, cu asfaltul din jur crăpat, creând o denivelare periculoasă pentru autoturisme și bicicliști.' },
    { id: 3, lat: 45.81464, lon: 24.13422, title: 'Autoturism parcat neregulamentar în intersecție, lângă indicatorul STOP', cat: 'Trafic auto, semne de circulație și parcări', sub: 'Parcare neregulamentară', street: 'Strada Michelangelo', st: 'noua', sla: { over: 3 }, votes: 4, time: '12:34',
      desc: 'Autoturism parcat chiar în colțul intersecției, peste marcajul „STOP” și la mai puțin de 25 m de intersecție, blocând vizibilitatea șoferilor care pătrund pe drumul prioritar.' },
    { id: 2, lat: 45.81455, lon: 24.13427, title: 'Teren viran neîngrijit cu vegetație uscată și moloz depozitat', cat: 'Parcuri și spații verzi', sub: 'Spațiu verde neîngrijit', street: 'Strada Michelangelo', st: 'confirmata', sla: { left: 7 }, votes: 3, time: '12:34',
      desc: 'Parcelă neîmprejmuită la nivelul trotuarului, invadată de buruieni și vegetație uscată înaltă, cu grămezi de pământ și resturi de materiale depozitate lângă trotuar.' },
    { id: 1, lat: 45.81419, lon: 24.13381, title: 'Asfalt surpat în jurul capacului de canal și bordură deteriorată', cat: 'Străzi și iluminat', sub: 'Capac canalizare lipsă / defect', street: 'Strada Michelangelo', st: 'confirmata', sla: { left: 22 }, votes: 12, time: '12:32',
      desc: 'Surpare adâncă a stratului de asfalt exact în jurul unui capac de canalizare la colțul intersecției' },
];
