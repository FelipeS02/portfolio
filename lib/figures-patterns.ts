import { FiguresPatterns } from '@/models/figures-patterns';
import { PaletteShade } from '@/models/theme';

function getRandomIntensity(): PaletteShade {
  const min = 2; // Minimum multiple of 100 (200 / 100)
  const max = 8; // Maximum multiple of 100 (800 / 100)
  const randomMultiplier = Math.floor(Math.random() * (max - min + 1)) + min;
  return String(randomMultiplier * 100) as PaletteShade;
}

export const backupStyles = {
  opacity: 0,
};

const figuresPatterns: FiguresPatterns[][] = [
  [
    {
      container: {
        yPercent: -100,
        xPercent: -100,
      },
      figure: {
        paletteBackground: getRandomIntensity(),
        borderBottomLeftRadius: '100%',
      },
    },
    {
      container: {
        yPercent: -100,
      },
      figure: {
        paletteBackground: getRandomIntensity(),
        borderTopLeftRadius: '100%',
      },
    },
    {
      container: { xPercent: 100, yPercent: -100 },
      figure: {
        paletteBackground: getRandomIntensity(),
        borderRadius: '100%',
        height: '80%',
        width: '80%',
      },
    },
    {
      container: { xPercent: -100 },
      figure: {
        paletteBackground: getRandomIntensity(),
        borderBottomLeftRadius: '100%',
      },
    },
    {
      container: {
        xPercent: 100,
      },
      figure: {
        paletteBackground: getRandomIntensity(),
        borderTopRightRadius: '100%',
      },
    },
    {
      container: {
        yPercent: 100,
      },
      figure: {
        paletteBackground: getRandomIntensity(),
        borderTopRightRadius: '100%',
      },
    },
    {
      container: {
        xPercent: -100,
        yPercent: 100,
      },
      figure: {
        paletteBackground: getRandomIntensity(),
        borderRadius: '100%',
        height: '60%',
        width: '60%',
        xPercent: -20,
        yPercent: 20,
      },
    },
    {
      container: {
        xPercent: -100,
        yPercent: 100,
      },
      figure: {
        paletteBackground: getRandomIntensity(),
        borderRadius: '100%',
        height: '60%',
        width: '60%',
        xPercent: 20,
        yPercent: -20,
      },
    },
    {
      container: {
        yPercent: 100,
        xPercent: 100,
      },
      figure: {
        paletteBackground: getRandomIntensity(),
        borderTopRightRadius: '100%',
      },
    },
    {
      figure: {
        paletteBackground: getRandomIntensity(),
        borderTopRightRadius: '100%',
      },
    },
  ],
  [
    {
      container: {
        left: 0,
        yPercent: 200,
        overflow: 'hidden',
      },
      figure: {
        paletteBackground: '400',
        translateY: '50%',
        borderRadius: '100%',
      },
    },
    {
      container: {
        left: 0,
        yPercent: 100,
        overflow: 'hidden',
      },
      figure: {
        paletteBackground: '600',
        translateY: '50%',
        borderRadius: '100%',
      },
    },
    {
      container: {
        left: 0,
      },
      figure: {
        paletteBackground: '800',
        borderRadius: '100%',
      },
    },
    {
      container: {
        left: 0,
        yPercent: -100,
        overflow: 'hidden',
      },
      figure: {
        paletteBackground: '600',
        translateY: '-50%',
        borderRadius: '100%',
      },
    },
    {
      container: {
        left: 0,
        yPercent: -200,
        overflow: 'hidden',
      },
      figure: {
        paletteBackground: '400',
        translateY: '-50%',
        borderRadius: '100%',
      },
    },
    {
      container: {
        right: 0,
        yPercent: 200,
        overflow: 'hidden',
      },
      figure: {
        paletteBackground: '400',
        translateY: '50%',
        borderRadius: '100%',
      },
    },
    {
      container: {
        right: 0,
        yPercent: 100,
        overflow: 'hidden',
      },
      figure: {
        paletteBackground: '600',
        translateY: '50%',
        borderRadius: '100%',
      },
    },
    {
      container: {
        right: 0,
      },
      figure: {
        paletteBackground: '800',
        borderRadius: '100%',
      },
    },
    {
      container: {
        right: 0,
        overflow: 'hidden',
        yPercent: -100,
      },
      figure: {
        paletteBackground: '600',
        translateY: '-50%',
        borderRadius: '100%',
      },
    },
    {
      container: {
        right: 0,
        overflow: 'hidden',
        yPercent: -200,
      },
      figure: {
        paletteBackground: '400',
        translateY: '-50%',
        borderRadius: '100%',
      },
    },
  ],
  [
    {
      container: {
        left: 0,
        yPercent: 200,
      },
      figure: {
        paletteBackground: '400',
        borderBottomRightRadius: '100%',
      },
    },
    {
      container: {
        left: 0,
        yPercent: 100,
      },
      figure: {
        paletteBackground: '600',
        borderTopLeftRadius: '100%',
      },
    },
    {
      container: {
        left: 0,
        xPercent: 100,
      },
      figure: {
        paletteBackground: '800',
        borderRadius: '100%',
      },
    },
    {
      container: {
        left: 0,
        yPercent: -100,
      },
      figure: {
        paletteBackground: '600',
        borderBottomLeftRadius: '100%',
      },
    },
    {
      container: {
        left: 0,
        yPercent: -200,
      },
      figure: {
        paletteBackground: '400',
        borderTopRightRadius: '100%',
      },
    },
    {
      container: {
        right: 0,
        yPercent: 200,
      },
      figure: {
        paletteBackground: '400',
        borderBottomLeftRadius: '100%',
      },
    },
    {
      container: {
        right: 0,
        yPercent: 100,
      },
      figure: {
        paletteBackground: '600',
        borderTopRightRadius: '100%',
      },
    },
    {
      container: {
        right: 0,
        xPercent: -100,
      },
      figure: {
        paletteBackground: '800',
        borderRadius: '100%',
      },
    },
    {
      container: {
        right: 0,
        yPercent: -100,
      },
      figure: {
        paletteBackground: '600',
        borderBottomRightRadius: '100%',
      },
    },
    {
      container: {
        right: 0,
        yPercent: -200,
      },
      figure: {
        paletteBackground: '400',
        borderTopLeftRadius: '100%',
      },
    },
  ],
  [
    {
      container: {
        right: 0,
        top: 0,
        width: '12.5%',
      },
      figure: {
        paletteBackground: '100',
      },
    },
    {
      container: {
        right: 0,
        top: 0,
        xPercent: -100,
        width: '12.5%',
      },
      figure: {
        paletteBackground: '200',
      },
    },
    {
      container: {
        right: 0,
        top: 0,
        xPercent: -200,
        width: '12.5%',
      },
      figure: {
        paletteBackground: '300',
      },
    },
    {
      container: {
        right: 0,
        top: 0,
        xPercent: -300,
        width: '12.5%',
      },
      figure: {
        paletteBackground: '400',
      },
    },
    {
      container: {
        right: 0,
        top: 0,
        xPercent: -400,
        width: '12.5%',
      },
      figure: {
        paletteBackground: '500',
      },
    },
    {
      container: {
        right: 0,
        top: 0,
        xPercent: -500,
        width: '12.5%',
      },
      figure: {
        paletteBackground: '600',
      },
    },
    {
      container: {
        right: 0,
        top: 0,
        xPercent: -600,
        width: '12.5%',
      },
      figure: {
        paletteBackground: '700',
      },
    },
    {
      container: {
        right: 0,
        top: 0,
        xPercent: -700,
        width: '12.5%',
      },
      figure: {
        paletteBackground: '800',
      },
    },
  ],
  [
    {
      container: {
        left: 0,
        bottom: 0,
        width: '12.5%',
      },
      figure: {
        paletteBackground: '100',
      },
    },
    {
      container: {
        left: 0,
        bottom: 0,
        xPercent: 100,
        width: '12.5%',
      },
      figure: {
        paletteBackground: '200',
      },
    },
    {
      container: {
        left: 0,
        bottom: 0,
        xPercent: 200,
        width: '12.5%',
      },
      figure: {
        paletteBackground: '300',
      },
    },
    {
      container: {
        left: 0,
        bottom: 0,
        xPercent: 300,
        width: '12.5%',
      },
      figure: {
        paletteBackground: '400',
      },
    },
    {
      container: {
        left: 0,
        bottom: 0,
        xPercent: 400,
        width: '12.5%',
      },
      figure: {
        paletteBackground: '500',
      },
    },
    {
      container: {
        left: 0,
        bottom: 0,
        xPercent: 500,
        width: '12.5%',
      },
      figure: {
        paletteBackground: '600',
      },
    },
    {
      container: {
        left: 0,
        bottom: 0,
        xPercent: 600,
        width: '12.5%',
      },
      figure: {
        paletteBackground: '700',
      },
    },
    {
      container: {
        left: 0,
        bottom: 0,
        xPercent: 700,
        width: '12.5%',
      },
      figure: {
        paletteBackground: '800',
      },
    },
  ],
];

export default figuresPatterns;
