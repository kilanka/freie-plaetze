import {loadEnvConfig} from "@next/env";
import Imgproxy from "imgproxy";

loadEnvConfig(process.cwd());

export const isProduction = process.env.APP_ENV === "production";
export const databaseUrl = process.env.DATABASE_URL!;
export const frontentUrl = process.env.FRONTEND_URL!;
export const geoResolverUrl = process.env.GEO_RESOLVER_URL!;
export const nominatimSearchEndpoint = process.env.NOMINATIM_SEARCH_ENDPOINT!;
export const imagesPath = process.env.IMAGES_PATH!;
export const shouldSeedDataBeInserted = !isProduction && Boolean(process.env.INSERT_SEED_DATA);
export const initialAdminUserEmail = process.env.INITIAL_ADMIN_USER_EMAIL;

export const additionalFrontendOriginExpressions = (
	process.env.ADDITIONAL_FRONTEND_ORIGIN_EXPRESSIONS ?? ""
)
	.split(",")
	.map((regex) => new RegExp(regex));

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

export const imgproxy = new Imgproxy({
	baseUrl: process.env.IMGPROXY_URL!,
	key: process.env.IMGPROXY_KEY!,
	salt: process.env.IMGPROXY_SALT!,
	encode: true,
	insecure: false,
});
