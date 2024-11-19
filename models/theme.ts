import { Photo } from './photos';

export type PaletteShade =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export type Palette = {
  shades: Record<PaletteShade, string>;
  background: string;
};

export interface Theme {
  hexCode: string;
  lightPalette: Palette;
  darkPalette: Palette;
  photo: Photo;
}
