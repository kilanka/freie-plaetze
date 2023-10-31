import {createAuth} from "@keystone-6/auth";
import {config} from "@keystone-6/core";
import {statelessSessions} from "@keystone-6/core/session";

import {Context} from ".keystone/types";
import {
	additionalFrontendOriginExpressions,
	databaseUrl,
	frontentUrl,
	imagesPath,
	isProduction,
	sessionMaxAge,
	sessionSecret,
} from "./environment";
import {sendPasswordResetTokenEmail} from "./interactions/mail";
import {extendGraphqlSchema, lists} from "./schema";
import {insertSeedData} from "./seed";

const {withAuth} = createAuth({
	listKey: "User",
	identityField: "email",
	secretField: "password",
	sessionData: "id isAdmin",
	initFirstItem: {
		fields: ["name", "email", "password"],
		itemData: {isAdmin: true},
		skipKeystoneWelcome: true,
	},
	passwordResetLink: {
		async sendToken({itemId, identity, token, context}) {
			const user = await context.sudo().db.User.findOne({where: {id: itemId as string}});
			await sendPasswordResetTokenEmail(identity, (user as any).name, token);
		},
		tokensValidForMins: 30,
	},
});

const session = statelessSessions({
	maxAge: sessionMaxAge,
	secret: sessionSecret,
});

export default withAuth(
	config({
		server: {
			// https://www.npmjs.com/package/cors#configuration-options
			cors: {origin: [frontentUrl, ...additionalFrontendOriginExpressions], credentials: true},
		},
		db: {
			provider: "postgresql",
			url: databaseUrl,
			useMigrations: isProduction,
			async onConnect(context: Context) {
				if (!isProduction && process.argv.includes("--seed")) {
					await insertSeedData(context);
				}
			},
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
		extendGraphqlSchema,
	})
);
