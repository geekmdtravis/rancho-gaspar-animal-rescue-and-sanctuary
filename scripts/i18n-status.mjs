#!/usr/bin/env node
// "What changed when" report for every synced collection. For each slug it shows:
//   • shared fields match?  (the i18n: duplicate facts)
//   • translation fresh?    (both fingerprints vs the lockfile)
//   • EN / PT last commit dates (from git history)
//   • when the translation was last blessed
//
// Working-tree edits that aren't committed yet won't appear in the git dates,
// but the freshness column reads the live files, so uncommitted drift still
// shows up as "STALE" / "unverified".
import {
  LOCALES,
  collectionNames,
  fieldRoles,
  listSlugs,
  entryPath,
  parseEntry,
  sourceHash,
  readLock,
  deepEqual,
  gitLastChange,
} from './lib/i18n-core.mjs';

const date = (c) => (c ? c.iso.slice(0, 10) : '—');
const pad = (s, n) => String(s).padEnd(n);

let totalIssues = 0;

for (const name of collectionNames()) {
  const { shared, translatable } = fieldRoles(name);
  const lock = readLock(name);
  const slugs = Object.fromEntries(LOCALES.map((l) => [l, new Set(listSlugs(name, l))]));
  const all = [...new Set([...slugs.en, ...slugs['pt-br']])].sort();

  const rows = [];
  for (const slug of all) {
    const inEn = slugs.en.has(slug);
    const inPt = slugs['pt-br'].has(slug);
    if (!inEn || !inPt) {
      rows.push({
        slug,
        shared: '—',
        fresh: inEn ? 'PT MISSING' : 'EN MISSING',
        en: '—',
        pt: '—',
        blessed: '—',
      });
      continue;
    }
    const en = parseEntry(entryPath(name, 'en', slug));
    const pt = parseEntry(entryPath(name, 'pt-br', slug));

    const sharedOk = [...shared].every((f) => deepEqual(en.data[f], pt.data[f]));
    const record = lock[slug];
    const enOk = record?.enHash === sourceHash(en, translatable);
    const ptOk = record?.ptHash === sourceHash(pt, translatable);
    let fresh;
    if (!record?.enHash || !record?.ptHash) fresh = 'unverified';
    else if (enOk && ptOk) fresh = 'fresh';
    else if (!enOk && !ptOk) fresh = 'STALE en+pt';
    else fresh = !enOk ? 'STALE en' : 'STALE pt';

    rows.push({
      slug,
      shared: sharedOk ? 'ok' : 'DRIFT',
      fresh,
      en: date(gitLastChange(entryPath(name, 'en', slug))),
      pt: date(gitLastChange(entryPath(name, 'pt-br', slug))),
      blessed: record?.blessedAt ? record.blessedAt.slice(0, 10) : '—',
    });
  }

  console.log(`\n${name.toUpperCase()}`);
  console.log(
    `${pad('slug', 18)}${pad('shared', 8)}${pad('translation', 13)}${pad('en chg', 12)}${pad('pt chg', 12)}blessed`,
  );
  console.log('─'.repeat(76));
  for (const r of rows) {
    console.log(
      `${pad(r.slug, 18)}${pad(r.shared, 8)}${pad(r.fresh, 13)}${pad(r.en, 12)}${pad(r.pt, 12)}${r.blessed}`,
    );
  }
  const issues = rows.filter((r) => r.shared === 'DRIFT' || r.fresh !== 'fresh');
  totalIssues += issues.length;
  console.log(
    `${rows.length} ${name} · ${issues.length} need attention` +
      (issues.length ? `: ${issues.map((r) => r.slug).join(', ')}` : ' ✓'),
  );
}

console.log(
  `\n${totalIssues === 0 ? '✓ all collections in sync' : `${totalIssues} item(s) need attention`}`,
);
