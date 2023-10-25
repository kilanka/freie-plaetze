import path from "node:path";

import {Page} from "@playwright/test";

import {constants} from "./data";
import {expect, test} from "./fixtures";

test.describe.configure({mode: "serial"});

async function selectImage(page: Page, label: string, filename: string) {
	const fileChooserPromise = page.waitForEvent("filechooser");
	await page.getByLabel(label).click();
	const fileChooser = await fileChooserPromise;
	await fileChooser.setFiles(path.join(__dirname, "images", filename));
}

test.describe("Add institution", () => {
	test.beforeEach(async ({page, account}) => {
		await page.goto("/members");
		await page.locator("a").filter({hasText: "Einrichtung hinzufügen"}).click();
		await page.waitForURL("/members/add-institution");

		await expect(page.getByRole("heading", {name: "Einrichtung hinzufügen"})).toBeVisible();
	});

	const fillAddressFields = async (page: Page) => {
		const address = constants.institutionAddress;
		await page.getByLabel("Straße*").fill(address.street);
		await page.getByLabel("Hausnummer*").fill(address.streetNumber);
		await page.getByLabel("Postleitzahl*").fill(address.zip);
		await page.getByLabel("Stadt*").fill(address.city);
	};

	test("using only required fields", async ({page}) => {
		await expect(page.getByRole("heading", {name: "Einrichtung hinzufügen"})).toBeVisible();

		await page.getByLabel("Name der Einrichtung*").fill("Institution1");
		await fillAddressFields(page);

		await page.getByRole("button", {name: "Speichern"}).click();

		await expect(page.getByRole("heading", {name: "Institution1"})).toBeVisible();
		await expect(page.getByText("Berlin•geschlechtsgemischt•alle Altersklassen")).toBeVisible();
		await expect(
			page.getByText("Hilfeform: Heimerziehung, sonstige betreute Wohnform (§ 34)")
		).toBeVisible();
		await expect(page.getByText("Institution1Pariser Platz 510117 Berlin")).toBeVisible();
	});

	test.describe("creating a provider along the way", () => {
		test("specifying a homepage and no address", async ({page}) => {
			await page.getByLabel("Name der Einrichtung*").fill("Institution2");
			await fillAddressFields(page);

			await page.getByLabel("Träger", {exact: true}).selectOption("create");
			await page.getByLabel("Name des Trägers*").fill("Provider1");
			await page
				.getByLabel("Homepage des Trägers (falls vorhanden)")
				.fill("https://example.org/provider1");

			await page.getByRole("button", {name: "Speichern"}).click();

			await expect(page.getByRole("heading", {name: "Institution2"})).toBeVisible();
			await expect(page.getByText("Träger: Provider1 – example.org/provider1")).toBeVisible();
		});

		test("specifying an address and no homepage", async ({page}) => {
			await page.getByLabel("Name der Einrichtung*").fill("Institution3");
			await fillAddressFields(page);

			await page.getByLabel("Träger", {exact: true}).selectOption("create");
			await page.getByLabel("Name des Trägers*").fill("Provider2");

			await page.locator('[id="provider\\.street"]').fill(constants.providerAddress.street);
			await page
				.locator('[id="provider\\.streetNumber"]')
				.fill(constants.providerAddress.streetNumber);
			await page.locator('[id="provider\\.zip"]').fill(constants.providerAddress.zip);
			await page.locator('[id="provider\\.city"]').fill(constants.providerAddress.city);

			await page.getByRole("button", {name: "Speichern"}).click();

			await expect(page.getByRole("heading", {name: "Institution3"})).toBeVisible();
			await expect(page.getByText("Berlin•geschlechtsgemischt•alle Altersklassen")).toBeVisible();
			await expect(
				page.getByText("Träger: Provider2, Pariser Platz 5, 10117 Berlin")
			).toBeVisible();
		});
	});

	test("selecting an existing provider", async ({page}) => {
		await page.getByLabel("Name der Einrichtung*").fill("Institution4");
		await fillAddressFields(page);
		await page.getByLabel("Träger", {exact: true}).selectOption({label: "Provider1"});
		await page.getByRole("button", {name: "Speichern"}).click();

		await expect(page.getByRole("heading", {name: "Institution4"})).toBeVisible();
		await expect(page.getByText("Träger: Provider1 – example.org/provider1")).toBeVisible();
	});

	test("using all available fields (except provider)", async ({page}) => {
		await page.getByLabel("Name der Einrichtung*").fill("Institution5");
		await fillAddressFields(page);

		await page
			.locator("div")
			.filter({hasText: /^Hilfeform\(en\)\*Heimerziehung \(§ 34\)$/})
			.locator("svg")
			.nth(2)
			.click();
		await page.getByRole("button", {name: "Eltern-Kind-Wohnen (§ 19 SGB 8)"}).click();

		await page.getByLabel("Geschlecht*").selectOption("f");
		await page.getByLabel("Mindestalter").fill("1");
		await page.getByLabel("Höchstalter").fill("2");
		await page.getByLabel("Gibt es aktuell freie Plätze?").selectOption("false");
		await page.getByLabel("Homepage").fill("https://example.org/institution5");
		await page.getByLabel("E-Mail-Adresse").fill("institution5@example.org");
		await page.getByLabel("Telefonnummer", {exact: true}).fill("123");
		await page.getByLabel("Mobiltelefonnummer").fill("456");
		await page.getByLabel("Beschreibung der Einrichtung").fill("Description text");

		await selectImage(page, "Foto von der Einrichtung", "picsum.photos-518.jpg");
		await selectImage(page, "Logo der Einrichtung oder des Trägers", "picsum.photos-519.jpg");

		await page.getByRole("button", {name: "Speichern"}).click();

		await expect(page.getByRole("heading", {name: "Institution5"})).toBeVisible();
		await expect(page.getByText("Berlin•nur Mädchen•1 - 2 Jahre")).toBeVisible();
		await expect(
			page.getByText(
				"Hilfeformen: Gemeinsames Wohnen für Mütter/Väter und Kinder (§ 19), Heimerziehun"
			)
		).toBeVisible();
		await expect(page.locator("p").filter({hasText: "Description text"})).toBeVisible();
		await expect(page.getByRole("link", {name: "https://example.org/institution5"})).toBeVisible();
		await expect(page.getByText("Institution5Pariser Platz 510117 Berlin")).toBeVisible();
		await expect(page.getByRole("link", {name: "institution5@example.org"})).toBeVisible();
		await expect(page.getByText("123")).toBeVisible();
		await expect(page.getByText("456")).toBeVisible();
		await expect(page.locator("img").first()).toHaveAttribute("src");
		await expect(page.locator("img").nth(1)).toHaveAttribute("src");
	});
});

