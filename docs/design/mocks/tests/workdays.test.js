// docs/design/mocks/tests/workdays.test.js — checks the working-days function of the mocks (shared.js) and the DS-005
// figures on the two resolved seed sesizări, #18 and #20. Run: node --test docs/design/mocks/tests/
// Mock-only: the app gets its own tested "add N working days" function on the server (brief → Twist).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const dir = path.join(__dirname, '..');
// seed.js and shared.js are browser scripts: load them with the few browser objects shared.js touches
function load(seedText = fs.readFileSync(path.join(dir, 'seed.js'), 'utf8')) {
  const ctx = { URLSearchParams, location: { search: '', pathname: '/', hash: '' }, matchMedia: () => ({ matches: false }),
    document: { body: { insertAdjacentHTML() {} } } };
  vm.createContext(ctx);
  vm.runInContext(`${seedText}\n${fs.readFileSync(path.join(dir, 'shared.js'), 'utf8')}\n
    this.api = { SEED, SEED_DATE, workingDays, parseRo, slaDays, orthodoxEaster, isoDay };`, ctx);
  return ctx.api;
}
const { SEED, SEED_DATE, workingDays, parseRo, slaDays, orthodoxEaster, isoDay } = load();

test('#18 and #20: reported 15 nov 2026, resolved 23 nov 2026, 6 working days, both after their termen', () => {
  const expected = { 18: { cat: 'Animale pe domeniu public', sla: 3 }, 20: { cat: 'Trafic auto, semne de circulație și parcări', sla: 5 } };
  for (const [id, e] of Object.entries(expected)) {
    const i = SEED.find(x => x.id === Number(id));
    assert.equal(i.st, 'rezolvata', `#${id} is rezolvată`);
    assert.equal(i.cat, e.cat);
    assert.equal(parseRo(SEED_DATE), '2026-11-15', 'report date');
    assert.equal(i.resolvedOn, '2026-11-23', `#${id} resolvedOn`);
    // Mon 16 – Fri 20 nov (5) + Mon 23 nov (1); Sun 15 is the report day and not counted
    assert.equal(workingDays(parseRo(SEED_DATE), i.resolvedOn), 6, `#${id} working days`);
    assert.equal(slaDays(i.cat), e.sla, `#${id} termen`);
    assert.ok(workingDays(parseRo(SEED_DATE), i.resolvedOn) > slaDays(i.cat), `#${id} resolved after its termen`);
  }
});

test('DS-005 figures: average 6 working days, 0 of 2 resolved within the termen', () => {
  const resolved = SEED.filter(x => x.st === 'rezolvata');
  const days = resolved.map(x => workingDays(parseRo(SEED_DATE), x.resolvedOn));
  assert.equal(resolved.length, 2);
  assert.equal(days.reduce((a, b) => a + b, 0) / days.length, 6);
  assert.equal(resolved.filter((x, k) => days[k] <= slaDays(x.cat)).length, 0);
});

test('the seed.js convention: 15 → 25 nov 2026 is 8 working days (Străzi și iluminat: 30 − 8 = 22 left)', () => {
  assert.equal(workingDays('2026-11-15', '2026-11-25'), 8);
  assert.ok(SEED.filter(x => x.cat === 'Străzi și iluminat' && x.sla && 'left' in x.sla).every(x => x.sla.left === 22));
});

test('holidays: 30 nov and 1 dec 2026, Orthodox Easter 2026 (12 apr) and 2027 (2 may)', () => {
  assert.equal(workingDays('2026-11-27', '2026-12-02'), 1);   // Mon 30 nov and Tue 1 dec are holidays → only Wed 2 dec
  assert.equal(isoDay(orthodoxEaster(2026)), '2026-04-12');
  assert.equal(isoDay(orthodoxEaster(2027)), '2027-05-02');
  assert.equal(workingDays('2026-04-09', '2026-04-14'), 1);   // Fri 10 (Vinerea Mare), Mon 13 (Paști) off → only Tue 14
});

test('a missing resolution date throws instead of counting 0 days (the bug seen in DS-005)', () => {
  assert.throws(() => workingDays('2026-11-15', undefined), /dată invalidă/);
  const old = load(fs.readFileSync(path.join(dir, 'seed.js'), 'utf8').replace(/resolvedOn: '[^']*', /g, ''));
  const i = old.SEED.find(x => x.id === 18);
  assert.throws(() => old.workingDays(old.parseRo(old.SEED_DATE), i.resolvedOn));
});
