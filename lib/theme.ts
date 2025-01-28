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

// Function to generate a dynamic lightness scale based on base lightness
function getDynamicLightnessScale(
  baseLightness: number,
): Record<PaletteShade, number> {
  if (baseLightness < 20) {
    // Very dark base color
    return {
      50: 95,
      100: 90,
      200: 80,
      300: 70,
      400: 60,
      500: 50,
      600: 40,
      700: 30,
      800: 20,
      900: 10,
      950: 5,
    };
  }
  if (baseLightness > 80) {
    // Very light base color
    return {
      50: 99,
      100: 95,
      200: 90,
      300: 80,
      400: 70,
      500: 60,
      600: 50,
      700: 40,
      800: 30,
      900: 20,
      950: 10,
    };
  }

  // Mid-range base color
  return {
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
}

function generatePalette(hexColor: string): Palette {
  // Get base HSL values
  const [baseHue, baseSaturation, baseLightness] = hexToHsl(hexColor);

  // Define dynamic lightness scale based on base lightness
  const lightnessScale = getDynamicLightnessScale(baseLightness);

  // Define saturation adjustments
  const getSaturation = (lightness: number): number => {
    if (lightness > 90) return baseSaturation * 0.8; // Very light colors have slightly reduced saturation
    if (lightness > 70) return baseSaturation * 0.9; // Light colors have slightly reduced saturation
    if (lightness < 30) return baseSaturation * 1.1; // Dark colors have slightly increased saturation
    return baseSaturation; // Default saturation for mid-range colors
  };

  // Generate the color scale
  const palette = initialPalette;

  Object.entries(lightnessScale).forEach(([step, lightness]) => {
    const parsedStep = String(step) as PaletteShade;

    // Adjust saturation and keep hue constant
    const saturation = getSaturation(lightness);
    const hue = baseHue; // Keep hue constant

    const hslValues = `${hue} ${saturation}% ${lightness}%`;

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
