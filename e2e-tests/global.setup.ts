import {expect, test as setup} from "@playwright/test";

import {constants} from "./data";
import {STORAGE_STATE_PATH} from "./playwright.config";

setup.describe.configure({mode: "serial"});

setup("Create first user", async ({page}) => {
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

setup("Sign in", async ({page}) => {
	await page.goto(constants.frontendUrl);
	await page.getByRole("link", {name: "Anmelden"}).first().click();

	await expect(page.getByRole("heading", {name: "Anmelden"})).toBeVisible();

	await page.getByLabel("E-Mail-Adresse").fill(constants.user.email);
	await page.getByLabel("Passwort").fill(constants.user.password);
	await page.getByRole("button", {name: "Anmelden"}).click();

	await expect(page.getByRole("button", {name: "Test User Test User"})).toBeVisible();
	await expect(page.getByRole("heading", {name: "Meine Einrichtungen"})).toBeVisible();

	await page.context().storageState({path: STORAGE_STATE_PATH});
});
