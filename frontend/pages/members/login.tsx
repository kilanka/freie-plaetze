import {Alert, AlertIcon, Box, Container, Stack, Text, useToast} from "@chakra-ui/react";
import {Form, Formik} from "formik";
import {InputControl, SubmitButton} from "formik-chakra-ui";
import {GetServerSideProps, NextPage} from "next";
import {Link} from "next-chakra-ui";
import {useRouter} from "next/router";
import React from "react";
import * as yup from "yup";

import {useSelector} from "react-redux";
import {useRequestAuthTokenMutation} from "../../lib/api/generated";
import {FormBox} from "../../lib/components/forms/FormBox";
import {Title} from "../../lib/components/Title";
import {DetailError, useMutationErrorHandler} from "../../lib/hooks/useMutationErrorHandler";
import {useAppDispatch} from "../../lib/store";
import {login, selectIsUserLoggedIn} from "../../lib/store/auth";
import {normalizeQueryParameter} from "../../lib/util";

const formSchema = yup.object({
	email: yup
		.string()
		.required("Bitte geben Sie Ihre E-Mail-Adresse ein")
		.email("Ungültige E-Mail-Adresse"),
});

// Empty getServerSideProps to make sure this page is server-rendered
export const getServerSideProps: GetServerSideProps = async () => {
	return {props: {}};
};

const Page: NextPage = () => {
	const {wrapMutationFunction: wrapRequestAuthTokenFunction} = useMutationErrorHandler({
		process: "Anfordern des Links",
	});
	const [requestAuthToken] = useRequestAuthTokenMutation();

	const dispatch = useAppDispatch();
	const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

	const [hasLinkBeenSent, setHasLinkBeenSent] = React.useState(false);

	const router = useRouter();
	const query = router.query;
	const queryEmail = normalizeQueryParameter(query.email);
	const queryToken = normalizeQueryParameter(query.token);
	const redirectDestination = normalizeQueryParameter(query.redirect) ?? "/members";

	const toast = useToast();

	React.useEffect(() => {
		if (queryEmail && queryToken) {
			(async () => {
				if (isUserLoggedIn) {
					// User is already logged in – redirecting without another login attempt:
					await router.replace(redirectDestination);
					return;
				}

				const error = await dispatch(login(queryEmail, queryToken));
				if (error) {
					await router.replace(`/members/login?email=${queryEmail}`);

					// React 18 runs `useEffect()` twice in development mode, hence avoiding duplicate error toasts here:
					if (!toast.isActive("login-error")) {
						toast({
							id: "login-error",
							status: "error",
							title: "Fehler bei der Anmeldung",
							description: error,
							isClosable: true,
							position: "top",
						});
					}
				} else {
					await router.replace(redirectDestination);
				}
			})();
		}
	});

	return (
		<Container maxWidth="container.xl" pt={8} alignItems="center">
			<Title>Anmelden</Title>
			{!queryToken && !hasLinkBeenSent && (
				<FormBox title="Anmelden" subtitle="um Einrichtungen zu ändern oder hinzuzufügen">
					<Formik
						initialValues={{email: queryEmail ?? ""}}
						validationSchema={formSchema}
						onSubmit={wrapRequestAuthTokenFunction(async ({email}) => {
							const {data: result} = await requestAuthToken({variables: {email}});
							if (!result?.requestAuthToken) {
								throw new DetailError();
							}

							setHasLinkBeenSent(true);
						})}
					>
						<Stack as={Form} spacing={4}>
							<InputControl name="email" label="E-Mail-Adresse" />
							<Stack spacing={10}>
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
			)}

			{hasLinkBeenSent && (
				<Alert status="success" variant="left-accent">
					<AlertIcon />
					Wir haben einen Link zur passwortlosen Anmeldung an Ihre E-Mail-Adresse gesendet. Sie
					können diesen Browser-Tab nun schließen.
				</Alert>
			)}

			{queryToken && queryEmail && <Box>Sie werden in Kürze weitergeleitet...</Box>}
		</Container>
	);
};

export default Page;
