import {chromium} from "@playwright/test";

import {constants} from "./data";

async function globalSetup() {
	const browser = await chromium.launch();
	const page = await browser.newPage();

	console.log("Creating initial admin user...");

	await page.goto(constants.backendUrl + "/init");

	await page.getByRole("heading", {name: "Welcome to KeystoneJS"}).waitFor({state: "visible"});

	await page.getByLabel("Name").fill(constants.user.name);
	await page.getByLabel("Email").fill(constants.user.email);
	await page.getByRole("button", {name: "Set Password"}).click();
	await page.getByPlaceholder("New Password").fill(constants.user.password);
	await page.getByPlaceholder("Confirm Password").fill(constants.user.password);

	await page.getByRole("button", {name: "Get started"}).click();
	await page.getByText("Signed in as Test User").waitFor({state: "visible"});

	await page.getByRole("button", {name: "Sign out"}).click();
	await page.getByRole("heading", {name: "Sign In"}).waitFor({state: "visible"});

	await browser.close();
}

export default globalSetup;
