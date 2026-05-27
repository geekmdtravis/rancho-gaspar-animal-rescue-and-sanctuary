// i18n/utils.ts — locale helpers shared across pages and components.
import { ui, defaultLang, type Lang } from './ui';

export const languages: Record<Lang, string> = {
  en: 'English',
  'pt-br': 'Português (BR)',
};

export { defaultLang };
export type { Lang };

/** Derive the active locale from the request URL pathname. */
export function getLangFromUrl(url: URL): Lang {
  const seg = url.pathname.split('/').filter(Boolean)[0];
  if (seg === 'pt-br') return 'pt-br';
  return defaultLang;
}

/**
 * Return the locale dictionary for `lang`, with EN as the structural
 * fallback so partially-translated pages never crash.
 */
export function t(lang: Lang) {
  return ui[lang] ?? ui[defaultLang];
}

/**
 * Prefix a root-relative path with the locale. EN (the default) is served at
 * the root with no prefix; pt-br lives under /pt-br/.
 */
export function localizePath(path: string, lang: Lang): string {
  const clean = ('/' + path.replace(/^\/+/, '')).replace(/\/+$/, '');
  if (lang === defaultLang) return clean === '' ? '/' : clean;
  return clean === '' ? '/pt-br/' : `/pt-br${clean}`;
}

/** Strip the locale prefix from a pathname (for building language switchers). */
export function stripLocale(pathname: string): string {
  const rest = pathname.replace(/^\/pt-br(?=\/|$)/, '');
  return rest === '' ? '/' : rest;
}
