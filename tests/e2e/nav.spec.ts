import { test, expect } from '@playwright/test';

// Guards against dead links: crawl every internal href in the header and footer
// and assert each resolves (no 404).
for (const start of ['/', '/pt-br/']) {
  test(`header & footer internal links resolve from ${start}`, async ({ page }) => {
    await page.goto(start);
    const hrefs = await page
      .locator('header a, footer a')
      .evaluateAll((els) => els.map((a) => a.getAttribute('href')));
    const internal = [...new Set(hrefs.filter((h): h is string => !!h && h.startsWith('/')))];

    expect(internal.length).toBeGreaterThan(5);
    for (const href of internal) {
      const res = await page.request.get(href);
      expect(res.status(), `dead link: ${href}`).toBeLessThan(400);
    }
  });
}

test('a placeholder route renders the coming-soon page', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Contact');
  await expect(page.getByText(/coming soon/i)).toBeVisible();
});

test('about page renders story and live resident counts', async ({ page }) => {
  await page.goto('/about');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'A family sanctuary shaped by one stray cat',
  );
  await expect(page.getByText('2 total residents')).toBeVisible();
  await expect(page.getByText('1 cat')).toBeVisible();
  await expect(page.getByText('1 dog')).toBeVisible();
  await expect(page.getByText('0 bunnies')).toBeVisible();
});

test('the CMS admin shell resolves with and without a trailing slash', async ({ page }) => {
  for (const path of ['/admin', '/admin/']) {
    const res = await page.request.get(path);
    expect(res.status(), `admin path: ${path}`).toBeLessThan(400);
    expect(await res.text()).toContain('sveltia-cms.js');
  }
});
