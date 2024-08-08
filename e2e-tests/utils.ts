import * as cheerio from "cheerio";
import fs from "node:fs/promises";
import path from "node:path";

import {Page} from "@playwright/test";

export async function selectImage(page: Page, label: string, filename: string) {
	const fileChooserPromise = page.waitForEvent("filechooser");
	await page.getByLabel(label).click();
	const fileChooser = await fileChooserPromise;
	await fileChooser.setFiles(path.join(__dirname, "images", filename));
}

/**
 * Returns the text content of the last email sent to the provided email
 * address.
 */
export async function getEmailText(emailAddress: string) {
	const emailFileContents = await fs.readFile(
		path.join(__dirname, "..", "backend", ".emails", `${emailAddress}.html`)
	);
	const $ = cheerio.load(emailFileContents.toString());
	const plainMailDocument = $("#text").attr("srcdoc") ?? "";
	return cheerio.load(plainMailDocument).text();
}

export function extractLinksFromEmailText(emailText: string) {
	return [...emailText.matchAll(/\[(http:\/\/.*?)\]/g)].map((match) => {
		const url = new URL(match[1]);
		let link = url.href.replace(url.origin, "");

		if (link.startsWith("//")) {
			link = link.slice(1);
		}

		return link;
	});
}
