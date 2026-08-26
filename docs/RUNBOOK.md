# Betriebshandbuch

## Ausgangslage

| | |
|---|---|
| Registrar | deutscher Registrar |
| DNS | Microsoft 365 (an Microsoft 365 delegiert) |
| Mail | Exchange Online, Tenant `<tenant>` |
| Alter Webserver | eigener vServer |
| Neues Hosting | Vercel, statisch |

Hosting und DNS sind **zwei getrennte Entscheidungen**. Der Umzug auf Vercel braucht
nur einen A-Record; das DNS kann vorerst bei Microsoft bleiben.

## Livegang auf Vercel

1. Repository auf GitHub anlegen, Vercel-Projekt damit verbinden. Kein Adapter, keine
   Functions, keine Bildoptimierung von Vercel — das Output muss statisch bleiben,
   sonst ist der Wechsel kein A-Record mehr.
2. Im Vercel-Projekt die Domain `frank-trauernicht.de` und `www.frank-trauernicht.de`
   eintragen.
3. **TTL des bestehenden A-Records auf 300 senken und einen Tag warten.**
4. A-Record im Microsoft-365-Verwaltungsportal auf die von Vercel genannte Adresse
   umstellen, `www` als CNAME auf `cname.vercel-dns.com`.
5. Zertifikat abwarten, dann `docs/PRUEFLISTE.md` abarbeiten.
6. Erst danach den alten Apache abschalten. Vorher dort in jedem Fall
   `Options -Indexes` setzen — das Directory-Listing ist derzeit offen.

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

- **DMARC** anlegen: `_dmarc` TXT `v=DMARC1; p=none; rua=mailto:mail@frank-trauernicht.de`
  Nach einigen Wochen Auswertung auf `p=quarantine`, dann `p=reject`.
- **DKIM** in Exchange Online aktivieren und die beiden Selector-CNAMEs setzen.

Beides sind reine TXT- beziehungsweise CNAME-Einträge und funktionieren auch im
Microsoft-DNS. **DNSSEC und CAA gehen dort nicht** — die setzen den Umzug voraus.
