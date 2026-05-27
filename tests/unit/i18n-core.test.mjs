// The staleness machinery is only trustworthy if the fingerprint is (a) stable
// against cosmetic churn like key reordering and (b) sensitive to any real
// change in translatable content — on *either* locale, since the seal is
// two-sided.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sourceHash, pairHashes, deepEqual, fieldRoles } from '../../scripts/lib/i18n-core.mjs';

const translatable = new Set(['summary', 'tags', 'body']);

const entry = (data, body = 'A story.') => ({ data, body });

test('sourceHash is stable across frontmatter key order', () => {
  const a = entry({ summary: 'Sweet pup', tags: ['x', 'y'] });
  const b = entry({ tags: ['x', 'y'], summary: 'Sweet pup' });
  assert.equal(sourceHash(a, translatable), sourceHash(b, translatable));
});

test('sourceHash changes when translatable content changes', () => {
  const base = entry({ summary: 'Sweet pup' });
  const edited = entry({ summary: 'Sweet pup!' });
  assert.notEqual(sourceHash(base, translatable), sourceHash(edited, translatable));
});

test('sourceHash changes when the body changes', () => {
  const base = entry({ summary: 'x' }, 'Original story.');
  const edited = entry({ summary: 'x' }, 'Rewritten story.');
  assert.notEqual(sourceHash(base, translatable), sourceHash(edited, translatable));
});

test('sourceHash ignores fields outside the translatable set (shared facts)', () => {
  // `species` is a shared fact, not translatable — editing it must NOT move the
  // translation fingerprint (shared drift is caught by exact-equality instead).
  const a = entry({ summary: 'x', species: 'dog' });
  const b = entry({ summary: 'x', species: 'cat' });
  assert.equal(sourceHash(a, translatable), sourceHash(b, translatable));
});

test('two-sided seal: en and pt fingerprints are independent', () => {
  // Same shape, different language content → different hashes. This is what lets
  // the lock detect a Portuguese-only edit.
  const en = entry({ summary: 'Sweet pup' });
  const pt = entry({ summary: 'Filhote doce' });
  assert.notEqual(sourceHash(en, translatable), sourceHash(pt, translatable));
});

test('pairHashes seals both locales for a real animal', () => {
  const { translatable: roles } = fieldRoles('animals');
  const { enHash, ptHash } = pairHashes('animals', 'luna', roles);
  assert.ok(enHash, 'en hash present');
  assert.ok(ptHash, 'pt hash present');
  // Luna's EN and PT prose differ, so the two seals must differ.
  assert.notEqual(enHash, ptHash);
});

test('fieldRoles classifies dob/dobEstimated as shared, not translatable', () => {
  const { shared, translatable: trans } = fieldRoles('animals');
  assert.ok(shared.has('dob'));
  assert.ok(shared.has('dobEstimated'));
  // age no longer exists as a field at all.
  assert.ok(!trans.has('age') && !shared.has('age'));
});

test('reviews: originLang is a shared fact; author/quote are translatable', () => {
  const { shared, translatable: trans } = fieldRoles('reviews');
  // originLang is a fact about the review (which language it was written in),
  // so it must be identical across locales — never translated.
  assert.ok(shared.has('originLang'));
  assert.ok(shared.has('rating'));
  // The actual utterance and its attribution may differ per locale.
  assert.ok(trans.has('quote'));
  assert.ok(trans.has('author'));
});

test('reviews: pairHashes seals both locales for a real review', () => {
  const { translatable: roles } = fieldRoles('reviews');
  const { enHash, ptHash } = pairHashes('reviews', 'ana-pedro', roles);
  assert.ok(enHash, 'en hash present');
  assert.ok(ptHash, 'pt hash present');
  // ana-pedro's EN translation and PT original differ, so the seals differ.
  assert.notEqual(enHash, ptHash);
});

test('deepEqual handles scalars, arrays, and nested objects order-insensitively', () => {
  assert.ok(deepEqual({ a: 1, b: [1, 2] }, { b: [1, 2], a: 1 }));
  assert.ok(!deepEqual({ a: 1 }, { a: 2 }));
  assert.ok(!deepEqual([1, 2], [2, 1]));
});
