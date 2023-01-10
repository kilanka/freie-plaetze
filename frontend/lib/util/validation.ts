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

export const passwordFieldsSchema = {
	password: yup
		.string()
		.required("Bitte geben Sie ein Passwort ein")
		.min(8, "Das Passwort muss mindestens 8 Zeichen lang sein."),
	confirmPassword: yup
		.string()
		.test("passwords-match", "Die Passwörter stimmen nicht überein.", function (value) {
			return this.parent.password === value;
		}),
};
