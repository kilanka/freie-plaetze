const path = require("node:path");

const esmPackages = ["apollo-upload-client", "@apollo/client", "extract-files", "is-plain-obj"];

/** @type {import('jest').Config} */
module.exports = {
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/tests/jest-setup.ts"],
	moduleNameMapper: {
		"^test-utils$": "<rootDir>/tests/test-utils.tsx",
	},
	transform: {
		"\\.[mc]?[jt]sx?$": ["babel-jest", {configFile: "./babel.test.config.js"}],
	},
	// https://jestjs.io/docs/configuration#transformignorepatterns-arraystring
	transformIgnorePatterns: [
		`${path.join(__dirname, "..")}/node_modules/.pnpm/(?!(${esmPackages
			.map((package) => package.replace("/", "\\+"))
			.join("|")})@)`,
	],
};
