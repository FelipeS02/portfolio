import { Palette, PaletteShade, Theme } from '@/models/theme';
import { getPhotosFromPexels } from './pexels';
import { Photo } from '@/models/photos';
import tinycolor from 'tinycolor2';

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
  background: '',
  shades: {
    '100': '',
    '200': '',
    '300': '',
    '400': '',
    '500': '',
    '600': '',
    '700': '',
    '800': '',
    '900': '',
  },
};

// Helper function to convert HEX to HSL (using the `tinycolor2` library or equivalent)
function hexToHsl(hex: string): [number, number, number] {
  // Convert HEX to HSL using your preferred method or library
  const color = tinycolor(hex); // Assuming `tinycolor` is available
  const { h, s, l } = color.toHsl();
  return [h, s * 100, l * 100]; // HSL values as percentages
}

/**
 * Adjusts the luminosity to ensure minimum contrast ratio with a base luminosity.
 */
function adjustLuminosityForContrast(
  targetLuminosity: number,
  baseLuminosity: number,
  contrastThreshold: number,
  isDarkMode: boolean
): number {
  while (
    calculateContrast(targetLuminosity / 100, baseLuminosity / 100) <
    contrastThreshold
  ) {
    targetLuminosity += isDarkMode ? -1 : 1;
    if (targetLuminosity < 0 || targetLuminosity > 100) break;
  }
  return Math.max(10, Math.min(90, targetLuminosity)); // Clamp between 10% and 90%
}

/**
 * Generates a palette of shades based on the base HSL values and target luminosity.
 */
function generateShades(
  h: number,
  s: number,
  l: number,
  targetLuminosity: number,
  isDarkMode: boolean,
  isBaseDark: boolean,
  isBaseLight: boolean,
  contrastThreshold: number
): Palette['shades'] {
  const shades = {} as Palette['shades'];

  for (let intensity = 100; intensity <= 900; intensity += 100) {
    let adjustedL = l;
    let adjustedS = s;

    if (isDarkMode) {
      adjustedL = l + ((intensity - 100) / 800) * (isBaseDark ? 20 : 40);
      adjustedS = s * (1 + (intensity - 500) / 1000);
    } else {
      adjustedL = l - ((intensity - 100) / 800) * (isBaseLight ? 20 : 40);
      adjustedS = s * (1 - (intensity - 500) / 1000);
    }

    adjustedL = Math.max(0, Math.min(100, adjustedL)); // Clamp luminosity
    adjustedS = Math.max(0, Math.min(100, adjustedS)); // Clamp saturation

    adjustedL = ensureContrast(
      adjustedL,
      targetLuminosity,
      contrastThreshold,
      isDarkMode
    );

    shades[String(intensity) as PaletteShade] = `${h} ${Math.round(
      adjustedS
    )}% ${Math.round(adjustedL)}%`;
  }

  return shades;
}

/**
 * Ensures that the adjusted luminosity meets the contrast threshold.
 */
function ensureContrast(
  adjustedL: number,
  targetLuminosity: number,
  contrastThreshold: number,
  isDarkMode: boolean
): number {
  while (
    calculateContrast(adjustedL / 100, targetLuminosity / 100) <
    contrastThreshold
  ) {
    adjustedL += isDarkMode ? 1 : -1;
    if (adjustedL < 0 || adjustedL > 100) break;
  }
  return adjustedL;
}

/**
 * Calculates the contrast ratio between two luminance values.
 * @param {number} lum1 - The luminance of the first color.
 * @param {number} lum2 - The luminance of the second color.
 * @returns {number} The contrast ratio.
 */
function calculateContrast(lum1: number, lum2: number): number {
  const L1 = Math.max(lum1, lum2);
  const L2 = Math.min(lum1, lum2);
  return (L1 + 0.05) / (L2 + 0.05);
}

export function generatePaletteWithBackground(
  hexColor: string,
  mode: 'light' | 'dark',
  contrastThreshold: number = 4.5
): Palette {
  const baseColor = hexToHsl(hexColor);
  const [h, s, l] = baseColor;

  const isDarkMode = mode === 'dark';
  const isBaseDark = l < 30;
  const isBaseLight = l > 70;

  // Background luminosity target
  let targetLuminosity = isDarkMode
    ? isBaseDark
      ? 25
      : 85
    : isBaseLight
    ? 15
    : 75;

  // Adjust background to ensure contrast
  targetLuminosity = adjustLuminosityForContrast(
    targetLuminosity,
    l,
    contrastThreshold,
    isDarkMode
  );

  const shades = generateShades(
    h,
    s,
    l,
    targetLuminosity,
    isDarkMode,
    isBaseDark,
    isBaseLight,
    contrastThreshold
  );

  const background = `${h} ${Math.round(s)}% ${Math.round(targetLuminosity)}%`;

  return { shades, background };
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
    per_page: '10',
    query: randomKeyword,
  });

  if (!photos)
    throw new Error(`No results for ${randomKeyword} with code ${hexCode}`);

  const randomPhoto = photos[Math.floor(Math.random() * photos.length)];

  const lightPalette = generatePaletteWithBackground(
    randomPhoto.avg_color,
    'light'
  );

  const darkPalette = generatePaletteWithBackground(
    randomPhoto.avg_color,
    'dark'
  );

  return {
    lightPalette,
    darkPalette,
    photo: randomPhoto,
    hexCode,
  };
}

//@region DOM Mutation
const MOBILE_MQ = '(max-width: 768px)';

export function applyPaletteIntoCSS(palette: Palette): void {
  if (!palette) return;


  const root = document.documentElement;

  if (!root) return;

  // Load palette shades into css variables
  root.style.setProperty('--background', palette.background);

  Object.entries(palette.shades).forEach(([shade, color]) => {
    root.style.setProperty(`--palette-${shade}`, color);
  });
}

export function applyThemeImage(photo: Photo): void {
  if (!photo) return;
  const { large, medium, portrait } = photo.src;

  const root = document.documentElement;

  if (!root) return;

  const isMobile = window.matchMedia(MOBILE_MQ).matches;

  root.style.setProperty(
    '--theme-image',
    `url(${large})`
  );
}
//@endregion
