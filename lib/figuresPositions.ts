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

const figurePositions: FigurePositions[][] = [
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
        right: 0,
        top: 0,
        width: '12.5%',
      },
      figure: {
        background: getPaletteVar(100),
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
        background: getPaletteVar(200),
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
        background: getPaletteVar(300),
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
        background: getPaletteVar(400),
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
        background: getPaletteVar(500),
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
        background: getPaletteVar(600),
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
        background: getPaletteVar(700),
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
        background: getPaletteVar(800),
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
  [
    {
      container: {
        width: '25rem',
        height: '28rem',
        border: `6px solid ${getPaletteVar(900)}`,
      },
      figure: {
        background: getPaletteVar(100),
      },
    },
    {
      container: {
        xPercent: -25,
        yPercent: -32,
        height: '15rem',
        width: '15rem',
        borderWidth: '6px 3px 3px 6px',
        borderColor: getPaletteVar(900),
      },
      figure: {
        background: getPaletteVar(500),
      },
    },
    {
      container: {
        xPercent: 100,
        yPercent: -114,
        height: '7.5rem',
        width: '7.5rem',
        borderWidth: '6px 6px 3px 3px',
        borderColor: getPaletteVar(900),
      },
      figure: {
        background: getPaletteVar(300),
      },
    },
    {
      container: {
        xPercent: 100,
        yPercent: -15,
        height: '7.5rem',
        width: '7.5rem',
        borderWidth: '6px 6px 3px 3px',
        borderColor: getPaletteVar(900),
      },
      figure: {
        background: getPaletteVar(100),
        boxShadow: `inset 0 3.50rem 0 0 ${getPaletteVar(
          100
        )}, inset 0 3.75rem 0 0 ${getPaletteVar(900)}`,
      },
    },
    {
      container: {
        xPercent: -100,
        yPercent: 85,
        height: '7.5rem',
        width: '7.5rem',
        borderWidth: '3px 3px 3px 6px',
        borderColor: getPaletteVar(900),
      },
      figure: {
        background: getPaletteVar(800),
      },
    },
    {
      container: {
        xPercent: 0,
        yPercent: 85,
        height: '7.5rem',
        width: '7.5rem',
        border: `3px solid ${getPaletteVar(900)}`,
      },
      figure: {
        background: getPaletteVar(100),
        boxShadow: `inset 0 3.50rem 0 0 ${getPaletteVar(
          100
        )}, inset 0 3.75rem 0 0 ${getPaletteVar(900)}`,
      },
    },
    {
      container: {
        xPercent: 100,
        yPercent: 85,
        height: '7.5rem',
        width: '7.5rem',
        borderWidth: '3px 6px 3px 3px',
        borderColor: getPaletteVar(900),
      },
      figure: {
        background: getPaletteVar(100),
      },
    },
    {
      container: {
        xPercent: 90.7,
        yPercent: -783,
        height: '1.66rem',
        width: '8.75rem',
        borderWidth: '6px 3px 0px 6px',

        borderColor: getPaletteVar(900),
      },
      figure: {
        background: getPaletteVar(600),
      },
    },
    {
      container: {
        xPercent: -100,
        yPercent: 300,
        height: '4rem',
        width: '7.5rem',
        borderWidth: '3px 0px 6px 6px',
        borderColor: getPaletteVar(900),
      },
      figure: {
        background: getPaletteVar(300),
      },
    },
    {
      container: {
        xPercent: 24.2,
        yPercent: 450,
        height: '2.5rem',
        width: '15.2rem',
        borderWidth: '3px 6px 6px 6px',
        borderColor: getPaletteVar(900),
      },
      figure: {
        background: getPaletteVar(300),
      },
    },
  ],
];

export default figurePositions;
