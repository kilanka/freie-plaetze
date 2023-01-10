import {Alert, AlertIcon, Container, Stack} from "@chakra-ui/react";
import {Form, Formik} from "formik";
import {InputControl, SubmitButton} from "formik-chakra-ui";
import {GetServerSideProps, NextPage} from "next";
import {useRouter} from "next/router";
import React from "react";
import * as yup from "yup";

import {
	PasswordResetRedemptionErrorCode,
	useResetPasswordMutation,
	useSendPasswordResetLinkMutation,
} from "../../lib/api/generated";
import {FormBox} from "../../lib/components/forms/FormBox";
import {Title} from "../../lib/components/Title";
import {DetailError, useMutationErrorHandler} from "../../lib/hooks/useMutationErrorHandler";
import {normalizeQueryParameter} from "../../lib/util";
import {isEmailRegistered} from "../../lib/util/api";
import {passwordFieldsSchema, yupSequentialStringSchema} from "../../lib/util/validation";

const sendLinkFormSchema = yup.object({
	email: yupSequentialStringSchema([
		yup.string().required("Bitte geben Sie Ihre E-Mail-Adresse ein"),
		yup.string().email("Ungültige E-Mail-Adresse"),
		yup
			.string()
			.test("email-registered", "Zu dieser E-Mail-Adresse existiert kein Konto.", async (value) =>
				value ? isEmailRegistered(value) : false
			),
	]),
});

const setPasswordFormSchema = yup.object(passwordFieldsSchema);

// Empty getServerSideProps to make sure this page is server-rendered
export const getServerSideProps: GetServerSideProps = async () => {
	return {props: {}};
};

const Page: NextPage = () => {
	const {wrapMutationFunction: wrapSendLinkMutationFunction} = useMutationErrorHandler({
		process: "Anfordern des Links",
	});
	const [sendPasswordResetLink] = useSendPasswordResetLinkMutation();

	const {wrapMutationFunction: wrapSetPasswordMutationFunction} = useMutationErrorHandler({
		process: "Ändern Ihres Passwortes",
		successMessage:
			"Ihr Passwort wurde erfolgreich geändert. Sie können Sich nun mit dem neuen Passwort anmelden.",
	});
	const [resetPassword] = useResetPasswordMutation();

	const [hasLinkBeenSent, setHasLinkBeenSent] = React.useState(false);
	const router = useRouter();
	const query = router.query;
	const queryEmail = normalizeQueryParameter(query.email);
	const queryToken = normalizeQueryParameter(query.token);

	return (
		<Container maxWidth="container.xl" pt={8} alignItems="center">
			<Title>Passwort zurücksetzen</Title>
			{!queryToken && !hasLinkBeenSent && (
				<FormBox
					title="Passwort vergessen?"
					subtitle="Geben Sie Ihre E-Mail-Adresse ein, um einen Link zum Zurücksetzen Ihres Passwortes anzufordern."
				>
					<Formik
						initialValues={{email: queryEmail ?? ""}}
						isInitialValid={Boolean(queryEmail)}
						validationSchema={sendLinkFormSchema}
						onSubmit={wrapSendLinkMutationFunction(async ({email}) => {
							const {data: result} = await sendPasswordResetLink({variables: {email}});
							if (!result?.sendUserPasswordResetLink) {
								throw new DetailError();
							}

							setHasLinkBeenSent(true);
						})}
					>
						{({isValid}) => (
							<Stack as={Form} spacing={4}>
								<InputControl name="email" label="E-Mail-Adresse" />
								<SubmitButton colorScheme="blue" isDisabled={!isValid}>
									Link anfordern
								</SubmitButton>
							</Stack>
						)}
					</Formik>
				</FormBox>
			)}

			{hasLinkBeenSent && (
				<Alert status="success" variant="left-accent">
					<AlertIcon />
					Ein Link zum Zurücksetzen Ihres Passwortes sollte in Kürze in Ihrem E-Mail-Postfach
					eintreffen. Schauen Sie andernfalls bitte auch im Spam-Ordner nach. Sie können diesen
					Browser-Tab nun schließen.
				</Alert>
			)}

			{queryToken && queryEmail && (
				<FormBox title="Passwort zurücksetzen">
					<Formik
						validateOnMount
						initialValues={{password: "", confirmPassword: ""}}
						validationSchema={setPasswordFormSchema}
						onSubmit={wrapSetPasswordMutationFunction(async ({password}) => {
							const {data: result} = await resetPassword({
								variables: {email: queryEmail, token: queryToken, password},
							});
							switch (result?.redeemUserPasswordResetToken?.code) {
								case PasswordResetRedemptionErrorCode.TokenExpired:
								case PasswordResetRedemptionErrorCode.TokenRedeemed:
									await router.replace(`/members/reset-password?email=${queryEmail}`);
									throw new DetailError("Der Link ist abgelaufen.");

								case PasswordResetRedemptionErrorCode.Failure:
									throw new DetailError();

								default:
									await router.replace("/members/login");
									break;
							}
						})}
					>
						{({isValid}) => (
							<Stack as={Form} spacing={4}>
								<InputControl
									name="password"
									label="Neues Passwort"
									inputProps={{type: "password"}}
								/>
								<InputControl
									name="confirmPassword"
									label="Neues Passwort wiederholen"
									inputProps={{type: "password"}}
								/>
								<SubmitButton colorScheme="blue" isDisabled={!isValid}>
									Passwort speichern
								</SubmitButton>
							</Stack>
						)}
					</Formik>
				</FormBox>
			)}
		</Container>
	);
};

export default Page;
