import { test, expect } from '@playwright/test';

test.describe('Adopt listing', () => {
  test('lists adoptable animals and filters by species', async ({ page }) => {
    await page.goto('/adopt');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Find your new best friend',
    );

    const luna = page.locator('a[href="/adopt/luna"]').first();
    await expect(luna).toBeVisible();
    await expect(page.getByRole('button', { name: 'Share Luna' }).first()).toBeVisible();

    // Filter to cats only — Luna (a dog) should be hidden.
    await page.getByRole('button', { name: 'Cats' }).click();
    await expect(luna).toBeHidden();
  });

  test('a real cover photo is cropped square, not rendered full-height', async ({ page }) => {
    await page.goto('/adopt');
    const img = page.locator('a[href="/adopt/buddy"] img').first();
    await expect(img).toBeVisible();
    const box = await img.boundingBox();
    expect(box, 'cover image should have a layout box').not.toBeNull();
    if (box) {
      const ratio = box.width / box.height;
      expect(ratio, `cover aspect ratio was ${ratio.toFixed(2)}`).toBeGreaterThan(0.8);
      expect(ratio, `cover aspect ratio was ${ratio.toFixed(2)}`).toBeLessThan(1.25);
    }
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
    await expect(page.getByRole('button', { name: 'Share Luna' })).toBeVisible();
  });

  test('share fallback confirms when the link is copied', async ({ page }) => {
    await page.goto('/adopt/luna');
    await page.evaluate(() => {
      Object.defineProperty(navigator, 'share', { value: undefined, configurable: true });
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: async () => undefined },
        configurable: true,
      });
    });

    const share = page.getByRole('button', { name: 'Share Luna' });
    await share.click();
    await expect(page.getByRole('button', { name: 'Link copied' })).toBeVisible();
    await expect(share.locator('.ap-share-feedback')).toBeVisible();
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
