import {createReadStream} from "fs";
import path from "path";

import {faker} from "@faker-js/faker";
import {Upload} from "graphql-upload";
import {sample} from "lodash";
import slugify from "slugify";

faker.seed(123);
faker.setLocale("de");

export const users = [{name: "admin", email: "admin@example.org", password: "password"}];

export const addresses = [
	{
		street: "Wollankstraße",
		streetNumber: "131",
		zip: 13187,
		city: "Berlin",
	},
	{
		street: "Gleimstraße",
		streetNumber: "49",
		zip: 10437,
		city: "Berlin",
	},
	{
		street: "Danziger Str.",
		streetNumber: "50",
		zip: 10435,
		city: "Berlin",
	},
	{
		street: "Kniprodestraße",
		streetNumber: "29",
		zip: 10407,
		city: "Berlin",
	},
	{
		street: "Helsingforser Str.",
		streetNumber: "11-13",
		zip: 10243,
		city: "Berlin",
	},
	{
		street: "Falkenbergsweg",
		streetNumber: "5",
		zip: 21149,
		city: "Hamburg",
	},
	{
		street: "Swebenhöhe",
		streetNumber: "50",
		zip: 22159,
		city: "Hamburg",
	},
	{
		street: "Walderseestraße",
		streetNumber: "99",
		zip: 22605,
		city: "Hamburg",
	},
	{
		street: "Ebelingplatz",
		streetNumber: "8",
		zip: 20537,
		city: "Hamburg",
	},
	{
		street: "Krieterstraße",
		streetNumber: "6",
		zip: 21109,
		city: "Hamburg",
	},
];

let imageNumber = 0;

function getImage() {
	imageNumber++;
	const filename = `${imageNumber}.jpg`;

	const upload = new Upload();
	// @ts-expect-error `resolve` unknown but it still works?
	upload.resolve({
		createReadStream: () => createReadStream(path.resolve(__dirname, `./images/${filename}`)),
		filename,
		encoding: "7bit",
		mimetype: "application/jpeg",
	});
	return {upload};
}

export const institutions = addresses.map((address) => {
	const name = faker.company.companyName();
	return {
		owner: "admin",
		name,
		slug: slugify(name, {lower: true, locale: "de"}),
		gender: sample(["mixed", "f", "m"]),
		ageFrom: faker.datatype.number(10),
		ageTo: faker.datatype.number({min: 11, max: 20}),
		placesAvailable: faker.datatype.number(10),
		placesTotal: faker.datatype.number({min: 11, max: 20}),
		...address,
		photo: getImage(),
		email: faker.internet.email(name),
		phone: faker.phone.phoneNumber("0#### ######"),
		mobilePhone: faker.phone.phoneNumber("015# ########"),
	};
});
