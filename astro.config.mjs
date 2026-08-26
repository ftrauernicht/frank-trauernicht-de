// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export const SITE = 'https://frank-trauernicht.de';

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
    }),
  ],
  devToolbar: { enabled: false },
});
