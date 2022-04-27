import {ActionCreator, PayloadAction, configureStore, createSlice} from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

import {AppState, AppThunkAction} from ".";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		isUserAuthenticated: false,
		accessToken: "",
		userEmail: "",
		userName: "",
	},

	reducers: {
		loginSuccess: (state, action: PayloadAction<{accessToken: string}>) => {
			state.accessToken = action.payload.accessToken;
		},
	},

	extraReducers: {
		[HYDRATE]: (state, {payload}) => ({
			...state,
			...payload.auth,
		}),
	},
});
