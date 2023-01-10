import {faker} from "@faker-js/faker";
// @ts-expect-error https://github.com/jaydenseric/graphql-upload/issues/282
import Upload from "graphql-upload/Upload.js";
import {sample} from "lodash";
import {fetch} from "undici";

import {InstitutionCreateInput, UserCreateInput} from ".keystone/types";

faker.seed(123);
faker.setLocale("de");

export const users: UserCreateInput[] = [
	{name: "Admin", email: "admin@example.org", password: "password", isAdmin: true},
	{name: "User 1", email: "user1@example.org", password: "password", isAdmin: false},
	{name: "User 2", email: "user2@example.org", password: "password", isAdmin: false},
];

export const addresses = [
	{
		street: "Wollankstraße",
		streetNumber: "131",
		zip: "13187",
		city: "Berlin",
	},
	{
		street: "Gleimstraße",
		streetNumber: "49",
		zip: "10437",
		city: "Berlin",
	},
	{
		street: "Danziger Str.",
		streetNumber: "50",
		zip: "10435",
		city: "Berlin",
	},
	{
		street: "Kniprodestraße",
		streetNumber: "29",
		zip: "10407",
		city: "Berlin",
	},
	{
		street: "Helsingforser Str.",
		streetNumber: "11-13",
		zip: "10243",
		city: "Berlin",
	},
	{
		street: "Falkenbergsweg",
		streetNumber: "5",
		zip: "21149",
		city: "Hamburg",
	},
	{
		street: "Swebenhöhe",
		streetNumber: "50",
		zip: "22159",
		city: "Hamburg",
	},
	{
		street: "Walderseestraße",
		streetNumber: "99",
		zip: "22605",
		city: "Hamburg",
	},
	{
		street: "Ebelingplatz",
		streetNumber: "8",
		zip: "20537",
		city: "Hamburg",
	},
	{
		street: "Krieterstraße",
		streetNumber: "6",
		zip: "21109",
		city: "Hamburg",
	},
];

async function getImage() {
	const seed = faker.random.alphaNumeric(5);
	const sourceUrl = `https://picsum.photos/seed/${seed}/2400/1600`;
	const response = await fetch(sourceUrl);
	const imageStream = response.body!;

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
	const upload = new Upload();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	upload.resolve({
		createReadStream: () => imageStream,
		filename: `${seed}.jpg`,
		encoding: "7bit",
		mimetype: "application/jpeg",
	});
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	return {upload};
}

export async function getInstitutions(): Promise<InstitutionCreateInput[]> {
	return Promise.all(
		addresses.map(async (address) => {
			const name = faker.company.name();

			const institution: InstitutionCreateInput = {
				...address,
				owner: {
					connect: {email: faker.helpers.arrayElement(["user1@example.org", "user2@example.org"])},
				},
				name,
				types: {
					connect: faker.helpers.arrayElements(
						["13,3", "19", "34", "35", "35a", "41", "42"].map((paragraph) => ({paragraph})),
						faker.datatype.number({min: 1, max: 2})
					),
				},
				gender: sample(["mixed", "f", "m"])!,
				ageFrom: faker.datatype.number(10),
				ageTo: faker.datatype.number({min: 11, max: 20}),
				arePlacesAvailable: faker.datatype.boolean(),
				photo: await getImage(),
				homepage: faker.internet.url(),
				email: faker.internet.exampleEmail(name),
				phone: faker.phone.number("0#### ######"),
				mobilePhone: faker.phone.number("015# ########"),
				descriptionPlain: faker.lorem.paragraphs(),
			};

			return institution;
		})
	);
}
