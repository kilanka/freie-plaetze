import path from "node:path";

import {setDefaultOptions} from "expect-puppeteer";

setDefaultOptions({timeout: 5000});

jest.setTimeout(300_000);

async function debug() {
	await jestPuppeteer.debug();
}

async function selectImage(buttonId: string, filename: string) {
	const [fileChooser] = await Promise.all([
		page.waitForFileChooser(),
		expect(page).toClick(`button[id=${buttonId}]`, {text: "Bild auswählen"}),
	]);
	await fileChooser.accept([path.join(__dirname, "images", filename)]);
}

const constants = {
	backendUrl: "http://localhost:3010",
	frontendUrl: "http://localhost:8090",
	user: {
		name: "Test User",
		email: "test-user@example.org",
		password: "test-user-password",
	},
	institutionAddress: {
		street: "Pariser Platz",
		streetNumber: "5",
		zip: "10117",
		city: "Berlin",
	},
	providerAddress: {
		street: "Pariser Platz",
		streetNumber: "5",
		zip: "10117",
		city: "Berlin",
	},
};

describe("Backend", () => {
	it("should provide a form to create the first user", async () => {
		await page.goto(constants.backendUrl + "/init");

		await expect(page).toMatchTextContent("Welcome to KeystoneJS");
		await expect(page).toFill("input#name", constants.user.name);
		await expect(page).toFill("input#email", constants.user.email);

		await expect(page).toClick("button", {text: "Set Password"});
		await expect(page).toFill("input#password-new-password", constants.user.password);
		await expect(page).toFill("input#password-confirm-password", constants.user.password);

		await expect(page).toClick("button", {text: "Get started"});

		await expect(page).toMatchTextContent("Signed in as Test User");
		await expect(page).toClick("button", {text: "Sign out"});
	});

	it("should subsequently show a sign-in form ", async () => {
		await page.goto(constants.backendUrl + "/signin");

		await expect(page).toFillForm("form", {
			identity: constants.user.email,
			password: constants.user.password,
		});

		await expect(page).toClick("button", {text: "Sign In"});
		await page.reload(); // Keystone shows an error message sometimes suggesting a page reload

		await expect(page).toMatchTextContent("Signed in as Test User");
		await expect(page).toClick("button", {text: "Sign out"});
	});
});

describe("Frontend", () => {
	beforeAll(async () => {
		await jestPuppeteer.resetPage();
	});

	it("should allow users to sign in", async () => {
		await page.goto(constants.frontendUrl + "/about");

		await expect(page).toClick("a", {text: "Anmelden"});

		await expect(page).toFillForm("form[id=login]", {
			email: constants.user.email,
			password: constants.user.password,
		});
		await expect(page).toClick("button[type=submit]", {text: "Anmelden"});

		await expect(page).toMatchTextContent("Test User");
		await expect(page).toMatchTextContent("Meine Einrichtungen");
	});

	describe("should allow users to add an institution", () => {
		beforeEach(async () => {
			await expect(page).toClick("a", {text: "Einrichtung hinzufügen", visible: true});
			await page.waitForNavigation();
			await page.waitForSelector("form[id=institution]");
		});

		test("using only required fields", async () => {
			await expect(page).toFillForm("form[id=institution]", {
				name: "Institution1",
				...constants.institutionAddress,
			});
			await expect(page).toClick("button[type=submit]", {text: "Speichern"});
			await page.waitForNavigation();

			await expect(page).toMatchTextContent("Institution1");
			await expect(page).toMatchTextContent("Berlin");
		});

		describe("creating a provider along the way", () => {
			test("specifying a homepage and no address", async () => {
				await expect(page).toSelect("select[name=providerId]", "create");

				await expect(page).toFillForm("form[id=institution]", {
					name: "Institution2",
					...constants.institutionAddress,
					"provider.name": "Provider1",
					"provider.homepage": "https://example.org/provider1",
				});

				await expect(page).toClick("button[type=submit]", {text: "Speichern"});
				await page.waitForNavigation();

				await expect(page).toMatchTextContent("Institution2");
				await expect(page).toMatchTextContent("Träger: Provider1");
				await expect(page).toMatchTextContent("Berlin");
			});

			test("specifying an address and no homepage", async () => {
				await expect(page).toSelect("select[name=providerId]", "create");

				await expect(page).toFillForm("form[id=institution]", {
					name: "Institution3",
					...constants.institutionAddress,
					"provider.name": "Provider2",
					"provider.street": constants.providerAddress.street,
					"provider.streetNumber": constants.providerAddress.streetNumber,
					"provider.zip": constants.providerAddress.zip,
					"provider.city": constants.providerAddress.city,
				});

				await expect(page).toClick("button[type=submit]", {text: "Speichern"});
				await page.waitForNavigation();

				await expect(page).toMatchTextContent("Institution3");
				await expect(page).toMatchTextContent("Träger: Provider2");
				await expect(page).toMatchTextContent("Berlin");
			});
		});

		test("selecting an existing provider", async () => {
			await expect(page).toSelect("select[name=providerId]", "Provider1");

			await expect(page).toFillForm("form[id=institution]", {
				name: "Institution4",
				...constants.institutionAddress,
			});

			await expect(page).toClick("button[type=submit]", {text: "Speichern"});
			await page.waitForNavigation();

			await expect(page).toMatchTextContent("Institution4");
			await expect(page).toMatchTextContent("Träger: Provider1");
			await expect(page).toMatchTextContent("Berlin");
		});

		test("using all available fields (except provider)", async () => {
			await expect(page).toFillForm("form[id=institution]", {
				name: "Institution5",
				...constants.institutionAddress,
				ageFrom: "1",
				ageTo: "2",
				homepage: "https://example.org/institution5",
				email: "institution5@example.org",
				phone: "123",
				mobilePhone: "456",
				descriptionPlain: "Description text",
			});

			await expect(page).toSelect("select[name=gender]", "f");
			await expect(page).toSelect("select[name=arePlacesAvailable]", "false");

			await selectImage("photo", "picsum.photos-518.jpg");
			await selectImage("logo", "picsum.photos-519.jpg");

			await expect(page).toClick("button[type=submit]", {text: "Speichern"});
			await page.waitForNavigation();

			await expect(page).toMatchTextContent("Institution5");
			await expect(page).toMatchTextContent("Berlin");
			await expect(page).toMatchTextContent("Description text");
			await expect(page).toMatchTextContent("https://example.org/institution5");
			await expect(page).toMatchTextContent("institution5@example.org");
			await expect(page).toMatchTextContent("123");
			await expect(page).toMatchTextContent("456");
		});
	});
});
