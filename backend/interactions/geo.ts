import {lengthToDegrees} from "@turf/helpers";
import axios from "axios";
import {Writable} from "type-fest";

import {nominatimAddressSearchEndpoint, nominatimCitySearchEndpoint} from "../environment";
import {InstitutionWhereInput} from ".keystone/types";

/**
 * https://nominatim.org/release-docs/develop/api/Search/
 */
async function queryPosition(endpointUrl: string, parameters: Record<string, string | number>) {
	const response = await axios.get<any[]>(endpointUrl, {
		params: {
			country: "de",
			format: "jsonv2",
			limit: 1,
			...parameters,
		},
		headers: {"User-Agent": "freie-plaetze.de"},
	});

	// Console.log(result);

	if (response.data.length === 0) {
		throw new Error("Position not found");
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const {lat, lon} = response.data[0];
	return {
		positionLat: Number.parseFloat(lat),
		positionLng: Number.parseFloat(lon),
	};
}

type Address = {
	street: string;
	streetNumber: string;
	zip: number;
};

export const getPositionByAddress = async ({street, streetNumber, zip}: Address) =>
	queryPosition(nominatimAddressSearchEndpoint, {
		postalcode: zip,
		street: `${streetNumber} ${street}`,
	});

export const getPositionByZipOrCity = async (cityOrZip: string) =>
	queryPosition(nominatimCitySearchEndpoint, {
		[/^\d+$/.test(cityOrZip) ? "postalcode" : "city"]: cityOrZip,
	});

export async function getPositionFilters(cityOrZip: string, radius: number) {
	const filters: Writable<InstitutionWhereInput> = {};

	if (cityOrZip !== "") {
		const pos = await getPositionByZipOrCity(cityOrZip);
		const radiusDeg = lengthToDegrees(radius, "kilometers");

		filters.positionLat = {
			gt: pos.positionLat - radiusDeg,
			lt: pos.positionLat + radiusDeg,
		};
		filters.positionLng = {
			gt: pos.positionLng - radiusDeg,
			lt: pos.positionLng + radiusDeg,
		};
	}

	return filters;
}
