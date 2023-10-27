import {Page, expect} from "@playwright/test";

import {selectImage} from "../utils";
import {Providers} from "./Providers";

interface InstitutionData {
	name?: string;
	address?: {street: string; streetNumber: string; zip: string; city: string};
	gender?: "f" | "m" | "mixed";
	ageFrom?: string;
	ageTo?: string;
	arePlacesAvailable?: boolean;
	homepage?: string;
	email?: string;
	phone?: string;
	mobile?: string;
	description?: string;
	photo?: string;
	logo?: string;

	provider?:
		| string
		| {
				name: string;
				homepage?: string;
				street?: string;
				streetNumber?: string;
				zip?: string;
				city?: string;
		  };
}

export class Institutions {
	public readonly allNames = new Set<string>();

	constructor(public readonly page: Page, private readonly providersFixture: Providers) {}

	/**
	 * Fills out the "Add Institution" form with the provided data, runs the `beforeSave` callback (if
	 * one is provided) and hits the save button
	 */
	async add(data: InstitutionData, beforeSave?: () => Promise<void>) {
		await this.page.goto("/members");
		await this.page.locator("a").filter({hasText: "Einrichtung hinzufügen"}).click();
		await this.page.waitForURL("/members/add-institution");
		await expect(this.page.getByRole("heading", {name: "Einrichtung hinzufügen"})).toBeVisible();

		await this.fillInstitutionForm(data);

		if (beforeSave) {
			await beforeSave();
		}

		await this.pressSaveButton();
		this.allNames.add(data.name!);

		if (typeof data.provider === "object") {
			this.providersFixture.namesMarkedForRemoval.add(data.provider.name);
		}
	}

	// eslint-disable-next-line complexity
	async fillInstitutionForm(data: InstitutionData) {
		if (data.name) await this.page.getByLabel("Name der Einrichtung*").fill(data.name);
		if (data.address) {
			await this.page.getByLabel("Straße*").fill(data.address.street);
			await this.page.getByLabel("Hausnummer*").fill(data.address.streetNumber);
			await this.page.getByLabel("Postleitzahl*").fill(data.address.zip);
			await this.page.getByLabel("Stadt*").fill(data.address.city);
		}

		if (data.gender) await this.page.getByLabel("Geschlecht*").selectOption(data.gender);
		if (data.ageFrom) await this.page.getByLabel("Mindestalter").fill(data.ageFrom);
		if (data.ageTo) await this.page.getByLabel("Höchstalter").fill(data.ageTo);
		if (typeof data.arePlacesAvailable !== "undefined") {
			await this.page
				.locator('select[name="arePlacesAvailable"]')
				.selectOption(JSON.stringify(data.arePlacesAvailable));
		}

		if (data.homepage) await this.page.getByLabel("Homepage").fill(data.homepage);
		if (data.email) await this.page.getByLabel("E-Mail-Adresse").fill(data.email);
		if (data.phone) await this.page.getByLabel("Telefonnummer", {exact: true}).fill(data.phone);
		if (data.mobile) await this.page.getByLabel("Mobiltelefonnummer").fill(data.mobile);
		if (data.description) {
			await this.page.getByLabel("Beschreibung der Einrichtung").fill(data.description);
		}

		if (data.photo) await selectImage(this.page, "Foto von der Einrichtung", data.photo);
		if (data.logo) await selectImage(this.page, "Logo der Einrichtung oder des Trägers", data.logo);

		if (typeof data.provider === "string") {
			await this.page.getByLabel("Träger", {exact: true}).selectOption({label: data.provider});
		} else if (typeof data.provider === "object") {
			const {provider} = data;
			await this.page.getByLabel("Träger", {exact: true}).selectOption("create");
			await this.page.getByLabel("Name des Trägers*").fill(provider.name);

			if (provider.homepage) {
				await this.page.getByLabel("Homepage des Trägers").fill(provider.homepage);
			}

			if (provider.street) {
				await this.page.locator('[id="provider\\.street"]').fill(provider.street);
			}

			if (provider.streetNumber) {
				await this.page.locator('[id="provider\\.streetNumber"]').fill(provider.streetNumber);
			}

			if (provider.zip) await this.page.locator('[id="provider\\.zip"]').fill(provider.zip);
			if (provider.city) await this.page.locator('[id="provider\\.city"]').fill(provider.city);
		}
	}

	async pressSaveButton() {
		await this.page.getByRole("button", {name: "Speichern"}).click();
		await this.page.waitForURL(/\/members\/institution\//);
	}

	async goToInstitutionPage(institutionName: string) {
		await this.page.goto("/members");
		await this.page.locator("a").filter({hasText: institutionName}).first().click();
		await expect(this.page.getByRole("heading", {name: institutionName})).toBeVisible();
	}

	async edit(institutionName: string, data: InstitutionData, beforeSave?: () => Promise<void>) {
		await this.goToInstitutionPage(institutionName);
		await this.fillInstitutionForm(data);

		if (beforeSave) {
			await beforeSave();
		}

		await this.pressSaveButton();

		if (data.name && data.name !== institutionName) {
			this.allNames.delete(institutionName);
			this.allNames.add(data.name);
		}
	}

	async remove(institutionName: string) {
		await this.goToInstitutionPage(institutionName);

		await this.page.getByRole("button", {name: institutionName + " löschen"}).click();
		await this.page.getByRole("button", {name: "Ja, Einrichtung löschen"}).click();

		await expect(this.page.getByText("Einrichtung gelöscht")).toBeVisible();
		await this.page.getByRole("button", {name: "Close"}).click();

		await this.page.waitForURL(/\/members$/);

		this.allNames.delete(institutionName);
	}

	async removeAll() {
		for (const name of this.allNames.values()) {
			// eslint-disable-next-line no-await-in-loop
			await this.remove(name);
		}
	}
}
