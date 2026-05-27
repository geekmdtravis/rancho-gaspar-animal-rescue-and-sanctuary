// Shared helpers for the i18n sync tooling (check / status / bless).
//
// Field roles are read straight from the Sveltia CMS config so there's a single
// source of truth: a field with `i18n: duplicate` is a *shared fact* that must
// be identical across locales; anything else is *translatable* and may differ.
// The markdown body is the `body` field in that config.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const LOCALES = ['en', 'pt-br'];
export const ANIMALS_DIR = resolve(ROOT, 'src/content/animals');
export const CONFIG_PATH = resolve(ROOT, 'public/admin/config.yml');
export const LOCK_PATH = resolve(ROOT, 'i18n-sync.lock.json');

/** Split a markdown file into parsed frontmatter `data` and trimmed `body`. */
export function parseEntry(filePath) {
  const raw = readFileSync(filePath, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw.trim() };
  return { data: YAML.parse(m[1]) ?? {}, body: m[2].trim() };
}

/** Classify the animals collection's fields from the CMS config. */
export function fieldRoles() {
  const cfg = YAML.parse(readFileSync(CONFIG_PATH, 'utf8'));
  const coll = (cfg.collections ?? []).find((c) => c.name === 'animals');
  if (!coll) throw new Error(`Could not find the "animals" collection in ${CONFIG_PATH}`);
  const shared = new Set();
  const translatable = new Set();
  for (const f of coll.fields ?? []) {
    if (f.i18n === 'duplicate') shared.add(f.name);
    else translatable.add(f.name);
  }
  return { shared, translatable };
}

export function listSlugs(locale) {
  const dir = resolve(ANIMALS_DIR, locale);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

export function entryPath(locale, slug) {
  return resolve(ANIMALS_DIR, locale, `${slug}.md`);
}

// Deterministic stringify (sorted keys) so hashes are stable across key order.
function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((k) => [k, stable(value[k])]),
    );
  }
  return value ?? null;
}

/**
 * Fingerprint of an entry's translatable content: every translatable
 * frontmatter field plus the markdown body (shared facts are excluded — they're
 * policed by exact-equality instead). Computed per-locale; see `pairHashes`.
 */
export function sourceHash(entry, translatable) {
  const src = {};
  for (const key of translatable) {
    if (key === 'body') continue;
    if (entry.data[key] !== undefined) src[key] = entry.data[key];
  }
  if (translatable.has('body')) src.body = entry.body;
  return createHash('sha256')
    .update(JSON.stringify(stable(src)))
    .digest('hex')
    .slice(0, 16);
}

/**
 * Two-sided seal: fingerprint *both* locales' translatable content for a slug.
 * The lock records both, so `i18n:check` fails if either the English source or
 * the Portuguese translation is edited after a bless — neither side can drift
 * silently. Returns `null` for a hash when that locale's file is missing.
 */
export function pairHashes(slug, translatable) {
  const en = existsSync(entryPath('en', slug))
    ? sourceHash(parseEntry(entryPath('en', slug)), translatable)
    : null;
  const pt = existsSync(entryPath('pt-br', slug))
    ? sourceHash(parseEntry(entryPath('pt-br', slug)), translatable)
    : null;
  return { enHash: en, ptHash: pt };
}

export function readLock() {
  if (!existsSync(LOCK_PATH)) return {};
  try {
    return JSON.parse(readFileSync(LOCK_PATH, 'utf8'));
  } catch {
    return {};
  }
}

/** Last commit that touched `file` (committed history only; ignores the working tree). */
export function gitLastChange(file) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI%x09%h%x09%s', '--', file], {
      cwd: ROOT,
      encoding: 'utf8',
    }).trim();
    if (!out) return null;
    const [iso, hash, ...subject] = out.split('\t');
    return { iso, hash, subject: subject.join('\t') };
  } catch {
    return null;
  }
}

/** Deep equality good enough for YAML scalars/arrays/objects. */
export function deepEqual(a, b) {
  return JSON.stringify(stable(a)) === JSON.stringify(stable(b));
}
