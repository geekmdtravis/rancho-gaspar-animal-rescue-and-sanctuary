#!/usr/bin/env node
// Record a "translations are in sync" checkpoint. Stamps the current
// fingerprint of *both* locales (+ timestamp) into i18n-sync.lock.json for the
// given slugs, or all of them if none are named. Run this AFTER you've confirmed
// the pt-br translation matches the current English content.
//
// Sealing both sides means a later edit to *either* the English source or the
// Portuguese translation breaks the seal until someone re-blesses — so a bad PT
// edit can't slip through unnoticed.
//
//   npm run i18n:bless            # bless every animal
//   npm run i18n:bless clover     # bless just one
import { writeFileSync } from 'node:fs';
import { fieldRoles, listSlugs, pairHashes, readLock, LOCK_PATH } from './lib/i18n-core.mjs';

const requested = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const { translatable } = fieldRoles();
const enSlugs = listSlugs('en');
const targets = requested.length ? requested : enSlugs;

const lock = readLock();
const blessedAt = new Date().toISOString();
const done = [];

for (const slug of targets) {
  if (!enSlugs.includes(slug)) {
    console.error(`  ! skipping "${slug}" — no en/${slug}.md`);
    continue;
  }
  const { enHash, ptHash } = pairHashes(slug, translatable);
  if (!ptHash) {
    console.error(`  ! skipping "${slug}" — no pt-br/${slug}.md to seal against`);
    continue;
  }
  lock[slug] = { enHash, ptHash, blessedAt };
  done.push(slug);
}

// Stable key order keeps the lockfile diff-friendly.
const ordered = Object.fromEntries(
  Object.keys(lock)
    .sort()
    .map((k) => [k, lock[k]]),
);
writeFileSync(LOCK_PATH, JSON.stringify(ordered, null, 2) + '\n');

console.log(
  `✓ Blessed ${done.length} entr${done.length === 1 ? 'y' : 'ies'}: ${done.join(', ') || '(none)'}`,
);
