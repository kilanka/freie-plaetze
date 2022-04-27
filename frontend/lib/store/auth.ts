import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";
import {destroyCookie, setCookie} from "nookies";

import {getApolloClient} from "../api/apollo-client";
import {LoginDocument, LoginMutation, LoginMutationVariables} from "../api/generated";
import {AppState, AppThunkAction} from ".";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		isUserLoggedIn: false,
		userEmail: "",
		userName: "",
	},

	reducers: {
		loginSuccess: (
			state,
			action: PayloadAction<{sessionToken: string; userEmail: string; userName: string}>
		) => {
			setCookie(null, "keystonejs-session", action.payload.sessionToken, {
				path: "/",
				httpOnly: false,
			});

			state.isUserLoggedIn = true;
			state.userEmail = action.payload.userEmail;
			state.userName = action.payload.userName;
		},
		loginError: (state) => {
			state.isUserLoggedIn = false;
			state.userEmail = "";
			state.userName = "";
		},
		logout: (state) => {
			destroyCookie(null, "keystonejs-session");

			state.isUserLoggedIn = false;
			state.userEmail = "";
			state.userName = "";
		},
	},

	extraReducers: {
		[HYDRATE]: (state, {payload}) => ({
			...state,
			...payload.auth,
		}),
	},
});

export const {loginSuccess, loginError, logout} = authSlice.actions;

/**
 * Returns a thunk action that performs a sign in with the given credentials. Finally, either a
 * `loginSuccess` or a `loginError` action is dispatched.
 *
 * The thunk action returns `undefined` if the login was successful and an error message otherwise.
 */
export function login(
	email: string,
	password: string
): AppThunkAction<Promise<string | undefined>> {
	// Since the login action is only dispatched client-side, we can get the global ApolloClient
	// instance using `getApolloClient()`:
	const client = getApolloClient();

	return async (dispatch) => {
		const {data} = await client.mutate<LoginMutation, LoginMutationVariables>({
			mutation: LoginDocument,
			variables: {email, password},
		});

		if (data?.authResult?.__typename) {
			const authResult = data.authResult;
			if (authResult.__typename === "UserAuthenticationWithPasswordFailure") {
				dispatch(loginError());
				return "E-Mail-Adresse oder Passwort ungültig";
			}

			if (authResult.__typename === "UserAuthenticationWithPasswordSuccess") {
				dispatch(
					loginSuccess({
						sessionToken: authResult.sessionToken,
						userEmail: authResult.user.email ?? "",
						userName: authResult.user.name ?? "",
					})
				);
				return;
			}
		}

		dispatch(loginError());
		return "An unexpected error ocurred. Please try again.";
	};
}

// Selectors
export const selectUserDetails = (state: AppState) => state[authSlice.name];
export const selectIsUserLoggedIn = (state: AppState) => selectUserDetails(state).isUserLoggedIn;
