/* docs/design/mocks/shared.js — shared behaviour of every mock (DESIGN.md → Linking mocks).
   Load order in a mock: shared.css, then (Leaflet if the mock has a map), then seed.js and shared.js
   at the end of <body>, then the mock's own script.
   - SCREENS: every screen of registry.yaml, with its status and mock file (update it with the registry).
   - The icon sprite, text helpers, status badges and the termen / SLA texts.
   - URL parameters: rol, tema, marime are kept from one mock to the next; stare and id belong to one mock.
   - The mock control bar and the app header, the same in every mock. */

/* ── Screens (copy of docs/design/registry.yaml: id, status, roles) ──────── */
const SCREEN_GROUPS = [
  ['public', 'Public: vizitator și toate rolurile cu cont'],
  ['auth', 'Autentificare: vizitator'],
  ['cetatean', 'Cetățean'],
  ['operator', 'Operator'],
  ['admin', 'Admin'],
];
const SCREENS = [
  { id: 'DS-001', ro: 'Hartă și listă', name: 'Map & List', group: 'public', status: 'approved', file: 'DS-001.html' },
  { id: 'DS-002', ro: 'Detaliul sesizării', name: 'Sesizare Detail', group: 'public', status: 'approved', file: 'DS-002.html' },
  { id: 'DS-005', ro: 'Statistici publice', name: 'Public Statistics', group: 'public', status: 'planned' },
  { id: 'DS-007', ro: 'Intră în cont și înregistrare', name: 'Sign In & Register', group: 'auth', status: 'planned' },
  { id: 'DS-008', ro: 'Resetarea parolei', name: 'Password Reset', group: 'auth', status: 'planned' },
  // DS-003 was drawn before the shared files: it does not read rol / tema / marime yet
  { id: 'DS-003', ro: 'Raportează o sesizare', name: 'Report a Sesizare', group: 'cetatean', status: 'draft', file: 'DS-003.html', legacy: true },
  { id: 'DS-009', ro: 'Sesizările mele', name: 'My Sesizări', group: 'cetatean', status: 'planned' },
  { id: 'DS-010', ro: 'Profil și notificări', name: 'Profile & Notifications', group: 'cetatean', status: 'planned' },
  { id: 'DS-014', ro: 'Email grupat de notificare', name: 'Grouped Notification Email', group: 'cetatean', status: 'planned' },
  { id: 'DS-004', ro: 'Coada de triaj', name: 'Triage Queue', group: 'operator', status: 'planned' },
  { id: 'DS-011', ro: 'Schimbă statusul (dialog)', name: 'Status Change Dialog', group: 'operator', status: 'planned' },
  { id: 'DS-012', ro: 'Unește și anulează unirea (dialog)', name: 'Merge & Unmerge Dialog', group: 'operator', status: 'planned' },
  { id: 'DS-006', ro: 'Categorii și SLA', name: 'Categories & SLA', group: 'admin', status: 'planned' },
  { id: 'DS-013', ro: 'Utilizatori și roluri', name: 'Users & Roles', group: 'admin', status: 'planned' },
];
const screen = id => SCREENS.find(s => s.id === id);

/* ── URL parameters ──────────────────────────────────────────────────────── */
// Kept across mocks: rol, tema, marime. The URL uses Romanian values; the mocks use S.role / S.theme / S.size.
const SIZE_TO_URL = { phone: 'telefon', desktop: 'desktop' };
const SIZE_FROM_URL = { telefon: 'phone', desktop: 'desktop' };
// A role a mock does not draw falls back to the nearest one it does (an unconfirmed account is a cetățean without actions)
const ROLE_FALLBACK = { neconfirmat: 'cetatean', admin: 'operator' };
const URLP = new URLSearchParams(location.search);

/** Reads rol / tema / marime / stare from the URL into the mock's default state. */
function mockState(defaults, { roles, states } = {}) {
  const S = { ...defaults };
  let role = URLP.get('rol');
  if (role && roles && !roles.includes(role)) role = ROLE_FALLBACK[role];
  if (role && (!roles || roles.includes(role))) S.role = role;
  const theme = URLP.get('tema');
  if (theme === 'light' || theme === 'dark') S.theme = theme;
  const size = SIZE_FROM_URL[URLP.get('marime')];
  if (size) S.size = size;
  const state = URLP.get('stare');
  if (state && (!states || states.includes(state))) S.state = state;
  return S;
}

