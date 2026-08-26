import type { Content } from './types';

export const de: Content = {
  lang: 'de',
  htmlLang: 'de-DE',
  otherLang: { code: 'en', href: '/en/', label: 'English', aria: 'Switch to English' },

  meta: {
    title: 'Frank Trauernicht — Senior Software Engineer',
    description:
      'Senior Software Engineer aus Ostfriesland. C# und .NET seit 2011, Architektur und Modernisierung gewachsener Systeme, Betrieb auch in regulierten Umgebungen. Sieben Jahre Führungserfahrung aus einem eigenen Softwareunternehmen.',
    ogAlt: 'Porträt von Frank Trauernicht',
  },

  skipLink: 'Zum Inhalt springen',

  hero: {
    name: 'Frank Trauernicht',
    role: 'Senior Software Engineer',
    facts: ['C# und .NET seit 2011', 'Ostfriesland, remote'],
    lead: [
      'Ich baue seit fünfzehn Jahren Software in C# und .NET. Meistens dort, wo schon etwas läuft, das weiterlaufen soll: gewachsene Systeme, große Datenmengen, Umgebungen mit Auflagen.',
    ],
    photoAlt: 'Frank Trauernicht',
  },

  sections: [
    {
      id: 'haltung',
      heading: 'Wie ich arbeite',
      paragraphs: [
        'Ich weiß recht gut, was ich kann. Nützlicher finde ich, genau zu wissen, was ich nicht kann — und wer es besser kann als ich. Was mir fehlt, lerne ich am Gegenstand. Wo jemand anderes schneller ist, hole ich ihn dazu, statt es mir selbst zu beweisen.',
        'Gutes Miteinander ist mir dabei nicht nebensächlich. Offene Kritik gehört dazu, in beide Richtungen — ich nehme sie gern entgegen und halte sie für den kürzesten Weg zu einer besseren Lösung.',
      ],
    },
    {
      id: 'arbeit',
      heading: 'Die Fachlichkeit wechselt, die Probleme wiederholen sich',
      paragraphs: [
        'In fünfzehn Jahren bin ich durch sehr verschiedene Branchen gekommen. Was sich ändert, ist die Domäne. Was sich wiederholt, sind die Probleme: große Datenmengen, die verlässlich verarbeitet werden müssen. Gewachsene Systeme, die weiterleben sollen. Planung und Disposition. Und fast immer eine Schnittstelle, die so nirgends dokumentiert ist.',
      ],
      listIntro: 'Einiges davon, ohne Namen:',
      list: [
        'Auswertung von Millionen Positionsmeldungen aus dem Schiffsverkehr pro Tag — Routen rekonstruieren, Bewegungsmuster erkennen.',
        'Meldewesen für Vorfälle an Bord, von der Erfassung bis zum ausgelieferten Bericht.',
        'Ein Dokumentenmanagementsystem.',
        'Ein Versicherungsfachverfahren mit Fallakten und Kostenübersichten.',
        'Artikelkataloge mit Millionen Datensätzen und einheitlichem Rollout buchbarer Leistungen.',
        'Wartungsplanung für Windkraftanlagen, mit Tourenplanung und Fernzugriff auf die Anlagen.',
        'Veranstaltungsverwaltung mit Ticketverkauf über Stripe und Sitzplatzbuchung im dreidimensionalen Saalplan.',
      ],
      afterList: [
        'Die maritime Ecke war eine gute Zeit, und AIS-Daten in dieser Größenordnung sind ein schönes Problem. Sie gehört zu meiner Geschichte — sie ist nicht ihr Fundament.',
      ],
    },
    {
      id: 'architektur',
      heading: 'Architektur',
      paragraphs: [
        'Monolith, modularer Monolith, Microservices und alles Improvisierte dazwischen: Diese Strukturen gibt es nun einmal, und man sucht sich selten aus, welche vor einem steht. Die Arbeit besteht darin, mit der umgehen zu können, die es geworden ist — mit der selbst entworfenen genauso wie mit der geerbten.',
        'Vor der Entscheidung steht bei mir das Lesen. Was ein System heute tut, steht selten dort, wo es dokumentiert ist; es steht im Code, in den Daten und in den Gewohnheiten derer, die damit arbeiten. Erst danach lässt sich sagen, was bleiben kann und was ersetzt gehört.',
      ],
    },
    {
      id: 'auslieferung',
      heading: 'Bauen, prüfen, ausliefern',
      paragraphs: [
        'Diese Seite der Arbeit hat mich von Anfang an interessiert. Schon während der Ausbildung habe ich Werkzeuge und Abläufe mit aufgebaut und später vorangetrieben — und in meinem eigenen Unternehmen war ich der Einzige, der dafür zuständig war. Bauen, Testen, Ausliefern und alles, was daran hängt, lag bei mir.',
        'In der Praxis heißt das: Container und Compose-Verbünde für Entwicklung und Betrieb, Pipelines, die bei jedem Commit bauen und prüfen, und ein kontrollierter Weg, Aktualisierungen zu Kunden zu bringen, statt sie zu verteilen und zu hoffen. Wo kein passendes Werkzeug da war, habe ich eins gebaut — meist etwas Kleines, das eine wiederkehrende Handgriffsfolge überflüssig macht.',
        'Dazu die unspektakulären Dinge, an denen sich entscheidet, ob mehrere Leute an derselben Sache arbeiten können: Formatierung und Linting automatisch statt im Review, Namenskonventionen, die auch in altem Code noch gelten, und ein Ticketsystem, in dem man drei Jahre später noch nachvollziehen kann, warum etwas so ist.',
        'Werkzeuge über die Jahre: Git und, wo es noch sein musste, Subversion. Jenkins und GitHub Actions. Docker und Compose. Jira, Confluence und davor Bugzilla.',
      ],
    },
    {
      id: 'betrieb',
      heading: 'Betrieb',
      paragraphs: [
        'Manches, was ich baue, läuft in der Cloud, manches auf Kundeninfrastruktur — regulierte Branchen, On-Premises-Netze, Umgebungen, in denen die Daten das Haus nicht verlassen dürfen. Das Zweite lehrt einen, was das Erste verbirgt: Dort kümmert sich niemand still um Sicherungen, Zertifikate, Überwachung und Ausfallsicherheit.',
      ],
    },
    {
      id: 'sicherheit',
      heading: 'Sicherheit',
      paragraphs: [
        'Ich bin kein Penetration Tester und gebe mich nicht als einer aus. Ich arbeite mit den OWASP-Listen, führe Scans durch, lese mich in das ein, was ich prüfen will, und habe zuletzt eine mobile Anwendung im regulierten Umfeld untersucht.',
        'Was ich mitbringe, ist der Blick, der beim Entwurf schon fragt, wo das hier aufbricht — nicht erst beim Audit.',
      ],
    },
    {
      id: 'verantwortung',
      heading: 'Was aus sieben Jahren Führung geblieben ist',
      paragraphs: [
        'Sieben Jahre lang habe ich ein Softwareunternehmen geführt, das ich mitgegründet habe, zuletzt mit einem Team von zwölf Leuten. Meine Hälfte der Geschäftsführung war die technische und vor allem die menschliche: Ideen finden, die sich lohnen, daraus belastbare Pläne machen, mitbauen — und genug Struktur halten, dass die anderen arbeiten konnten, ohne auf mich zu warten.',
        'Das hat verändert, wie ich entwickle. Wenn man drei Jahre später noch da ist und pflegt, was man entschieden hat, hört Architektur auf, eine Geschmacksfrage zu sein.',
        'Der planende Teil ist mitgekommen: Schätzungen, die halten. Umfänge, die man kürzen kann, ohne dass alles zusammenfällt. Und die Angewohnheit, in die Zahlen zu sehen — eine technische Entscheidung ist eine Kostenstruktur, und ich kann sie denen erklären, die sie unterschreiben.',
      ],
    },
    {
      id: 'ki',
      heading: 'Arbeiten mit KI',
      paragraphs: [
        'KI ist ein starkes Werkzeug, und ich nutze es täglich. Was sie nicht abnimmt, ist die Verantwortung. Der Code, der am Ende ausgeliefert wird, ist meiner; ich muss ihn erklären und für ihn geradestehen können.',
        'Was sich nicht prüfen lässt, ist keine Arbeitserleichterung, sondern eine spätere Rechnung.',
      ],
    },
    {
      id: 'lernen',
      heading: 'Lernen und weitergeben',
      paragraphs: [
        'Nach dem Abitur habe ich mich bewusst gegen ein Studium entschieden und eine dreijährige Ausbildung gemacht. Ich wollte Dinge können, nicht jahrelang über sie hören — daran hat sich wenig geändert: Was ich brauche, lerne ich am Gegenstand.',
        'Ausgebildet habe ich seither fast durchgehend selbst: über zwölf Auszubildende in den vergangenen Jahren, mehrere von ihnen Jahrgangsbeste und bei der Freisprechung in Leer ausgezeichnet. Von den Dingen, die ich beruflich gemacht habe, ist das der Teil, der am längsten nachwirkt.',
        'Zurück geht es dahin, wo es passt. Aus einem Fork mit Prüfungsmaterial für die Fachinformatiker Anwendungsentwicklung ist bei mir eine eigene Themensammlung geworden: Kapitel, Diagramme, Prüfungsfragen und Spickzettel, deutsch und englisch. Dazu ein projektbasierter JavaScript-Kurs für Leute, die gerade anfangen.',
      ],
    },
  ],

  career: {
    heading: 'Werdegang',
    stations: [
      {
        period: 'seit Juli 2026',
        role: 'Senior Software Engineer',
        note: 'Festanstellung.',
      },
      {
        period: '2019 – 2026',
        role: 'Mitgründer und Geschäftsführer, zuletzt Senior Entwickler',
        org: 'Leanetec GmbH',
        note: 'Technische Richtung, Vorhabensteuerung und ein Team von zwölf Personen. Dazu alleinige Verantwortung für Build, Auslieferung und Werkzeuge.',
      },
      {
        period: '2011 – 2019',
        role: 'Ausbildung, Entwickler, zuletzt Leiter Softwareentwicklung',
        org: 'BUSS DATA GmbH',
        note: 'Ausbildung zum Fachinformatiker für Anwendungsentwicklung, danach Entwicklung und Verantwortung für das Entwicklerteam.',
      },
    ],
  },

  repos: {
    heading: 'Öffentliche Arbeiten',
    intro: [
      'Das meiste, was ich baue, liegt in privaten und in Kundenrepositories. Öffentlich steht, was für sich allein funktioniert.',
    ],
    items: [
      {
        name: 'fachinformatiker-anwendungsentwicklung',
        url: 'https://github.com/ftrauernicht/fachinformatiker-anwendungsentwicklung',
        text: 'Themensammlung für die Abschlussprüfung Teil 2 der Fachinformatiker Anwendungsentwicklung — Kapitel, Diagramme, Prüfungsfragen und Spickzettel, deutsch und englisch. Aus einem Fork zu einer eigenen Materialsammlung ausgebaut.',
      },
      {
        name: 'dotnet-architecture-hexagonal-template',
        url: 'https://github.com/ftrauernicht/dotnet-architecture-hexagonal-template',
        text: 'Startpunkt für .NET-Projekte mit sauber getrennten Schichten, festgelegten Abhängigkeitsrichtungen und lauffähigen Tests.',
      },
      {
        name: 'javascript-course',
        url: 'https://github.com/ftrauernicht/javascript-course',
        text: 'Projektbasierter JavaScript-Kurs für Anfänger, vom ersten Skript bis zu kleinen Anwendungen.',
      },
      {
        name: 'raspi-google-drive-sync',
        url: 'https://github.com/ftrauernicht/raspi-google-drive-sync',
        text: 'Sicherung nach Google Drive auf einem Raspberry Pi der ersten Generation — 512 MB Arbeitsspeicher, ARMv6, und die Aufgabe, sich nach einem Fehler selbst wieder einzufangen.',
      },
      {
        name: 'ha-automation-cookbook',
        url: 'https://github.com/ftrauernicht/ha-automation-cookbook',
        text: 'Automatisierungsmuster für Home Assistant zum Übernehmen, nebst Beschattungssteuerung und Aufenthaltsstatistik in zwei weiteren Repositories.',
      },
    ],
  },

  contact: {
    heading: 'Abseits davon',
    paragraphs: [
      'Außerhalb der Arbeit bin ich beim Geocaching unterwegs, treibe die Automatisierung meines Zuhauses weiter, als irgendjemand verlangt hat, und konstruiere und drucke in 3D. Keine Figuren — Halterungen, Ersatzteile, Dinge, die ein konkretes Problem lösen. Etwas bauen, etwas reparieren, etwas Brauchbares herstellen: derselbe Antrieb wie im Beruf, nur ohne Ticketsystem.',
      'Ich lebe und arbeite in Ostfriesland. Deutsch und Englisch im Beruf, Plattdeutsch, wenn jemand damit anfängt.',
    ],
    emailIntro: 'Erreichbar unter',
    email: 'mail@frank-trauernicht.de',
    profiles: [
      { label: 'GitHub', url: 'https://github.com/ftrauernicht' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/frank-trauernicht/' },
      { label: 'XING', url: 'https://www.xing.com/profile/Frank_Trauernicht' },
    ],
  },

  footer: {
    imprint: { label: 'Impressum', href: '/impressum/' },
    privacy: { label: 'Datenschutz', href: '/datenschutz/' },
    note: 'Diese Seite setzt keine Cookies, lädt nichts von fremden Servern und misst kein Nutzungsverhalten.',
  },

  legal: { backHome: 'Zurück zur Startseite' },
};
