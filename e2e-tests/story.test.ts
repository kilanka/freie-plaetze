import "expect-puppeteer";

jest.setTimeout(300_000);

async function debug() {
	await jestPuppeteer.debug();
}

const constants = {
	backendUrl: "http://localhost:3010",
	frontendUrl: "http://localhost:8090",
	user: {
		name: "Test User",
		email: "test-user@example.org",
		password: "test-user-password",
	},
	institution: {
		name: "Institution1",
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

		// Await debug();
		await expect(page).toFillForm("form[id=login]", {
			email: constants.user.email,
			password: constants.user.password,
		});
		await expect(page).toClick("button[type=submit]", {text: "Anmelden"});

		await expect(page).toMatchTextContent("Test User");
		await expect(page).toMatchTextContent("Meine Einrichtungen");
	});

	it("should allow users to add an institution", async () => {
		await expect(page).toClick("a", {text: "Einrichtung hinzufügen", visible: true});

		await expect(page).toFillForm("form[id=institution]", {
			...constants.institution,
		});
		await expect(page).toClick("button[type=submit]", {text: "Speichern"});

		await debug();
	});
});
