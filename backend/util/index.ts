import {createHash} from "node:crypto";

import stockSlugify from "slugify";

export const slugify = (input: string) =>
	stockSlugify(input, {
		lower: true,
		locale: "de",
		remove: /[*+~.,()'"!:@/§]/g,
	});

export const hashStrings = (...strings: string[]) =>
	createHash("md5").update(strings.join("")).digest("hex").slice(0, 8);
