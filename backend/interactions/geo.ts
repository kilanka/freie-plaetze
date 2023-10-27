import {lengthToDegrees} from "@turf/helpers";
import axios from "axios";
import {Writable} from "type-fest";

import {geoResolverUrl, nominatimSearchEndpoint} from "../environment";
import {InstitutionWhereInput} from ".keystone/types";

/**
 * https://nominatim.org/release-docs/develop/api/Search/
 */
async function queryPosition(parameters: Record<string, string | number>) {
	if (process.env.NODE_ENV === "test") {
		// Mock Nominatim responses in test environments
		return {
			positionLat: 52.517_164_75,
			positionLng: 13.379_497_863,
		};
	}

	const response = await axios.get<any[]>(nominatimSearchEndpoint, {
		params: {
			country: "de",
			format: "jsonv2",
			limit: 1,
			...parameters,
		},
		headers: {"User-Agent": "freie-plaetze.de"},
	});

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

export async function getPositionByZipOrCity(cityOrZip: string) {
	const response = await axios.get<{location: {lat: number; lon: number}}>(
		`${geoResolverUrl}/city/${cityOrZip}`
	);

	if (response.status === 404) {
		throw new Error("Position not found");
	}

	const {lat: positionLat, lon: positionLng} = response.data.location;
	return {positionLat, positionLng};
}

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
