// Query helpers for the reviews collection. Mirrors src/lib/animals.ts: the
// loader id encodes the locale ("en/martinez-family", "pt-br/martinez-family"),
// so we filter by locale and sort featured-first.
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/utils';

export type Review = CollectionEntry<'reviews'>;

export function reviewLocale(entry: Review): string {
  return entry.id.split('/')[0];
}

export function reviewSlug(entry: Review): string {
  return entry.id.split('/').slice(1).join('/');
}

const byPriority = (a: Review, b: Review) =>
  Number(b.data.featured) - Number(a.data.featured) ||
  a.data.order - b.data.order ||
  a.data.author.localeCompare(b.data.author);

export async function listReviews(lang: Lang): Promise<Review[]> {
  const all = await getCollection('reviews');
  return all.filter((e) => reviewLocale(e) === lang).sort(byPriority);
}

/** The same review in a specific locale (e.g. its origin-language original). */
export async function findReview(lang: Lang, slug: string): Promise<Review | undefined> {
  const all = await getCollection('reviews');
  return all.find((e) => reviewLocale(e) === lang && reviewSlug(e) === slug);
}

/**
 * True when the displayed locale isn't the language the reviewer wrote in — i.e.
 * what's on screen is a translation, and the UI should say so.
 */
export function isTranslated(entry: Review, lang: Lang): boolean {
  return entry.data.originLang !== lang;
}
