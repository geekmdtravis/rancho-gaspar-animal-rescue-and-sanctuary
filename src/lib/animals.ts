// Query helpers for the `animals` content collection. The entry id encodes
// locale + slug ("en/luna"), and `status` is the resident-vs-adoptable split.
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/utils';

export type Animal = CollectionEntry<'animals'>;
export type AnimalStatus = 'adoptable' | 'resident';
// The two listing pages an animal can live under. This is *derived* from
// status + lifecycle fields, not stored: see `animalRoute`.
export type AnimalRoute = 'adopt' | 'residents';

export function animalLocale(entry: Animal): string {
  return entry.id.split('/')[0];
}

export function animalSlug(entry: Animal): string {
  return entry.id.split('/').slice(1).join('/');
}

/** True once a date of death is recorded — the animal is "in memoriam". */
export function isDeceased(entry: Animal): boolean {
  return entry.data.dod != null;
}

/**
 * True for an adoptable animal that has found a home (and is still with us).
 * Deceased takes precedence — a passed-away animal is shown as a memorial, not
 * as "adopted", even if it was placed before passing.
 */
export function isAdopted(entry: Animal): boolean {
  return entry.data.adopted === true && !isDeceased(entry);
}

/**
 * Which listing page owns an animal. Anyone deceased moves to the residents
 * page (as a memorial) regardless of prior status; otherwise residents stay on
 * /residents and adoptable animals (including adopted ones) stay on /adopt.
 */
export function animalRoute(entry: Animal): AnimalRoute {
  if (isDeceased(entry) || entry.data.status === 'resident') return 'residents';
  return 'adopt';
}

/** Unlocalized canonical path to an animal's profile. */
export function animalPath(entry: Animal): string {
  return `/${animalRoute(entry)}/${animalSlug(entry)}`;
}

const byPriority = (a: Animal, b: Animal) =>
  Number(b.data.featured) - Number(a.data.featured) ||
  a.data.order - b.data.order ||
  a.data.name.localeCompare(b.data.name);

/** Every animal for a locale, sorted by display priority. */
export async function listAnimals(lang: Lang): Promise<Animal[]> {
  const all = await getCollection('animals');
  return all.filter((e) => animalLocale(e) === lang).sort(byPriority);
}

/**
 * Animals shown on a listing page. `/adopt` is adoptable animals that are still
 * with us (including adopted ones — the page hides those behind a toggle);
 * `/residents` is living residents plus everyone in memoriam.
 */
export async function listForRoute(lang: Lang, route: AnimalRoute): Promise<Animal[]> {
  return (await listAnimals(lang)).filter((e) => animalRoute(e) === route);
}

export async function findAnimal(lang: Lang, slug: string): Promise<Animal | undefined> {
  const all = await getCollection('animals');
  return all.find((e) => animalLocale(e) === lang && animalSlug(e) === slug);
}

/**
 * "You might also like" — other animals on the same listing page, same species
 * first. Adopted and in-memoriam animals are never suggested, since the point
 * is to surface animals a visitor can still act on.
 */
export async function similarAnimals(entry: Animal, lang: Lang, limit = 4): Promise<Animal[]> {
  const pool = await listForRoute(lang, animalRoute(entry));
  const slug = animalSlug(entry);
  const others = pool.filter((e) => animalSlug(e) !== slug && !isDeceased(e) && !isAdopted(e));
  const sameSpecies = others.filter((e) => e.data.species === entry.data.species);
  const rest = others.filter((e) => e.data.species !== entry.data.species);
  return [...sameSpecies, ...rest].slice(0, limit);
}
