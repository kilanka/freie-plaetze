import {Container} from "@chakra-ui/layout";
import {Stack, Text} from "@chakra-ui/react";
import {Form, Formik} from "formik";
import {CheckboxSingleControl, InputControl, SubmitButton} from "formik-chakra-ui";
import {NextPage} from "next";
import {Link} from "next-chakra-ui";
import {useRouter} from "next/router";
import React from "react";
import * as yup from "yup";

import {useRegisterUserMutation} from "../../lib/api/generated";
import {FormBox} from "../../lib/components/forms/FormBox";
import {Title} from "../../lib/components/Title";
import {useMutationErrorHandler} from "../../lib/hooks/useMutationErrorHandler";
import {useAppDispatch} from "../../lib/store";
import {login} from "../../lib/store/auth";
import {passwordFieldsSchema} from "../../lib/util/validation";

const formSchema = yup.object({
	name: yup.string().required("Bitte geben Sie Ihren Namen ein."),
	email: yup
		.string()
		.required("Bitte geben Sie Ihre E-Mail-Adresse ein")
		.email("Ungültige E-Mail-Adresse"),
	...passwordFieldsSchema,
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
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [registerUser] = useRegisterUserMutation();
	const {wrapMutationFunction} = useMutationErrorHandler({process: "Registrieren"});

	return (
		<Container maxWidth="container.xl" pt={8} alignItems="center">
			<Title>Registrieren</Title>
			<FormBox title="Registrieren" subtitle="um Einrichtungen hinzuzufügen">
				<Formik
					initialValues={{name: "", email: "", password: "", consent: false}}
					validationSchema={formSchema}
					onSubmit={wrapMutationFunction(async ({name, email, password}) => {
						await registerUser({variables: {name, email, password}});
						await dispatch(login(email, password));
						await router.push("/members");
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
						<InputControl name="password" label="Passwort" inputProps={{type: "password"}} />
						<InputControl
							name="confirmPassword"
							label="Passwort wiederholen"
							inputProps={{type: "password"}}
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
		</Container>
	);
};

export default Page;
