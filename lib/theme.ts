import tinycolor from 'tinycolor2';

import { Palette, PaletteShade, Theme } from '@/models/theme';

export function hexIsValid(hexCode: string) {
  const regexHex = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;
  return regexHex.test(hexCode);
}

export function getRandomHex(): string {
  const letters = '0123456789ABCDEF';

  let hexCode = '';

  for (let i = 0; i < 6; i++) {
    hexCode += letters[Math.floor(Math.random() * 16)];
  }

  return hexCode;
}

export const initialPalette: Palette = {
  hsl: {
    '50': '240 9% 98%',
    '100': '240 7% 96%',
    '200': '240 9% 89%',
    '300': '240 10% 83%',
    '400': '240 9% 66%',
    '500': '240 8% 47%',
    '600': '240 8% 35%',
    '700': '240 7% 28%',
    '800': '240 7% 16%',
    '900': '240 6% 11%',
    '950': '240 5% 5%',
  },
  hex: {
    '50': '#fafafa',
    '100': '#f5f5f5',
    '200': '#e5e5e5',
    '300': '#d4d4d4',
    '400': '#a3a3a3',
    '500': '#737373',
    '600': '#525252',
    '700': '#404040',
    '800': '#262626',
    '900': '#171717',
    '950': '#0a0a0a',
  },
};

// Helper function to convert HEX to HSL (using the `tinycolor2` library or equivalent)
function hexToHsl(hex: string): [number, number, number] {
  const color = tinycolor(hex);
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
  const palette = initialPalette;

  Object.entries(lightnessScale).forEach(([step, lightness]) => {
    const saturation = getSaturation(lightness);

    const hslValues = `${baseHue} ${saturation}% ${lightness}%`;

    const parsedStep = String(step) as PaletteShade;

    palette.hex[parsedStep] = `#${tinycolor(`hsl(${hslValues})`).toHex()}`;
    palette.hsl[parsedStep] = hslValues;
  });

  return palette;
}

export async function getNewThemeByHex(hexCode: string): Promise<Theme> {
  if (!hexIsValid) throw new Error('Invalid Hex Code');

  const palette = generatePalette(hexCode);

  return {
    palette,
    hexCode,
  };
}
