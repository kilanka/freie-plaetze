import axios from "axios";

import { nominatimSearchEndpoint } from "../environment";

/**
 * https://nominatim.org/release-docs/develop/api/Search/
 */
async function queryPosition(params: Record<string, string | number>) {
  const result = (
    await axios.get<any[]>(nominatimSearchEndpoint, {
      params: {
        country: "de",
        format: "jsonv2",
        limit: 1,
        ...params,
      },
      headers: { "User-Agent": "freie-plaetze.de" },
    })
  ).data;

  // console.log(result);

  if (result.length === 0) {
    throw new Error("Position not found");
  }

  const { lat, lon } = result[0];
  return {
    positionLat: parseFloat(lat),
    positionLng: parseFloat(lon),
  };
}

type Address = {
  street: string;
  streetNumber: string;
  zip: number;
};

export const getPositionByAddress = ({ street, streetNumber, zip }: Address) =>
  queryPosition({
    postalcode: zip,
    street: `${streetNumber} ${street}`,
  });

export const getPositionByZipOrCity = (cityOrZip: string) =>
  queryPosition({
    [/^\d+$/.test(cityOrZip) ? "postalcode" : "city"]: cityOrZip,
  });
