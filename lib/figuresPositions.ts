import { FigurePositions } from '@/models/figurePositions';

function getRandomIntensity() {
  const min = 2; // Minimum multiple of 100 (200 / 100)
  const max = 8; // Maximum multiple of 100 (800 / 100)
  const randomMultiplier = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomMultiplier * 100;
}

const getPaletteVar = (intensity: number) => `hsl(var(--palette-${intensity}))`;

export const backupStyles = {
  opacity: 0,
};

export const desktopPositions: FigurePositions[][] = [
  [
    {
      container: {
        yPercent: -100,
        xPercent: -100,
      },
      figure: {
        background: getPaletteVar(getRandomIntensity()),
        borderBottomLeftRadius: '100%',
      },
    },
    {
      container: {
        yPercent: -100,
      },
      figure: {
        background: getPaletteVar(getRandomIntensity()),
        borderTopLeftRadius: '100%',
      },
    },
    {
      container: { xPercent: 100, yPercent: -100 },
      figure: {
        background: getPaletteVar(getRandomIntensity()),
        borderRadius: '100%',
        height: '80%',
        width: '80%',
      },
    },
    {
      container: { xPercent: -100 },
      figure: {
        background: getPaletteVar(getRandomIntensity()),
        borderBottomLeftRadius: '100%',
      },
    },
    {
      container: {
        xPercent: 100,
      },
      figure: {
        background: getPaletteVar(getRandomIntensity()),
        borderTopRightRadius: '100%',
      },
    },
    {
      container: {
        yPercent: 100,
      },
      figure: {
        background: getPaletteVar(getRandomIntensity()),
        borderTopRightRadius: '100%',
      },
    },
    {
      container: {
        xPercent: -100,
        yPercent: 100,
      },
      figure: {
        background: getPaletteVar(getRandomIntensity()),
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
        background: getPaletteVar(getRandomIntensity()),
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
        background: getPaletteVar(getRandomIntensity()),
        borderTopRightRadius: '100%',
      },
    },
    {
      figure: {
        background: getPaletteVar(getRandomIntensity()),
        borderTopRightRadius: '100%',
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
        background: getPaletteVar(400),
        translateY: '50%',
        borderRadius: '100%',
      },
    },
    {
      container: {
        left: 0,
        yPercent: 100,
      },
      figure: {
        background: getPaletteVar(600),
        translateY: '50%',
        borderRadius: '100%',
      },
    },
    {
      container: {
        left: 0,
      },
      figure: {
        background: getPaletteVar(800),
        borderRadius: '100%',
      },
    },
    {
      container: {
        left: 0,
        yPercent: -100,
      },
      figure: {
        background: getPaletteVar(600),
        translateY: '-50%',
        borderRadius: '100%',
      },
    },
    {
      container: {
        left: 0,
        yPercent: -200,
      },
      figure: {
        background: getPaletteVar(400),
        translateY: '-50%',
        borderRadius: '100%',
      },
    },
    {
      container: {
        right: 0,
        yPercent: 200,
      },
      figure: {
        background: getPaletteVar(400),
        translateY: '50%',
        borderRadius: '100%',
      },
    },
    {
      container: {
        right: 0,
        yPercent: 100,
      },
      figure: {
        background: getPaletteVar(600),
        translateY: '50%',
        borderRadius: '100%',
      },
    },
    {
      container: {
        right: 0,
      },
      figure: {
        background: getPaletteVar(800),
        borderRadius: '100%',
      },
    },
    {
      container: {
        right: 0,
        yPercent: -100,
      },
      figure: {
        background: getPaletteVar(600),
        translateY: '-50%',
        borderRadius: '100%',
      },
    },
    {
      container: {
        right: 0,
        yPercent: -200,
      },
      figure: {
        background: getPaletteVar(400),
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
        background: getPaletteVar(400),
        borderBottomRightRadius: '100%',
      },
    },
    {
      container: {
        left: 0,
        yPercent: 100,
      },
      figure: {
        background: getPaletteVar(600),
        borderTopLeftRadius: '100%',
      },
    },
    {
      container: {
        left: 0,
        xPercent: 100,
      },
      figure: {
        background: getPaletteVar(800),
        borderRadius: '100%',
      },
    },
    {
      container: {
        left: 0,
        yPercent: -100,
      },
      figure: {
        background: getPaletteVar(600),
        borderBottomLeftRadius: '100%',
      },
    },
    {
      container: {
        left: 0,
        yPercent: -200,
      },
      figure: {
        background: getPaletteVar(400),
        borderTopRightRadius: '100%',
      },
    },
    {
      container: {
        right: 0,
        yPercent: 200,
      },
      figure: {
        background: getPaletteVar(400),
        borderBottomLeftRadius: '100%',
      },
    },
    {
      container: {
        right: 0,
        yPercent: 100,
      },
      figure: {
        background: getPaletteVar(600),
        borderTopRightRadius: '100%',
      },
    },
    {
      container: {
        right: 0,
        xPercent: -100,
      },
      figure: {
        background: getPaletteVar(800),
        borderRadius: '100%',
      },
    },
    {
      container: {
        right: 0,
        yPercent: -100,
      },
      figure: {
        background: getPaletteVar(600),
        borderBottomRightRadius: '100%',
      },
    },
    {
      container: {
        right: 0,
        yPercent: -200,
      },
      figure: {
        background: getPaletteVar(400),
        borderTopLeftRadius: '100%',
      },
    },
  ],
  [
    {
      container: {
        height: '80%',
        width: '30%',
        padding: '0.5rem',
        left: 0,
        background: getPaletteVar(400),
        boxShadow:
          '0 0 5px 0 rgba(0,0,0,.25) inset, 0 5px 10px 5px rgba(0,0,0,.25)',
      },
      figure: {
        backgroundImage:
          'url("https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/The_Inspiration_of_Saint_Matthew_by_Caravaggio.jpg/640px-The_Inspiration_of_Saint_Matthew_by_Caravaggio.jpg")',
        backgroundSize: 'cover',
      },
    },
    {
      container: {
        height: '80%',
        width: '30%',
        padding: '0.5rem',
        right: 0,
        background: getPaletteVar(400),
        boxShadow:
          '0 0 5px 0 rgba(0,0,0,.25) inset, 0 5px 10px 5px rgba(0,0,0,.25)',
      },
      figure: {
        backgroundImage:
          'url("https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Madonna_of_the_Rosary-Caravaggio_(1607).jpg/406px-Madonna_of_the_Rosary-Caravaggio_(1607).jpg")',
        backgroundSize: 'cover',
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
        background: getPaletteVar(100),
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
        background: getPaletteVar(200),
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
        background: getPaletteVar(300),
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
        background: getPaletteVar(400),
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
        background: getPaletteVar(500),
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
        background: getPaletteVar(600),
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
        background: getPaletteVar(700),
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
        background: getPaletteVar(800),
      },
    },
  ],
];

export const mobilePositions: FigurePositions[][] = [];
