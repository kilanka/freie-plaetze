import {expect, Locator, Page} from "@playwright/test";

import {constants} from "../data";

export class Account {
	public readonly email;
	public readonly password = "user-password";

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
		await this.page.getByLabel("Passwort", {exact: true}).fill("user-password");
		await this.page.getByLabel("Passwort wiederholen").fill("user-password");
		await this.page.locator("span").first().click();
		await this.page.getByRole("button", {name: "Registrieren"}).click();

		await expect(this.page.getByRole("heading", {name: "Meine Einrichtungen"})).toBeVisible();
		await expect(this.page.getByText(this.username)).toBeVisible();
	}

	async remove() {
		await this.page.goto("/members");
		await this.page.getByRole("button", {name: this.username}).click();
		await this.page.getByRole("menuitem", {name: "Benutzerdaten"}).click();
		await this.page.getByRole("button", {name: "Benutzerkonto löschen"}).click();
		await this.page.getByRole("button", {name: "Ja, Konto löschen"}).click();
		await this.page.getByLabel("Close").click();
	}
}
