// The CV variant naming shared by the build (cv/generate.ts) and the download
// button (components/sections/header/shortcuts.tsx). Both sides have to agree
// on these filenames or the download 404s, so they derive them from here.
//
// The colours themselves live in cv/theme.typ — Typst owns rendering now, and
// duplicating the palette in TypeScript would only create a second source of
// truth that nothing validates.

export type CvThemeName = 'light' | 'dark';

export function variantName(locale: string, themeName: CvThemeName): string {
  return `felipe-saracho-cv-${locale}${themeName === 'dark' ? '-dark' : ''}`;
}
