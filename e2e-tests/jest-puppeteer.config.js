module.exports = {
	launch: {
		headless: process.env.HEADLESS === "false" ? false : "new",
	},
	server: [
		{
			command: "npm run -w backend e2e",
			protocol: "http",
			host: "localhost",
			port: 3010,
			path: "init",
			launchTimeout: 30_000,
			usedPortAction: "kill",
			debug: false,
		},
		{
			command: "npm run -w frontend e2e",
			protocol: "http",
			host: "localhost",
			port: 8090,
			path: "/about",
			launchTimeout: 30_000,
			usedPortAction: "kill",
			debug: false,
		},
	],
};
