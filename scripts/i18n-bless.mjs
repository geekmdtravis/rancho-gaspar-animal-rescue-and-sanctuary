#!/usr/bin/env node
// Record a "translations are in sync" checkpoint. Stamps the current
// fingerprint of *both* locales (+ timestamp) into each collection's lockfile
// for the given slugs, or all of them if none are named. Run this AFTER you've
// confirmed the pt-br translation matches the current English content.
//
// Sealing both sides means a later edit to *either* the English source or the
// Portuguese translation breaks the seal until someone re-blesses — so a bad PT
// edit can't slip through unnoticed.
//
// Slugs are matched across every collection (animals, reviews, …), so the same
// slug name in two collections is blessed in both.
//
//   npm run i18n:bless            # bless every entry in every collection
//   npm run i18n:bless clover     # bless just one (wherever it lives)
import { writeFileSync } from 'node:fs';
import {
  collectionNames,
  fieldRoles,
  listSlugs,
  pairHashes,
  readLock,
  lockPath,
} from './lib/i18n-core.mjs';

const requested = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const blessedAt = new Date().toISOString();
const done = [];

for (const name of collectionNames()) {
  const { translatable } = fieldRoles(name);
  const enSlugs = listSlugs(name, 'en');
  const targets = requested.length ? requested.filter((s) => enSlugs.includes(s)) : enSlugs;
  if (!targets.length) continue;

  const lock = readLock(name);
  let touched = false;
  for (const slug of targets) {
    const { enHash, ptHash } = pairHashes(name, slug, translatable);
    if (!ptHash) {
      console.error(`  ! skipping ${name}/"${slug}" — no pt-br/${slug}.md to seal against`);
      continue;
    }
    lock[slug] = { enHash, ptHash, blessedAt };
    done.push(`${name}/${slug}`);
    touched = true;
  }
  if (!touched) continue;

  // Stable key order keeps the lockfile diff-friendly.
  const ordered = Object.fromEntries(
    Object.keys(lock)
      .sort()
      .map((k) => [k, lock[k]]),
  );
  writeFileSync(lockPath(name), JSON.stringify(ordered, null, 2) + '\n');
}

// A requested slug that matched nothing anywhere is almost certainly a typo.
if (requested.length) {
  const matched = new Set(done.map((d) => d.split('/').slice(1).join('/')));
  for (const s of requested) {
    if (!matched.has(s)) console.error(`  ! "${s}" — no en/${s}.md in any collection`);
  }
}

console.log(
  `✓ Blessed ${done.length} entr${done.length === 1 ? 'y' : 'ies'}: ${done.join(', ') || '(none)'}`,
);
