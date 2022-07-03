import {decompressFromEncodedURIComponent} from "lz-string";

export const isServer = typeof window === "undefined";

export function getAbsoluteImageUrl(imagePath: string) {
	return process.env.NEXT_PUBLIC_BACKEND_URL! + imagePath;
}

export function stringToInt(string: string) {
	return Number.parseInt(string, 10);
}

export function makeRequiredMessage(inputName: string) {
	return `Bitte geben Sie ${inputName} ein.`;
}

export function makeParagraphURL(paragraph: string) {
	return `https://www.gesetze-im-internet.de/sgb_8/__${paragraph}.html`;
}

export function normalizeQueryParameter(parameter?: string | string[]) {
	return typeof parameter === "string" && parameter ? parameter : undefined;
}

export function parseCookie(cookieValue: string | undefined): any {
	if (!cookieValue) return;

	const decompressedCookie = decompressFromEncodedURIComponent(cookieValue);
	if (typeof decompressedCookie !== "string") return;

	try {
		return JSON.parse(decompressedCookie);
	} catch {}
}
