import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  // TODO(content): re-point Luna to a real adoptable slug once sanctuary
  // profiles are uploaded (placeholders were removed in 64c0c08).
  test.skip('English home renders hero, nav, and adoptable animals', async ({ page }) => {
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

  test('reviews show a "translated" badge only off their origin language', async ({ page }) => {
    // pt-br-origin reviews (e.g. ana-pedro) are translations on the English home
    // and must say so; en-origin reviews must NOT be badged here. (Counts are
    // ">= 1" / "== 0" so the test survives adding more reviews either way.)
    await page.goto('/');
    expect(await page.getByText(/Translated from Portuguese/i).count()).toBeGreaterThan(0);
    await expect(page.getByText(/Translated from English/i)).toHaveCount(0);

    // Mirror image on the Portuguese home: en-origin reviews are the translations.
    await page.goto('/pt-br/');
    expect(await page.getByText(/Traduzido do inglês/i).count()).toBeGreaterThan(0);
    await expect(page.getByText(/Traduzido do português/i)).toHaveCount(0);
  });

  test('a translated review can reveal — and re-hide — its original text', async ({ page }) => {
    await page.goto('/');
    // ana-pedro (pt-br origin) shows its English translation by default.
    const card = page.locator('.tcard', { hasText: 'Translated from Portuguese' });
    await expect(card).toContainText('they run a home');
    await expect(card).not.toContainText('eles administram um lar');

    // "Read original" swaps in the Portuguese the reviewer actually wrote.
    await card.getByRole('button', { name: 'Read original' }).click();
    await expect(card).toContainText('eles administram um lar');

    // …and back to the translation.
    await card.getByRole('button', { name: 'Read translation' }).click();
    await expect(card).toContainText('they run a home');
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
