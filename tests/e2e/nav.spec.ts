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
  await page.goto('/about');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('About Us');
  await expect(page.getByText(/coming soon/i)).toBeVisible();
});
