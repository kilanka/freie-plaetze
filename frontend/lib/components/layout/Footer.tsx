import {Box, BoxProps, Container, Stack, Text} from "@chakra-ui/react";
import {Link} from "next-chakra-ui";
import React from "react";
import {IoLogoGithub, IoMail} from "react-icons/io5";

import {FooterButton} from "./FooterButton";

export interface FooterProps extends BoxProps {}

export const Footer: React.FC<FooterProps> = ({...boxProps}) => {
	return (
		<Box as="footer" bg="gray.50" color="gray.700" {...boxProps}>
			<Container
				as={Stack}
				maxW="container.xl"
				py={{base: 8, md: 4}}
				spacing={4}
				direction={{base: "column", md: "row"}}
				justify={{base: "center", md: "space-between"}}
				align={{base: "center", md: "center"}}
			>
				<Text>&copy; {new Date().getFullYear()} Freie-Plaetze.de</Text>
				<Stack direction="row" spacing={6}>
					<Link href="/about">Über Uns</Link>
					<Link href="/about#legal">Impressum</Link>
					<Link href="/privacy">Datenschutz</Link>
				</Stack>
				<Stack direction="row" spacing={6}>
					<FooterButton
						icon={IoLogoGithub}
						href="https://github.com/bjoluc/freie-plaetze"
						target="_blank"
					>
						GitHub
					</FooterButton>
					<FooterButton icon={IoMail} href="mailto:info@freie-plaetze.de">
						E-Mail
					</FooterButton>
				</Stack>
			</Container>
		</Box>
	);
};
