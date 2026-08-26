// Inhalte des Verstecks. Bewusst getrennt vom Profil-Inhaltsmodell: die Seite
// hat eine eigene Struktur und soll das Content-Interface nicht aufblaehen.

export interface CacheContent {
  lang: 'de' | 'en';
  metaTitle: string;
  metaDescription: string;
  code: string;
  h1: string;
  introBefore: string;
  humansLabel: string;
  introAfter: string;
  listing: [string, string][];
  aside: string;
  attributes: string[];
  hintSummary: string;
  rotSummary: string;
  hintPlain: string;
  logHeading: string;
  logIntro: string;
  logButton: string;
  logSubject: string;
  logBody: string;
  realHeading: string;
  realText: string;
  otherLang: 'de' | 'en';
  otherNote: string;
  backHome: string;
  backHref: string;
}

export const cacheDe: CacheContent = {
  lang: 'de',
  metaTitle: 'FT-01 — Gefunden',
  metaDescription: 'Gefunden.',
  code: 'FT-01 · Virtueller Cache',
  h1: 'Gefunden.',
  introBefore: 'Erst der Quelltext, dann die ',
  humansLabel: 'humans.txt',
  introAfter:
    ', dann hierher. Das ist mehr Neugier, als eine Visitenkarte verdient hat — und genau die Sorte, wegen der ich diesen Beruf mag.',
  listing: [
    ['Koordinaten', 'N 00° 00.000′  E 000° 00.000′'],
    ['Größe', 'Micro'],
    ['Difficulty', '2,5 — zwei Stationen, keine davon verlinkt'],
    ['Terrain', '1,0 — du hast den Stuhl nicht verlassen'],
    ['Gelegt', 'August 2026'],
  ],
  aside:
    'Null Island, der Punkt bei null Grad Nord und null Grad Ost. Dort landet alles, was in der Geodatenverarbeitung schiefgeht — und ein Cache, der keinen Ort hat, ist dort so richtig aufgehoben wie nirgends sonst.',
  attributes: [
    'kein JavaScript',
    'keine Cookies',
    'ganzjährig',
    'nachts zugänglich',
    'keine Taschenlampe nötig',
  ],
  hintSummary: 'Hinweis anzeigen',
  rotSummary: 'Ich kann kein ROT13',
  hintPlain: 'Das Schwere am Cache ist nicht das Finden. Es ist das Invalidieren.',
  logHeading: 'Logbuch',
  logIntro:
    'Kein Server, keine Datenbank, kein Formular — es gibt hier buchstäblich nichts, wo ein Eintrag hinkönnte. Das Logbuch ist also mein Postfach, und das ist mir ohnehin lieber.',
  logButton: 'Ins Logbuch eintragen',
  logSubject: 'Logbuch FT-01',
  logBody: 'Gefunden. \n\nWeg hierher: \nAnmerkung: \n\nGruß\n',
  realHeading: 'Und der echte',
  realText:
    'Den gibt es auch, aus richtigem Plastik: ein PETLing an einer Bank. Wo er liegt, sage ich dir, wenn du dich einträgst — das ist der Teil, den ich lieber persönlich verrate als öffentlich.',
  otherLang: 'en',
  otherNote:
    'This page exists in English too, and the hint there is rotated the same way. Nothing here is logged or measured, so if you want the find on the record, the logbook is an email.',
  backHome: 'Zurück zur Startseite',
  backHref: '/',
};

export const cacheEn: CacheContent = {
  lang: 'en',
  metaTitle: 'FT-01 — Found it',
  metaDescription: 'Found it.',
  code: 'FT-01 · Virtual cache',
  h1: 'Found it.',
  introBefore: 'The source first, then the ',
  humansLabel: 'humans.txt',
  introAfter:
    ', then here. That is more curiosity than a business card deserves — and exactly the kind that made me pick this trade.',
  listing: [
    ['Coordinates', 'N 00° 00.000′  E 000° 00.000′'],
    ['Size', 'Micro'],
    ['Difficulty', '2.5 — two stations, neither of them linked'],
    ['Terrain', '1.0 — you never left your chair'],
    ['Placed', 'August 2026'],
  ],
  aside:
    'Null Island, the point at zero degrees north and zero degrees east. It is where everything that goes wrong in geospatial data ends up — and a cache with no location is more at home there than anywhere else.',
  attributes: [
    'no JavaScript',
    'no cookies',
    'available all year',
    'accessible at night',
    'no torch required',
  ],
  hintSummary: 'Show the hint',
  rotSummary: 'I do not speak ROT13',
  hintPlain: 'The hard part of a cache is never finding it. It is invalidating it.',
  logHeading: 'Logbook',
  logIntro:
    'No server, no database, no form — there is literally nowhere here for an entry to go. So the logbook is my inbox, which I prefer anyway.',
  logButton: 'Sign the logbook',
  logSubject: 'Logbook FT-01',
  logBody: 'Found it. \n\nHow I got here: \nNote: \n\nBest\n',
  realHeading: 'And the real one',
  realText:
    'That exists too, in actual plastic: a PETling under a bench. Where it is I will tell you once you sign — that part I would rather hand over in person than publish.',
  otherLang: 'de',
  otherNote:
    'Diese Seite gibt es auch auf Deutsch, und der Hinweis dort ist genauso gedreht. Hier wird nichts protokolliert und nichts gemessen — wer den Fund festhalten will, schreibt also eine Mail.',
  backHome: 'Back to the homepage',
  backHref: '/en/',
};
