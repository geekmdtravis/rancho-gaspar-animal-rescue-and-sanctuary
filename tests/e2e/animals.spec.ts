import { test, expect } from '@playwright/test';

test.describe('Adopt listing', () => {
  test('lists adoptable animals and filters by species', async ({ page }) => {
    await page.goto('/adopt');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Find your new best friend',
    );

    const luna = page.locator('a[href="/adopt/luna"]').first();
    await expect(luna).toBeVisible();

    // Filter to cats only — Luna (a dog) should be hidden.
    await page.getByRole('button', { name: 'Cats' }).click();
    await expect(luna).toBeHidden();
  });

  test('Portuguese adopt listing is translated', async ({ page }) => {
    await page.goto('/pt-br/adopt');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Encontre seu novo melhor amigo',
    );
  });
});

test.describe('Animal profiles', () => {
  test('adoptable profile shows an apply CTA', async ({ page }) => {
    await page.goto('/adopt/luna');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Luna');
    await expect(page.getByRole('heading', { name: /Meet Luna/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Apply to adopt Luna/i }).first()).toBeVisible();
  });

  test('resident profile is clearly not for adoption', async ({ page }) => {
    await page.goto('/residents/gaspar');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Gaspar');
    await expect(page.locator('.ap-resident-note')).toContainText(/not for adoption/i);
    await expect(page.getByRole('link', { name: /Apply to adopt/i })).toHaveCount(0);
  });
});

test.describe('Residents listing', () => {
  test('lists permanent residents', async ({ page }) => {
    await page.goto('/residents');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('here to stay');
    await expect(page.locator('a[href="/residents/gaspar"]').first()).toBeVisible();
  });
});
