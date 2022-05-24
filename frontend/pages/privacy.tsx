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

Verantwortlicher im Sinne der Datenschutzgesetze, insbesondere der EU-Datenschutzgrundverordnung (DSGVO), ist Björn Luchterhandt (E-Mail: [privacy@freie-plaetze.de](mailto:privacy@freie-plaetze.de)).

### Ihre Betroffenenrechte

Unter den angegebenen Kontaktdaten unseres Datenschutzbeauftragten können Sie jederzeit folgende Rechte ausüben:

*   Auskunft über Ihre bei uns gespeicherten Daten und deren Verarbeitung (Art. 15 DSGVO),
*   Berichtigung unrichtiger personenbezogener Daten (Art. 16 DSGVO),
*   Löschung Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO),
*   Einschränkung der Datenverarbeitung, sofern wir Ihre Daten aufgrund gesetzlicher Pflichten noch nicht löschen dürfen (Art. 18 DSGVO),
*   Widerspruch gegen die Verarbeitung Ihrer Daten bei uns (Art. 21 DSGVO) und
*   Datenübertragbarkeit, sofern Sie in die Datenverarbeitung eingewilligt haben oder einen Vertrag mit uns abgeschlossen haben (Art. 20 DSGVO).

Sofern Sie uns eine Einwilligung erteilt haben, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen.

Sie können sich jederzeit mit einer Beschwerde an eine Aufsichtsbehörde wenden, z. B. an die zuständige Aufsichtsbehörde des Bundeslands Ihres Wohnsitzes oder an die für uns als verantwortliche Stelle zuständige Behörde.
Eine Liste der Aufsichtsbehörden (für den nichtöffentlichen Bereich) mit Anschrift finden Sie unter: [https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html](https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html).


### Cookies

Wie viele andere Webseiten verwenden wir auch so genannte „Cookies“. Bei Cookies handelt es sich um kleine Textdateien, die auf Ihrem Endgerät (Laptop, Tablet, Smartphone o.ä.) gespeichert werden, wenn Sie unsere Webseite besuchen.

Sie können Sie einzelne Cookies oder den gesamten Cookie-Bestand löschen. Darüber hinaus erhalten Sie Informationen und Anleitungen, wie diese Cookies gelöscht oder deren Speicherung vorab blockiert werden können. Je nach Anbieter Ihres Browsers finden Sie die notwendigen Informationen unter den nachfolgenden Links:

