// npm audit mit einer ausdruecklichen, begruendeten Ausnahmeliste.
// Bricht ab, sobald ein hoher oder kritischer Fund NICHT in der Liste steht.
import { spawnSync } from 'node:child_process';

// Jede Ausnahme braucht Grund und Datum. Entfaellt, sobald es ein Patch gibt:
// dann bricht der Lauf ab, weil `npm audit fix` den Fund beheben kann.
const AUSNAHMEN = {
  'GHSA-ch52-4w7c-c8xp': {
    paket: 'http-cache-semantics',
    seit: '2026-10-03',
    grund:
      'Kein Patch verfuegbar (betroffen bis einschliesslich 4.2.0). Kommt nur ueber astro zur Bauzeit; ' +
      'die Seite ruft keine fremden Adressen ab und hat keinen gemeinsamen HTTP-Cache.',
  },
};

const lauf = spawnSync('npm audit --json', { encoding: 'utf8', shell: true, maxBuffer: 64 * 1024 * 1024 });
const bericht = JSON.parse(lauf.stdout);

const funde = new Map();
for (const v of Object.values(bericht.vulnerabilities ?? {})) {
  for (const via of v.via) {
    if (typeof via !== 'object' || !via.url) continue;
    const ghsa = via.url.split('/').pop();
    funde.set(ghsa, { paket: v.name, schwere: via.severity, titel: via.title, patch: v.fixAvailable });
  }
}

let offen = 0;
for (const [ghsa, f] of funde) {
  if (!['high', 'critical'].includes(f.schwere)) continue;
  const ausnahme = AUSNAHMEN[ghsa];
  if (ausnahme) {
    console.log(`Ausnahme ${ghsa} (${f.paket}, seit ${ausnahme.seit}): ${ausnahme.grund}`);
  } else {
    offen++;
    console.error(`OFFEN ${f.schwere} ${ghsa} in ${f.paket}: ${f.titel}`);
  }
}
for (const ghsa of Object.keys(AUSNAHMEN)) {
  if (!funde.has(ghsa)) console.log(`Ausnahme ${ghsa} wird nicht mehr gemeldet. Aus scripts/audit.mjs entfernen.`);
}
if (offen > 0) {
  console.error(`${offen} hohe oder kritische Funde ohne Ausnahme.`);
  process.exit(1);
}
console.log('npm audit: keine offenen hohen Funde.');
