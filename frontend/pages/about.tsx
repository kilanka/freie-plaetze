import {Container, Heading, List, ListIcon, ListItem, Text} from "@chakra-ui/react";
import {NextPage} from "next";
import React from "react";
import {TiInputChecked} from "react-icons/ti";

import {ParagraphLink} from "../lib/components/content/ParagraphLink";
import {HeaderSection} from "../lib/components/HeaderSection";
import {Link} from "../lib/components/next/Link";
import {Title} from "../lib/components/Title";

const Page: NextPage = () => {
	return (
		<>
			<Title>Über Uns</Title>

			<HeaderSection>
				<Heading fontSize="4xl">Freie-Plaetze.de</Heading>
				<List spacing={8}>
					<ListItem>
						<ListIcon as={TiInputChecked} boxSize={8} />
						unterstützt das Jugendamt, passende Einrichtungen mit freien Plätzen schnell und einfach
						zu finden.
					</ListItem>
					<ListItem>
						<ListIcon as={TiInputChecked} boxSize={8} /> hilft, Sorgeberechtigte im Rahmen des{" "}
						<ParagraphLink paragraph="5">Wunsch- und Wahlrechts</ParagraphLink> bei der Wahl des
						Angebots zu beteiligen.
					</ListItem>
					<ListItem>
						<ListIcon as={TiInputChecked} boxSize={8} /> ist und bleibt für Besucher und
						registrierte Einrichtungen kostenlos.
					</ListItem>
				</List>
			</HeaderSection>

			<Container as="section" maxWidth="container.xl" mt={8}>
				<Heading size="lg" mb={4} id="legal">
					Impressum
				</Heading>
				<Text mb={8}>
					Freie-Plaetze.de ist ein ehrenamtliches Projekt von Marcel Pohl (Konzept,
					Öffentlichkeitsarbeit) und Björn Luchterhandt (technische Umsetzung). Der Quellcode ist
					auf GitHub unter den Bedingungen der GNU General Public License v3.0 öffentlich zugänglich
					(
					<Link href="https://github.com/bjoluc/freie-plaetze" target="_blank">
						https://github.com/bjoluc/freie-plaetze
					</Link>
					).
				</Text>

				<Heading size="md" mb={4}>
					Angaben gemäß &sect; 5 TMG
				</Heading>
				<Text mb={4}>
					Marcel Pohl
					<br />
					Mörikestraße 26
					<br />
					33100 Paderborn
				</Text>
				<Text mb={8}>E-Mail: info@freie-plaetze.de</Text>

				<Heading size="md" mb={4}>
					Verbraucherstreitbeilegung
				</Heading>
				<Text mb={8}>
					Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
					Verbraucherschlichtungsstelle teilzunehmen.
				</Text>
			</Container>
		</>
	);
};

export default Page;
