import path from "node:path";

import {Page} from "@playwright/test";

export async function selectImage(page: Page, label: string, filename: string) {
	const fileChooserPromise = page.waitForEvent("filechooser");
	await page.getByLabel(label).click();
	const fileChooser = await fileChooserPromise;
	await fileChooser.setFiles(path.join(__dirname, "images", filename));
}
