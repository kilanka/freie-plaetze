import { createAuth } from "@keystone-next/auth";
import { config } from "@keystone-next/keystone";
import { statelessSessions } from "@keystone-next/keystone/session";

import { databaseUrl, sessionMaxAge, sessionSecret } from "./environment";
import { lists } from "./schema";

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  sessionData: "name",
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
    db: {
      provider: databaseUrl.startsWith("file") ? "sqlite" : "postgresql",
      url: databaseUrl,
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
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
    graphql: {
      cors:
        process.env.NODE_ENV !== "production"
          ? {
              origin: ["http://localhost:8080", "https://studio.apollographql.com"],
              credentials: true,
            }
          : undefined,
    },
  })
);
