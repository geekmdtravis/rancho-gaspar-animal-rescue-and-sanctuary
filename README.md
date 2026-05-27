# Rancho Gaspar — Animal Rescue & Sanctuary

A bilingual (English + Brazilian Portuguese), static Astro site for a small
family-run dog & cat sanctuary in Mairiporã, Brazil. Built from the
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

## What's built

- The **home page** (`/`, `/pt-br/`) — hero, adoptable animals (data-driven),
  donation widget, impact stats, get-involved, testimonials, newsletter.
- **Adopt listing** (`/adopt`) — grid with client-side species filter + search,
  and a "no match" CTA.
- **Residents listing** (`/residents`) — permanent residents, clearly framed as
  not-for-adoption.
- **Animal profile** (`/adopt/<slug>`, `/residents/<slug>`) — gallery, quick
  facts, story, similar animals, and a sponsor widget. Adoptable profiles show
  an apply CTA + adoption process; resident profiles show a "permanent resident,
  not for adoption" callout instead.
- All of the above exist in **both locales** (`/pt-br/...`).
- Full **component library** ported from the design (buttons, badges, cards,
  nav, footer, logo, illustrations, accordion, breadcrumbs…).
- **Animal content model** with the core resident-vs-adoptable distinction.

### Not yet built (natural next steps)

The nav/footer still link to these routes: `/get-involved`, `/donate`,
`/impact`, `/about`, `/contact`, `/events`, `/stories`. All shared components
needed to assemble them already exist.

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
| `npm run i18n:status` | Per-animal sync report (shared / fresh + git change dates)    |
| `npm run i18n:bless`  | Record that translations are in sync (after re-translating)   |
| `npm run test:e2e`    | Playwright smoke tests (builds fresh, port 4322)              |

## Keeping translations in sync

Animal profiles exist once per locale (`en` + `pt-br`). Two kinds of drift are
tracked:

- **Shared facts** — fields marked `i18n: duplicate` in the CMS config
  (`species`, `sex`, `status`, `weight`, `featured`, `order`, `cover`,
  `gallery`, `adoptionFee`). These are facts, not translations, and **must be
  identical** across locales. `i18n:check` fails (errors) if they differ.
- **Translatable content** (`name`, `age`, `breed`, `summary`, `tags`,
  `quickFacts`, body) may differ by language. To know when a translation has
  gone **stale**, we fingerprint the English source and store it in
  `i18n-sync.lock.json`. When English later changes, its fingerprint no longer
  matches the lock, so `i18n:check` warns and `i18n:status` shows `STALE`.

Workflow when you change an English profile:

1. Edit `en/<slug>.md` (e.g. via Sveltia). `i18n:status` now shows `STALE` /
   `unverified` for that animal.
2. Update `pt-br/<slug>.md` to match.
3. `npm run i18n:bless <slug>` to stamp the new fingerprint — back to `fresh`.

`i18n:status` also prints each locale's last git-commit date, so you can see
**what changed when**. The lockfile is committed, so its git history is an audit
trail of every sync checkpoint. (Shared-field drift blocks commits; staleness
only warns — pass `--strict` to `i18n:check` to make staleness blocking too.)

## Git hooks (Husky + lint-staged)

- **pre-commit** — formats & lints only staged files; runs the i18n parity check
  _only_ when `src/i18n/` or `src/content/animals/` changed.
- **pre-push** — full type-check, i18n parity, and Playwright e2e against a fresh
  build.

Before deploying, set your real domain in `astro.config.mjs` (`site`).
