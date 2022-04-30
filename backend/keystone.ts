import {createAuth} from "@keystone-6/auth";
import {config} from "@keystone-6/core";
import {statelessSessions} from "@keystone-6/core/session";

import {databaseUrl, isProduction, sessionMaxAge, sessionSecret} from "./environment";
import {extendGraphqlSchema, lists} from "./schema";
import {insertSeedData} from "./seed";

const {withAuth} = createAuth({
	listKey: "User",
	identityField: "email",
	secretField: "password",
	sessionData: "id isAdmin",
	initFirstItem: {
		fields: ["name", "email", "password"],
	},
});

const session = statelessSessions({
	maxAge: sessionMaxAge,
	secret: sessionSecret,
});

export default withAuth(
	config({
		server: {
			cors: isProduction
				? undefined
				: {
						origin: ["http://localhost:8080"],
						credentials: true,
				  },
		},
		db: {
			provider: databaseUrl.startsWith("file") ? "sqlite" : "postgresql",
			url: databaseUrl,
			useMigrations: isProduction,
			async onConnect(context) {
				if (!isProduction && process.argv.includes("--seed")) {
					await insertSeedData(context);
				}
			},
		},
		ui: {
			isAccessAllowed: (context) => Boolean(context.session?.data),
		},
		lists,
		session,
		images: {
			upload: "local",
			local: {
				storagePath: "public/images",
				baseUrl: "/images",
			},
		},
		extendGraphqlSchema,
	})
);
