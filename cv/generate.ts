import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

import { CvThemeName, variantName } from './themes';

const CV_DIR = __dirname;
const ROOT = path.resolve(CV_DIR, '..');
const FONT_DIR = path.join(CV_DIR, 'fonts');
const OUTPUT_PDF_DIR = path.join(ROOT, 'public', 'cv');
const PREVIEW_DIR = path.join(CV_DIR, '.output');

const SOURCE_BY_LOCALE: Record<string, string> = {
  es: 'cv-es.typ',
  en: 'cv.typ',
};

const THEMES: CvThemeName[] = ['light', 'dark'];

// Typst stamps the wall clock into /CreationDate and /ModDate, which is the
// only thing that would differ between two builds of identical content —
// enough to make every rebuild look like a change worth committing. Pinning it
// makes the build reproducible: same CV in, same bytes out. .githooks/pre-push
// leans on that to tell a real content change from a rebuild.
const FIXED_CREATION_TIMESTAMP = 1704067200; // 2024-01-01T00:00:00Z

function typstArgs(source: string, themeName: CvThemeName, output: string) {
  return [
    '--font-path',
    FONT_DIR,
    '--input',
    `theme=${themeName}`,
    '--creation-timestamp',
    String(FIXED_CREATION_TIMESTAMP),
    source,
    output,
  ];
}

/**
 * Page count straight off the PDF's page tree. Purely informational — a CV
 * that quietly grows to three pages is worth noticing in the build log — so a
 * PDF that does not match is reported as unknown rather than failing the build.
 */
function readPageCount(pdf: Buffer): number | null {
  // latin1 is the only encoding that round-trips arbitrary bytes through a JS
  // string unchanged, which is what scanning a binary format needs
  const match = /\/Type\s*\/Pages\b[^>]*?\/Count\s+(\d+)/.exec(
    pdf.toString('latin1'),
  );

  return match ? Number(match[1]) : null;
}

function build(): void {
  mkdirSync(OUTPUT_PDF_DIR, { recursive: true });

  for (const [locale, source] of Object.entries(SOURCE_BY_LOCALE))
    for (const themeName of THEMES) {
      const name = variantName(locale, themeName);
      const output = path.join(OUTPUT_PDF_DIR, `${name}.pdf`);

      execFileSync('typst', ['compile', ...typstArgs(source, themeName, output)], {
        cwd: CV_DIR,
        stdio: 'inherit',
      });

      const pages = readPageCount(readFileSync(output));
      console.log(`${name}.pdf — ${pages ?? '?'} página(s)`);
    }
}

/**
 * Recompiles one variant on every save. Typst refuses to create the output
 * directory itself, so this makes it first — otherwise a fresh clone, where
 * the gitignored .output/ does not exist yet, fails on the first write.
 */
function watch(locale: string, themeName: CvThemeName): void {
  const source = SOURCE_BY_LOCALE[locale];

  if (!source)
    throw new Error(
      `Unknown locale "${locale}" — expected one of ${Object.keys(SOURCE_BY_LOCALE).join(', ')}`,
    );

  mkdirSync(PREVIEW_DIR, { recursive: true });

  const output = path.join(PREVIEW_DIR, 'preview.pdf');
  console.log(`Watching ${source} (${themeName}) — ${output}`);

  execFileSync('typst', ['watch', ...typstArgs(source, themeName, output)], {
    cwd: CV_DIR,
    stdio: 'inherit',
  });
}

function main(): void {
  const argv = process.argv.slice(2);

  if (!argv.includes('--watch')) return build();

  const rest = argv.filter((arg) => arg !== '--watch');
  const locale = rest.find((arg) => arg in SOURCE_BY_LOCALE) ?? 'es';
  const themeName: CvThemeName = rest.includes('dark') ? 'dark' : 'light';

  watch(locale, themeName);
}

main();
