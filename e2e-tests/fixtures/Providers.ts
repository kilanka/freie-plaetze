import {expect, Page} from "@playwright/test";

import {selectImage} from "../utils";

interface ProviderData {
	name?: string;
	homepage?: string;
	address?: {street: string; streetNumber: string; zip: string; city: string};
}

export class Providers {
	public readonly namesMarkedForRemoval = new Set<string>();

	constructor(public readonly page: Page) {}

	async fillProviderForm(data: ProviderData) {
		if (data.name) await this.page.getByLabel("Name des Trägers*").fill(data.name);
		if (typeof data.homepage === "string") {
			await this.page.getByLabel("Homepage des Trägers").fill(data.homepage);
		}

		if (data.address) {
			await this.page.getByLabel("Straße*").fill(data.address.street);
			await this.page.getByLabel("Hausnummer*").fill(data.address.streetNumber);
			await this.page.getByLabel("Postleitzahl*").fill(data.address.zip);
			await this.page.getByLabel("Stadt*").fill(data.address.city);
		}
	}

	async pressSaveButton() {
		await this.page.getByRole("button", {name: "Speichern"}).click();
		await this.page.waitForURL(/\/members\/provider\//);
	}

	async goToProviderPage(providerName: string) {
		await this.page.goto("/members");
		await this.page.locator("a").filter({hasText: providerName}).first().click();
		await expect(this.page.getByRole("heading", {name: providerName})).toBeVisible();
	}

	async edit(providerName: string, data: ProviderData, beforeSave?: () => Promise<void>) {
		await this.goToProviderPage(providerName);
		await this.fillProviderForm(data);

		if (beforeSave) {
			await beforeSave();
		}

		await this.pressSaveButton();

		await expect(this.page.getByText("Angaben erfolgreich aktualisiert")).toBeVisible();
		await this.page.getByRole("button", {name: "Close"}).click();

		if (data.name && data.name !== providerName) {
			this.namesMarkedForRemoval.delete(providerName);
			this.namesMarkedForRemoval.add(data.name);
		}
	}

	async remove(providerName: string) {
		await this.goToProviderPage(providerName);

		await this.page.getByRole("button", {name: providerName + " löschen"}).click();
		await this.page.getByRole("button", {name: "Ja, Träger löschen"}).click();

		await expect(this.page.getByText("Träger gelöscht")).toBeVisible();
		await this.page.getByRole("button", {name: "Close"}).click();

		await this.page.waitForURL(/\/members$/);

		this.namesMarkedForRemoval.delete(providerName);
	}

	/** This method is automatically called at test teardown */
	async removeMarked() {
		for (const name of this.namesMarkedForRemoval.values()) {
			// eslint-disable-next-line no-await-in-loop
			await this.remove(name);
		}
	}
}
