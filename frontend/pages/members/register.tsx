import {Container} from "@chakra-ui/layout";
import {Alert, AlertIcon, Stack, Text} from "@chakra-ui/react";
import {Form, Formik} from "formik";
import {CheckboxSingleControl, InputControl, SubmitButton} from "formik-chakra-ui";
import {NextPage} from "next";
import {Link} from "next-chakra-ui";
import React from "react";
import * as yup from "yup";

import {useRegisterUserMutation} from "../../lib/api/generated";
import {FormBox} from "../../lib/components/forms/FormBox";
import {Title} from "../../lib/components/Title";
import {useMutationErrorHandler} from "../../lib/hooks/useMutationErrorHandler";

const formSchema = yup.object({
	name: yup.string().required("Bitte geben Sie Ihren Namen ein."),
	email: yup
		.string()
		.required("Bitte geben Sie Ihre E-Mail-Adresse ein")
		.email("Ungültige E-Mail-Adresse"),
	consent: yup
		.bool()
		.required("Um sich zu registrieren, müssen Sie unsere Datenschutzerklärung akzeptieren.")
		.test(
			"consent",
			"Um sich zu registrieren, müssen Sie unsere Datenschutzerklärung akzeptieren.",
			Boolean
		),
});

const Page: NextPage = () => {
	const [registerUser] = useRegisterUserMutation();
	const {wrapMutationFunction} = useMutationErrorHandler({process: "Registrieren"});

	const [hasLinkBeenSent, setHasLinkBeenSent] = React.useState(false);

	return (
		<Container maxWidth="container.xl" pt={8} alignItems="center">
			<Title>Registrieren</Title>
			{!hasLinkBeenSent && (
				<FormBox title="Registrieren" subtitle="um Einrichtungen hinzuzufügen">
					<Formik
						initialValues={{name: "", email: "", consent: false}}
						validationSchema={formSchema}
						onSubmit={wrapMutationFunction(async ({name, email}) => {
							await registerUser({variables: {name, email}});
							setHasLinkBeenSent(true);
						})}
					>
						<Stack as={Form} spacing={4}>
							<InputControl
								name="name"
								label="Name"
								helperText="Ihr Name ist nicht öffentlich einsehbar."
							/>
							<InputControl
								name="email"
								label="E-Mail-Adresse"
								helperText="Ihre E-Mail-Adresse ist nicht öffentlich einsehbar."
							/>
							<CheckboxSingleControl name="consent">
								Ich akzeptiere die{" "}
								<Link color="blue.400" href="/privacy" target="_blank">
									Datenschutzerklärung
								</Link>
								.
							</CheckboxSingleControl>
							<Stack spacing={10}>
								<SubmitButton colorScheme="blue">Registrieren</SubmitButton>
								<Text textAlign="center">
									Sie haben bereits ein Benutzerkonto?{" "}
									<Link color="blue.400" href="/members/login">
										Hier anmelden
									</Link>
								</Text>
							</Stack>
						</Stack>
					</Formik>
				</FormBox>
			)}
			{hasLinkBeenSent && (
				<Alert status="success" variant="left-accent">
					<AlertIcon />
					Vielen Dank für Ihre Registrierung! Wir haben einen Link zur passwortlosen Anmeldung an
					Ihre E-Mail-Adresse gesendet. Sie können diesen Browser-Tab nun schließen.
				</Alert>
			)}
		</Container>
	);
};

export default Page;
