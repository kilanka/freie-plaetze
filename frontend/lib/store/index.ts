import {AnyAction, ThunkAction, configureStore} from "@reduxjs/toolkit";
import {nextReduxCookieMiddleware, wrapMakeStore} from "next-redux-cookie-wrapper";
import {createWrapper} from "next-redux-wrapper";
import {useDispatch} from "react-redux";

import {authSlice} from "./auth";

const makeStore = wrapMakeStore(() =>
	configureStore({
		reducer: {
			[authSlice.name]: authSlice.reducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().prepend(
				nextReduxCookieMiddleware({
					subtrees: [`${authSlice.name}.isUserAuthenticated`],
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

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const wrapper = createWrapper<AppStore>(makeStore);
