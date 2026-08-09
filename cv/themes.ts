// Sourced from lib/theme.ts's `initialPalette` — the app's neutral gray scale,
// not the runtime-randomized --palette-* hue. The CV is a static, printable
// document: it must render the same regardless of which random accent color
// a portfolio visitor happens to be looking at, so it pins to that neutral
// baseline instead of the live CSS variable pipeline.

export type CvThemeName = 'light' | 'dark';

export type CvTheme = {
  text: string;
  muted: string;
  background: string;
  /** Bottom-edge gradient stop, mirrors the original --cccccc accent. */
  gradientAccent: string;
};

export function variantName(locale: string, themeName: CvThemeName): string {
  return `felipe-saracho-cv-${locale}${themeName === 'dark' ? '-dark' : ''}`;
}

export const cvThemes: Record<CvThemeName, CvTheme> = {
  light: {
    text: '#171717', // palette-900
    muted: '#737373', // palette-500
    background: '#ffffff', // matches --background light (0 0% 100%)
    gradientAccent: '#d4d4d4', // palette-300
  },
  dark: {
    text: '#f5f5f5', // palette-100
    muted: '#a3a3a3', // palette-400
    background: '#222222', // matches --background dark (0 0% 7%)
    gradientAccent: '#111111', // palette-950
  },
};
