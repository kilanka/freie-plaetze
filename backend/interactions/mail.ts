import Email from "email-templates";
import {createTransport} from "nodemailer";

import {frontentUrl} from "../environment";

const {MAIL_SERVER, MAIL_ADDRESS, MAIL_PASSWORD} = process.env;

export async function sendMail(template: string, to: string, locals: Record<string, any>) {
	const email = new Email({
		views: {
			root: "interactions/emails",
		},
		message: {from: MAIL_ADDRESS},
		transport: createTransport({
			host: MAIL_SERVER,
			secure: true,
			auth: {user: MAIL_ADDRESS, pass: MAIL_PASSWORD},
		}),
	});

	await email.send({
		template,
		message: {to},
		locals,
	});
}

export async function sendWelcomeEmail(email: string, name: string) {
	await sendMail("welcome", email, {name, email, editAccountLink: `${frontentUrl}/members/user`});
}
