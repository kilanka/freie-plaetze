import {faker} from "@faker-js/faker";
import {Upload} from "graphql-upload";
import {sample} from "lodash";
import {fetch} from "undici";

faker.seed(123);
faker.setLocale("de");

export const users = [
	{name: "Admin", email: "admin@example.org", password: "password", isAdmin: true},
	{name: "User 1", email: "user1@example.org", password: "password", isAdmin: false},
];

export const partialInstitutionData = [
	{
		street: "Wollankstraße",
		streetNumber: "131",
		zip: "13187",
		city: "Berlin",
		owner: "Admin",
	},
	{
		street: "Gleimstraße",
		streetNumber: "49",
		zip: "10437",
		city: "Berlin",
		owner: "Admin",
	},
	{
		street: "Danziger Str.",
		streetNumber: "50",
		zip: "10435",
		city: "Berlin",
		owner: "Admin",
	},
	{
		street: "Kniprodestraße",
		streetNumber: "29",
		zip: "10407",
		city: "Berlin",
		owner: "Admin",
	},
	{
		street: "Helsingforser Str.",
		streetNumber: "11-13",
		zip: "10243",
		city: "Berlin",
		owner: "Admin",
	},
	{
		street: "Falkenbergsweg",
		streetNumber: "5",
		zip: "21149",
		city: "Hamburg",
		owner: "User 1",
	},
	{
		street: "Swebenhöhe",
		streetNumber: "50",
		zip: "22159",
		city: "Hamburg",
		owner: "User 1",
	},
	{
		street: "Walderseestraße",
		streetNumber: "99",
		zip: "22605",
		city: "Hamburg",
		owner: "User 1",
	},
	{
		street: "Ebelingplatz",
		streetNumber: "8",
		zip: "20537",
		city: "Hamburg",
		owner: "User 1",
	},
	{
		street: "Krieterstraße",
		streetNumber: "6",
		zip: "21109",
		city: "Hamburg",
		owner: "User 1",
	},
];

async function getImage() {
	const seed = faker.random.alphaNumeric(5);
	const sourceUrl = `https://picsum.photos/seed/${seed}/600/400`;
	const response = await fetch(sourceUrl);
	const imageStream = response.body!;

	const upload = new Upload();
	// @ts-expect-error `resolve` is unknown
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	upload.resolve({
		createReadStream: () => imageStream,
		filename: `${seed}.jpg`,
		encoding: "7bit",
		mimetype: "application/jpeg",
	});
	return {upload};
}

export async function getInstitutions() {
	return Promise.all(
		partialInstitutionData.map(async (address) => {
			const name = faker.company.companyName();
			return {
				name,
				type: faker.helpers.arrayElement(["p13", "p34", "p35", "p35a", "p41", "p42"]),
				gender: sample(["mixed", "f", "m"]),
				ageFrom: faker.datatype.number(10),
				ageTo: faker.datatype.number({min: 11, max: 20}),
				arePlacesAvailable: faker.datatype.boolean(),
				...address,
				photo: await getImage(),
				homepage: faker.internet.url(),
				email: faker.internet.exampleEmail(name),
				phone: faker.phone.phoneNumber("0#### ######"),
				mobilePhone: faker.phone.phoneNumber("015# ########"),
				descriptionPlain: faker.lorem.paragraphs(),
			};
		})
	);
}
