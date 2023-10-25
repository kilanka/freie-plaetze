import {expect, test as setup} from "@playwright/test";

import {constants} from "./data";

setup.describe.configure({mode: "serial"});

setup("Create initial user", async ({page}) => {
	await page.goto("/init");

	try {
		await expect(page.getByRole("heading", {name: "Welcome to KeystoneJS"})).toBeVisible({
			timeout: 1000,
		});
	} catch {
		// Silently skip user creation when the init page doesn't show up, assuming this setup task has
		// already been run in the current test session
		return;
	}

	await page.getByLabel("Name").fill(constants.user.name);
	await page.getByLabel("Email").fill(constants.user.email);
	await page.getByRole("button", {name: "Set Password"}).click();
	await page.getByPlaceholder("New Password").fill(constants.user.password);
	await page.getByPlaceholder("Confirm Password").fill(constants.user.password);
	await page.getByRole("button", {name: "Get started"}).click();

	await expect(page.getByText("Signed in as Test User")).toBeVisible();
	await page.getByRole("button", {name: "Sign out"}).click();

	await expect(page.getByRole("heading", {name: "Sign In"})).toBeVisible();
});
