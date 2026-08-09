import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

import { renderToStaticMarkup } from 'react-dom/server';

import { CvDocument } from './components/cv-document';
import en from './content/en';
import es from './content/es';
import { CvContent } from './content/types';
import { cvThemes, CvThemeName } from './themes';

export const ROOT = path.resolve(__dirname, '..');
export const OUTPUT_HTML_DIR = path.join(__dirname, '.output');
export const TAILWIND_CSS_PATH = path.join(OUTPUT_HTML_DIR, 'tailwind.css');

export const CONTENT_BY_LOCALE: Record<string, CvContent> = { es, en };

// Only the weights the components actually use (book=500, bold=700) — the
// site's "thin"/"medium" .otf files aren't referenced anywhere in cv/components.
const NEUE_MONTREAL_FACES = [
  { file: 'ppneuemontreal-book.otf', weight: 500 },
  { file: 'ppneuemontreal-bold.otf', weight: 700 },
];

export function buildFontFaceCss(): string {
  return NEUE_MONTREAL_FACES.map(({ file, weight }) => {
    const buffer = readFileSync(path.join(ROOT, 'app', 'fonts', file));
    const base64 = buffer.toString('base64');

    return `@font-face {
      font-family: 'PP Neue Montreal CV';
      src: url(data:font/otf;base64,${base64}) format('opentype');
      font-weight: ${weight};
      font-style: normal;
      font-display: block;
    }`;
  }).join('\n');
}

/** Compiles cv/styles.css + cv/**\/*.tsx into a single CSS file and returns its contents. */
export function buildTailwindCss(): string {
  mkdirSync(OUTPUT_HTML_DIR, { recursive: true });

  execSync(
    `npx @tailwindcss/cli -i cv/styles.css -o "${TAILWIND_CSS_PATH}" --content "cv/**/*.tsx" --minify`,
    { cwd: ROOT, stdio: 'inherit' },
  );

  return readFileSync(TAILWIND_CSS_PATH, 'utf-8');
}

export function buildHtml(
  content: CvContent,
  themeName: CvThemeName,
  tailwindCss: string,
  fontFaceCss: string,
): string {
  const theme = cvThemes[themeName];
  const markup = renderToStaticMarkup(<CvDocument content={content} />);

  const bodyStyle = [
    `--cv-text:${theme.text}`,
    `--cv-muted:${theme.muted}`,
    `background-color:${theme.background}`,
    `background-image:linear-gradient(to top, ${theme.background} 0%, ${theme.background} 95%, ${theme.gradientAccent} 100%)`,
    'background-repeat:no-repeat',
  ].join(';');

  return `<!doctype html>
<html lang="${content.locale}">
  <head>
    <meta charset="UTF-8" />
    <title>${content.name} — CV</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600;1,700&display=swap"
      rel="stylesheet"
    />
    <style>${fontFaceCss}</style>
    <style>${tailwindCss}</style>
  </head>
  <body class="font-archivo m-0 text-[15px] leading-[1.4] text-(--cv-text)" style="${bodyStyle}">
    ${markup}
  </body>
</html>`;
}

export function variantName(locale: string, themeName: CvThemeName): string {
  return `felipe-saracho-cv-${locale}${themeName === 'dark' ? '-dark' : ''}`;
}

export function* buildAllVariants(tailwindCss: string, fontFaceCss: string) {
  for (const [locale, content] of Object.entries(CONTENT_BY_LOCALE)) {
    for (const themeName of Object.keys(cvThemes) as CvThemeName[]) {
      yield {
        name: variantName(locale, themeName),
        html: buildHtml(content, themeName, tailwindCss, fontFaceCss),
      };
    }
  }
}
