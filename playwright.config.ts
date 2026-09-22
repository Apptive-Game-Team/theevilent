import { defineConfig, devices } from '@playwright/test';

// A second checkout running the suite at the same time needs its own port,
// so this reads it from the environment instead of hardcoding 4174.
const PORT = Number(process.env.PLAYWRIGHT_PORT) || 4174;

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    // Vite's dev server compiles a route the first time it is requested. These
    // tests enter routes directly and run in parallel, so those first requests
    // outran the 60s test timeout and a different test failed on every run —
    // including on an untouched dev branch. Serving a built bundle removes the
    // on-demand compile, and the longer timeout covers the build itself.
    command: `npm run build && npm run preview -- --host 127.0.0.1 --port ${PORT} --strictPort`,
    url: `http://127.0.0.1:${PORT}`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
