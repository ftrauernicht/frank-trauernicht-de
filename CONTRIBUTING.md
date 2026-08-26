# Mitarbeit

Privates Repository. Änderungen laufen über `main`, mit Conventional Commits:

```
feat: add English translation of the privacy notice
fix: correct hreflang on the legal pages
docs: document the DNS cutover
ci: pin actions to commit SHAs
```

Vor jedem Push mindestens `npm run check` und `npm run build`. Die CI bricht ab,
sobald im Auslieferungsstand ein fremder Host oder ein ausführbares Skript auftaucht.
