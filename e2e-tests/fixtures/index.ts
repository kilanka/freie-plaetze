import {test as base, expect} from "@playwright/test";

import {constants} from "../data";
import {Account} from "./Account";

// eslint-disable-next-line @typescript-eslint/ban-types
type Fixtures = {};

type WorkerFixtures = {
	account: Account;
};

export const test = base.extend<Fixtures, WorkerFixtures>({
	account: [
		async ({browser}, use, workerInfo) => {
			const page = await browser.newPage();
			const account = new Account(page, `user-${workerInfo.workerIndex}`);
			await account.create();
			await use(account);
			await account.remove();
			await page.close();
		},
		{scope: "worker"},
	],

	async page({page, account}, use) {
		await page.goto(constants.frontendUrl);
		await page.getByRole("link", {name: "Anmelden"}).first().click();
		await expect(page.getByRole("heading", {name: "Anmelden"})).toBeVisible();

		await page.getByLabel("E-Mail-Adresse").fill(account.email);
		await page.getByLabel("Passwort").fill(account.password);
		await page.getByRole("button", {name: "Anmelden"}).click();

		await expect(page.getByRole("button", {name: account.username})).toBeVisible();

		await use(page);
	},
});
export {expect} from "@playwright/test";
