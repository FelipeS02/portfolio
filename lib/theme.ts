import { Palette, PaletteShade, Theme } from '@/models/theme';
import { getPhotosFromPexels } from './pexels';
import { Photo } from '@/models/photos';
import tinycolor from 'tinycolor2';

const MOBILE_MQ = '(max-width: 768px)';

export function hexIsValid(hexCode: string) {
  const regexHex = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;
  return regexHex.test(hexCode);
}

export function getRandomHex(): string {
  const letters = '0123456789ABCDEF';

  // Not using "#" for correct pexels api call
  let hexCode = '';

  for (let i = 0; i < 6; i++) {
    hexCode += letters[Math.floor(Math.random() * 16)];
  }

  return hexCode;
}

export const initialPalette: Palette = {
  '50': '',
  '100': '',
  '200': '',
  '300': '',
  '400': '',
  '500': '',
  '600': '',
  '700': '',
  '800': '',
  '900': '',
  '950': '',
};

export function getThemeImageByDevice(photo: Photo): string {
  if (!photo?.src) throw new Error('Photo src set is not defined');

  const isMobile = window.matchMedia(MOBILE_MQ).matches;

  const { large2x, medium } = photo.src;

  const srcByDevice = isMobile ? medium : large2x;

  return srcByDevice;
}

// Helper function to convert HEX to HSL (using the `tinycolor2` library or equivalent)
function hexToHsl(hex: string): [number, number, number] {
  // Convert HEX to HSL using your preferred method or library
  const color = tinycolor(hex); // Assuming `tinycolor` is available
  const { h, s, l } = color.toHsl();
  return [h, s * 100, l * 100]; // HSL values as percentages
}

function generatePalette(hexColor: string): Palette {
  // Get base HSL values
  const [baseHue, baseSaturation] = hexToHsl(hexColor);

  // Define lightness values for each step (similar to uicolors.app)
  const lightnessScale = {
    50: 97,
    100: 94,
    200: 86,
    300: 77,
    400: 66,
    500: 55,
    600: 44,
    700: 33,
    800: 22,
    900: 11,
    950: 5,
  };

  // Define saturation adjustments (increases for darker colors)
  const getSaturation = (lightness: number): number => {
    const saturationIncrease = Math.max(0, (50 - lightness) * 0.8);
    return Math.min(100, baseSaturation + saturationIncrease);
  };

  // Generate the color scale
  const palette = {} as Palette;

  Object.entries(lightnessScale).forEach(([step, lightness]) => {
    const saturation = getSaturation(lightness);
    palette[
      String(step) as PaletteShade
    ] = `${baseHue} ${saturation}% ${lightness}%`;
  });

  return palette;
}

const keywords = [
  'marble texture',
  'silk fabric',
  'abstract',
  'metallic surface',
  'liquid metal',
  'smoke art',
  'black and white abstract',
  'concrete texture',
  'frosted glass',
  'minimalist patterns',
  'gradient light',
  'velvet fabric',
  'natural stone',
  'glitter texture',
  'neon abstract',
  'gold foil',
  'carbon fiber',
  'cracked paint',
  'light streaks',
  'geometric patterns',
  'nature',
  'clouds',
  'background',
  'wall',
];

export async function getNewThemeByHex(hexCode: string): Promise<Theme> {
  if (!hexIsValid) throw new Error('Invalid Hex Code');

  const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];

  const photos = await getPhotosFromPexels({
    orientation: 'landscape',
    color: hexCode,
    per_page: '40',
    query: randomKeyword,
  });

  if (!photos)
    throw new Error(`No results for ${randomKeyword} with code ${hexCode}`);

  const randomPhoto = photos[Math.floor(Math.random() * photos.length)];

  const palette = generatePalette(hexCode);

  return {
    palette,
    photo: randomPhoto,
    hexCode,
  };
}


