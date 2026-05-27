// Currency conversion for the donation widget. The sanctuary is in Brazil, but
// most donations come from the US, so amounts are shown in USD with an
// approximate BRL equivalent for local donors.
//
// The rate is fetched once at *build time* from Frankfurter (open access, no API
// key, ECB-backed) — so there's no client-side request, no key to leak, and no
// loading flash. Suggested-donation amounts don't need to-the-cent accuracy, and
// the site rebuilds whenever content changes, so a build-time rate stays
// reasonably current. If the API is unreachable, we fall back to a hardcoded
// rate so the build never breaks.

/** Rough USD→BRL used only when the live fetch fails. Refresh occasionally. */
export const FALLBACK_USD_TO_BRL = 5.2;

const FX_URL = 'https://api.frankfurter.dev/v1/latest?base=USD&symbols=BRL';

let cached: Promise<number> | null = null;

/** USD→BRL rate, fetched once per build and memoized. Never throws. */
export function usdToBrl(): Promise<number> {
  if (cached) return cached;
  cached = (async () => {
    try {
      const res = await fetch(FX_URL, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) throw new Error(`FX request failed: ${res.status}`);
      const data = (await res.json()) as { rates?: { BRL?: number } };
      const rate = data?.rates?.BRL;
      if (typeof rate === 'number' && rate > 0) return rate;
      throw new Error('FX response missing a valid BRL rate');
    } catch (err) {
      console.warn(
        `[fx] Falling back to ${FALLBACK_USD_TO_BRL} USD→BRL (${(err as Error).message})`,
      );
      return FALLBACK_USD_TO_BRL;
    }
  })();
  return cached;
}

/** Format a USD amount's BRL equivalent as e.g. "R$ 260" (whole reais). */
export function brlApprox(usd: number, rate: number): string {
  const value = Math.round(usd * rate);
  return `R$ ${value.toLocaleString('pt-BR')}`;
}

/**
 * Format a USD amount USD-first with its approximate BRL value in parentheses,
 * e.g. "$40 (≈ R$ 200)". USD is the canonical figure; the BRL is a build-time
 * estimate, so it's marked approximate. Used for adoption fees.
 */
export function usdWithApprox(usd: number, rate: number): string {
  return `$${usd.toLocaleString('en-US')} (≈ ${brlApprox(usd, rate)})`;
}
