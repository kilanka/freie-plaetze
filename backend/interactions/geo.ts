import {lengthToDegrees} from "@turf/helpers";
import axios from "axios";

import {nominatimSearchEndpoint} from "../environment";

/**
 * https://nominatim.org/release-docs/develop/api/Search/
 */
async function queryPosition(parameters: Record<string, string | number>) {
	const response = await axios.get<any[]>(nominatimSearchEndpoint, {
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
	queryPosition({
		postalcode: zip,
		street: `${streetNumber} ${street}`,
	});

export const getPositionByZipOrCity = async (cityOrZip: string) =>
	queryPosition({
		[/^\d+$/.test(cityOrZip) ? "postalcode" : "city"]: cityOrZip,
	});

export async function getPositionFilters(cityOrZip: string, radius: number) {
	const positionFilters: any = {};

	if (cityOrZip !== "") {
		const pos = await getPositionByZipOrCity(cityOrZip);
		const radiusDeg = lengthToDegrees(radius, "kilometers");

		positionFilters.positionLat = {
			gt: pos.positionLat - radiusDeg,
			lt: pos.positionLat + radiusDeg,
		};
		positionFilters.positionLng = {
			gt: pos.positionLng - radiusDeg,
			lt: pos.positionLng + radiusDeg,
		};
	}

	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return positionFilters;
}
