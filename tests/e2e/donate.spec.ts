import { test, expect } from '@playwright/test';

// The donation widget and the /donate page both call the live FX endpoint on
// load; abort it so these tests don't depend on the network (the BRL note then
// just reads "unavailable", which is fine — it isn't what we're asserting).
test.beforeEach(async ({ page }) => {
  await page.route('https://api.frankfurter.dev/**', (route) => route.abort());
});

test.describe('Donation widget → donate page continuity', () => {
  test('the widget CTA forwards the chosen amount + frequency as query params', async ({
    page,
  }) => {
    await page.goto('/');
    const widget = page.locator('[data-donation]').first();
    await widget.locator('.donate__amount[data-amount="10"]').click();
    await widget.locator('.donate__freq-btn[data-freq="month"]').click();

    const cta = widget.locator('[data-donate-cta]');
    await expect(cta).toHaveAttribute('href', /[?&]amount=10\b/);
    await expect(cta).toHaveAttribute('href', /[?&]freq=month\b/);
    // The CTA still points at the donate route.
    await expect(cta).toHaveAttribute('href', /\/donate\?/);
  });

  test('"Other" forwards amount=other and the donate page reveals a custom field', async ({
    page,
  }) => {
    await page.goto('/');
    const widget = page.locator('[data-donation]').first();
    await widget.locator('.donate__amount[data-amount="other"]').click();

    const cta = widget.locator('[data-donate-cta]');
    await expect(cta).toHaveAttribute('href', /amount=other\b/);

    await cta.click();
    await expect(page).toHaveURL(/\/donate\?/);
    await expect(page.locator('[data-custom-input]')).toBeVisible();
  });
});

test.describe('Donate page', () => {
  test('pre-fills the amount + frequency from the query string', async ({ page }) => {
    await page.goto('/donate?freq=month&amount=10');
    await expect(page.locator('.dp__amount[data-amount="10"]')).toHaveClass(/is-active/);
    await expect(page.locator('.dp__freq-btn[data-freq="month"]')).toHaveClass(/is-active/);
    const label = page.locator('[data-cta-label]');
    await expect(label).toContainText('$10');
    await expect(label).toContainText('/mo');
  });

  test('a non-preset amount selects "Other" and prefills the custom field', async ({ page }) => {
    await page.goto('/donate?amount=40');
    await expect(page.locator('.dp__amount[data-amount="other"]')).toHaveClass(/is-active/);
    await expect(page.locator('[data-custom-input]')).toHaveValue('40');
  });

  test('choosing crypto reveals coin options; submitting surfaces the stub', async ({ page }) => {
    await page.goto('/donate');
    await expect(page.locator('[data-coins]')).toBeHidden();
    await page.locator('.dp__method[data-method="crypto"]').click();
    await expect(page.locator('[data-coins]')).toBeVisible();

    // Checkout is stubbed: the submit handler reveals the placeholder rather
    // than navigating to a processor.
    await expect(page.locator('[data-stub]')).toBeHidden();
    await page.locator('[data-submit]').click();
    await expect(page.locator('[data-stub]')).toBeVisible();
  });

  test('an empty custom amount blocks submit with an error', async ({ page }) => {
    await page.goto('/donate?amount=other');
    await page.locator('[data-submit]').click();
    await expect(page.locator('[data-amount-error-msg]')).toBeVisible();
    await expect(page.locator('[data-stub]')).toBeHidden();
  });

  test('the language switcher preserves the gift query params', async ({ page }) => {
    await page.goto('/donate?freq=month&amount=10');
    // The switcher href is built from the pathname at build time; a client
    // script appends the live query so the chosen gift survives the switch.
    await page.locator('.nav__lang').click();
    await expect(page).toHaveURL(/\/pt-br\/donate\?freq=month&amount=10\b/);
    await expect(page.locator('.dp__amount[data-amount="10"]')).toHaveClass(/is-active/);
    await expect(page.locator('.dp__freq-btn[data-freq="month"]')).toHaveClass(/is-active/);
  });
});
