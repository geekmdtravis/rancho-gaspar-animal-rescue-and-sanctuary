// Age is derived from a date of birth, never stored. Animals' birthdays are
// usually estimates for rescues, but storing a `dob` (plus an `estimated` flag)
// means the displayed age stays correct forever without anyone editing a string
// every year. This module holds the *pure, locale-agnostic* arithmetic; the
// localized wording lives in i18n/utils.ts (`formatAge`).

export type AgeUnit = 'year' | 'month' | 'newborn';
export interface AgeParts {
  /** Whole count of the unit (0 when newborn). */
  value: number;
  unit: AgeUnit;
}

/** The locale words the formatter slots in (sourced from i18n/ui.ts). */
export interface AgeWords {
  year: string;
  years: string;
  month: string;
  months: string;
  newborn: string;
}

/**
 * Whole-unit age from `dob` as of `now`. Returns years once the animal is at
 * least a year old, otherwise months; under a month old it's `newborn`. A
 * future or invalid `dob` clamps to newborn rather than producing nonsense.
 */
export function ageParts(dob: Date, now: Date = new Date()): AgeParts {
  if (Number.isNaN(dob.getTime())) return { value: 0, unit: 'newborn' };

  let months = (now.getFullYear() - dob.getFullYear()) * 12 + (now.getMonth() - dob.getMonth());
  // Not a full month into the current month yet — back it out.
  if (now.getDate() < dob.getDate()) months -= 1;

  if (months <= 0) return { value: 0, unit: 'newborn' };
  if (months < 12) return { value: months, unit: 'month' };
  return { value: Math.floor(months / 12), unit: 'year' };
}

/**
 * Locale-agnostic age string: the caller supplies the words (so this stays
 * import-free and trivially testable). Estimated birthdays get a "~" prefix.
 * Returns `undefined` for a missing/invalid dob so callers can omit the field.
 */
export function formatAgeWith(
  dob: Date | undefined | null,
  estimated: boolean,
  words: AgeWords,
  now: Date = new Date(),
): string | undefined {
  if (!dob || Number.isNaN(dob.getTime())) return undefined;
  const { value, unit } = ageParts(dob, now);
  let label: string;
  if (unit === 'newborn') label = words.newborn;
  else if (unit === 'year') label = `${value} ${value === 1 ? words.year : words.years}`;
  else label = `${value} ${value === 1 ? words.month : words.months}`;
  return estimated ? `~${label}` : label;
}
