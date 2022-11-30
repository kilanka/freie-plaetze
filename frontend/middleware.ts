import {NextRequest, NextResponse} from "next/server";

import {parseCookie} from "./lib/util";

export const config = {
	matcher: ["/members/institution/:path*", "/members/add-institution", "/members", "/members/user"],
};

export function middleware(request: NextRequest) {
	const isUserLoggedIn = Boolean(parseCookie(request.cookies.get("auth")?.value)?.isUserLoggedIn);
	if (!isUserLoggedIn) {
		request.nextUrl.search = `?redirect=${request.nextUrl.pathname}`;
		request.nextUrl.pathname = "/members/login";
		return NextResponse.redirect(request.nextUrl);
	}
}
