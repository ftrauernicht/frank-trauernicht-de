# frank-trauernicht.de

Persönliche Profilseite. Statisch, zweisprachig, ohne Cookies, ohne Analyse und
ohne eine einzige Anfrage an einen fremden Server.

## Stand

| | |
|---|---|
| Technik | Astro 7, statisches Output, kein clientseitiges JavaScript |
| Sprachen | Deutsch unter `/`, Englisch unter `/en/` |
| Hosting | Vercel, Domain `frank-trauernicht.de` |
| Rückfallebene | Cloudflare Pages aus demselben Repository, siehe `docs/RUNBOOK.md` |
| Schriften | Source Serif 4 und IBM Plex Sans, selbst ausgeliefert |

## Entwickeln

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # nach dist/
npm run preview
```

## Was hier nicht hineingehört

Diese Seite ist eine **private Selbstdarstellung**. Sie bietet nichts an, wirbt für
nichts und verfolgt keinen wirtschaftlichen Zweck. Daran hängt die Rechtskonstruktion
des Impressums — siehe `CLAUDE.md`.

Und sie lädt **nichts von fremden Servern**. Keine Schriften von einem CDN, keine
Analyse, keine Einbettungen. Daran hängt die Cookie-Freiheit. Beides prüft die CI.
