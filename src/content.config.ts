// Astro content collections. Animal profiles are stored as markdown under
// src/content/animals/<locale>/<slug>.md so Sveltia CMS and the build read the
// same files. The `status` field is the core resident-vs-adoptable
// distinction; the loader id encodes the locale ("en/luna", "pt-br/luna").
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Sveltia writes a *cleared* optional field as an empty string (dates/text) or
// `null` (numbers), not as an absent key. Coerce those back to `undefined` so
// clearing a field in the CMS — e.g. leaving "date of death" blank, which is
// the norm — doesn't fail the schema with "expected date, received object".
const blankToUndefined = (v: unknown) => (v === '' || v === null ? undefined : v);

const animals = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/animals' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      species: z.enum(['dog', 'cat', 'bunny']),
      sex: z.enum(['F', 'M', 'unknown']).default('unknown'),
      // Age is derived from `dob`, never stored, so it never goes stale. Most
      // rescue birthdays are estimates — `dobEstimated` drives the "~" prefix.
      dob: z.preprocess(blankToUndefined, z.coerce.date().optional()),
      dobEstimated: z.boolean().default(true),
      // Date of death. Set only once an animal has passed away — it flips any
      // animal (adoptable or resident) into an "in memoriam" entry shown on the
      // residents page. Left unset for living animals.
      dod: z.preprocess(blankToUndefined, z.coerce.date().optional()),
      breed: z.string().optional(),
      weight: z.string().optional(),
      // The differentiator: an adoptable animal is looking for a home; a
      // resident lives at the sanctuary permanently and is not for adoption.
      status: z.enum(['adoptable', 'resident']),
      // An adoptable animal that has found its forever home. Still shown on the
      // adopt page (celebrated, with an "Adopted" badge) but hidden behind a
      // "show adopted" toggle by default. Meaningless for residents.
      adopted: z.boolean().default(false),
      // Short personality blurb shown on cards.
      summary: z.string().optional(),
      tags: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      order: z.number().default(0),
      // Optional optimized imagery — Astro's pipeline generates responsive
      // sizes + modern formats at build time. Until a photo is uploaded, the
      // UI falls back to an illustrated placeholder.
      cover: image().optional(),
      coverAlt: z.string().optional(),
      gallery: z.array(image()).default([]),
      // Adoption fee in USD (the canonical amount). Shown USD-first with an
      // approximate BRL value fetched in-browser — see src/lib/fx-client.ts.
      // $1 minimum: we never give animals away for $0 (it complicates intent
      // and screening). Leave blank/null to suppress the fee on the profile.
      adoptionFee: z.preprocess(blankToUndefined, z.number().min(1).optional()),
      quickFacts: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    }),
});

// Visitor reviews / testimonials. Unlike an animal (a fact that genuinely
// exists in both languages), a review is a person's *utterance* — it has one
// true language it was written in (`originLang`). The other locale's file is a
// translation of it, and the UI flags it as such when shown off-origin. Stored
// per-locale like animals so the same two-sided staleness seal applies.
const reviews = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reviews' }),
  schema: z.object({
    author: z.string(),
    // Context line under the name, e.g. "Adopted Mochi · 2024".
    role: z.string().optional(),
    quote: z.string(),
    rating: z.number().min(1).max(5).default(5),
    // Avatar illustration shown beside the quote.
    kind: z.enum(['dog', 'cat', 'bunny']).optional(),
    // The language the reviewer actually wrote in. A shared fact (identical in
    // both files); drives the "Translated from …" badge on the off-origin side.
    originLang: z.enum(['en', 'pt-br']),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = { animals, reviews };
