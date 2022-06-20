import stockSlugify from "slugify";

export const slugify = (input: string) =>
	stockSlugify(input, {
		lower: true,
		locale: "de",
		remove: /[*+~.,()'"!:@/§]/g,
	});
