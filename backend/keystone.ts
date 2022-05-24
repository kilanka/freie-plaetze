import {createAuth} from "@keystone-6/auth";
import {config} from "@keystone-6/core";
import {statelessSessions} from "@keystone-6/core/session";

import {
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
		sendToken: async ({itemId, identity, token, context}) => {
			const user = await context.db.User.findOne({where: {id: itemId as string}});
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
			cors: {origin: [frontentUrl], credentials: true},
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
			local: {storagePath: imagesPath, baseUrl: "/images"},
		},
		extendGraphqlSchema,
	})
);
