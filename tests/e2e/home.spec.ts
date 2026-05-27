import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('English home renders hero, nav, and adoptable animals', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Rancho Gaspar/);
    // Hero headline emphasis word.
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Love.');
    // Donate CTA in the nav.
    await expect(page.getByRole('link', { name: /Donate Now/i }).first()).toBeVisible();
    // At least one adoptable animal card surfaced from the content collection.
    await expect(page.getByRole('heading', { name: 'Luna', level: 3 })).toBeVisible();
    await expect(page.locator('a[href="/adopt/luna"]').first()).toBeVisible();
  });

  test('Brazilian Portuguese home renders translated copy', async ({ page }) => {
    await page.goto('/pt-br/');

    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Amar.');
    await expect(page.getByRole('link', { name: /Doar Agora/i }).first()).toBeVisible();
  });

  test('language switcher moves between locales', async ({ page }) => {
    await page.goto('/');
    // Switch to Portuguese via the header language link (aria-label "Language").
    await page
      .getByRole('link', { name: /Language/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/pt-br\/?$/);
  });
});
