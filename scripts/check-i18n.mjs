#!/usr/bin/env node
// i18n parity check — fails (exit 1) when English and Brazilian Portuguese
// drift apart. It verifies two things:
//
//   1. UI dictionary parity — every key path (and array length) in the EN
//      dictionary exists in PT-BR and vice versa. Catches a translator adding
//      an EN string but forgetting the PT-BR counterpart.
//   2. Content parity — every animal profile slug exists in both
//      src/content/animals/en and .../pt-br.
//
// This is a *whole-project* invariant (it's inherently cross-file), so it
// always inspects the current tree — never a stale snapshot. It's fast, so the
// pre-commit hook runs it unconditionally.
//
// Relies on Node's built-in TypeScript type-stripping (Node ≥ 22.18 / 24) to
// import the .ts dictionary directly.
import { readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const LOCALES = ['en', 'pt-br'];
const problems = [];

// ── 1. Dictionary structural parity ───────────────────────────────────────
const { ui } = await import(resolve(root, 'src/i18n/ui.ts'));

const kind = (v) => (Array.isArray(v) ? 'array' : v === null ? 'null' : typeof v);

function diff(a, b, path) {
  const ta = kind(a);
  const tb = kind(b);
  if (ta !== tb) {
    problems.push(`ui ${path}: ${ta} in en vs ${tb} in pt-br`);
    return;
  }
  if (ta === 'object') {
    for (const k of Object.keys(a)) {
      if (!(k in b)) problems.push(`ui ${path}.${k}: missing in pt-br`);
      else diff(a[k], b[k], `${path}.${k}`);
    }
    for (const k of Object.keys(b)) {
      if (!(k in a)) problems.push(`ui ${path}.${k}: missing in en`);
    }
  } else if (ta === 'array') {
    if (a.length !== b.length) {
      problems.push(`ui ${path}: length ${a.length} in en vs ${b.length} in pt-br`);
    }
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      diff(a[i], b[i], `${path}[${i}]`);
    }
  }
  // primitives: values are expected to differ between locales — that's fine.
}

diff(ui.en, ui['pt-br'], '');

// ── 2. Animal content parity ───────────────────────────────────────────────
const animalsDir = resolve(root, 'src/content/animals');
const slugsByLocale = Object.fromEntries(
  LOCALES.map((loc) => {
    const dir = resolve(animalsDir, loc);
    const slugs = existsSync(dir)
      ? readdirSync(dir)
          .filter((f) => f.endsWith('.md'))
          .map((f) => f.replace(/\.md$/, ''))
      : [];
    return [loc, new Set(slugs)];
  }),
);

for (const slug of slugsByLocale.en) {
  if (!slugsByLocale['pt-br'].has(slug)) {
    problems.push(`animals: "${slug}" exists in en/ but not pt-br/`);
  }
}
for (const slug of slugsByLocale['pt-br']) {
  if (!slugsByLocale.en.has(slug)) {
    problems.push(`animals: "${slug}" exists in pt-br/ but not en/`);
  }
}

// ── Report ─────────────────────────────────────────────────────────────────
if (problems.length > 0) {
  console.error(`\n✖ i18n parity check failed (${problems.length} issue(s)):\n`);
  for (const p of problems) console.error(`  • ${p}`);
  console.error('\nAdd the missing translations so EN and PT-BR stay in sync.\n');
  process.exit(1);
}

console.log('✓ i18n parity OK — EN and PT-BR dictionaries and animal content are in sync.');