test.describe("Edit institution", () => {
	test.beforeEach(async ({page}) => {
		await page.goto("/members");
		await page.locator("a").filter({hasText: "Institution5"}).first().click();
		await expect(page.getByRole("heading", {name: "Institution5"})).toBeVisible();
	});

	test("Toggle places form", async ({page}) => {
		const togglePlacesAvailable = async () => {
			await page.getByText("Gibt es aktuell freie Plätze?").first().click();
		};

		await expect(page.locator('select[name="arePlacesAvailable"]')).toHaveValue("false");
		await togglePlacesAvailable();
		await expect(page.locator('select[name="arePlacesAvailable"]')).toHaveValue("true");
		await togglePlacesAvailable();
		await expect(page.locator('select[name="arePlacesAvailable"]')).toHaveValue("false");
	});

	test("General edit form", async ({page}) => {
		await page.getByLabel("Name der Einrichtung*").fill("Institution5-edited");
		await page.getByLabel("Remove Heimerziehung (§ 34)").click();
		await page.getByLabel("Geschlecht*").selectOption("m");
		await page.getByLabel("Mindestalter").fill("");
		await page.getByLabel("Höchstalter").fill("");
		await page.locator('select[name="arePlacesAvailable"]').selectOption("true");
		await page.getByLabel("Homepage").fill("https://example.org/institution5-edited");
		await page.getByLabel("E-Mail-Adresse").fill("institution5-edited@example.org");
		await page.getByLabel("Telefonnummer", {exact: true}).fill("0123");
		await page.getByLabel("Mobiltelefonnummer").fill("0456");
		await page.getByLabel("Beschreibung der Einrichtung").fill("Edited description text");

		await page.getByRole("button", {name: "Speichern"}).click();

		await expect(page.getByRole("heading", {name: "Institution5-edited"})).toBeVisible();
		await expect(page.getByText("Berlin•nur Jungen•alle Altersklassen")).toBeVisible();
		await expect(page.getByText("Heimerziehung")).not.toBeVisible();
		await expect(page.locator("p").filter({hasText: "Edited description text"})).toBeVisible();
		await expect(
			page.getByRole("link", {name: "https://example.org/institution5-edited"})
		).toBeVisible();
		await expect(page.getByText("Institution5-editedPariser Platz 510117 Berlin")).toBeVisible();
		await expect(page.getByRole("link", {name: "institution5-edited@example.org"})).toBeVisible();
		await expect(page.getByText("0123")).toBeVisible();
		await expect(page.getByText("0456")).toBeVisible();
		await expect(page.locator("img").first()).toHaveAttribute("src");
		await expect(page.locator("img").nth(1)).toHaveAttribute("src");

		await page.getByLabel("Name der Einrichtung*").fill("Institution5");
		await page.getByRole("button", {name: "Speichern"}).click();
		await expect(page.getByRole("heading", {name: "Institution5-edited"})).not.toBeVisible();
	});
});

test("Delete institution", async ({page}) => {
	await page.goto("/members");
	await page.locator("a").filter({hasText: "Institution1"}).first().click();

	await page.getByRole("button", {name: "Institution1 löschen"}).click();
	await page.getByRole("button", {name: "Nein, abbrechen"}).click();
	await page.getByRole("button", {name: "Institution1 löschen"}).click();
	await page.getByRole("button", {name: "Ja, Einrichtung löschen"}).click();

	await expect(page.getByText("Einrichtung gelöscht")).toBeVisible();
	await page.getByRole("button", {name: "Close"}).click();
	await expect(page.getByText("Einrichtung gelöscht")).not.toBeVisible();
});
