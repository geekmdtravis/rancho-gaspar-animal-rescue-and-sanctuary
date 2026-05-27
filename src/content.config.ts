// Astro content collections. Animal profiles are stored as markdown under
// src/content/animals/<locale>/<slug>.md so Sveltia CMS and the build read the
// same files. The `status` field is the core resident-vs-adoptable
// distinction; the loader id encodes the locale ("en/luna", "pt-br/luna").
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const animals = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/animals' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      species: z.enum(['dog', 'cat', 'bunny']),
      sex: z.enum(['F', 'M', 'unknown']).default('unknown'),
      // Age is derived from `dob`, never stored, so it never goes stale. Most
      // rescue birthdays are estimates — `dobEstimated` drives the "~" prefix.
      dob: z.coerce.date().optional(),
      dobEstimated: z.boolean().default(true),
      breed: z.string().optional(),
      weight: z.string().optional(),
      // The differentiator: an adoptable animal is looking for a home; a
      // resident lives at the sanctuary permanently and is not for adoption.
      status: z.enum(['adoptable', 'resident']),
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
      adoptionFee: z.string().optional(),
      quickFacts: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    }),
});

export const collections = { animals };
