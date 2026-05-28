import { test, expect } from '@playwright/test';

// USD→BRL conversion is fetched in the browser on load (lib/fx-client.ts), so
// these tests mock the Frankfurter endpoint to exercise both paths
// deterministically — no dependency on the live rate or network.
const FX_GLOB = 'https://api.frankfurter.dev/**';

// TODO(content): both tests below visit /adopt and read `.al-lead` for the
// computed `$30` adoption-fee minimum, which only renders when at least one
// adoptable animal exists. Placeholders were removed in 64c0c08; reactivate
// once real animal profiles land (or refactor to use the donation widget's
// own min amount, which is animal-independent).
test.describe('Client-side currency conversion', () => {
  test.skip('fills the BRL approximation once the rate loads', async ({ page }) => {
    // Pin the rate so the math is exact: lowest adoption fee is $30 → R$ 156.
    await page.route(FX_GLOB, (route) =>
      route.fulfill({ json: { base: 'USD', rates: { BRL: 5.2 } } }),
    );

    await page.goto('/adopt');
    const lead = page.locator('.al-lead');
    await expect(lead).toContainText('$30');
    await expect(lead).toContainText('≈ R$ 156');
    // The honest fallback is replaced, not left alongside the number.
    await expect(lead).not.toContainText('R$ unavailable');

    // The donation widget shares the same rate (default $5 → R$ 26).
    await page.goto('/');
    await expect(page.locator('.donate__fx').first()).toContainText('≈ R$ 26');
  });

  test.skip('shows "unavailable" — never a stale guess — when the fetch fails', async ({
    page,
  }) => {
    await page.route(FX_GLOB, (route) => route.abort());

    await page.goto('/adopt');
    const lead = page.locator('.al-lead');
    // USD (the canonical figure) is always present; BRL says so explicitly.
    await expect(lead).toContainText('$30 (R$ unavailable)');
    await expect(lead).not.toContainText('R$ 1'); // no rate-derived number leaked

    await page.goto('/');
    await expect(page.locator('.donate__fx').first()).toContainText('R$ unavailable');
  });
});
