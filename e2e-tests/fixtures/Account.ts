import {expect, Page} from "@playwright/test";

import {constants} from "../data";
import {extractLinksFromEmailText, getEmailText} from "../utils";

export class Account {
	public readonly email;

	constructor(
		public readonly page: Page,
		public readonly username: string
	) {
		this.email = this.username + "@example.org";
	}

	async create() {
		await this.page.goto(constants.frontendUrl);
		await this.page.getByRole("link", {name: "Anmelden"}).first().click();
		await expect(this.page.getByRole("heading", {name: "Anmelden"})).toBeVisible();
		await this.page.getByRole("link", {name: "Hier registrieren"}).click();
		await expect(this.page.getByRole("heading", {name: "Registrieren"})).toBeVisible();

		await this.page.getByLabel("Name").fill(this.username);
		await this.page.getByLabel("E-Mail-Adresse").fill(this.email);
		await this.page.locator("span").first().click();

		await this.page.getByRole("button", {name: "Registrieren"}).click();
		await expect(this.page.getByText("Vielen Dank für Ihre Registrierung!")).toBeVisible();

		const loginLinks = extractLinksFromEmailText(await getEmailText(this.email));
		expect(loginLinks.length).toEqual(2);

		await this.page.goto(loginLinks[0]);
		await expect(this.page.getByText(this.username)).toBeVisible();

		// Open user menu and log out
		await this.page.getByRole("button", {name: this.username}).click();
		await this.page.getByRole("menuitem", {name: "Abmelden"}).click();

		await this.page.waitForURL(constants.frontendUrl);
	}

	async loginOnPage(page: Page) {
		await page.goto(constants.frontendUrl + "/members/login");
		await expect(page.getByRole("heading", {name: "Anmelden"})).toBeVisible();

		await page.getByLabel("E-Mail-Adresse").fill(this.email);
		await page.getByRole("button", {name: "Anmelden"}).click();

		await expect(page.getByText("Wir haben einen Link")).toBeVisible();

		const loginLinks = extractLinksFromEmailText(await getEmailText(this.email));
		expect(loginLinks.length).toEqual(1);

		await page.goto(loginLinks[0]);
		await expect(page.getByText(this.username)).toBeVisible();

		await page.waitForURL(constants.frontendUrl + "/members");
		await expect(page.getByRole("button", {name: this.username})).toBeVisible();
	}

	async remove() {
		await this.loginOnPage(this.page);
		await this.page.getByRole("button", {name: this.username}).click();
		await this.page.getByRole("menuitem", {name: "Benutzerdaten"}).click();
		await this.page.getByRole("button", {name: "Benutzerkonto löschen"}).click();
		await this.page.getByRole("button", {name: "Ja, Konto löschen"}).click();
		await this.page.getByLabel("Close").click();
	}
}
