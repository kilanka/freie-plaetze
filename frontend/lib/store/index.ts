import {AnyAction, ThunkAction, configureStore} from "@reduxjs/toolkit";
import {nextReduxCookieMiddleware, wrapMakeStore} from "next-redux-cookie-wrapper";
import {createWrapper} from "next-redux-wrapper";
import {useDispatch, useStore} from "react-redux";

import {authSlice} from "./auth";
import {searchSlice} from "./search";

const makeStore = wrapMakeStore(() =>
	configureStore({
		reducer: {
			[authSlice.name]: authSlice.reducer,
			[searchSlice.name]: searchSlice.reducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().prepend(
				nextReduxCookieMiddleware({
					subtrees: [authSlice.name],
				})
			),
	})
);

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunkAction<ReturnType = Promise<void>> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	AnyAction
>;

export const useAppStore = () => useStore() as AppStore;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const wrapper = createWrapper<AppStore>(makeStore);
