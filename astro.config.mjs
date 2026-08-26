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
  ],
  devToolbar: { enabled: false },
});
