// Query helpers for the `animals` content collection. The entry id encodes
// locale + slug ("en/luna"), and `status` is the resident-vs-adoptable split.
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/utils';

export type Animal = CollectionEntry<'animals'>;
export type AnimalStatus = 'adoptable' | 'resident';

export function animalLocale(entry: Animal): string {
  return entry.id.split('/')[0];
}

export function animalSlug(entry: Animal): string {
  return entry.id.split('/').slice(1).join('/');
}

/** Unlocalized canonical path to an animal's profile. */
export function animalPath(entry: Animal): string {
  const base = entry.data.status === 'resident' ? 'residents' : 'adopt';
  return `/${base}/${animalSlug(entry)}`;
}

const byPriority = (a: Animal, b: Animal) =>
  Number(b.data.featured) - Number(a.data.featured) ||
  a.data.order - b.data.order ||
  a.data.name.localeCompare(b.data.name);

export async function listAnimals(lang: Lang, status?: AnimalStatus): Promise<Animal[]> {
  const all = await getCollection('animals');
  return all
    .filter((e) => animalLocale(e) === lang && (!status || e.data.status === status))
    .sort(byPriority);
}

export async function findAnimal(lang: Lang, slug: string): Promise<Animal | undefined> {
  const all = await getCollection('animals');
  return all.find((e) => animalLocale(e) === lang && animalSlug(e) === slug);
}

/** Same-status animals to surface as "you might also like", same species first. */
export async function similarAnimals(entry: Animal, lang: Lang, limit = 4): Promise<Animal[]> {
  const pool = await listAnimals(lang, entry.data.status);
  const slug = animalSlug(entry);
  const others = pool.filter((e) => animalSlug(e) !== slug);
  const sameSpecies = others.filter((e) => e.data.species === entry.data.species);
  const rest = others.filter((e) => e.data.species !== entry.data.species);
  return [...sameSpecies, ...rest].slice(0, limit);
}
