#!/usr/bin/env bash
#
# Rauchtest gegen die *ausgelieferte* Seite, nicht gegen den Auslieferungsstand.
#
# Der Grund: Ein Teil dessen, was diese Seite ausmacht, steht gar nicht im
# Repository, sondern in den Einstellungen des Anbieters — welche Domain primaer
# ist, ob Header wirklich ankommen, ob Weiterleitungen dauerhaft sind. Genau so
# ein Fehler ist beim Livegang aufgetreten und waere von keinem Test im Repo
# gefunden worden.
#
# Aufruf:  scripts/smoke.sh [basis-url]

set -uo pipefail

BASIS="${1:-https://frank-trauernicht.de}"
WWW="https://www.frank-trauernicht.de"
VORSCHAU="https://frank-trauernicht-de.vercel.app"

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

fehler=0
geprueft=0

melde_ok()   { geprueft=$((geprueft+1)); printf '  \033[32mok\033[0m   %s\n' "$1"; }
melde_fehl() { geprueft=$((geprueft+1)); fehler=$((fehler+1)); printf '  \033[31mFEHL\033[0m %s\n' "$1"; [ $# -gt 1 ] && printf '       %s\n' "$2"; }

# Holt eine Seite einmal und legt sie ab, damit nicht jede Pruefung neu anfragt.
hole() {
  local pfad="$1" datei
  datei="$TMP/$(printf '%s' "$pfad" | tr '/:' '__')"
  [ -f "$datei.body" ] || {
    curl -sS -m 30 -D "$datei.head" -o "$datei.body" "$BASIS$pfad" 2>/dev/null
  }
  printf '%s' "$datei"
}

status() { curl -sS -o /dev/null -m 30 -w '%{http_code}' "$1" 2>/dev/null; }

echo "== Erreichbarkeit =="
for pfad in / /en/ /impressum/ /datenschutz/ /en/imprint/ /en/privacy/ \
            /cache/ /en/cache/ /humans.txt /llms.txt /robots.txt \
            /sitemap-index.xml /sitemap-0.xml /.well-known/security.txt \
            /og-image.png /og-image-en.png /frank-trauernicht.avif; do
  c="$(status "$BASIS$pfad")"
  [ "$c" = "200" ] && melde_ok "$pfad" || melde_fehl "$pfad" "HTTP $c statt 200"
done
c="$(status "$BASIS/gibt-es-nicht/")"
[ "$c" = "404" ] && melde_ok "erfundene Adresse liefert 404" || melde_fehl "erfundene Adresse" "HTTP $c statt 404"

echo
echo "== Domains =="
c="$(status "$BASIS/")"
[ "$c" = "200" ] && melde_ok "Apex wird direkt bedient" || melde_fehl "Apex" "HTTP $c — leitet es um?"

kopf="$(curl -sS -I -m 30 "$WWW/" 2>/dev/null | tr -d '\r')"
echo "$kopf" | head -1 | grep -q '308' \
  && melde_ok "www leitet dauerhaft um (308)" \
  || melde_fehl "www-Weiterleitung" "$(echo "$kopf" | head -1) — erwartet 308"
echo "$kopf" | grep -qi "^location: $BASIS/" \
  && melde_ok "www zeigt auf die Apex-Domain" \
  || melde_fehl "www-Ziel" "$(echo "$kopf" | grep -i '^location' || echo 'kein Location')"

ziel="$(curl -sS -o /dev/null -m 30 -w '%{redirect_url}' "$VORSCHAU/" 2>/dev/null)"
case "$ziel" in
  "$BASIS/"*) melde_ok "vercel.app leitet auf die eigene Domain" ;;
  *)          melde_fehl "vercel.app-Weiterleitung" "Ziel: ${ziel:-keins}" ;;
esac

echo
echo "== Header auf der Startseite =="
d="$(hole /)"; kopf="$(tr -d '\r' < "$d.head")"

