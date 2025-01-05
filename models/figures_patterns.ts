import { PaletteShade } from './theme';

interface FiguresCSS extends GSAPTweenVars {
  paletteBackground?: PaletteShade;
}

export type FiguresPatterns = {
  container?: FiguresCSS;
  figure?: FiguresCSS;
};
