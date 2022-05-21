import {Redirect} from "next";

import {wrapper} from "../store";
import {selectIsUserLoggedIn} from "../store/auth";

/**
 * Can be exported as `getServerSideProps` from pages that shall redirect to the login page if a
 * user is not logged in
 */
export const membersOnlyGetServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({req}) => {
			let redirect: Redirect | undefined;

			if (!selectIsUserLoggedIn(store.getState())) {
				let destination = "/members/login";
				console.log(req.url);
				if (req.url && req.url !== "/members/login") {
					destination += `?redirect=${req.url}`;
				}

				redirect = {permanent: false, destination};
			}

			return {
				redirect,
				props: {},
			};
		}
);
