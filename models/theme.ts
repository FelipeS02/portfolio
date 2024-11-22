import { Photo } from './photos';

export type PaletteShade =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | '950';

export type Palette = Record<PaletteShade, string>;

export interface Theme {
  hexCode: string;
  palette: Palette;
  photo: Photo;
}
