import {Container} from "@chakra-ui/react";
import chakraRenderer from "chakra-ui-markdown-renderer";
import {NextPage} from "next";
import React from "react";
import ReactMarkdown from "react-markdown";

import {Title} from "../lib/components/Title";

const Page: NextPage = () => {
	return (
		<>
			<Title>Datenschutzerklärung</Title>

			<Container as="section" maxWidth="container.xl" mt={8}>
				<ReactMarkdown skipHtml components={chakraRenderer()}>
					{`
## Datenschutzerklärung

Im Rahmen dieser Datenschutzerklärung möchten wir Sie über Art, Umfang und Zweck der von uns erhobenen, genutzten und verarbeiteten personenbezogenen Daten informieren.
Personenbezogene Daten bezeichnen alle Informationen, die direkt oder indirekt auf Sie persönlich beziehbar sind.
Dazu zählen beispielsweise Ihr Name, Ihre Anschrift, Ihre E-Mail-Adresse, Online-Kennungen und Ihr Nutzerverhalten, wenn Sie durch diese Informationen oder Handlungen identifiziert werden oder identifiziert werden könnten.
Wir setzen auf unserer Webseite zum Schutz Ihrer personenbezogenen Daten und anderer vertraulicher Inhalte (z.B. bei Anfragen über unser Kontaktformular) eine SSL-Verschlüsselung ein.
Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten, bei Auskünften, Berichtigung, Sperrung oder Löschung von Daten sowie Widerruf ggfls. erteilter Einwilligungen oder Widerspruch gegen eine bestimmte Datenverarbeitung wenden Sie sich bitte an den nachfolgend genannten Verantwortlichen oder unseren Datenschutzbeauftragten.

#### I. Name und Kontaktdaten des Verantwortlichen

Der Verantwortliche im Sinne von Art. 4 Nr. 7 der Datenschutz-Grundverordnung (DS-GVO), sonstiger in den Mitgliedstaaten der Europäischen Union geltenden Datenschutzgesetze sowie sonstiger datenschutzrechtlicher Bestimmungen ist:

Kilanka GmbH\\
Paul-Dessau-Straße 8\\
22761 Hamburg

Telefon: 040 / 60 944 194 - 0\\
Fax: 040 / 60 944 194 - 9\\
E-Mail: info@kilanka.de

Unseren Datenschutzbeauftragten erreichen Sie per E-Mail über steen@kanzlei-360.de oder postalisch unter folgender Anschrift:
Rechtsanwalt Carsten-Helmut Steen, Kanzlei360 Grad GbR, Bahnhofstraße 23, 24217 Schönberg.

#### II. Ihre Rechte

1. Nachfolgend informieren wir Sie über Ihre Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten.

	Sie haben das Recht unentgeltlich

	* eine **Bestätigung** darüber zu verlangen, ob Sie betreffende personenbezogene Daten von uns verarbeitet werden (Art. 15 DS-GVO),
	* **Auskunft** über Ihre von uns verarbeiteten personenbezogenen Daten zu verlangen (Art. 15 DS-GVO). Insbesondere können Sie Auskunft über die Verarbeitungszwecke, die Kategorie der personenbezogenen Daten, die Kategorien von Empfängern, gegenüber denen Ihre Daten offengelegt wurden oder werden, die geplante Speicherdauer, das Bestehen eines Rechts auf Berichtigung, Löschung, Einschränkung der Verarbeitung oder Widerspruch, das Bestehen eines Beschwerderechts, die Herkunft Ihrer Daten, sofern diese nicht bei uns erhoben wurden, sowie über das Bestehen einer automatisierten Entscheidungsfindung einschließlich Profiling und ggfls. aussagekräftigen Informationen zu deren Einzelheiten verlangen,
	* unverzüglich die **Berichtigung** unrichtiger oder Vervollständigung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen (Art. 16 DS-GVO),
	* die **Löschung** Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen, soweit nicht die Verarbeitung zur Ausübung des Rechts auf freie Meinungsäußerung und Information, zur Erfüllung einer rechtlichen Verpflichtung, aus Gründen des öffentlichen Interesses oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist (Art. 17 DS-GVO),
	* die **Einschränkung der Verarbeitung** Ihrer personenbezogenen Daten zu verlangen, soweit die Richtigkeit der Daten von Ihnen bestritten wird, die Verarbeitung unrechtmäßig ist, Sie aber deren Löschung ablehnen und wir die Daten nicht mehr benötigen, Sie jedoch diese zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen benötigen oder Sie gemäß Art. 21 DS-GVO Widerspruch gegen die Verarbeitung eingelegt haben (Art. 18 DS-GVO),
	* Ihre personenbezogenen Daten, die Sie uns bereitgestellt haben, in einem strukturierten, gängigen und maschinenlesebaren Format zu erhalten oder die **Übermittlung** an einen anderen Verantwortlichen zu verlangen (Art. 20 DS-GVO),
	* Ihre einmal erteilte Einwilligung jederzeit uns gegenüber zu **widerrufen**. Durch den Widerruf der Einwilligung wird die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung nicht berührt.


2. Haben Sie das Recht auf Berichtigung, Löschung oder Einschränkung der Verarbeitung uns gegenüber geltend gemacht, sind wir verpflichtet, allen Empfängern, denen die Sie betreffenden personenbezogenen Daten offengelegt wurden, diese Berichtigung oder Löschung der Daten oder Einschränkung der Verarbeitung mitzuteilen, es sei denn, dies erweist sich als unmöglich oder ist mit einem unverhältnismäßigen Aufwand verbunden. Ihnen steht weiterhin das Recht zu, über diese Empfänger unterrichtet zu werden (Art. 19 DS-GVO).

3. Sie haben ferner das Recht, sich bei der für uns zuständigen Datenschutz-Aufsichtsbehörde (https://www.datenschutz-hamburg.de/) über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu beschweren (Art. 77 DS-GVO).

#### III. Bereitstellung unserer Webseite und Erstellung von Server-Logfiles

1. Bei der bloß informatorischen Nutzung unserer Webseite, also wenn Sie sich nicht registrieren oder uns anderweitig Informationen übermitteln, erheben wir nur die personenbezogenen Daten, die Ihr Browser an unseren Server übermittelt. Wenn Sie unsere Webseite aufrufen, erheben wir die folgenden Daten, die für uns technisch erforderlich sind, um Ihnen unsere Webseite anzuzeigen und die Stabilität und Sicherheit unserer Webseite zu gewährleisten:

	* IP-Adresse
	* Datum und Uhrzeit des Zugriffs
	* Zeitzonendifferenz zur Greenwich Mean Time (GMT)
	* Inhalt der Anforderung (konkrete Seite)
	* Zugriffsstatus/HTTP-Statuscode
	* die jeweils übertragene Datenmenge
	* Webseite, von der Ihre Anforderung kommt
	* Webseiten, die Sie bei uns aufrufen
	* Informationen über den Browsertyp und die verwendete Version
	* Betriebssystem und dessen Oberfläche
	* Sprache und Version der Browsersoftware.

	\\
	Diese allgemeinen Daten und Informationen werden in den Logfiles unseres Servers nur vorübergehend und getrennt von Ihren personenbezogenen Daten gespeichert, die Sie uns ggfls. freiwillig übermitteln. Die in den Logfiles anonym erhobenen Daten und Informationen werden von uns lediglich statistisch mit dem Ziel ausgewertet, den Datenschutz und die Datensicherheit in unserem Unternehmen zu erhöhen und ein optimales Schutzniveau für die von uns verarbeiteten personenbezogenen Daten sicherzustellen.

2. Die Rechtsgrundlage für die Datenverarbeitung im Zusammenhang mit Server-Logfiles ist Art. 6 Abs. 1 S. 1 lit. f DS-GVO. Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich sind. Im Falle der Erfassung der Daten zur Bereitstellung der Webseite ist dies der Fall, wenn die jeweilige Sitzung von Ihnen beendet wird.

	Die Erfassung der Daten ist zur Bereitstellung und deren Speicherung in Logfiles für den Betrieb unserer Webseite zwingend erforderlich. Es besteht für Sie daher keine Möglichkeit, dieser Datenverarbeitung zu widersprechen.

#### IV. Kontaktformular / Kommunikation per E-Mail

1. Sie können uns jederzeit über das von uns bereitgestellte Formular kontaktieren. Im Zeitpunkt der Absendung Ihrer Nachricht werden die folgenden Daten (Pflichtfeld) bei uns gespeichert:

	* E-Mail-Adresse

	\\
	Weiterhin speichern wir das Datum und den Zeitpunkt der Absendung Ihrer Kontaktanfrage.

	Alternativ können Sie uns jederzeit über die von uns bereitgestellte E-Mail-Adresse kontaktieren.
	In diesem Fall werden nur die uns von Ihnen mit der E-Mail übermittelten personenbezogenen Daten gespeichert.

2. Rechtsgrundlage für die Verarbeitung der Daten bei der Verwendung unseres Kontaktformulars ist oder der Daten, die Sie uns im Zuge einer Übersendung per E-Mail übermitteln, ist Art. 6 Abs. 1 S. 1 lit. f DS-GVO. Dient die Kontaktaufnahme der Erfüllung eines Vertrages oder Durchführung vorvertraglicher Maßnahmen ist Art. 6 Abs. 1 S. 1 lit. b DS-GVO ergänzende Rechtsgrundlage.

3. Wir verwenden die Daten ausschließlich für die Beantwortung Ihres Anliegens. Die in diesem Zusammenhang anfallenden Daten löschen wir, nachdem die Speicherung nicht mehr erforderlich ist, oder schränken die Verarbeitung ein, falls gesetzliche Aufbewahrungspflichten bestehen. Sie können der Verarbeitung Ihrer über das Kontaktformular oder per E-Mail mitgeteilten personenbezogenen Daten jederzeit widersprechen. Richten Sie Ihren Widerspruch bitte an die in Ziffer I. angegebenen Kontaktdaten. Die Korrespondenz kann dann allerdings nicht fortgesetzt werden.

#### V. Routinemäßige Löschung und Sperrung Ihrer personenbezogenen Daten

Wir verarbeiten und speichern Ihre personenbezogenen Daten jeweils nur für den Zeitraum, der zur Erreichung des Speicherungszwecks erforderlich ist oder sofern dies durch den Europäischen Richtlinien- und Verordnungsgeber oder einen anderen Gesetzgeber in Gesetzen oder Vorschriften, dem wir unterliegen, vorgesehen wurde.
Entfällt der Speicherungszweck oder läuft eine vom Europäischen Richtlinien- und Verordnungsgeber oder einem anderen zuständigen Gesetzgeber vorgeschriebene Speicherfrist ab, werden die personenbezogenen Daten routinemäßig und entsprechend den gesetzlichen Vorschriften gesperrt oder gelöscht, es sei denn, Sie haben einer darüberhinausgehenden Nutzung Ihrer Daten zugestimmt.

#### VI. WIDERSPRUCHSRECHT (Art. 21 DS-GVO)

Wenn wir Ihre personenbezogenen Daten aufgrund unseres überwiegenden berechtigten Interesses im Rahmen einer Interessenabwägung nach Art. 6 Abs. 1 S. 1 lit. f DS-GVO verarbeiten, haben Sie aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit das Recht, dieser Verarbeitung mit Wirkung für die Zukunft kostenfrei zu widersprechen.
Wenn wir Ihre personenbezogenen Daten verarbeiten, um Direktwerbung zu betreiben, haben Sie ebenfalls jederzeit das Recht, der Verarbeitung zum Zwecke derartiger Werbung mit Wirkung für die Zukunft kostenfrei zu widersprechen; dies gilt auch für ein Profiling, soweit es mit solcher Direktwerbung in Verbindung steht.
Ihren Widerspruch richten Sie bitte an den in Ziffer I. genannten Verantwortlichen (z.B. per E-Mail).
					`}
				</ReactMarkdown>
			</Container>
		</>
	);
};

export default Page;
