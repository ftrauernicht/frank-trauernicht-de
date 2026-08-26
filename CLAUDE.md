# frank-trauernicht.de — Arbeitsregeln

Persönliche Profilseite von Frank Trauernicht. Zwei Publikumsgruppen: Recruiter, die
dreißig Sekunden bleiben, und Kunden des Arbeitgebers, die nach einem Termin
nachschlagen. Die eigentliche Aufgabe ist Deutungshoheit über das Suchergebnis zum
eigenen Namen.

## Drei Regeln, an denen alles andere hängt

**1. Kein Angebot.** Kein „Hire me", keine Sätze, keine Verfügbarkeitsangabe, keine
Aufforderung zur Anfrage. Nicht aus Bescheidenheit: Ohne laufendes Gewerbe und ohne
Leistungsangebot ist die Seite eine private Selbstdarstellung und nach § 5 DDG nicht
impressumspflichtig. Das Impressum steht freiwillig dort und **enthält bewusst keine
Anschrift**. Sobald die Seite etwas anbietet, kippt sie ins Geschäftsmäßige — und dann
fehlt die Anschrift.

Aus demselben Grund: **kein journalistisch-redaktioneller Blog.** § 18 Abs. 2 MStV
verlangt dafür Name *und* Anschrift.

**2. Kein fremder Host.** Keine Schrift von einem CDN, keine Analyse, keine Karte, kein
Video, keine Einbettung. Daran hängt, dass es keinen Einwilligungsdialog braucht — und
Google Fonts vom CDN ist der häufigste DSGVO-Abmahngrund in Deutschland. Die CI prüft
das bei jedem Push.

**3. Kein ausführbares JavaScript.** Die CSP setzt `script-src 'none'`. Der
Sprachumschalter ist ein echter Link auf eine echte URL, Hell und Dunkel laufen über
`prefers-color-scheme`. Wer einen Umschalter einbauen will, bricht die CSP — dann ist
das eine bewusste Entscheidung und keine Nebenwirkung.

## Inhaltliche Vorgaben

- **Kein Emoji.** Nirgends.
- **Kein aktueller Arbeitgeber.** Der Name steht auf LinkedIn, nicht hier. Kein
  `worksFor` im JSON-LD.
- **Keine Kundennamen.** Projekte werden als Problemklassen beschrieben.
- **Keine erfundenen Kennzahlen.** Belegt sind: zwölf Personen, sieben Jahre eigene
  Firma, .NET seit 2011.
- **Maritim darf vorkommen, aber nicht tragen.** Es ist ein Teil der Geschichte, nicht
  ihr Fundament.
- **Kein Cybergrooming-Bezug.**
- **Der Rückzug aus der Geschäftsführung** steht als das da, was er öffentlich ist: eine
  bewusste Entscheidung. Die persönlichen Hintergründe gehören in keinen Text.
- Keine Sprachniveaus (B2 und dergleichen) — die gehören in den Lebenslauf.

## Das Versteck

Es gibt **drei unabhaengige Tueren** zu `/cache/`, keine Kette: den Quelltextkommentar im
`<body>` (nennt den Pfad direkt, das ist der Hauptweg), den Antwort-Header `X-Moin` und die
`humans.txt`. Die beiden letzten sind keine Vorstufen, sondern eigenstaendige Fundstuecke —
die `humans.txt` ist vor allem das Kolophon der Seite.

Auf `/cache/` darf deshalb **nichts stehen, was eine Reihenfolge behauptet**. Wer dort
"drei Stationen" schreibt, luegt ueber die eigene Seite.

`/cache/` traegt `noindex` und ist per `filter` aus der Sitemap ausgenommen. **Nicht** in die
`robots.txt` aufnehmen — ein `Disallow` verraet den Pfad an jeden, der die Datei aufruft.

Der echte Geocache existiert; sein Ort gehoert nirgendwohin. Auf /cache/ steht **kein Ort, kein
GC-Code und keine Koordinate** — das Impressum fuehrt bewusst keine Anschrift, und ein
Cache-Listing haette genau die geliefert.

## Texte ändern

Sämtlicher Fließtext liegt in `src/content/de.ts` und `src/content/en.ts`. Die Seiten
selbst enthalten keinen Text außer den Rechtstexten unter `src/pages/`. **Eine Änderung
in einer Sprache ohne die andere ist unvollständig.**

## Vor dem Ausliefern

`docs/PRUEFLISTE.md` abarbeiten. Die Zielwerte dort sind nicht Zierde — die Seite
positioniert unter anderem auf Sorgfalt, und eine Seite mit B-Bewertung bei
securityheaders.com widerlegt genau das.