/** The parameters that travel to another mock. */
function carried(S) {
  const p = { rol: S.role, tema: S.theme, marime: SIZE_TO_URL[S.size] };
  Object.keys(p).forEach(k => p[k] === undefined && delete p[k]);
  return p;
}

/** Writes the mock's current state back into its own URL, so a reload or a shared link opens the same view. */
function syncUrl(S, extra = {}) {
  const p = new URLSearchParams({ ...carried(S), stare: S.state, ...extra });
  history.replaceState(null, '', `${location.pathname}?${p}${location.hash}`);
}

/** Link to another screen: its mock with rol / tema / marime, or index.html when it is not drawn yet. */
function mockHref(id, extra = {}) {
  const s = screen(id);
  const p = new URLSearchParams({ ...carried(typeof S === 'undefined' ? {} : S), ...extra }); // S: the mock's state
  return s && s.file ? `${s.file}?${p}` : `index.html?${p}#${id}`;
}

/* ── Icons (stroke icons, currentColor) ──────────────────────────────────── */
document.body.insertAdjacentHTML('afterbegin', `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <symbol id="i-noua" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></symbol>
  <symbol id="i-confirmata" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></symbol>
  <symbol id="i-in-lucru" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></symbol>
  <symbol id="i-check-square" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><polyline points="17 9 10.5 15.5 7 12"/></symbol>
  <symbol id="i-image" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></symbol>
  <symbol id="i-rezolvata" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></symbol>
  <symbol id="i-respinsa" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></symbol>
  <symbol id="i-fuzionata" viewBox="0 0 24 24"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/></symbol>
  <symbol id="i-alert" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></symbol>
  <symbol id="i-excl" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="13"/><line x1="12" y1="19" x2="12.01" y2="19"/></symbol>
  <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></symbol>
  <symbol id="i-map" viewBox="0 0 24 24"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></symbol>
  <symbol id="i-list" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></symbol>
  <symbol id="i-filter" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></symbol>
  <symbol id="i-download" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></symbol>
  <symbol id="i-plus" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></symbol>
  <symbol id="i-minus" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></symbol>
  <symbol id="i-target" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="1" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="23"/><line x1="1" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="23" y2="12"/></symbol>
  <symbol id="i-user" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></symbol>
  <symbol id="i-user-off" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><line x1="2" y1="2" x2="22" y2="22"/></symbol>
  <symbol id="i-login" viewBox="0 0 24 24"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></symbol>
  <symbol id="i-x" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></symbol>
  <symbol id="i-votes" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></symbol>
  <symbol id="i-refresh" viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></symbol>
  <symbol id="i-camera" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></symbol>
  <symbol id="i-layers" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></symbol>
  <symbol id="i-chevron" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></symbol>
  <symbol id="i-back" viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></symbol>
  <symbol id="i-menu" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></symbol>
  <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></symbol>
  <symbol id="i-hourglass" viewBox="0 0 24 24"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.17a2 2 0 0 0-.59-1.42L12 12l-4.41 4.41A2 2 0 0 0 7 17.83V22"/><path d="M7 2v4.17a2 2 0 0 0 .59 1.42L12 12l4.41-4.41A2 2 0 0 0 17 6.17V2"/></symbol>
  <symbol id="i-triage" viewBox="0 0 24 24"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></symbol>
  <symbol id="i-chart" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></symbol>
  <symbol id="i-bookmark" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></symbol>
  <symbol id="i-bell" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></symbol>
  <symbol id="i-mail" viewBox="0 0 24 24"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><polyline points="22 6 12 13 2 6"/></symbol>
  <symbol id="i-comment" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></symbol>
  <symbol id="i-send" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></symbol>
  <symbol id="i-calendar" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></symbol>
  <symbol id="i-undo" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></symbol>
  <symbol id="i-lock" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></symbol>
  <symbol id="i-tag" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></symbol>
  <symbol id="i-pin" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></symbol>
  <symbol id="i-area" viewBox="0 0 24 24"><polygon points="3 7 12 3 21 8 20 18 9 21 3 15" stroke-dasharray="3 2"/></symbol>
  <symbol id="i-grid" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></symbol>
</svg>`);

