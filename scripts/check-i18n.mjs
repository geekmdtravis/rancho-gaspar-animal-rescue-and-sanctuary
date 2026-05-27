#!/usr/bin/env node
// i18n parity check. Three layers, fastest/cheapest first:
//
//   1. UI dictionary parity — every key path + array length in the EN
//      dictionary exists in PT-BR and vice versa.
//   2. Per-collection file + shared-field parity (ERRORS) — for every synced
//      collection (animals, reviews, …) both locales exist for every slug, and
//      every *shared* fact (the `i18n: duplicate` fields) is byte-identical.
//   3. Translation freshness — both locales' content fingerprints are compared
//      against the lockfile (a two-sided seal). A mismatch on either side means
//      that file changed since the translation was last confirmed in sync (run
//      `npm run i18n:bless <slug>` after re-verifying).
//
// All three layers are blocking: any failure exits 1, locally and in CI alike.
// There is no lenient mode — a stale translation never lands.
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
} from './lib/i18n-core.mjs';

const errors = [];

// ── 1. UI dictionary structural parity ─────────────────────────────────────
const { ui } = await import('../src/i18n/ui.ts');
const kind = (v) => (Array.isArray(v) ? 'array' : v === null ? 'null' : typeof v);

function diffUi(a, b, path) {
  const ta = kind(a);
  const tb = kind(b);
  if (ta !== tb) {
    errors.push(`ui ${path}: ${ta} in en vs ${tb} in pt-br`);
    return;
  }
  if (ta === 'object') {
    for (const k of Object.keys(a)) {
      if (!(k in b)) errors.push(`ui ${path}.${k}: missing in pt-br`);
      else diffUi(a[k], b[k], `${path}.${k}`);
    }
    for (const k of Object.keys(b)) if (!(k in a)) errors.push(`ui ${path}.${k}: missing in en`);
  } else if (ta === 'array') {
    if (a.length !== b.length) {
      errors.push(`ui ${path}: length ${a.length} in en vs ${b.length} in pt-br`);
    }
    for (let i = 0; i < Math.min(a.length, b.length); i++) diffUi(a[i], b[i], `${path}[${i}]`);
  }
}
diffUi(ui.en, ui['pt-br'], '');

// ── 2 & 3. Per-collection content parity ────────────────────────────────────
// Each registered collection (animals, reviews, …) is checked the same way:
// both locales must exist for every slug, shared facts must be byte-identical,
// and both sides' translation fingerprints must still match the lockfile.
function checkCollection(name) {
  const { shared, translatable } = fieldRoles(name);
  const slugs = Object.fromEntries(LOCALES.map((loc) => [loc, new Set(listSlugs(name, loc))]));
  const lock = readLock(name);

  const allSlugs = new Set([...slugs.en, ...slugs['pt-br']]);
  for (const slug of [...allSlugs].sort()) {
    const inEn = slugs.en.has(slug);
    const inPt = slugs['pt-br'].has(slug);
    if (!inEn) {
      errors.push(`${name}: "${slug}" exists in pt-br/ but not en/`);
      continue;
    }
    if (!inPt) {
      errors.push(`${name}: "${slug}" exists in en/ but not pt-br/`);
      continue;
    }

    const en = parseEntry(entryPath(name, 'en', slug));
    const pt = parseEntry(entryPath(name, 'pt-br', slug));

    // Shared facts must match exactly.
    for (const field of shared) {
      if (!deepEqual(en.data[field], pt.data[field])) {
        errors.push(
          `${name} "${slug}": shared field "${field}" differs — ` +
            `en=${JSON.stringify(en.data[field] ?? null)} vs pt-br=${JSON.stringify(pt.data[field] ?? null)}`,
        );
      }
    }

    // Two-sided freshness: both the English source and the Portuguese
    // translation are fingerprinted at bless time, so an edit to *either* side
    // after a bless breaks the seal.
    const record = lock[slug];
    const enNow = sourceHash(en, translatable);
    const ptNow = sourceHash(pt, translatable);
    if (!record?.enHash || !record?.ptHash) {
      errors.push(
        `${name} "${slug}": no sync record — run \`npm run i18n:bless ${slug}\` once pt-br is verified`,
      );
    } else {
      if (record.enHash !== enNow) {
        errors.push(
          `${name} "${slug}": English source changed since last sync — pt-br may be stale ` +
            `(re-translate, then \`npm run i18n:bless ${slug}\`)`,
        );
      }
      if (record.ptHash !== ptNow) {
        errors.push(
          `${name} "${slug}": Portuguese translation changed since last sync — re-verify it ` +
            `matches en, then \`npm run i18n:bless ${slug}\``,
        );
      }
    }
  }
}

for (const name of collectionNames()) checkCollection(name);

// ── Report ──────────────────────────────────────────────────────────────────
if (errors.length) {
  console.error(`\n✖ i18n parity failed (${errors.length} error(s)):`);
  for (const e of errors) console.error(`  • ${e}`);
  console.error('');
  process.exit(1);
}
console.log(
  `✓ i18n parity OK — dictionaries, shared fields, and ${collectionNames().join(' + ')} files in sync`,
);
