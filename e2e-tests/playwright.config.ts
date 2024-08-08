import {defineConfig, devices} from "@playwright/test";

import {constants} from "./data";

// https://playwright.dev/docs/test-configuration.
export default defineConfig({
	fullyParallel: true,
	forbidOnly: Boolean(process.env.CI),
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: "html",

	use: {
		baseURL: constants.frontendUrl,
		trace: "on-first-retry",
	},
	projects: [
		{
			name: "chromium",
			use: {...devices["Desktop Chrome"]},
		},
		{
			name: "firefox",
			use: {...devices["Desktop Firefox"]},
		},
		{
			name: "webkit",
			use: {...devices["Desktop Safari"]},
		},
	],

	webServer: [
		{
			command: "pnpm --filter backend run e2e",
			env: {
				NODE_ENV: "test",
				PORT: "3010",
				DATABASE_URL: "postgres://pguser:pgpass@localhost:5433/pguser",
				FRONTEND_URL: "http://localhost:8090/",
			},
			url: "http://localhost:3010",
			reuseExistingServer: !process.env.CI,
		},
		{
			command: "wait-port localhost:3010 && pnpm --filter frontend run e2e",
			env: {
				NODE_ENV: "test",
				NEXT_PUBLIC_BACKEND_URL: "http://localhost:3010",
			},
			url: "http://localhost:8090/about",
			reuseExistingServer: !process.env.CI,
		},
	],
});