erwarte_header() {
  echo "$kopf" | grep -qiE "$1" && melde_ok "$2" || melde_fehl "$2" "fehlt oder weicht ab"
}
erwarte_header "^content-security-policy:.*script-src 'none'"        "CSP mit script-src 'none'"
erwarte_header "^strict-transport-security:.*includeSubDomains"      "HSTS mit includeSubDomains"
erwarte_header "^x-content-type-options: *nosniff"                   "X-Content-Type-Options"
erwarte_header "^x-frame-options: *DENY"                             "X-Frame-Options"
erwarte_header "^referrer-policy: *no-referrer"                      "Referrer-Policy"
erwarte_header "^permissions-policy:.*camera=\(\)"                   "Permissions-Policy"
erwarte_header "^cross-origin-opener-policy: *same-origin"           "COOP"
erwarte_header "^cross-origin-resource-policy: *same-site"           "CORP same-site"
erwarte_header "^x-moin:"                                            "X-Moin"

echo "$kopf" | grep -qi '^strict-transport-security:.*preload' \
  && melde_fehl "HSTS traegt preload" "bewusst nicht gewollt, siehe CLAUDE.md" \
  || melde_ok "HSTS ohne preload"
echo "$kopf" | grep -qi '^cross-origin-embedder-policy' \
  && melde_fehl "COEP ist gesetzt" "bewusst entfernt, siehe CLAUDE.md" \
  || melde_ok "kein COEP"
echo "$kopf" | grep -qi '^set-cookie' \
  && melde_fehl "es wird ein Cookie gesetzt" "die Einwilligungsfreiheit haengt daran" \
  || melde_ok "kein Cookie"

curl -sS -I -m 30 "$BASIS/og-image.png" 2>/dev/null | tr -d '\r' \
  | grep -qi '^cross-origin-resource-policy: *cross-origin' \
  && melde_ok "Vorschaubild ist fremdabrufbar" \
  || melde_fehl "Vorschaubild" "CORP nicht auf cross-origin — Linkvorschauen holen es nicht"

echo
echo "== Auslieferung =="
for pfad in / /en/; do
  d="$(hole "$pfad")"
  n="$(grep -oE '(src|href)="https?://[^"]+"' "$d.body" | grep -vcE 'frank-trauernicht\.de|github\.com|linkedin\.com|xing\.com')"
  [ "$n" = "0" ] && melde_ok "$pfad ohne fremde Hosts" || melde_fehl "$pfad" "$n fremde Verweise"
  n="$(grep -oE '<script[^>]*>' "$d.body" | grep -vc 'application/ld+json')"
  [ "$n" = "0" ] && melde_ok "$pfad ohne ausfuehrbares Skript" || melde_fehl "$pfad" "$n Skript-Tags"
  grep -q 'application/ld+json' "$d.body" && melde_ok "$pfad traegt JSON-LD" || melde_fehl "$pfad" "kein JSON-LD"
  grep -q 'hreflang="x-default"' "$d.body" && melde_ok "$pfad traegt hreflang" || melde_fehl "$pfad" "kein hreflang"
done
d="$(hole /)"
grep -q "rel=\"canonical\" href=\"$BASIS/\"" "$d.body" \
  && melde_ok "Canonical zeigt auf die bediente Domain" \
  || melde_fehl "Canonical" "$(grep -oE 'rel="canonical"[^>]*' "$d.body")"

echo
echo "== Versteck =="
d="$(hole /)"
grep -q '/humans.txt' "$d.body" && melde_ok "Quelltext nennt die humans.txt" || melde_fehl "Kette Stufe 1" "Hinweis fehlt"
grep -q '/cache/' "$d.body" && melde_fehl "Quelltext verraet /cache/" "die Kette ist damit auf null gekuerzt" || melde_ok "Quelltext verraet /cache/ nicht"
d="$(hole /humans.txt)"
grep -q '/cache/' "$d.body" && melde_ok "humans.txt fuehrt weiter" || melde_fehl "Kette Stufe 2" "Pfad fehlt"
for pfad in /cache/ /en/cache/; do
  d="$(hole "$pfad")"
  grep -q 'noindex, nofollow' "$d.body" && melde_ok "$pfad traegt noindex" || melde_fehl "$pfad" "kein noindex"
done
d="$(hole /sitemap-0.xml)"
grep -qi cache "$d.body" && melde_fehl "Sitemap nennt das Versteck" "" || melde_ok "Sitemap ohne Versteck"
d="$(hole /robots.txt)"
grep -qi cache "$d.body" && melde_fehl "robots.txt nennt das Versteck" "ein Disallow verraet den Pfad" || melde_ok "robots.txt ohne Versteck"

