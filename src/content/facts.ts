// Angaben, die sich mit der Zeit aendern, werden hier zur Bauzeit errechnet —
// nicht im Browser. Astro laeuft beim Bauen in Node, das Ergebnis landet als
// fertiges HTML in der Auslieferung.
//
// Damit das etwas nuetzt, muss regelmaessig gebaut werden. Dafuer sorgt
// .github/workflows/refresh.yml einmal im Monat.

/** Erstes Jahr mit C# und .NET. Feststehend, wird nie angepasst. */
export const START_DOTNET = 2011;

export const jahreDotnet = new Date().getUTCFullYear() - START_DOTNET;

const ZAHLWORT_DE: Record<number, string> = {
  13: 'dreizehn', 14: 'vierzehn', 15: 'fünfzehn', 16: 'sechzehn', 17: 'siebzehn',
  18: 'achtzehn', 19: 'neunzehn', 20: 'zwanzig', 21: 'einundzwanzig',
  22: 'zweiundzwanzig', 23: 'dreiundzwanzig', 24: 'vierundzwanzig',
  25: 'fünfundzwanzig', 26: 'sechsundzwanzig', 27: 'siebenundzwanzig',
  28: 'achtundzwanzig', 29: 'neunundzwanzig', 30: 'dreißig',
};

const ZAHLWORT_EN: Record<number, string> = {
  13: 'thirteen', 14: 'fourteen', 15: 'fifteen', 16: 'sixteen', 17: 'seventeen',
  18: 'eighteen', 19: 'nineteen', 20: 'twenty', 21: 'twenty-one',
  22: 'twenty-two', 23: 'twenty-three', 24: 'twenty-four', 25: 'twenty-five',
  26: 'twenty-six', 27: 'twenty-seven', 28: 'twenty-eight', 29: 'twenty-nine',
  30: 'thirty',
};

/** Faellt die Zahl aus der Tabelle, stehen dort Ziffern. Falsch wird es nie. */
export const jahreDe = ZAHLWORT_DE[jahreDotnet] ?? String(jahreDotnet);
export const jahreEn = ZAHLWORT_EN[jahreDotnet] ?? String(jahreDotnet);
export const jahreEnGross = jahreEn.charAt(0).toUpperCase() + jahreEn.slice(1);