*   Mozilla Firefox: [https://support.mozilla.org/de/kb/cookies-loeschen-daten-von-websites-entfernen](https://support.mozilla.org/de/kb/cookies-loeschen-daten-von-websites-entfernen)
*   Internet Explorer: [https://support.microsoft.com/de-de/help/17442/windows-internet-explorer-delete-manage-cookies](https://support.microsoft.com/de-de/help/17442/windows-internet-explorer-delete-manage-cookies)
*   Google Chrome: [https://support.google.com/accounts/answer/61416?hl=de](https://support.google.com/accounts/answer/61416?hl=de)
*   Opera: [http://www.opera.com/de/help](http://www.opera.com/de/help)
*   Safari: [https://support.apple.com/kb/PH17191?locale=de_DE&viewlocale=de_DE](https://support.apple.com/kb/PH17191?locale=de_DE&viewlocale=de_DE)

#### Speicherdauer und eingesetzte Cookies:

Soweit Sie uns durch Ihre Browsereinstellungen oder Zustimmung die Verwendung von Cookies erlauben, können folgende Cookies auf unseren Webseiten zum Einsatz kommen:

* \`auth\`: Notwendige Daten zur Speicherung Ihres Anmeldestatuses, die wieder gelöscht werden wenn Sie sich abmelden.


### Technisch notwendige Cookies

#### Art und Zweck der Verarbeitung:

Wir setzen Cookies ein, um unsere Website nutzerfreundlicher zu gestalten. Einige Elemente unserer Internetseite erfordern es, dass der aufrufende Browser auch nach einem Seitenwechsel identifiziert werden kann.

Der Zweck der Verwendung technisch notwendiger Cookies ist, die Nutzung von Websites für die Nutzer zu vereinfachen. Einige Funktionen unserer Internetseite können ohne den Einsatz von Cookies nicht angeboten werden. Für diese ist es erforderlich, dass der Browser auch nach einem Seitenwechsel wiedererkannt wird.

Für folgende Anwendungen benötigen wir Cookies:

* Speicherung Ihres Anmeldestatuses

#### Rechtsgrundlage und berechtigtes Interesse:

Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf Basis unseres berechtigten Interesses an einer nutzerfreundlichen Gestaltung unserer Website.

#### Empfänger:

Empfänger der Daten sind ggf. technische Dienstleister, die für den Betrieb und die Wartung unserer Website als Auftragsverarbeiter tätig werden.

#### Drittlandtransfer:

Die erhobenen Daten werden ggfs. an Vercel Inc. in die USA übertragen. Vercel ist unter dem [EU-US Privacy Shield zertifiziert](https://www.privacyshield.gov/participant?id=a2zt0000000TTIbAAO) und damit verpflichtet, den EU-Datenschutzvorgaben nachzukommen.

#### Bereitstellung vorgeschrieben oder erforderlich:

Die Bereitstellung der vorgenannten personenbezogenen Daten ist weder gesetzlich noch vertraglich vorgeschrieben. Ohne diese Daten ist jedoch der Dienst und die Funktionsfähigkeit unserer Website nicht gewährleistet. Zudem können einzelne Dienste und Services nicht verfügbar oder eingeschränkt sein.

#### Widerspruch

Lesen Sie dazu die Informationen über Ihr Widerspruchsrecht nach Art. 21 DSGVO weiter unten.


### Registrierung auf unserer Website

Für das Bereithalten bestimmter Inhalte und Leistungen auf unserer Website ist Ihre Registrierung erforderlich.
Für die Registrierung auf unserer Website benötigen wir einige personenbezogene Daten, die über eine Eingabemaske an uns übermittelt werden.
Zum Zeitpunkt der Registrierung wird zusätzlich die aktuelle Uhrzeit gespeichert.


#### Rechtsgrundlage:

Die Verarbeitung der bei der Registrierung eingegebenen Daten erfolgt auf Grundlage einer Einwilligung des Nutzers (Art. 6 Abs. 1 lit. a DSGVO).

#### Empfänger:

Empfänger der Daten sind ggf. technische Dienstleister, die für den Betrieb und die Wartung unserer Website als Auftragsverarbeiter tätig werden.

#### Drittlandtransfer:

Die erhobenen Daten werden ggfs. an Vercel Inc. in die USA übertragen. Vercel ist unter dem [EU-US Privacy Shield zertifiziert](https://www.privacyshield.gov/participant?id=a2zt0000000TTIbAAO) und damit verpflichtet, den EU-Datenschutzvorgaben nachzukommen.

#### Speicherdauer:

Daten werden in diesem Zusammenhang nur verarbeitet, solange die entsprechende Einwilligung vorliegt.

#### Bereitstellung vorgeschrieben oder erforderlich:

Die Bereitstellung Ihrer personenbezogenen Daten erfolgt freiwillig, allein auf Basis Ihrer Einwilligung. Ohne die Bereitstellung Ihrer personenbezogenen Daten können wir Ihnen keinen Zugang auf unsere angebotenen Inhalte gewähren.


### SSL-Verschlüsselung

Um die Sicherheit Ihrer Daten bei der Übertragung zu schützen, verwenden wir dem aktuellen Stand der Technik entsprechende Verschlüsselungsverfahren (z.B. SSL) über HTTPS.



### Information über Ihr Widerspruchsrecht nach Art. 21 DSGVO

#### Einzelfallbezogenes Widerspruchsrecht

Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung Sie betreffender personenbezogener Daten, die aufgrund Art. 6 Abs. 1 lit. f DSGVO (Datenverarbeitung auf der Grundlage einer Interessenabwägung) erfolgt, Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmung gestütztes Profiling im Sinne von Art. 4 Nr. 4 DSGVO.

Legen Sie Widerspruch ein, werden wir Ihre personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.

**Empfänger eines Widerspruchs**: [privacy@freie-plaetze.de](mailto:privacy@freie-plaetze.de)



### Änderung unserer Datenschutzbestimmungen

Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, z.B. bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.

### Fragen an den Datenschutzbeauftragten

Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail an [privacy@freie-plaetze.de](mailto:privacy@freie-plaetze.de).


_Die Datenschutzerklärung wurde mithilfe der activeMind AG erstellt (Version #2020-09-30)._
					`}
				</ReactMarkdown>
			</Container>
		</>
	);
};

export default Page;
