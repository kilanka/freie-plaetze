import dotenv from "dotenv";
dotenv.config();

export const isProduction = process.env.APP_ENV === "production";

export const databaseUrl =
	process.env.DATABASE_URL ?? "postgres://pguser:pgpass@localhost:5432/pguser";

let secret = process.env.SESSION_SECRET;

if (!secret) {
	if (isProduction) {
		throw new Error("The SESSION_SECRET environment variable must be set in production");
	} else {
		secret = "-- DEV COOKIE SECRET; CHANGE ME --";
	}
}

export const sessionSecret = secret;
export const sessionMaxAge = 60 * 60 * 24 * 30; // 30 days

export const nominatimSearchEndpoint =
	process.env.NOMINATIM_SEARCH_ENDPOINT ?? "https://nominatim.openstreetmap.org/search";

export const imagesPath = process.env.IMAGES_PATH ?? "images";
