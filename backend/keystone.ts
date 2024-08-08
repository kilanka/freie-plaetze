import {config} from "@keystone-6/core";
import {statelessSessions} from "@keystone-6/core/session";

import {Context} from ".keystone/types";
import {
	additionalFrontendOriginExpressions,
	databaseUrl,
	frontentUrl,
	imagesPath,
	initialAdminUserEmail,
	sessionMaxAge,
	sessionSecret,
	shouldSeedDataBeInserted,
} from "./environment";
import {extendGraphqlSchema, lists} from "./schema";
import {insertSeedData} from "./seed";

const session = statelessSessions({
	maxAge: sessionMaxAge,
	secret: sessionSecret,
});

export default config({
	server: {
		// https://www.npmjs.com/package/cors#configuration-options
		cors: {origin: [frontentUrl, ...additionalFrontendOriginExpressions], credentials: true},
	},
	db: {
		provider: "postgresql",
		url: databaseUrl,
		async onConnect(context: Context) {
			if (shouldSeedDataBeInserted) {
				await insertSeedData(context);
			} else if ((await context.db.User.count()) === 0 && initialAdminUserEmail) {
				// Create initial admin user if no users exist
				await context.db.User.createOne({
					data: {email: initialAdminUserEmail, name: "Admin", isAdmin: true},
				});
			}
		},
	},
	graphql: {
		extendGraphqlSchema,
	},
	ui: {
		isAccessAllowed: (context) => Boolean(context.session?.data.isAdmin),
	},
	lists,
	session,
	storage: {
		images: {
			kind: "local",
			type: "image",
			generateUrl: (path) => `/images${path}`,
			serverRoute: {
				path: "/images",
			},
			storagePath: imagesPath,
		},
	},
});
