// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export const SITE = 'https://frank-trauernicht.de';

/** Welche Adresse in welcher Sprache derselben Seite entspricht. */
const PAARE = {
  '/': ['/', '/en/'],
  '/en/': ['/', '/en/'],
  '/impressum/': ['/impressum/', '/en/imprint/'],
  '/en/imprint/': ['/impressum/', '/en/imprint/'],
  '/datenschutz/': ['/datenschutz/', '/en/privacy/'],
  '/en/privacy/': ['/datenschutz/', '/en/privacy/'],
};


/**
 * Erzeugt /.well-known/security.txt beim Bauen. Als statische Datei im
 * oeffentlichen Verzeichnis lief das Ablaufdatum irgendwann ab, ohne dass es
 * jemandem auffiel — nach RFC 9116 ist die Datei dann ungueltig, nicht bloss alt.
 * Hier steht es immer auf Bauzeit plus ein Jahr.
 */
function securityTxt() {
  return {
    name: 'security-txt',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const { mkdir, writeFile } = await import('node:fs/promises');
        const ablauf = new Date();
        ablauf.setUTCFullYear(ablauf.getUTCFullYear() + 1);
        const inhalt = [
          `Contact: mailto:mail@frank-trauernicht.de`,
          `Expires: ${ablauf.toISOString().replace(/\.\d{3}Z$/, '.000Z')}`,
          `Preferred-Languages: de, en`,
          `Canonical: ${SITE}/.well-known/security.txt`,
          '',
        ].join('\n');
        const ziel = new URL('./.well-known/', dir);
        await mkdir(ziel, { recursive: true });
        await writeFile(new URL('./security.txt', ziel), inhalt, 'utf-8');
        logger.info(`security.txt erzeugt, gueltig bis ${ablauf.toISOString().slice(0, 10)}`);
      },
    },
  };
}

/**
 * Erzeugt die MTA-STS-Policy beim Bauen und meldet ihre Kennung.
 *
 * MTA-STS besteht aus zwei Haelften, die zusammenpassen muessen: dieser Datei
 * unter mta-sts.<domain>/.well-known/ und einem TXT-Eintrag `_mta-sts` im DNS.
 * Aendert sich die Policy, muss die `id` dort mitwandern — sonst holen
 * sendende Server die neue Fassung nie ab, sie haben ja eine gueltige.
 *
 * Die Kennung ist deshalb ein Hash des Inhalts und kein Zeitstempel: sie
 * ueberlebt den monatlichen Rebuild unveraendert und springt genau dann, wenn
 * sich die Policy wirklich aendert. Der Build schreibt sie ins Protokoll.
 */
function mtaSts() {
  const POLICY = [
    'version: STSv1',
    // Stufe 1 von 2. `testing` meldet Verstoesse ueber TLS-RPT, lehnt aber
    // nichts ab. Ein Fehler an dieser Stelle kostet sonst Post, und zwar
    // stillschweigend beim Absender. Auf `enforce` wird erst umgestellt, wenn
    // die Berichte ueber mehrere Wochen sauber sind — dann auch max_age hoch.
    'mode: testing',
    'mx: *.mail.protection.outlook.com',
    // Kurz gehalten, solange `testing` gilt: sonst haengt die Umstellung auf
    // `enforce` noch tagelang in fremden Caches fest.
    'max_age: 86400',
  ];

  return {
    name: 'mta-sts',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const { mkdir, writeFile } = await import('node:fs/promises');
        const { createHash } = await import('node:crypto');
        // RFC 8461 schreibt CRLF als Zeilentrenner vor, nicht LF.
        const inhalt = POLICY.join('\r\n') + '\r\n';
        const id = createHash('sha256').update(inhalt).digest('hex').slice(0, 16);
        const ziel = new URL('./.well-known/', dir);
        await mkdir(ziel, { recursive: true });
        await writeFile(new URL('./mta-sts.txt', ziel), inhalt, 'utf-8');
        logger.info(`mta-sts.txt erzeugt (mode: ${POLICY[1].split(': ')[1]})`);
        logger.info(`  DNS _mta-sts muss lauten:  v=STSv1; id=${id}`);
      },
    },
  };
}

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'always',
  compressHTML: true,
  build: {
    // Externe Stylesheets statt <style>-Inlining: nur so kommt die CSP
    // ohne 'unsafe-inline' in style-src aus.
    inlineStylesheets: 'never',
    format: 'directory',
  },
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'de', locales: { de: 'de-DE', en: 'en' } },
      // Das Versteck gehoert nicht in die Sitemap. Und ausdruecklich nicht in die
      // robots.txt: ein Disallow verraet den Pfad an jeden, der die Datei aufruft.
      filter: (page) => !page.includes('/cache/'),
      // Die eingebaute i18n-Paarung greift nur bei gleichen Pfaden. Impressum und
      // imprint, Datenschutz und privacy heissen aber verschieden — die Paare
      // muessen deshalb von Hand gesetzt werden.
      serialize(item) {
        const pfad = new URL(item.url).pathname;
        const paar = PAARE[pfad];
        if (paar) {
          item.links = [
            { lang: 'de-DE', url: SITE + paar[0] },
            { lang: 'en', url: SITE + paar[1] },
          ];
        }
        return item;
      },
    }),
    securityTxt(),
    mtaSts(),
  ],
  devToolbar: { enabled: false },
});
