import {Context} from ".keystone/types";
import {randomBytes} from "crypto";

export class UserNotFoundError extends Error {}

export const enum AuthTokenRedemptionErrorCode {
	Failure = "FAILURE",
	TokenExpired = "TOKEN_EXPIRED",
	TokenRedeemed = "TOKEN_REDEEMED",
}

export class AuthTokenRedemptionError extends Error {
	constructor(
		public readonly code: AuthTokenRedemptionErrorCode = AuthTokenRedemptionErrorCode.Failure
	) {
		super();
	}
}

export async function issueAuthToken(
	userApi: Context["db"]["User"],
	userEmail: string
): Promise<{token: string; userName: string}> {
	const user = await userApi.findOne({where: {email: userEmail}});

	if (!user) {
		throw new UserNotFoundError();
	}

	const token = randomBytes(16).toString("base64url").slice(0, 20);
	await userApi.updateOne({
		where: {id: user.id},
		data: {
			authToken: token,
			authTokenIssuedAt: new Date().toISOString(),
			authTokenRedeemed: false,
		},
	});

	return {userName: user.name, token};
}

export type PasswordFieldExtensions = {
	generateHash: (secret: string) => Promise<string>;
	compare: (secret: string, hash: string) => Promise<boolean>;
};

/**
 * Validates the given user email and auth token and marks it redeemed if it is
 * valid. Returns the corresponding user entity or throws an
 * `AuthTokenRedemptionError`.
 */
export async function redeemAuthToken(
	passwordFieldExtensions: PasswordFieldExtensions,
	userEmail: string,
	token: string,
	context: Context
) {
	const userApi = context.sudo().db.User;
	const user = await userApi.findOne({where: {email: userEmail}});

	if (!user?.authToken) {
		await passwordFieldExtensions.generateHash("timing-attack-avoidance");
		throw new AuthTokenRedemptionError();
	}

	if (!(await passwordFieldExtensions.compare(token, user.authToken))) {
		throw new AuthTokenRedemptionError();
	}

	if (user.authTokenRedeemed) {
		throw new AuthTokenRedemptionError(AuthTokenRedemptionErrorCode.TokenRedeemed);
	}

	if (!user.authTokenIssuedAt) {
		throw new AuthTokenRedemptionError();
	}

	if ((Date.now() - user.authTokenIssuedAt.getTime()) / (1000 * 60) > 15) {
		throw new AuthTokenRedemptionError(AuthTokenRedemptionErrorCode.TokenExpired);
	}

	await userApi.updateOne({
		where: {id: user.id},
		data: {authTokenRedeemed: true},
	});

	return user;
}
