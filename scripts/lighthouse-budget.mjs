// Vergleicht einen Lighthouse-Bericht mit den Untergrenzen aus
// lighthouse-budget.json. Bewusst ohne fremde Action: eine Abhaengigkeit
// weniger in der Lieferkette, und der Vergleich sind zwanzig Zeilen.

import { readFileSync } from 'node:fs';

const bericht = JSON.parse(readFileSync(process.argv[2] ?? 'lighthouse.json', 'utf-8'));
const grenzen = JSON.parse(readFileSync('lighthouse-budget.json', 'utf-8'));

let verletzt = 0;
console.log(`Lighthouse ${bericht.lighthouseVersion} · ${bericht.finalDisplayedUrl}\n`);

for (const [schluessel, kategorie] of Object.entries(bericht.categories)) {
  const wert = Math.round((kategorie.score ?? 0) * 100);
  const grenze = grenzen[schluessel];
  if (typeof grenze !== 'number') continue;
  const ok = wert >= grenze;
  if (!ok) verletzt++;
  console.log(`  ${ok ? 'ok  ' : 'FEHL'}  ${kategorie.title.padEnd(16)} ${String(wert).padStart(3)}  (mindestens ${grenze})`);
}

const messwerte = ['largest-contentful-paint', 'cumulative-layout-shift', 'total-blocking-time', 'speed-index'];
console.log('');
for (const k of messwerte) {
  const a = bericht.audits?.[k];
  if (a) console.log(`  ${a.title.padEnd(28)} ${a.displayValue ?? '-'}`);
}

if (verletzt > 0) {
  console.error(`\n${verletzt} Kategorie(n) unter der Grenze.`);
  process.exit(1);
}
console.log('\nAlle Kategorien im Rahmen.');
