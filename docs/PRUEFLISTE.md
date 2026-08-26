# Prüfliste vor und nach dem Ausliefern

Abzuhaken gegen die Produktionsdomain, nicht gegen `localhost`.

## Transport und Header

- [ ] securityheaders.com — **A+**
- [ ] Mozilla Observatory — **A+**
- [ ] SSL Labs — **A+**, TLS 1.3, kein TLS 1.0/1.1
- [ ] HSTS bei hstspreload.org eingereicht
- [ ] `Content-Security-Policy` greift, Browser-Konsole ohne Verstoß
- [ ] JSON-LD wird trotz `script-src 'none'` ausgeliefert und nicht blockiert
      (Datenblöcke mit `application/ld+json` sind kein ausführbares Skript —
      im Rich-Results-Test gegenprüfen)

## Auslieferung

- [ ] Keine Anfrage an einen fremden Host (Netzwerk-Tab, „Third party" filtern)
- [ ] Kein Cookie gesetzt, `localStorage` und `sessionStorage` leer
- [ ] `*.vercel.app` leitet dauerhaft auf die eigene Domain um
- [ ] Kein Directory-Listing, kein `/.git/`, keine Source Maps
- [ ] `/.well-known/security.txt` erreichbar, Ablaufdatum in der Zukunft

## Leistung und Zugänglichkeit

- [ ] Lighthouse 100 / 100 / 100 / 100, mobil und Desktop
- [ ] LCP ≤ 2,5 s · INP ≤ 200 ms · CLS ≤ 0,1
- [ ] axe und WAVE ohne Fehler, WCAG 2.2 AA
- [ ] Tastaturbedienung vollständig, Sprunglink sichtbar beim ersten Tab
- [ ] Dunkel- und Hellmodus geprüft, Kontrast ≥ 4,5:1
- [ ] Druckansicht ergibt einen brauchbaren Lebenslauf

## Auffindbarkeit

- [ ] `hreflang` de / en / x-default auf allen sechs Seiten korrekt und wechselseitig
- [ ] Canonical selbstreferenzierend
- [ ] `sitemap-index.xml` erreichbar und in `robots.txt` verwiesen
- [ ] Google Search Console und Bing Webmaster Tools per DNS-TXT bestätigt
- [ ] Rich-Results-Test erkennt `Person` ohne Warnung
- [ ] Vorschaubild in LinkedIn, Slack und WhatsApp geprüft

## DNS und Mail

- [ ] DMARC vorhanden, zunächst `p=none`, nach Auswertung `p=reject`
- [ ] DKIM in Exchange Online aktiviert, `selector1` und `selector2` aufgelöst
- [ ] SPF unverändert auf `-all`
- [ ] CAA gesetzt (setzt DNS-Umzug voraus, siehe RUNBOOK)
- [ ] DNSSEC aktiv (setzt DNS-Umzug voraus)
- [ ] AAAA vorhanden

## Rückverweise, erst nach dem Livegang

- [ ] GitHub-Profil: Website-Feld auf `https://frank-trauernicht.de`
- [ ] LinkedIn: Kontaktdaten, Website
- [ ] XING: Website
