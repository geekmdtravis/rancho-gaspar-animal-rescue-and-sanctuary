// Vendor the Sveltia CMS bundle into `public/admin/` from the npm-installed
// copy. The admin shell (`src/pages/admin/index.astro`) references this local
// path instead of the unpkg CDN, so what ships is the exact version pinned in
// package-lock.json — no floating major, no runtime dependency on a third-party
// CDN. Wired in via `prebuild` and `predev` so it always runs before the site
// is built or served. The output is gitignored; this script regenerates it.
//
// We bypass `require.resolve` because Sveltia's `exports` map only publishes
// the ESM entry (`./dist/sveltia-cms.mjs`); the IIFE bundle we want for a
// classic `<script>` tag (`./dist/sveltia-cms.js`) lives next to it but isn't
// exported. Walking the path directly is fine — Sveltia is a top-level dep,
// so npm's hoist always lands it at this location.
import { mkdir, copyFile, stat, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const src = resolve(projectRoot, 'node_modules/@sveltia/cms/dist/sveltia-cms.js');
const dest = resolve(projectRoot, 'public/admin/sveltia-cms.js');

const { version } = JSON.parse(
  await readFile(resolve(projectRoot, 'node_modules/@sveltia/cms/package.json'), 'utf8'),
);

await mkdir(dirname(dest), { recursive: true });
await copyFile(src, dest);
const { size } = await stat(dest);
console.log(
  `[sveltia] vendored @sveltia/cms@${version} → public/admin/sveltia-cms.js ` +
    `(${(size / 1024 / 1024).toFixed(2)} MB)`,
);
