# Agent Guide

This is a bilingual static Astro site for Rancho Gaspar, an animal rescue and
sanctuary. Read `README.md` first for the product overview and current content
workflow; this file is the working guide for agents making changes in the repo.

## Project Shape

- Astro 6 static site. English is the default locale at `/`; Brazilian
  Portuguese is served under `/pt-br/`.
- Shared page shell lives in `src/layouts/BaseLayout.astro`.
- English routes live directly under `src/pages/`; Portuguese route mirrors live
  under `src/pages/pt-br/`.
- `src/pages/[...slug].astro` generates "coming soon" pages for linked routes
  that are not fully built yet. When adding a real page, remove its slug from
  that catch-all list if needed.
- CMS content is animal markdown under `src/content/animals/<locale>/<slug>.md`.
- The Astro content schema for animals is in `src/content.config.ts`.
- Animal query/path helpers are in `src/lib/animals.ts`.
- Locale helpers are in `src/i18n/utils.ts`; UI dictionaries are in
  `src/i18n/ui.ts`; computed age logic is in `src/i18n/age.ts`.
- Brand and layout tokens are in `src/styles/tokens.css`; broad site CSS is in
  `src/styles/global.css`.
- Reusable UI lives in `src/components/`. Prefer existing components and tokens
  over new local one-off styling.
- The Sveltia CMS admin page is `src/pages/admin/index.astro`; its schema is
  served from `public/admin/config.yml`.

## Commands

- `npm run dev` starts local Astro at `http://localhost:4321`.
- `npm run build` builds the static site to `dist/`.
- `npm run preview` previews a production build.
- `npm run check` runs `astro check`.
- `npm run lint` runs ESLint.
- `npm run format` runs Prettier.
- `npm run i18n:check` verifies dictionary parity, animal shared-field parity,
  and translation freshness.
- `npm run i18n:status` prints each animal's shared/fresh state and git change
  dates.
- `npm run i18n:bless <slug>` records a verified translation sync checkpoint
  for one animal. Without a slug it blesses every English animal.
- `npm run test:unit` runs Node unit tests.
- `npm run test:e2e` builds fresh and runs Playwright against port `4322`.

CI and the pre-push hook run the full set of gates: format check, lint,
`astro check`, `i18n:check`, unit tests, and e2e. For small docs-only changes,
run the most relevant checks, but do not claim full verification unless you ran
it.

## CMS And Content

- Local CMS: run `npm run dev`, open `http://localhost:4321/admin/`, and choose
  "Work with Local Repository" in a Chromium-based browser.
- Production CMS uses the GitHub backend configured in `public/admin/config.yml`.
- Images uploaded through the CMS go to `src/assets/uploads` so Astro can
  optimize them.
- Do not store a hand-written animal age. Animal profiles store `dob` and
  `dobEstimated`; display age is computed at build time.
- `status` controls routing and presentation:
  - `adoptable` appears under `/adopt/<slug>`.
  - `resident` appears under `/residents/<slug>` and must not show adoption CTAs.

## Internationalization Rules

This repo has a blocking two-sided hash system for animal translation freshness.
Do not treat the lockfile as incidental.

- Supported locales are `en` and `pt-br`.
- UI copy lives in `src/i18n/ui.ts`. `npm run i18n:check` requires both
  dictionaries to have the same key structure and array lengths.
- Animal files must exist in both locale folders with matching slugs:
  `src/content/animals/en/<slug>.md` and
  `src/content/animals/pt-br/<slug>.md`.
- Shared factual fields are defined by `i18n: duplicate` in
  `public/admin/config.yml`; the check script reads that CMS config as the
  source of truth. These shared fields must be identical across locales.
- Current shared animal facts include `species`, `sex`, `dob`, `dobEstimated`,
  `weight`, `status`, `featured`, `order`, `cover`, `gallery`, and
  `adoptionFee`.
- Translatable fields include values such as `name`, `breed`, `summary`, `tags`,
  `coverAlt`, `quickFacts`, and the markdown body.
- `scripts/lib/i18n-core.mjs` fingerprints translatable content using a stable
  SHA-256 hash. `i18n-sync.lock.json` stores both `enHash` and `ptHash` for each
  slug.
- Because the lock is two-sided, editing either the English source or the
  Portuguese translation after a bless makes the animal stale. If both changed,
  status reports both as stale.
- `npm run i18n:status` reports `fresh`, `STALE en`, `STALE pt`,
  `STALE en+pt`, or `unverified`.
- `npm run i18n:check` is blocking everywhere. It fails for missing locale
  files, shared-field drift, missing lock records, or either stale hash.

When changing animal content:

1. Edit the English and Portuguese markdown files for the same slug.
2. Keep shared factual fields byte-identical between locales.
3. Translate/review translatable prose and quick facts.
4. Run `npm run i18n:status` to see what is stale.
5. Run `npm run i18n:bless <slug>` only after confirming the translation matches
   the current source.
6. Run `npm run i18n:check`.

Never hand-edit `i18n-sync.lock.json` to silence failures. Use
`npm run i18n:bless <slug>` after real translation verification. If you add or
change animal schema fields, update `public/admin/config.yml`,
`src/content.config.ts`, both locale content files, and the i18n tests/scripts
if the new field changes shared-vs-translatable behavior.

## Implementation Notes

- Preserve the default-locale routing convention: English links are unprefixed,
  Portuguese links use `/pt-br`. Use `localizePath()` and `stripLocale()` rather
  than assembling locale paths by hand.
- Use `listAnimals()`, `findAnimal()`, `animalSlug()`, and `animalPath()` from
  `src/lib/animals.ts` for animal collection access.
- Use `formatAge()` from `src/i18n/utils.ts` for displayed ages.
- The donation widget is USD-first and uses `src/lib/fx.ts` for a build-time
  USD-to-BRL rate with a fallback.
- Keep English and Portuguese pages structurally aligned unless there is a clear
  route-specific reason not to.
- Existing design uses the Blossom palette and Lora/Nunito type pairing. Use
  CSS custom properties from `tokens.css` for colors, spacing, type, radii, and
  shadows.
- This repo may have a dirty worktree. Do not revert user changes or generated
  changes you did not make.

## Tests And Verification

- For content/i18n changes, run `npm run i18n:status` and
  `npm run i18n:check`; run `npm run test:unit` when touching hash, age, or i18n
  script logic.
- For route/component behavior, run `npm run check` and `npm run lint`; run
  Playwright when user-facing routes, navigation, filtering, profiles, or layout
  behavior changes.
- Playwright uses `npm run build && npm run preview -- --port 4322`, so it tests
  a fresh production build and does not reuse a dev server.
