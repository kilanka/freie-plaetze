import {Redirect} from "next";
import {redirect} from "next/dist/server/api-utils";

import {wrapper} from "./store";
import {selectIsUserLoggedIn} from "./store/auth";

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

export function getAbsoluteImageUrl(imagePath: string) {
	return process.env.NEXT_PUBLIC_BACKEND_URL! + imagePath;
}

export function stringToInt(string: string) {
	return Number.parseInt(string, 10);
}

export function makeRequiredMessage(inputName: string) {
	return `Bitte geben Sie ${inputName} ein.`;
}
