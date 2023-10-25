import path from "node:path";

import {defineConfig, devices} from "@playwright/test";

import {constants} from "./data";

export const STORAGE_STATE_PATH = path.join(__dirname, "playwright/.auth/user.json");

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
			name: "setup",
			testMatch: /global.setup\.ts/,
			use: {
				baseURL: constants.backendUrl,
			},
		},
		{
			name: "chromium",
			testMatch: "**/*.loggedin.spec.ts",
			dependencies: ["setup"],
			use: {...devices["Desktop Chrome"], storageState: STORAGE_STATE_PATH},
		},
		{
			name: "firefox",
			testMatch: "**/*.loggedin.spec.ts",
			dependencies: ["setup"],
			use: {...devices["Desktop Firefox"], storageState: STORAGE_STATE_PATH},
		},
		{
			name: "webkit",
			testMatch: "**/*.loggedin.spec.ts",
			dependencies: ["setup"],
			use: {...devices["Desktop Safari"], storageState: STORAGE_STATE_PATH},
		},
	],

	webServer: [
		{
			command: "npm run -w backend e2e",
			env: {
				NODE_ENV: "test",
			},
			url: "http://localhost:3010",
			reuseExistingServer: !process.env.CI,
			stdout: "pipe",
		},
		{
			command: "npm run -w frontend e2e",
			env: {
				NODE_ENV: "test",
			},
			url: "http://localhost:8090/about",
			reuseExistingServer: !process.env.CI,
			stdout: "pipe",
		},
	],
});