/* ── Text helpers ────────────────────────────────────────────────────────── */
const ic = (id, cls = '') => `<svg class="i ${cls}" aria-hidden="true"><use href="#${id}"/></svg>`;
const fmt = n => n.toLocaleString('ro-RO');
// Romanian numerals: 20+ (and round hundreds) take "de"
const de = n => (n % 100 >= 20 || (n > 0 && n % 100 === 0)) ? 'de ' : '';
const plural = (n, one, many) => n === 1 ? `1 ${one}` : `${fmt(n)} ${de(n)}${many}`;
// Primăria names its catch-all subcategory "Altele - <categorie>"; it is shown by its own name only
const subName = sub => sub.startsWith('Altele - ') ? 'Altele' : sub;

/* ── Statuses, termen and SLA ────────────────────────────────────────────── */
// The five statuses a filter offers; fuzionată is not filterable: merged pins are hidden from the map (D-005, Q-012)
const STATUS = {
  'noua':       { name: 'Nouă',       icon: 'i-noua' },
  'confirmata': { name: 'Confirmată', icon: 'i-confirmata' },
  'in-lucru':   { name: 'În lucru',   icon: 'i-in-lucru' },
  'rezolvata':  { name: 'Rezolvată',  icon: 'i-rezolvata' },
  'respinsa':   { name: 'Respinsă',   icon: 'i-respinsa' },
};
const STATUS_ALL = { ...STATUS, 'fuzionata': { name: 'Fuzionată', icon: 'i-fuzionata' } };
const statusBadge = st => `<span class="badge st-${st}">${ic(STATUS_ALL[st].icon)}${STATUS_ALL[st].name}</span>`;
const zile = n => plural(n, 'zi lucrătoare', 'zile lucrătoare');
// Vizitator and Cetățean see "termen", never "SLA" (CONTEXT.md → Termen)
const slaBadge = i => !i.sla ? '' : i.sla.over
  ? `<span class="badge badge-danger">${ic('i-alert')}Termen depășit cu ${zile(i.sla.over)}</span>`
  : `<span class="sla-ok">${ic('i-clock')}Mai ${i.sla.left === 1 ? 'este' : 'sunt'} ${zile(i.sla.left)}</span>`;
const slaText = i => !i.sla ? '' : i.sla.over ? `, termen depășit cu ${zile(i.sla.over)}` : ', în termen';
// Operator and Admin see "SLA" (CONTEXT.md → SLA în zile lucrătoare)
const slaOperatorBadge = i => !i.sla ? '' : i.sla.over
  ? `<span class="badge badge-danger">${ic('i-alert')}SLA depășit cu ${zile(i.sla.over)}</span>`
  : `<span class="sla-ok">${ic('i-clock')}SLA: mai ${i.sla.left === 1 ? 'este' : 'sunt'} ${zile(i.sla.left)}</span>`;
const votes = n => n === 0 ? 'Niciun vot încă' : plural(n, 'vot', 'voturi');

/* ── Mock control bar ────────────────────────────────────────────────────── */
const ROLE_LABELS = { vizitator: 'Vizitator', cetatean: 'Cetățean', neconfirmat: 'Cont neconfirmat', operator: 'Operator' };
/**
 * Renders the control bar into <header id="mock-bar">.
 * cfg: { id: 'DS-002', states: [['success','Succes'], …], roles: ['vizitator', …] }
 * The buttons carry data-ctl (state | role | size | theme) and data-v; the mock handles the clicks.
 */
