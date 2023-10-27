import {constants} from "./data";
import {expect, test} from "./fixtures";

test.describe("Add institution", () => {
	test("using only required fields", async ({page, institutions}) => {
		await institutions.add({name: "Institution", address: constants.institutionAddress});

		await expect(page.getByRole("heading", {name: "Institution"})).toBeVisible();
		await expect(page.getByText("Berlin•geschlechtsgemischt•alle Altersklassen")).toBeVisible();
		await expect(
			page.getByText("Hilfeform: Heimerziehung, sonstige betreute Wohnform (§ 34)")
		).toBeVisible();
		await expect(page.getByText("InstitutionPariser Platz 510117 Berlin")).toBeVisible();
	});

	test.describe("creating a provider along the way", () => {
		test("specifying a homepage and no address", async ({page, institutions}) => {
			await institutions.add({
				name: "Institution",
				address: constants.institutionAddress,
				provider: {name: "Provider", homepage: "https://example.org/provider"},
			});

			await expect(page.getByRole("heading", {name: "Institution"})).toBeVisible();
			await expect(page.getByText("Träger: Provider – example.org/provider")).toBeVisible();
		});

		test("specifying an address and no homepage", async ({page, institutions}) => {
			await institutions.add({
				name: "Institution",
				address: constants.institutionAddress,
				provider: {name: "Provider", ...constants.providerAddress},
			});

			await expect(page.getByRole("heading", {name: "Institution"})).toBeVisible();
			await expect(page.getByText("Berlin•geschlechtsgemischt•alle Altersklassen")).toBeVisible();
			await expect(page.getByText("Träger: Provider, Pariser Platz 5, 10117 Berlin")).toBeVisible();
		});
	});

	test("selecting an existing provider", async ({page, institutions}) => {
		await institutions.add({
			name: "Institution creating the provider",
			address: constants.institutionAddress,
			provider: {name: "Provider", homepage: "https://example.org/provider"},
		});

		await institutions.add({
			name: "Institution",
			address: constants.institutionAddress,
			provider: "Provider",
		});

		await expect(page.getByRole("heading", {name: "Institution"})).toBeVisible();
		await expect(page.getByText("Träger: Provider – example.org/provider")).toBeVisible();
	});

	test("using all available fields (except provider)", async ({page, institutions}) => {
		await institutions.add(
			{
				name: "Institution",
				address: constants.institutionAddress,
				gender: "f",
				ageFrom: "1",
				ageTo: "2",
				arePlacesAvailable: false,
				homepage: "https://example.org/institution",
				email: "institution@example.org",
				phone: "123",
				mobile: "456",
				description: "Description text",
				photo: "picsum.photos-518.jpg",
				logo: "picsum.photos-519.jpg",
			},
			async () => {
				await page
					.locator("div")
					.filter({hasText: /^Hilfeform\(en\)\*Heimerziehung \(§ 34\)$/})
					.locator("svg")
					.nth(2)
					.click();
				await page.getByRole("button", {name: "Eltern-Kind-Wohnen (§ 19 SGB 8)"}).click();
			}
		);

		await expect(page.getByRole("heading", {name: "Institution"})).toBeVisible();
		await expect(page.getByText("Berlin•nur Mädchen•1 - 2 Jahre")).toBeVisible();
		await expect(
			page.getByText(
				"Hilfeformen: Gemeinsames Wohnen für Mütter/Väter und Kinder (§ 19), Heimerziehun"
			)
		).toBeVisible();
		await expect(page.locator("p").filter({hasText: "Description text"})).toBeVisible();
		await expect(page.getByRole("link", {name: "https://example.org/institution"})).toBeVisible();
		await expect(page.getByText("InstitutionPariser Platz 510117 Berlin")).toBeVisible();
		await expect(page.getByRole("link", {name: "institution@example.org"})).toBeVisible();
		await expect(page.getByText("123").first()).toBeVisible();
		await expect(page.getByText("456").first()).toBeVisible();
		await expect(page.locator("img").first()).toHaveAttribute("src");
		await expect(page.locator("img").nth(1)).toHaveAttribute("src");
	});
});

test.describe("Edit institution", () => {
	test("Toggle places form", async ({page, institutions}) => {
		await institutions.add({
			name: "Institution",
			address: constants.institutionAddress,
			arePlacesAvailable: false,
		});

		const togglePlacesAvailable = async () => {
			await page.getByText("Gibt es aktuell freie Plätze?").first().click();
		};

		await expect(page.locator('select[name="arePlacesAvailable"]')).toHaveValue("false");
		await togglePlacesAvailable();
		await expect(page.locator('select[name="arePlacesAvailable"]')).toHaveValue("true");
		await togglePlacesAvailable();
		await expect(page.locator('select[name="arePlacesAvailable"]')).toHaveValue("false");
	});

	test("General edit form", async ({page, institutions}) => {
		await institutions.add(
			{
				name: "Institution",
				address: constants.institutionAddress,
				photo: "picsum.photos-518.jpg",
				logo: "picsum.photos-519.jpg",
			},
			async () => {
				await page
					.locator("div")
					.filter({hasText: /^Hilfeform\(en\)\*Heimerziehung \(§ 34\)$/})
					.locator("svg")
					.nth(2)
					.click();
				await page.getByRole("button", {name: "Eltern-Kind-Wohnen (§ 19 SGB 8)"}).click();
			}
		);

		await institutions.edit(
			"Institution",
			{
				name: "Edited Institution",
				gender: "m",
				ageFrom: "", // TODO does this work?
				ageTo: "",
				arePlacesAvailable: true,
				homepage: "https://example.org/edited-institution",
				email: "edited-institution@example.org",
				phone: "0123",
				mobile: "0456",
				description: "Edited description text",
			},
			async () => {
				await page.getByLabel("Remove Heimerziehung (§ 34)").click();
			}
		);

		await expect(page.getByRole("heading", {name: "Edited Institution"})).toBeVisible();
		await expect(page.getByText("Berlin•nur Jungen•alle Altersklassen")).toBeVisible();
		await expect(page.getByText("Heimerziehung")).not.toBeVisible();
		await expect(page.locator("p").filter({hasText: "Edited description text"})).toBeVisible();
		await expect(
			page.getByRole("link", {name: "https://example.org/edited-institution"})
		).toBeVisible();
		await expect(page.getByText("Edited InstitutionPariser Platz 510117 Berlin")).toBeVisible();
		await expect(page.getByRole("link", {name: "edited-institution@example.org"})).toBeVisible();
		await expect(page.getByText("0123")).toBeVisible();
		await expect(page.getByText("0456")).toBeVisible();
		await expect(page.locator("img").first()).toHaveAttribute("src");
		await expect(page.locator("img").nth(1)).toHaveAttribute("src");
	});
});

test("Delete institution", async ({page, institutions}) => {
	await institutions.add({
		name: "Institution",
		address: constants.institutionAddress,
	});

	await page.getByRole("button", {name: "Institution löschen"}).click();
	await page.getByRole("button", {name: "Nein, abbrechen"}).click();
	await page.getByRole("button", {name: "Institution löschen"}).click();
	await page.getByRole("button", {name: "Ja, Einrichtung löschen"}).click();

	await expect(page.getByText("Einrichtung gelöscht")).toBeVisible();
	await page.getByRole("button", {name: "Close"}).click();
	await expect(page.getByText("Einrichtung gelöscht")).not.toBeVisible();

	institutions.allNames.delete("Institution"); // So the institutions fixture doesn't try to delete the institution too
});
