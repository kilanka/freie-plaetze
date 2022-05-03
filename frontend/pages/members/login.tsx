import {Container} from "@chakra-ui/layout";
import {Checkbox, Stack, Text} from "@chakra-ui/react";
import {Form, Formik} from "formik";
import {InputControl, SubmitButton} from "formik-chakra-ui";
import type {NextPage} from "next";
import Router from "next/router";
import React from "react";
import * as yup from "yup";

import {FormBox} from "../../lib/components/content/FormBox";
import {Link} from "../../lib/components/next/Link";
import {useAppDispatch} from "../../lib/store";
import {login} from "../../lib/store/auth";

const formSchema = yup.object({
	email: yup
		.string()
		.required("Bitte geben Sie Ihre E-Mail-Adresse ein")
		.email("Ungültige E-Mail-Adresse"),
	password: yup.string().required("Bitte geben Sie Ihr Passwort ein"),
});

const Page: NextPage = () => {
	const dispatch = useAppDispatch();
	const [errorMessage, setErrorMessage] = React.useState("");

	return (
		<Container maxWidth="container.xl" pt={8} alignItems="center">
			<FormBox title="Melden Sie sich an" subtitle="um Einrichtungen hinzuzufügen oder zu ändern">
				<Formik
					initialValues={{email: "", password: ""}}
					validationSchema={formSchema}
					onSubmit={async ({email, password}) => {
						const error = await dispatch(login(email, password));
						if (error) {
							setErrorMessage(error);
						} else {
							await Router.replace("/members");
						}
					}}
				>
					<Stack as={Form} spacing={4}>
						<InputControl name="email" label="E-Mail-Adresse" />
						<InputControl
							name="password"
							label="Passwort"
							inputProps={{
								type: "password",
							}}
						/>
						<Stack spacing={10}>
							<Stack direction={["column", "row"]} align="start" justify="space-between">
								<Checkbox>Angemeldet bleiben</Checkbox>
								<Link color="blue.400" href="/members/forgot-pass">
									Passwort vergessen?
								</Link>
							</Stack>
							{errorMessage && <Text>{errorMessage}</Text>}
							<SubmitButton colorScheme="blue">Anmelden</SubmitButton>
							<Text textAlign="center">
								Kein Benutzerkonto?{" "}
								<Link color="blue.400" href="/members/register">
									Hier registrieren
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Formik>
			</FormBox>
		</Container>
	);
};

export default Page;