echo
echo "== security.txt =="
d="$(hole /.well-known/security.txt)"
ablauf="$(grep -i '^Expires:' "$d.body" | cut -d' ' -f2 | tr -d '\r')"
if [ -n "$ablauf" ]; then
  rest=$(( ( $(date -u -d "$ablauf" +%s) - $(date -u +%s) ) / 86400 ))
  if   [ "$rest" -lt 0 ];  then melde_fehl "security.txt ist abgelaufen" "seit $(( -rest )) Tagen — nach RFC 9116 damit ungueltig"
  elif [ "$rest" -lt 30 ]; then melde_fehl "security.txt laeuft bald ab" "noch $rest Tage — Seite neu bauen"
  else melde_ok "security.txt gueltig, noch $rest Tage"; fi
else
  melde_fehl "security.txt ohne Expires" ""
fi

echo
echo "== E-Mail-Transport =="
STS_URL="https://mta-sts.frank-trauernicht.de/.well-known/mta-sts.txt"

# RFC 8461: die Policy muss direkt ausgeliefert werden. Einem Redirect darf ein
# sendender Server ausdruecklich nicht folgen — ein 301 macht MTA-STS wirkungslos,
# und zwar lautlos.
code="$(curl -sS -o "$TMP/sts" -m 30 -D "$TMP/sts.head" -w '%{http_code}' "$STS_URL" 2>/dev/null)"
[ "$code" = "200" ]   && melde_ok "mta-sts.txt wird direkt ausgeliefert"   || melde_fehl "mta-sts.txt" "HTTP $code statt 200 (Weiterleitungen sind unzulaessig)"

grep -qi '^content-type: *text/plain' "$TMP/sts.head" 2>/dev/null   && melde_ok "mta-sts.txt als text/plain"   || melde_fehl "mta-sts.txt Content-Type" "$(grep -i '^content-type' "$TMP/sts.head" 2>/dev/null | tr -d '')"

grep -q '^version: STSv1' "$TMP/sts" 2>/dev/null   && melde_ok "Policy traegt version: STSv1"   || melde_fehl "Policy" "keine STSv1-Kennung"

modus="$(grep -i '^mode:' "$TMP/sts" 2>/dev/null | cut -d' ' -f2 | tr -d '')"
case "$modus" in
  enforce) melde_ok "Policy im Modus enforce" ;;
  testing) melde_ok "Policy im Modus testing (Stufe 1, siehe CLAUDE.md)" ;;
  *)       melde_fehl "Policy-Modus" "unerwartet: ${modus:-keiner}" ;;
esac

# Die haeufigste Fehlerquelle ueberhaupt: Policy geaendert, DNS vergessen. Dann
# holen sendende Server die neue Fassung nie ab — ihre alte ist ja noch gueltig.
soll="$(sha256sum "$TMP/sts" 2>/dev/null | cut -c1-16)"
ist="$(curl -sS -m 30 'https://dns.google/resolve?name=_mta-sts.frank-trauernicht.de&type=TXT' 2>/dev/null        | grep -oE 'id=[A-Za-z0-9]+' | head -1 | cut -d= -f2)"
if   [ -z "$ist" ];        then melde_fehl "_mta-sts im DNS" "kein TXT-Eintrag gefunden"
elif [ "$ist" = "$soll" ]; then melde_ok   "DNS-id passt zur ausgelieferten Policy"
else melde_fehl "DNS-id ist veraltet" "DNS: $ist, Datei: $soll — TXT-Eintrag nachziehen"; fi

curl -sS -m 30 'https://dns.google/resolve?name=_smtp._tls.frank-trauernicht.de&type=TXT' 2>/dev/null   | grep -q 'v=TLSRPTv1'   && melde_ok "TLS-RPT ist im DNS hinterlegt"   || melde_fehl "TLS-RPT" "kein _smtp._tls TXT-Eintrag"

echo
if [ "$fehler" -eq 0 ]; then
  printf '\033[32m%d Pruefungen, keine Beanstandung.\033[0m\n' "$geprueft"
else
  printf '\033[31m%d Pruefungen, %d Beanstandungen.\033[0m\n' "$geprueft" "$fehler"
fi
exit $(( fehler > 0 ? 1 : 0 ))
