import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { buildAllVariants, buildFontFaceCss, buildTailwindCss, OUTPUT_HTML_DIR } from './render';

/**
 * Fast path for local iteration: (re)builds the 4 static HTML variants
 * without launching Puppeteer. Open one in a browser and use Ctrl+P /
 * Print Preview — it reads the same @page rule real PDF generation does,
 * so pagination there matches cv:build's output.
 */
function main() {
  mkdirSync(OUTPUT_HTML_DIR, { recursive: true });

  const tailwindCss = buildTailwindCss();
  const fontFaceCss = buildFontFaceCss();

  for (const { name, html } of buildAllVariants(tailwindCss, fontFaceCss)) {
    const filePath = path.join(OUTPUT_HTML_DIR, `${name}.html`);
    writeFileSync(filePath, html, 'utf-8');
    console.log(filePath);
  }
}

main();
