import {constants} from "./data";
import {expect, test} from "./fixtures";

test.beforeEach(async ({institutions, providers}) => {
	// Providers can only be created when adding/editing institutions
	await institutions.add({
		name: "Institution",
		address: constants.institutionAddress,
		provider: {name: "My Provider", ...constants.providerAddress},
	});

	await providers.goToProviderPage("My Provider");
});

test.describe("Edit provider", () => {
	test("should hide address fields when a homepage is provided", async ({page, providers}) => {
		await expect(page.getByLabel("Straße")).toBeVisible();

		await providers.edit(
			"My Provider",
			{
				name: "My Edited Provider",
				homepage: "https://example.org/my-provider",
			},
			async () => {
				// Address fields should be hidden now that a homepage is provided
				await Promise.all(
					["Straße", "Hausnummer", "Postleitzahl", "Stadt"].map(async (label) =>
						expect(page.getByLabel(label)).not.toBeVisible()
					)
				);
			}
		);

		await expect(page.getByRole("heading", {name: "My Edited Provider"})).toBeVisible();
		await expect(page.getByLabel("Homepage des Trägers")).toHaveValue(
			"https://example.org/my-provider"
		);
	});

	test("should require address fields when no homepage is provided", async ({page, providers}) => {
		await providers.edit("My Provider", {homepage: "https://example.org/my-provider"});

		await expect(page.getByLabel("Straße")).not.toBeVisible();

		await providers.edit(
			"My Provider",
			{
				name: "My Edited Provider",
				homepage: "",
				address: {
					...constants.providerAddress,
					street: "Musterstr.",
					streetNumber: "1",
				},
			},
			async () => {
				// Address fields should be required now
				await Promise.all(
					["Straße", "Hausnummer", "Postleitzahl", "Stadt"].flatMap(async (label) => [
						expect(page.getByLabel(label)).toBeVisible(),
						expect(page.getByLabel(label)).toHaveAttribute("required"),
					])
				);
			}
		);

		await expect(page.getByRole("heading", {name: "My Edited Provider"})).toBeVisible();
		await expect(page.getByLabel("Homepage des Trägers")).toHaveValue("");
		await expect(page.getByLabel("Straße")).toHaveValue("Musterstr.");
		await expect(page.getByLabel("Hausnummer")).toHaveValue("1");
	});
});

test("Delete provider", async ({page, providers}) => {
	await page.getByRole("button", {name: "My Provider löschen"}).click();
	await page.getByRole("button", {name: "Nein, abbrechen"}).click();

	await providers.remove("My Provider");
});
