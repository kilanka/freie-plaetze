import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import router from "next/router";

import type {AppState, AppThunkAction} from ".";
import {getApolloClient} from "../api/apollo-client";
import {
	AuthTokenRedemptionErrorCode,
	LogoutDocument,
	RedeemAuthTokenDocument,
	RedeemAuthTokenMutation,
	RedeemAuthTokenMutationVariables,
} from "../api/generated";
import {LogoutMutation} from "../api/generated/ssr";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		isUserLoggedIn: false,
		user: {
			id: "",
			name: "",
			email: "",
		},
	},

	reducers: {
		loginSuccess(
			state,
			action: PayloadAction<{
				sessionToken: string;
				user: {id: string; email: string; name: string};
			}>
		) {
			state.isUserLoggedIn = true;
			state.user = action.payload.user;
		},
		loginError(state) {
			state.isUserLoggedIn = false;
			state.user = authSlice.getInitialState().user;
		},
		logoutFinished(state) {
			state.isUserLoggedIn = false;
			state.user = authSlice.getInitialState().user;
		},
		updateUserData(state, action: PayloadAction<{email: string; name: string}>) {
			state.user.name = action.payload.name;
			state.user.email = action.payload.email;
		},
	},

	extraReducers(builder) {
		builder.addCase<typeof HYDRATE, PayloadAction<AppState, typeof HYDRATE>>(
			HYDRATE,
			(state, {payload}) => ({...state, ...payload.auth})
		);
	},
});

export const {updateUserData} = authSlice.actions;

/**
 * Returns a thunk action that performs a sign in with the given credentials. Finally, either a
 * `loginSuccess` or a `loginError` action is dispatched.
 *
 * The thunk action returns `undefined` if the login was successful and an error message otherwise.
 */
export function login(email: string, token: string): AppThunkAction<Promise<string | undefined>> {
	// Since the login action is only dispatched client-side, we can get the global ApolloClient
	// instance using `getApolloClient()`:
	const client = getApolloClient();

	return async (dispatch) => {
		const {data} = await client.mutate<RedeemAuthTokenMutation, RedeemAuthTokenMutationVariables>({
			mutation: RedeemAuthTokenDocument,
			variables: {email, token},
		});

		if (data?.authResult?.__typename !== "AuthTokenRedemptionSuccess") {
			dispatch(authSlice.actions.loginError());

			const errorCode =
				data?.authResult?.__typename === "AuthTokenRedemptionFailure"
					? data.authResult.errorCode
					: AuthTokenRedemptionErrorCode.Failure;

			const errorMessage = {
				[AuthTokenRedemptionErrorCode.Failure]:
					"Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es erneut.",
				[AuthTokenRedemptionErrorCode.TokenExpired]:
					"Der Anmelde-Link ist abgelaufen. Bitte fordern Sie einen Neuen an.",
				[AuthTokenRedemptionErrorCode.TokenRedeemed]:
					"Der Anmelde-Link wurde bereits verwendet. Bitte fordern Sie einen Neuen an.",
			}[errorCode];

			return errorMessage;
		}

		const {sessionToken, user} = data.authResult;

		dispatch(
			authSlice.actions.loginSuccess({
				sessionToken,
				user: {
					id: user.id,
					name: user.name ?? "",
					email: user.email ?? "",
				},
			})
		);
	};
}

/**
 * Returns a thunk action that ends the user's session via the GraphQL API, dispatches a `logout`
 * action and redirects to the index page.
 */
export function logout(): AppThunkAction {
	const client = getApolloClient();

	return async (dispatch) => {
		await client.mutate<LogoutMutation>({mutation: LogoutDocument});
		dispatch(authSlice.actions.logoutFinished());
		await router.push("/");
	};
}

// Selectors
export const selectIsUserLoggedIn = (state: AppState) => state[authSlice.name].isUserLoggedIn;
export const selectUser = (state: AppState) => state[authSlice.name].user;
export const selectUserId = (state: AppState) => selectUser(state).id;
