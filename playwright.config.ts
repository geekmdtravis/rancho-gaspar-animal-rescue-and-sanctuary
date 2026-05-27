import { defineConfig, devices } from '@playwright/test';

// e2e config. The webServer command builds *then* previews, so tests always
// run against a fresh production build — never a stale dist/.
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    // Dedicated port so e2e never collides with a running `npm run dev`
    // (4321) and always tests its own fresh build.
    baseURL: 'http://localhost:4322',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run build && npm run preview -- --port 4322',
    url: 'http://localhost:4322',
    reuseExistingServer: false,
    timeout: 180_000,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
