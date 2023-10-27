import {test as base, expect} from "@playwright/test";

import {constants} from "../data";
import {Account} from "./Account";
import {Institutions} from "./Institutions";
import {Providers} from "./Providers";

type Fixtures = {
	institutions: Institutions;
	providers: Providers;
};

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
		await page.goto(constants.frontendUrl + "/members/login");
		await expect(page.getByRole("heading", {name: "Anmelden"})).toBeVisible();

		await page.getByLabel("E-Mail-Adresse").fill(account.email);
		await page.getByLabel("Passwort").fill(account.password);
		await page.getByRole("button", {name: "Anmelden"}).click();

		await page.waitForURL(constants.frontendUrl + "/members");
		await expect(page.getByRole("button", {name: account.username})).toBeVisible();

		await use(page);
	},

	async institutions({page, providers}, use) {
		const institutions = new Institutions(page, providers);

		await use(institutions);

		await institutions.removeAll();
	},

	async providers({page}, use) {
		const providers = new Providers(page);

		await use(providers);

		await providers.removeMarked();
	},
});
export {expect} from "@playwright/test";
