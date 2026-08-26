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

Die Kette hat zwei Stationen: **Quelltextkommentar im `<body>` → `humans.txt` → `/cache/`.**
Der Kommentar nennt den Pfad **nicht**, sondern nur die `humans.txt`; erst dort steht
`/cache/` beziehungsweise `/en/cache/`. Wer den Pfad in den Kommentar zurueckschreibt,
kuerzt die Kette auf null.

Der Antwort-Header `X-Moin: Moin.` ist **keine Station**, sondern ein eigenstaendiger Gruss an
Leute, die Header lesen. Er zeigt bewusst auf nichts — mit URL waere er Werbung.

Was auf `/cache/` steht, muss zur tatsaechlichen Zahl der Stationen passen. Das Listing
behauptet "zwei Stationen"; wer die Kette aendert, aendert auch diese Zeile.

`/cache/` traegt `noindex` und ist per `filter` aus der Sitemap ausgenommen. **Nicht** in die
`robots.txt` aufnehmen — ein `Disallow` verraet den Pfad an jeden, der die Datei aufruft.

Auf `/cache/` steht **kein Ort, kein GC-Code und keine Koordinate**, auch nicht zum echten
Cache. Das Impressum fuehrt bewusst keine Anschrift; ein Cache-Listing haette sie geliefert.
Diese Regel gilt ohne Ausnahme und ohne Diskussion — auch dann, wenn eine Ergaenzung nur
gutgemeint waere.

## Header: zwei Entscheidungen, die nicht zurueckgedreht werden sollen

**Kein `Cross-Origin-Embedder-Policy`.** Er steht auf jeder Haerteliste, dient aber
ausschliesslich dazu, Cross-Origin-Isolation fuer `SharedArrayBuffer` und hochaufloesende
Timer freizuschalten. Diese Seite liefert kein JavaScript aus und braucht beides nicht. Der
Header verschaerft nur die Regeln fuer jede Ressource und bringt Browser-Erweiterungen zum
Melden. Wer ihn wieder setzt, handelt sich Fehler ein und gewinnt nichts.

**`Cross-Origin-Resource-Policy: same-site`, nicht `same-origin`.** `frank-trauernicht.de`
und `www.frank-trauernicht.de` sind verschiedene Origins, aber dieselbe Site. Mit
`same-origin` blockieren sie einander. Vorschaubild und Symbole tragen zusaetzlich
`cross-origin`, sonst holen Linkvorschauen sie nicht.


**Kein `preload` im HSTS-Header.** Das Schluesselwort gilt als Einwilligung: Solange es
dort steht, kann **jeder Dritte** die Domain bei hstspreload.org einreichen. Die Aufnahme
bindet dann die ganze Domain samt aller Unterdomaenen dauerhaft an HTTPS, und eine
Ruecknahme dauert Monate. Fuer eine oeffentliche Visitenkarte ohne Anmeldung und ohne
Daten ist der Gewinn praktisch null — er greift nur beim allerersten Aufruf in einem
fabrikneuen Browser. `includeSubDomains` bleibt: Das ist reversibel, `preload` nicht.

**`connect-src 'self'` in der CSP.** Sieht wie eine Aufweichung aus, ist keine: Mit
`script-src 'none'` kann kein Code eine Anfrage ausloesen. Ohne den Eintrag greift
`default-src 'none'`, und Werkzeuge, die aus dem Seitenkontext heraus die
`robots.txt` holen — Lighthouse tut das — scheitern und melden sie als ungueltig.
Echte Crawler holen sie direkt und waren nie betroffen.

**Die Leistung wird in der CI nicht bewertet, nur berichtet.** Lighthouse meldet auf
geteilten GitHub-Runnern 437 ms *Script Evaluation* auf einer Seite, die kein einziges
Byte JavaScript ausliefert. Dort wird die Messumgebung gemessen, nicht die Seite. Fuer
die Leistung gilt PageSpeed Insights; die uebrigen drei Kategorien sind deterministisch
und stehen deshalb auf 100.

## Angaben, die veralten

Zwei Werte werden **zur Bauzeit** errechnet, nicht im Browser — die CSP verbietet
JavaScript, und der Browser soll auch nichts rechnen muessen:

- die Jahre mit C# und .NET, aus `src/content/facts.ts`, als Zahlwort in beiden Sprachen
- das `Expires` der `security.txt`, ueber die Integration in `astro.config.mjs`,
  immer Bauzeit plus ein Jahr

Damit das etwas nuetzt, muss regelmaessig gebaut werden. Dafuer sorgt
`.github/workflows/refresh.yml` einmal im Monat ueber einen Vercel Deploy Hook.
**Wer den Workflow entfernt, friert beide Werte ein** — und die `security.txt` wird
nach RFC 9116 irgendwann ungueltig, nicht bloss alt.

Das Datum unter „Stand" in der Datenschutzerklaerung bleibt bewusst von Hand. Es
automatisch auf das Baudatum zu setzen wuerde behaupten, der Text habe sich geaendert.

## Was die Werkzeuge pruefen

| Workflow | Wann | Wofuer |
|---|---|---|
| `ci.yml` | jeder Push | Build, Typen, kein fremder Host, kein Skript, `npm audit` |
| `smoke.yml` | Push, montags | die **ausgelieferte** Seite: Header, Cookies, Weiterleitungen, Kette, `security.txt` |
| `lighthouse.yml` | Push, montags | vier Kategorien gegen `lighthouse-budget.json` |
| `links.yml` | montags | externe Verweise |
| `refresh.yml` | monatlich | Neubau, damit die Bauzeit-Werte frisch bleiben |

`smoke.yml` ist der wichtigste. Er prueft, was **nicht im Repository steht** — die
Einstellungen beim Anbieter. Genau dort war beim Livegang der Fehler.

Actions sind auf Commit-SHA gepinnt, Dependabot hebt sie samt Kommentar an.
**SHAs nie raten**, immer aus der API holen.

## Texte ändern

Sämtlicher Fließtext liegt in `src/content/de.ts` und `src/content/en.ts`. Die Seiten
selbst enthalten keinen Text außer den Rechtstexten unter `src/pages/`. **Eine Änderung
in einer Sprache ohne die andere ist unvollständig.**

## Vor dem Ausliefern

`docs/PRUEFLISTE.md` abarbeiten. Die Zielwerte dort sind nicht Zierde — die Seite
positioniert unter anderem auf Sorgfalt, und eine Seite mit B-Bewertung bei
securityheaders.com widerlegt genau das.
