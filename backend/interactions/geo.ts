import axios from "axios";

type Address = {
  street: string;
  streetNumber: string;
  zip: number;
};

export async function getPositionByAddress({
  street,
  streetNumber,
  zip,
}: Address) {
  // https://nominatim.org/release-docs/develop/api/Search/
  const response = await axios.get<any>(
    `https://nominatim.openstreetmap.org/search`,
    {
      params: {
        country: "de",
        postalcode: zip,
        street: `${streetNumber} ${street}`,
        format: "jsonv2",
        limit: 1,
      },
      headers: { "User-Agent": "freie-plaetze.de" },
    }
  );

  const result = response.data[0];
  return {
    positionLat: parseFloat(result.lat),
    positionLng: parseFloat(result.lon),
  };
}
