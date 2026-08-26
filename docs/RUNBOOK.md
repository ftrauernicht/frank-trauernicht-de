# Betriebshandbuch

## Ausgangslage

| | |
|---|---|
| Registrar | deutscher Registrar |
| DNS | Microsoft 365 (an Microsoft 365 delegiert) |
| Mail | Exchange Online, Tenant `<tenant>` |
| Alter Webserver | eigener vServer |
| Neues Hosting | Vercel, statisch |
| Repository | https://github.com/ftrauernicht/frank-trauernicht-de (oeffentlich) |

Hosting und DNS sind **zwei getrennte Entscheidungen**. Der Umzug auf Vercel braucht
nur einen A-Record; das DNS kann vorerst bei Microsoft bleiben.

## Livegang auf Vercel

**Erledigt:** Repository angelegt, `main` geschuetzt, CI gruen.

1. Auf vercel.com mit dem GitHub-Konto `ftrauernicht` anmelden und
   `frank-trauernicht-de` importieren. Astro wird erkannt; Build `npm run build`,
   Ausgabe `dist`. **Nichts umstellen** — kein Adapter, keine Functions, keine
   Bildoptimierung von Vercel. Das Output muss statisch bleiben, sonst ist der
   Wechsel spaeter kein A-Record mehr.
2. Erster Deploy landet auf `*.vercel.app`. Dort `docs/PRUEFLISTE.md` einmal
   durchgehen, solange die Domain noch am alten Apache haengt — Fehler faellt man
   so ohne Ausfall auf.
3. Im Vercel-Projekt unter *Settings → Domains* `frank-trauernicht.de` und
   `www.frank-trauernicht.de` eintragen. Vercel nennt dort die konkreten Werte;
   **die aus dem Dashboard nehmen, nicht aus dem Gedaechtnis** — die Apex-Adresse
   hat sich schon geaendert.
4. **TTL des bestehenden A-Records auf 300 senken und einen Tag warten.** Das
   Microsoft-365-Portal erlaubt nicht ueberall freie TTL; geht es nicht, mit bis
   zu einer Stunde Umschaltzeit rechnen.
5. A-Record im Microsoft-365-Verwaltungsportal auf den von Vercel genannten Wert
   umstellen, `www` als CNAME auf den dort genannten Zielnamen.
6. Zertifikat abwarten, dann Pruefliste ein zweites Mal — diesmal gegen die eigene
   Domain, inklusive `curl -I` fuer die Header und `X-Moin`.
7. Erst danach den alten Apache abschalten. Vorher dort in jedem Fall
   `Options -Indexes` setzen — falls Directory-Indexing aktiv ist.
8. Nach dem Livegang: Website-Feld im GitHub-Profil und im Repository setzen,
   dazu LinkedIn und XING. Vorher nicht — solange die Domain den Apache zeigt,
   schadet der Verweis mehr, als er nutzt.

**TTL dauerhaft auf 300 lassen.** Ein Umzug ist dann in fünf Minuten sichtbar.

## Rückfallebene Cloudflare Pages

Vercels Hobby-Plan ist laut Nutzungsbedingungen nicht-kommerziell. Für eine private
Profilseite ohne Angebot ist das vertretbar, aber die Auslegung liegt beim Anbieter.
Deshalb steht ein kaltes Ersatzprojekt bereit:

1. In Cloudflare Pages ein Projekt aus demselben Repository anlegen, **ohne** eigene
   Domain. Build `npm run build`, Ausgabeverzeichnis `dist`.
2. Jeder Commit deployt dorthin mit. `public/_headers` liefert dieselben Header wie
   `vercel.json` — deshalb werden beide Dateien gepflegt.
3. Im Ernstfall: Domain im Cloudflare-Projekt eintragen, A-Record umziehen. Dauer etwa
   eine Stunde, davon fünf Minuten DNS.

Für die Apex-Domain verlangt Cloudflare Pages die Zone bei Cloudflare. Das berührt die
Mail — siehe unten.

## DNS-Umzug zu Cloudflare, optional und unabhängig

Bringt DNSSEC, CAA, IPv6 und serverseitige Statistik ohne eine Zeile JavaScript. Kostet
ein Wartungsfenster, weil die Zone Exchange Online bedient.

Mitzunehmende Einträge:

| Typ | Name | Wert |
|---|---|---|
| MX | @ | `franktrauernicht-de01c.mail.protection.outlook.com` (Prio 0) |
| TXT | @ | `v=spf1 include:spf.protection.outlook.com -all` |
| TXT | @ | `mscid=…` |
| TXT | @ | `<tenant>.onmicrosoft.com` |
| CNAME | autodiscover | `autodiscover.outlook.com` |
| CNAME | selector1/2._domainkey | nach Aktivierung von DKIM |

Ablauf: alle TTL auf 300 senken, Zone in Cloudflare anlegen und **vollständig
gegenlesen**, erst dann beim Registrar die Nameserver umstellen. Danach Mailversand und
-empfang in beide Richtungen prüfen, bevor irgendetwas anderes angefasst wird.

Bot Fight Mode muss **aus** bleiben, sonst setzt Cloudflare den Cookie `__cf_bm`, und
die Einwilligungsfreiheit der Seite steht zur Diskussion.

## Sofort, unabhängig vom Hosting

- **DMARC** anlegen, Name `_dmarc`, Typ TXT:

  ```
  v=DMARC1; p=none; rua=mailto:mail@frank-trauernicht.de; fo=1
  ```

  `p=none` beobachtet nur. Nach einigen Wochen Berichten auf `p=quarantine`, dann
  `p=reject`. Nicht abkuerzen: Wer sofort auf `reject` geht und eine legitime
  Versandquelle uebersieht, verliert Mail ohne es zu merken.

- **DKIM** im Microsoft-Defender-Portal aktivieren
  (*Richtlinien → Bedrohungsrichtlinien → E-Mail-Authentifizierung → DKIM*).
  Es braucht zwei CNAMEs nach diesem Muster:

  ```
  selector1._domainkey  ->  selector1-frank-trauernicht-de._domainkey.<tenant>.onmicrosoft.com
  selector2._domainkey  ->  selector2-frank-trauernicht-de._domainkey.<tenant>.onmicrosoft.com
  ```

  **Die genauen Ziele stehen im Portal** — dort ablesen, nicht abtippen. Da die
  Zone ohnehin bei Microsoft liegt, legt das Portal die Eintraege in vielen Faellen
  selbst an.

Beides sind reine TXT- beziehungsweise CNAME-Einträge und funktionieren auch im
Microsoft-DNS. **DNSSEC und CAA gehen dort nicht** — die setzen den Umzug voraus.
