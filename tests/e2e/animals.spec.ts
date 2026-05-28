import { test, expect } from '@playwright/test';

// TODO(content): the suite below assumes the placeholder animals (Luna,
// Clover, Whiskers, Mochi, Grumpy) that lived under src/content/animals/ and
// were removed in 64c0c08 ahead of real sanctuary profiles. Tests that
// reference those slugs, the resident inventory, or `.al-lead`'s computed
// adoption-fee minimum are skipped until real animals are uploaded; reactivate
// (and re-point the slugs) as profiles land.

test.describe('Adopt listing', () => {
  test.skip('lists adoptable animals and filters by species', async ({ page }) => {
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

  test.skip('a real cover photo is cropped square, not rendered full-height', async ({ page }) => {
    await page.goto('/adopt');
    // Clover is visible by default and has a real (portrait) cover photo; the
    // card must still crop it to a square rather than letting it run tall.
    const img = page.locator('a[href="/adopt/clover"] img').first();
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

  test.skip('adopted animals are hidden until the "show adopted" toggle is on', async ({
    page,
  }) => {
    await page.goto('/adopt');
    // Whiskers has been adopted, so the card is rendered but hidden by default.
    const whiskers = page.locator('a[href="/adopt/whiskers"]').first();
    await expect(whiskers).toBeHidden();

    const toggle = page.getByRole('button', { name: 'Show adopted' });
    await expect(toggle).toBeVisible();
    await toggle.click();

    await expect(whiskers).toBeVisible();
    // Once revealed, the card wears an "Adopted" badge.
    await expect(page.locator('.acard--adopted').first()).toContainText('Adopted');

    // Toggling off hides it again.
    await toggle.click();
    await expect(whiskers).toBeHidden();
  });
});

test.describe.skip('Animal profiles', () => {
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

  test('adopted profile celebrates the placement and drops the apply CTA', async ({ page }) => {
    await page.goto('/adopt/whiskers');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Whiskers');
    await expect(page.locator('.ap-state-note--adopted')).toContainText('loving home');
    await expect(page.getByRole('link', { name: /Apply to adopt/i })).toHaveCount(0);
  });

  test('resident profile is clearly not for adoption', async ({ page }) => {
    await page.goto('/residents/mochi');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Mochi');
    await expect(page.locator('.ap-resident-note')).toContainText(/not for adoption/i);
    await expect(page.getByRole('link', { name: /Apply to adopt/i })).toHaveCount(0);
  });

  test('a memorial profile shows the in-memoriam note and no apply CTA', async ({ page }) => {
    await page.goto('/residents/grumpy');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Grumpy');
    // Birth–death span (estimated birth year) stands in for a current age.
    await expect(page.locator('.ap-state-note--memorial')).toContainText('~2003–2024');
    await expect(page.getByRole('link', { name: /Apply to adopt/i })).toHaveCount(0);
  });
});

test.describe.skip('Residents listing', () => {
  test('lists permanent residents and animals in memoriam', async ({ page }) => {
    await page.goto('/residents');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('here to stay');
    await expect(page.locator('a[href="/residents/mochi"]').first()).toBeVisible();
    // Grumpy has passed away but still appears, wearing the memorial badge.
    const grumpy = page.locator('a[href="/residents/grumpy"]').first();
    await expect(grumpy).toBeVisible();
    await expect(page.locator('.acard--memorial').first()).toContainText('In loving memory');
  });
});
