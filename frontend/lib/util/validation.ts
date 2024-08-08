import * as yup from "yup";

// Based on https://github.com/jquense/yup/issues/851#issuecomment-931295671
export function yupSequentialStringSchema(schemas: yup.StringSchema[]) {
	return yup.string().test(async (value, context) => {
		try {
			for (const schema of schemas) {
				// eslint-disable-next-line no-await-in-loop
				await schema.validate(value);
			}
		} catch (error: unknown) {
			const message = (error as yup.ValidationError).message;
			return context.createError({message});
		}

		return true;
	});
}

export const urlFieldSchema = yup
	.string()
	.url("Bitte geben Sie hier eine URL ein – also z.B. https://www.freie-plaetze.de");
