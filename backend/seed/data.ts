import faker, { address } from "faker";
import { sample } from "lodash";

faker.seed(123);
faker.setLocale("de");

export const users = [{ name: "admin", email: "admin@example.org", password: "password" }];

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

export const institutions = addresses.map((address) => ({
  owner: "admin",
  name: faker.company.companyName(),
  gender: sample(["mixed", "f", "m"]),
  ageFrom: faker.datatype.number(10),
  ageTo: faker.datatype.number({ min: 11, max: 20 }),
  placesAvailable: faker.datatype.number(10),
  placesTotal: faker.datatype.number({ min: 11, max: 20 }),
  ...address,
}));
