import path from "node:path";

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
		preview: process.env.NODE_ENV !== "production" && {
			dir: path.join(__dirname, "../.emails"),
			id: to,
			open: process.env.NODE_ENV !== "test",
		},
	});

	await email.send({
		template,
		message: {to},
		locals,
	});
}

function getLoginLink(email: string, token: string) {
	return `${frontentUrl}/members/login?email=${email}&token=${token}`;
}

export async function sendWelcomeEmail(email: string, name: string, token: string) {
	const loginLink = getLoginLink(email, token);
	await sendMail("welcome", email, {
		name,
		email,
		loginLink,
		editAccountLink: `${loginLink}&redirect=/members/user`,
	});
}

export async function sendAuthTokenEmail(email: string, name: string, token: string) {
	await sendMail("auth", email, {
		name,
		loginLink: getLoginLink(email, token),
	});
}
