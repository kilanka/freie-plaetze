import {Container, Heading, List, ListIcon, ListItem} from "@chakra-ui/react";
import {NextPage} from "next";
import React from "react";
import {TiInputChecked} from "react-icons/ti";

import {ParagraphLink} from "../lib/components/content/ParagraphLink";
import {HeaderSection} from "../lib/components/HeaderSection";
import {Title} from "../lib/components/Title";

const HomePage: NextPage = () => {
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

			<Container as="section" maxWidth="container.xl">
				{/*  */}
			</Container>
		</>
	);
};

export default HomePage;
