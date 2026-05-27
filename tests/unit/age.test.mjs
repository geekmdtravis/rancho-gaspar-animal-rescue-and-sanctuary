// Age is computed from a date of birth, so the arithmetic must be exact and
// stable regardless of when the build runs. `now` is injected so these stay
// deterministic forever.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ageParts, formatAgeWith, lifeSpanWith } from '../../src/i18n/age.ts';

const now = new Date('2026-05-26T12:00:00Z');

// Mirror the word tables in i18n/ui.ts so the formatter is exercised exactly as
// it runs in the app, without pulling in Vite-resolved extensionless imports.
const EN = { year: 'year', years: 'years', month: 'month', months: 'months', newborn: 'newborn' };
const PT = { year: 'ano', years: 'anos', month: 'mês', months: 'meses', newborn: 'recém-nascido' };
const formatAge = (dob, estimated, lang, n = now) =>
  formatAgeWith(dob, estimated, lang === 'pt-br' ? PT : EN, n);

test('ageParts: years once at least a year old', () => {
  assert.deepEqual(ageParts(new Date('2020-03-01'), now), { value: 6, unit: 'year' });
  assert.deepEqual(ageParts(new Date('2024-04-10'), now), { value: 2, unit: 'year' });
});

test('ageParts: exactly one year reads as 1 year, not 12 months', () => {
  assert.deepEqual(ageParts(new Date('2025-05-26'), now), { value: 1, unit: 'year' });
});

test('ageParts: months when under a year', () => {
  assert.deepEqual(ageParts(new Date('2026-01-15'), now), { value: 4, unit: 'month' });
  assert.deepEqual(ageParts(new Date('2025-11-20'), now), { value: 6, unit: 'month' });
});

test('ageParts: not a full month in yet rounds down', () => {
  // Born on the 30th, today is the 26th — the current month hasn't completed.
  assert.deepEqual(ageParts(new Date('2026-04-30'), now), { value: 0, unit: 'newborn' });
});

test('ageParts: newborn and clamps future / invalid dates', () => {
  assert.deepEqual(ageParts(new Date('2026-05-20'), now), { value: 0, unit: 'newborn' });
  assert.deepEqual(ageParts(new Date('2030-01-01'), now), { value: 0, unit: 'newborn' });
  assert.deepEqual(ageParts(new Date('not-a-date'), now), { value: 0, unit: 'newborn' });
});

test('formatAge: localized words + estimate prefix', () => {
  assert.equal(formatAge(new Date('2024-04-10'), true, 'en', now), '~2 years');
  assert.equal(formatAge(new Date('2024-04-10'), false, 'en', now), '2 years');
  assert.equal(formatAge(new Date('2024-04-10'), true, 'pt-br', now), '~2 anos');
});

test('formatAge: singular vs plural', () => {
  assert.equal(formatAge(new Date('2025-05-26'), false, 'en', now), '1 year');
  assert.equal(formatAge(new Date('2026-04-15'), false, 'en', now), '1 month');
  assert.equal(formatAge(new Date('2026-04-15'), false, 'pt-br', now), '1 mês');
  assert.equal(formatAge(new Date('2025-12-15'), false, 'pt-br', now), '5 meses');
});

test('formatAge: undefined dob yields undefined so callers can omit it', () => {
  assert.equal(formatAge(undefined, true, 'en', now), undefined);
  assert.equal(formatAge(new Date('bad'), true, 'en', now), undefined);
});

test('lifeSpanWith: birth–death years, with estimate prefix', () => {
  assert.equal(lifeSpanWith(new Date('2015-06-01'), false, new Date('2024-09-10')), '2015–2024');
  assert.equal(lifeSpanWith(new Date('2015-06-01'), true, new Date('2024-09-10')), '~2015–2024');
});

test('lifeSpanWith: falls back to death year alone when birth is unknown', () => {
  assert.equal(lifeSpanWith(undefined, true, new Date('2024-09-10')), '2024');
  assert.equal(lifeSpanWith(new Date('bad'), false, new Date('2024-09-10')), '2024');
});

test('lifeSpanWith: undefined/invalid death date yields undefined (animal is living)', () => {
  assert.equal(lifeSpanWith(new Date('2015-06-01'), true, undefined), undefined);
  assert.equal(lifeSpanWith(new Date('2015-06-01'), true, new Date('bad')), undefined);
});
