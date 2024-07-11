import {Container} from "@chakra-ui/layout";
import {Checkbox, Stack, Text} from "@chakra-ui/react";
import {Form, Formik} from "formik";
import {InputControl, SubmitButton} from "formik-chakra-ui";
import {NextPage} from "next";
import {Link} from "next-chakra-ui";
import {useRouter} from "next/router";
import React from "react";
import * as yup from "yup";

import {FormBox} from "../../lib/components/forms/FormBox";
import {Title} from "../../lib/components/Title";
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
	const router = useRouter();

	const redirectDestination =
		// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
		(!Array.isArray(router.query.redirect) && router.query.redirect) || "/members";

	return (
		<Container maxWidth="container.xl" pt={8} alignItems="center">
			<Title>Anmelden</Title>
			<FormBox title="Anmelden" subtitle="um Einrichtungen zu ändern oder hinzuzufügen">
				<Formik
					initialValues={{email: "", password: ""}}
					validationSchema={formSchema}
					onSubmit={async ({email, password}) => {
						const error = await dispatch(login(email, password));
						if (error) {
							setErrorMessage(error);
						} else {
							await router.replace(redirectDestination);
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
								<Link color="blue.400" href="/members/reset-password">
									Passwort vergessen?
								</Link>
							</Stack>
							{errorMessage && <Text color="red">{errorMessage}</Text>}
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
