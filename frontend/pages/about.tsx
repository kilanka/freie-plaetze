import {Container, Heading, List, ListIcon, ListItem, Text} from "@chakra-ui/react";
import chakraRenderer from "chakra-ui-markdown-renderer";
import {NextPage} from "next";
import React from "react";
import {TiInputChecked} from "react-icons/ti";
import ReactMarkdown from "react-markdown";

import {ParagraphLink} from "../lib/components/content/ParagraphLink";
import {HeaderSection} from "../lib/components/HeaderSection";
import {Title} from "../lib/components/Title";

const Page: NextPage = () => (
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
					<ListIcon as={TiInputChecked} boxSize={8} /> ist und bleibt für Besuchende und
					registrierte Einrichtungen kostenlos.
				</ListItem>
			</List>
		</HeaderSection>

		<Container as="section" maxWidth="container.xl">
			<ReactMarkdown skipHtml components={chakraRenderer()}>
				{`


Freie-Plaetze.de wurde 2022 als ein ehrenamtliches Projekt von Marcel Pohl (Konzept, Öffentlichkeitsarbeit) und Björn Luchterhandt (technische Umsetzung) realisiert.
Seit Juli 2024 wird Freie-Plaetze.de von der Kilanka GmbH betrieben und weiterentwickelt.


### Impressum

Kilanka GmbH\\
Paul-Dessau-Straße 8\\
22761 Hamburg

Telefon: 040 / 60 944 194 - 0\\
Fax: 040 / 60 944 194 - 9\\
Mail: info@kilanka.de


Vertretungsberechtigte Geschäftsführer:\\
Maximilian Holtzberg

Registergericht: Amtsgericht Hamburg\\
Register-Nummer: HRB 142528\\
Steuernummer: 41/736/03695\\
USt-IdNr.: DE307281687\\

#### Disclaimer: Rechtliche Hinweise

##### 1. Haftungsbeschränkung

Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt erstellt.
Der Anbieter übernimmt jedoch keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Inhalte.
Die Nutzung der Inhalte der Website erfolgt auf eigene Gefahr des Nutzers.
Namentlich gekennzeichnete Beiträge geben die Meinung des jeweiligen Autors und nicht immer die Meinung des Anbieters wieder.
Mit der reinen Nutzung der Website des Anbieters kommt keinerlei Vertragsverhältnis zwischen dem Nutzer und dem Anbieter zustande.

##### 2. Externe Links

Diese Website enthält Verknüpfungen zu Websites Dritter (“externe Links”).
Diese Websites unterliegen der Haftung der jeweiligen Betreiber.
Der Anbieter hat bei der erstmaligen Verknüpfung der externen Links die fremden Inhalte daraufhin überprüft, ob etwaige Rechtsverstöße bestehen.
Zu dem Zeitpunkt waren keine Rechtsverstöße ersichtlich.
Der Anbieter hat keinerlei Einfluss auf die aktuelle und zukünftige Gestaltung und auf die Inhalte der verknüpften Seiten.
Das Setzen von externen Links bedeutet nicht, dass sich der Anbieter die hinter dem Verweis oder Link liegenden Inhalte zu Eigen macht.
Eine ständige Kontrolle dieser externen Links ist für den Anbieter ohne konkrete Hinweise auf Rechtsverstöße nicht zumutbar.
Bei Kenntnis von Rechtsverstößen werden jedoch derartige externe Links unverzüglich gelöscht.

##### 3. Urheber- und Leistungsschutzrechte

Die auf dieser Website veröffentlichten Inhalte unterliegen dem deutschen Urheber- und Leistungsschutzrecht.
Jede vom deutschen Urheber- und Leistungsschutzrecht nicht zugelassene Verwertung bedarf der vorherigen schriftlichen Zustimmung des Anbieters oder jeweiligen Rechteinhabers.
Dies gilt insbesondere für Vervielfältigung, Bearbeitung, Übersetzung, Einspeicherung, Verarbeitung bzw. Wiedergabe von Inhalten in Datenbanken oder anderen elektronischen Medien und Systemen.
Inhalte und Rechte Dritter sind dabei als solche gekennzeichnet.
Die unerlaubte Vervielfältigung oder Weitergabe einzelner Inhalte oder kompletter Seiten ist nicht gestattet und strafbar.
Lediglich die Herstellung von Kopien und Downloads für den persönlichen, privaten und nicht kommerziellen Gebrauch ist erlaubt.
Die Darstellung dieser Website in fremden Frames ist nur mit schriftlicher Erlaubnis zulässig.

##### 4. Datenschutz

Durch den Besuch der Website des Anbieters können Informationen über den Zugriff (Datum, Uhrzeit, betrachtete Seite) gespeichert werden.
Diese Daten gehören nicht zu den personenbezogenen Daten, sondern sind anonymisiert.
Sie werden ausschließlich zu statistischen Zwecken ausgewertet.
Eine Weitergabe an Dritte, zu kommerziellen oder nichtkommerziellen Zwecken, findet nicht statt.
Der Anbieter weist ausdrücklich darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen und nicht lückenlos vor dem Zugriff durch Dritte geschützt werden kann.
Die Verwendung der Kontaktdaten des Impressums zur gewerblichen Werbung ist ausdrücklich nicht erwünscht, es sei denn der Anbieter hatte zuvor seine schriftliche Einwilligung erteilt oder es besteht bereits eine Geschäftsbeziehung.
Der Anbieter und alle auf dieser Website genannten Personen widersprechen hiermit jeder kommerziellen Verwendung und Weitergabe ihrer Daten.

##### 5. Besondere Nutzungsbedingungen

Soweit besondere Bedingungen für einzelne Nutzungen dieser Website von den vorgenannten Nummern 1. bis 4. abweichen, wird an entsprechender Stelle ausdrücklich darauf hingewiesen.
In diesem Falle gelten im jeweiligen Einzelfall die besonderen Nutzungsbedingungen.
					`}
			</ReactMarkdown>
		</Container>
	</>
);

export default Page;
