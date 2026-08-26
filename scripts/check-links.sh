#!/usr/bin/env bash
#
# Prueft die externen Verweise der ausgelieferten Seite. Ein toter Link auf einer
# Visitenkarte ist peinlich, und Repositorys werden umbenannt oder archiviert,
# ohne dass hier jemand etwas davon mitbekommt.
#
# Bewusst getrennt von der CI: LinkedIn und XING antworten Automaten regelmaessig
# mit 403 oder 999. Das ist keine Aussage ueber den Link, sondern ueber ihre
# Bot-Abwehr — solche Antworten gelten hier als "nicht pruefbar", nicht als Fehler.

set -uo pipefail

BASIS="${1:-https://frank-trauernicht.de}"
SEITEN="/ /en/ /cache/ /en/cache/ /impressum/ /datenschutz/ /en/imprint/ /en/privacy/"

echo "== Externe Verweise sammeln =="
urls="$(for pfad in $SEITEN; do
  curl -sS -m 30 "$BASIS$pfad" 2>/dev/null \
    | grep -oE 'href="https?://[^"]+"' \
    | sed 's/^href="//; s/"$//'
done | grep -v 'frank-trauernicht\.de' | sort -u)"

anzahl="$(printf '%s\n' "$urls" | grep -c . || true)"
echo "  $anzahl verschiedene Ziele"
echo

fehler=0
ungeprueft=0
for u in $urls; do
  code="$(curl -sS -o /dev/null -m 30 -L -A 'Mozilla/5.0 (compatible; frank-trauernicht.de link check)' \
          -w '%{http_code}' "$u" 2>/dev/null)"
  case "$code" in
    2*|3*)
      printf '  \033[32mok\033[0m   %s  %s\n' "$code" "$u" ;;
    403|405|429|999)
      ungeprueft=$((ungeprueft+1))
      printf '  \033[33m--\033[0m   %s  %s  (Bot-Abwehr, nicht pruefbar)\n' "$code" "$u" ;;
    *)
      fehler=$((fehler+1))
      printf '  \033[31mFEHL\033[0m %s  %s\n' "$code" "$u" ;;
  esac
done

echo
if [ "$fehler" -eq 0 ]; then
  printf '\033[32mAlle pruefbaren Ziele erreichbar\033[0m'
  [ "$ungeprueft" -gt 0 ] && printf ', %d nicht pruefbar' "$ungeprueft"
  printf '.\n'
else
  printf '\033[31m%d tote Verweise.\033[0m\n' "$fehler"
fi
exit $(( fehler > 0 ? 1 : 0 ))
