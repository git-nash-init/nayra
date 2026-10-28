const NUMERALS: [number, string][] = [
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
];

/** Roman numerals for editorial indexes (1 to 39 is all the site needs). */
export function toRoman(n: number): string {
  let rest = n;
  let out = '';
  for (const [value, glyph] of NUMERALS) {
    while (rest >= value) {
      out += glyph;
      rest -= value;
    }
  }
  return out;
}
