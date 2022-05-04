import React from "react";
import {useSelector} from "react-redux";

import {selectIsUserLoggedIn} from "../store/auth";

/**
 * Like running `selectIsUserLoggedIn` on the Redux state, but changes its value after hydration on
 * the client to force a re-render and avoid layout glitches due to a mismatch of pages that are
 * server-rendered without the user's Redux state available.
 */
export function useClientOnlyLoginState() {
	const isUserLoggedInState = useSelector(selectIsUserLoggedIn);
	const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);

	React.useEffect(() => {
		setIsUserLoggedIn(isUserLoggedInState);
	}, [setIsUserLoggedIn, isUserLoggedInState]);

	return isUserLoggedIn;
}
