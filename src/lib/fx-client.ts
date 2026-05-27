// Client-side USD→BRL conversion. The sanctuary is in Brazil, but most donors
// are in the US, so amounts are authored in USD and shown USD-first with an
// approximate BRL equivalent for local readers.
//
// Unlike a build-time rate baked into the HTML, this runs in the visitor's
// browser on page load: Frankfurter is open-access (no key) and CORS-enabled
// (`access-control-allow-origin: *`), so the browser can fetch it directly with
// no backend. The trade-off is honesty over a stale guess — there is NO
// hardcoded fallback rate. If the fetch fails (offline, blocked, API down) the
// caller shows an explicit "unavailable" label rather than a wrong number.

const FX_URL = 'https://api.frankfurter.dev/v1/latest?base=USD&symbols=BRL';

let cached: Promise<number | null> | null = null;

/**
 * USD→BRL rate, fetched once per page load and memoized so every amount on the
 * page shares a single request. Resolves `null` (never rejects) when the rate
 * can't be obtained, which the UI renders as "unavailable".
 */
export function usdToBrl(): Promise<number | null> {
  if (cached) return cached;
  cached = (async () => {
    try {
      const res = await fetch(FX_URL, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) throw new Error(`FX request failed: ${res.status}`);
      const data = (await res.json()) as { rates?: { BRL?: number } };
      const rate = data?.rates?.BRL;
      return typeof rate === 'number' && rate > 0 ? rate : null;
    } catch {
      return null;
    }
  })();
  return cached;
}

/** Format a USD amount's BRL equivalent as e.g. "R$ 151" (whole reais). */
export function brl(usd: number, rate: number): string {
  return `R$ ${Math.round(usd * rate).toLocaleString('pt-BR')}`;
}