function mockBar(cfg) {
  const s = screen(cfg.id);
  const seg = (ctl, items) => `<div class="seg" data-ctl="${ctl}">${items.map(([v, l]) => `<button data-v="${v}">${l}</button>`).join('')}</div>`;
  document.getElementById('mock-bar').innerHTML = `
    <div class="mock-group"><span class="mock-id">${s.id}</span><strong>${s.ro}</strong><span class="mock-status">${s.status}</span></div>
    <div class="mock-group"><span>Stare</span>${seg('state', cfg.states)}</div>
    <div class="mock-group"><span>Rol</span>${seg('role', cfg.roles.map(r => [r, ROLE_LABELS[r]]))}</div>
    <div class="mock-group"><span>Mărime</span>${seg('size', [['phone', 'Telefon'], ['desktop', 'Desktop']])}</div>
    <div class="mock-group"><span>Temă</span>${seg('theme', [['light', 'Light'], ['dark', 'Dark']])}</div>
    <a class="mock-link" id="mock-all" href="index.html">${ic('i-grid')}Toate ecranele</a>`;
}
/** Marks the pressed buttons of the bar, applies the theme and refreshes the links that carry rol / tema / marime. */
function syncBar(S) {
  document.body.dataset.theme = S.theme;
  document.querySelectorAll('[data-ctl]').forEach(g => g.querySelectorAll('button').forEach(b =>
    b.setAttribute('aria-pressed', String(S[g.dataset.ctl] === b.dataset.v))));
  const all = document.getElementById('mock-all');
  if (all) all.href = `index.html?${new URLSearchParams(carried(S))}`;
}

/* ── App header (the same in every screen of the app) ───────────────────── */
const signedInRole = r => r !== 'vizitator';
/**
 * S: { role, size }. current: the DS- ID of the nav item to mark. brandH1: the brand is the page's h1
 * (true on the phone map; a screen with its own h1 passes false).
 */
function appbar(S, { current = '', brandH1 = S.size === 'phone' } = {}) {
  const phone = S.size === 'phone', signedIn = signedInRole(S.role), operator = S.role === 'operator';
  const name = brandH1 ? '<h1 class="brand-name">Harta sesizărilor</h1>' : '<div class="brand-name">Harta sesizărilor</div>';
  const brand = `<div class="brand">${phone ? '' : `<span class="brand-mark">${ic('i-map', 'i-lg')}</span>`}
    <div class="brand-text">${name}<div class="brand-sub">Cartierul Tineretului, Sibiu</div></div></div>`;
  const cur = id => id === current ? ' aria-current="page"' : '';
  if (phone) {
    // Phone: one menu (Statistici, Sesizările mele, Contul meu / Intră în cont); the operator also gets Triere in the bar
    const triage = operator ? `<a class="btn btn-ghost btn-sm triage" href="${mockHref('DS-004')}" aria-label="Triere">${ic('i-triage')}<span class="triage-label">Triere</span></a>` : '';
    return `<header class="appbar">${brand}<div class="actions">${triage}
      <button class="btn btn-secondary btn-icon" aria-label="Meniu${signedIn ? ' și contul meu' : ''}">${ic('i-menu')}</button></div></header>`;
  }
  const nav = [`<a href="${mockHref('DS-001')}"${cur('DS-001')}>${ic('i-map')}Hartă</a>`, `<a href="${mockHref('DS-005')}"${cur('DS-005')}>${ic('i-chart')}Statistici</a>`];
  if (signedIn) nav.push(`<a href="${mockHref('DS-009')}"${cur('DS-009')}>${ic('i-bookmark')}Sesizările mele</a>`);
  if (operator) nav.push(`<a href="${mockHref('DS-004')}"${cur('DS-004')}>${ic('i-triage')}Triere</a>`);
  const right = signedIn
    ? `<a class="btn btn-primary" href="${mockHref('DS-003')}">${ic('i-plus')}Raportează o problemă</a><button class="avatar" aria-label="Contul meu">${ic('i-user')}</button>`
    : `<a class="btn btn-primary" href="${mockHref('DS-007')}">${ic('i-login')}Intră în cont ca să raportezi</a>`;
  return `<header class="appbar">${brand}<nav class="nav" aria-label="Principal">${nav.join('')}</nav><div class="actions">${right}</div></header>`;
}

/* ── Map parts (Leaflet, D-002; OpenStreetMap tiles, Q-005; the polygon, D-009) ── */
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
function osmTiles() {
  return L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, referrerPolicy: 'strict-origin-when-cross-origin', attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' });
}
const areaLayer = () => L.geoJSON(CARTIER, { style: { className: 'area' }, interactive: false });
/** Distance in metres between two sesizări (equirectangular; exact enough under 1 km). */
function metres(a, b) {
  const r = Math.PI / 180, R = 6371000;
  const x = (b.lon - a.lon) * r * Math.cos((a.lat + b.lat) / 2 * r), y = (b.lat - a.lat) * r;
  return R * Math.hypot(x, y);
}
