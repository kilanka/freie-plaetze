import Router from "next/router";

import {wrapper} from "../store";
import {selectIsUserLoggedIn} from "../store/auth";

/**
 * Can be added as `getInitialProps` to pages that shall redirect to the login page if a user is not
 * logged in
 */
export const membersOnlyGetInitialProps = wrapper.getInitialPageProps(
	(store) =>
		async ({res, req, pathname}) => {
			if (!selectIsUserLoggedIn(store.getState())) {
				const destination = "/members/login";

				if (req?.url ?? pathname !== "/members/login") {
					if (req?.url && res) {
						res.writeHead(307, {Location: `${destination}?redirect=${req.url}`});
						res.end();
					} else {
						await Router.replace(destination);
					}
				}
			}

			return {props: {}};
		}
);
