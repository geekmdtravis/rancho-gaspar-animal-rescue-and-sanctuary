# Rancho Gaspar — Animal Rescue & Sanctuary

A bilingual (English + Brazilian Portuguese), static Astro site for a small
family-run dog & cat sanctuary in Mendonça, SP, Brazil. Built from the
[Claude Design](https://claude.ai/design) handoff: the soft-pink **"Blossom"**
brand with the warm **Lora × Nunito** type pairing.

## Stack & decisions

- **Astro 6**, static output — deploys free to Cloudflare Pages or GitHub Pages,
  no backend.
- **Sveltia CMS** (git-based, `public/admin/`) for content editing. Chosen over
  Keystatic because Keystatic's Astro adapter doesn't yet support Astro 6;
  Sveltia is framework-agnostic, so it works today and writes plain markdown the
  Astro content collections read directly.
- **i18n**: English is primary (served at `/`), Brazilian Portuguese is
  secondary (`/pt-br/`). UI strings live in `src/i18n/ui.ts`; animal profiles
  are per-locale markdown in `src/content/animals/<locale>/`.
- **Images**: Astro's built-in pipeline (sharp) optimizes anything under
  `src/assets/**` — responsive widths, avif/webp, blur-up. Cards fall back to an
  illustrated placeholder until a real photo is uploaded.
- **Age**: animals store a `dob` (date of birth, usually an estimate — hence the
  `dobEstimated` flag and the "~" prefix), never a hand-written age. The
  displayed age is computed at build time (`src/i18n/age.ts`), so it never goes
  stale and no one edits "3 years" → "4 years" every birthday.
- **Currency**: the sanctuary is in Brazil, but most donations come from the US,
  so amounts are **USD-first** with an approximate BRL equivalent. The USD→BRL
  rate is fetched **in the visitor's browser on load** from
  [Frankfurter](https://frankfurter.dev), which is open-access (no key) and
  CORS-enabled — so it's current per visit with no backend. There is **no
  hardcoded fallback rate**: USD (the canonical figure) always renders, and if
  the fetch fails the BRL shows an explicit "R$ unavailable" rather than a stale
  guess (`src/lib/fx-client.ts`, `src/components/FxAmount.astro`). **Adoption
  fees use the same model**: each `adoptionFee` is authored in USD (a number)
  and rendered USD-first with the R$ value filled in client-side, e.g.
  "$40 (≈ R$ 200)". The `/adopt` "Adoption fees from …" line derives its figure
  from the lowest actual `adoptionFee`, so it can't drift from the per-animal
  fees.
- **Reviews**: visitor testimonials are a per-locale content collection
  (`src/content/reviews/`), not hard-coded copy. Each review records the
  `originLang` it was actually written in; the other locale is a _translation_
  of it, and the card shows a "Translated from …" badge whenever it's displayed
  off its origin language — plus a "Read original" toggle that swaps in the
  text the reviewer actually wrote. The same two-sided staleness seal as animals
  keeps the translation honest (`reviews-sync.lock.json`).

## What's built

- The **home page** (`/`, `/pt-br/`) — hero, adoptable animals (data-driven),
  donation widget, get-involved, testimonials, newsletter.
- **Adopt listing** (`/adopt`) — grid with client-side species filter + search,
  and a "no match" CTA.
- **Residents listing** (`/residents`) — permanent residents, clearly framed as
  not-for-adoption.
- **About page** (`/about`) — origin story, Brazil stray-animal context,
  cat-focused mission, and live resident counts from the animal inventory.
- **Animal profile** (`/adopt/<slug>`, `/residents/<slug>`) — gallery, quick
  facts, story, similar animals, and a sponsor widget. Adoptable profiles show
  an apply CTA + adoption process; resident profiles show a "permanent resident,
  not for adoption" callout instead.
- All of the above exist in **both locales** (`/pt-br/...`).
- Full **component library** ported from the design (buttons, badges, cards,
  nav, footer, logo, illustrations, accordion, breadcrumbs…).
- **Animal content model** with the core resident-vs-adoptable distinction.
- **Donate page** (`/donate`) — standalone giving flow that accepts `?freq=`
  and `?amount=` from the home/footer donation widgets and pre-fills the form
  for continuity. Stubbed checkout submit awaits the Cloudflare Worker that
  will create the Givebutter charge.

### Not yet built (natural next steps)

The nav/footer still link to these routes: `/contact`, `/stories`. All
shared components needed to assemble them already exist.

Impact and events pages are intentionally deferred for now; the site should lean
on About Us instead of publishing impact/event messaging until there is a clear
need.

## Content workflow

1. `npm run dev`, open `http://localhost:4321/admin/`, choose **Work with Local
   Repository** to edit on disk (Chromium-based browsers).
2. Add/edit an animal in both `en` and `pt-br` (the parity check enforces this).
3. Refine i18n/markup with Claude Code or Codex, then open a pull request.

## Commands

| Command               | Action                                                        |
| :-------------------- | :------------------------------------------------------------ |
| `npm run dev`         | Dev server at `localhost:4321`                                |
| `npm run build`       | Build static site to `./dist/`                                |
| `npm run preview`     | Preview the production build                                  |
| `npm run check`       | `astro check` (TypeScript / template type-checking)           |
| `npm run lint`        | ESLint                                                        |
| `npm run format`      | Prettier (write)                                              |
| `npm run i18n:check`  | Verify EN/PT-BR parity (dictionary, shared fields, freshness) |
| `npm run i18n:status` | Per-entry sync report, animals + reviews (shared / fresh)     |
| `npm run i18n:bless`  | Record that translations are in sync (after re-translating)   |
| `npm run test:unit`   | Node test runner — age math + i18n hashing/seal               |
| `npm run test:e2e`    | Playwright smoke tests (builds fresh, port 4322)              |

## Keeping translations in sync

Two per-locale content collections are sealed the same way: **animals**
(`i18n-sync.lock.json`) and **reviews** (`reviews-sync.lock.json`). Each entry
exists once per locale (`en` + `pt-br`), and `i18n:check` / `i18n:status` /
`i18n:bless` all operate across both collections automatically (a collection is
registered in `scripts/lib/i18n-core.mjs`). Two kinds of drift are tracked:

- **Shared facts** — fields marked `i18n: duplicate` in the CMS config
  (`species`, `sex`, `dob`, `dobEstimated`, `weight`, `status`, `featured`,
  `order`, `cover`, `gallery`, `adoptionFee`). These are facts, not
  translations, and **must be identical** across locales. `i18n:check` fails
  (errors) if they differ.
- **Translatable content** (`name`, `breed`, `summary`, `tags`, `coverAlt`,
  `quickFacts`, body) may differ by language. To know when a translation has
  gone **stale**, we fingerprint the translatable content of **both** locales (a
  two-sided seal) and store both hashes in `i18n-sync.lock.json`. If either the
  English source **or** the Portuguese translation is edited after a bless, its
  fingerprint no longer matches the lock, so `i18n:check` fails and
  `i18n:status` shows `STALE en` / `STALE pt` / `STALE en+pt`.

For **reviews**, the shared facts are `originLang`, `rating`, `kind`,
`featured`, and `order`; the translatable content is `author`, `role`, and
`quote`. `originLang` is what makes a review different from an animal: it's the
language the person actually wrote in, so the off-origin locale is understood to
be a translation (and labelled as one on the site) rather than an equal twin.

Workflow when you change an English profile:

1. Edit `en/<slug>.md` (e.g. via Sveltia). `i18n:status` now shows `STALE` /
   `unverified` for that animal.
2. Update `pt-br/<slug>.md` to match.
3. `npm run i18n:bless <slug>` to stamp the new fingerprint — back to `fresh`.

`i18n:status` also prints each locale's last git-commit date, so you can see
**what changed when**. The lockfile is committed, so its git history is an audit
trail of every sync checkpoint.

`i18n:check` is **blocking everywhere** — local git hooks and CI run the exact
same gate, with no lenient mode. Both shared-field drift and a stale translation
fail the build (exit 1), so neither can land. After editing an English profile,
update `pt-br/<slug>.md` and run `npm run i18n:bless <slug>` to clear it.

## Git hooks (Husky + lint-staged)

- **pre-commit** — formats & lints only staged files; runs the i18n parity check
  _only_ when `src/i18n/`, `src/content/animals/`, or `src/content/reviews/`
  changed.
- **pre-push** — full type-check, i18n parity, unit tests, and Playwright e2e
  against a fresh build.

Before deploying, set your real domain in `astro.config.mjs` (`site`).
