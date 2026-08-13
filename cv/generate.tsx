import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import puppeteer, { Browser } from 'puppeteer';

import {
  buildAllVariants,
  buildFontFaceCss,
  buildTailwindCss,
  OUTPUT_HTML_DIR,
  ROOT,
} from './render';

const OUTPUT_PDF_DIR = path.join(ROOT, 'public', 'cv');

// Skia stamps the wall clock into /CreationDate and /ModDate, and that is the
// only thing that differs between two builds of identical content — six bytes,
// enough to make every rebuild look like a change worth committing. Pinning
// them makes the build reproducible: same CV in, same bytes out.
//
// The replacement is deliberately the same width as what it replaces. A PDF's
// xref table addresses objects by absolute byte offset, so growing or shrinking
// anything ahead of it corrupts the file.
const FIXED_PDF_DATE = "D:20240101000000+00'00'";
const PDF_DATE_PATTERN = /\/(CreationDate|ModDate) \(D:\d{14}\+00'00'\)/g;

function withFixedDates(pdf: Uint8Array): Buffer {
  // latin1 is the only encoding that round-trips arbitrary bytes through a
  // JS string unchanged, which is what editing a binary format needs
  const raw = Buffer.from(pdf).toString('latin1');
  const normalized = raw.replace(
    PDF_DATE_PATTERN,
    (_match, field: string) => `/${field} (${FIXED_PDF_DATE})`,
  );

  const out = Buffer.from(normalized, 'latin1');

  if (out.length !== pdf.length)
    throw new Error(
      `PDF date normalization changed the file size (${pdf.length} -> ${out.length}); xref offsets would be invalid`,
    );

  return out;
}

// A4 print geometry, mirrors the @page rule in styles.css — used only to
// estimate page count / last-page fill for the build log, not for layout.
const PX_PER_MM = 96 / 25.4;
const PAGE_WIDTH_MM = 210;
const PAGE_HEIGHT_MM = 297;
const PAGE_MARGIN_TOP_MM = 18;
const PAGE_MARGIN_SIDE_MM = 16;
const PAGE_MARGIN_BOTTOM_MM = 16;

async function measurePageFill(browser: Browser, html: string) {
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluateHandle('document.fonts.ready');

  const contentWidthPx = Math.round((PAGE_WIDTH_MM - PAGE_MARGIN_SIDE_MM * 2) * PX_PER_MM);
  await page.setViewport({ width: contentWidthPx, height: 1200 });
  const contentHeightPx = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.close();

  const usablePageHeightPx =
    (PAGE_HEIGHT_MM - PAGE_MARGIN_TOP_MM - PAGE_MARGIN_BOTTOM_MM) * PX_PER_MM;
  const totalPages = Math.max(1, Math.ceil(contentHeightPx / usablePageHeightPx));
  const lastPageFillRatio =
    (contentHeightPx - (totalPages - 1) * usablePageHeightPx) / usablePageHeightPx;

  return { totalPages, lastPageFillRatio };
}

async function main() {
  mkdirSync(OUTPUT_HTML_DIR, { recursive: true });
  mkdirSync(OUTPUT_PDF_DIR, { recursive: true });

  const tailwindCss = buildTailwindCss();
  const fontFaceCss = buildFontFaceCss();

  const browser = await puppeteer.launch({ headless: true });

  try {
    for (const { name, html } of buildAllVariants(tailwindCss, fontFaceCss)) {
      writeFileSync(path.join(OUTPUT_HTML_DIR, `${name}.html`), html, 'utf-8');

      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'load' });
      await page.evaluateHandle('document.fonts.ready');
      const pdf = await page.pdf({
        printBackground: true,
        preferCSSPageSize: true,
      });
      writeFileSync(
        path.join(OUTPUT_PDF_DIR, `${name}.pdf`),
        withFixedDates(pdf),
      );
      await page.close();

      const { totalPages, lastPageFillRatio } = await measurePageFill(browser, html);
      console.log(
        `${name}.pdf — ~${totalPages} página(s), última al ${Math.round(lastPageFillRatio * 100)}%`,
      );
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
