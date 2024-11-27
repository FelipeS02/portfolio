'use client';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useGSAP } from '@gsap/react';
import { Draggable, gsap } from 'gsap/all';
import { useCallback, useEffect, useRef, useState } from 'react';

gsap.registerPlugin(Draggable);

type Figure = {
  id: number;
  width: `${string}%`;
  height: `${string}%`;
  xPercent: `${string}%`;
  yPercent: `${string}%`;
  color: `palette-${number}`;
  borderRadius: `${number}%`;
};

function getRandomPosition(): Pick<Figure, 'xPercent' | 'yPercent'> {
  // Generar posiciones aleatorias entre 0% y 100% (sin restricciones)
  const xPercent = `${Math.random() * 100}%` as Figure['xPercent'];
  const yPercent = `${Math.random() * 100}%` as Figure['yPercent'];

  return { xPercent, yPercent };
}

const getRandomBorderRadius = (): Figure['borderRadius'] =>
  `${Math.random() * 10}%`;

function getRandomColor(): Figure['color'] {
  const colorScale = Math.floor(Math.random() * 7 + 2) * 100; // Random scale: 200, ..., 800

  return `palette-${colorScale}` as Figure['color'];
}

const getRandomSize = (
  isMobile: boolean = false
): Figure['height'] | Figure['width'] => {
  const minSize = isMobile ? 10 : 10; // Tamaño mínimo en porcentaje
  const maxSize = isMobile ? 30 : 20; // Tamaño máximo en porcentaje

  return `${Math.random() * (maxSize - minSize) + minSize}%`;
};

const FiguresBoard = () => {
  const boardRef = useRef<HTMLDivElement>(null);
  const [figures, setFigures] = useState<Figure[]>([]);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const generateRandomFigures = useCallback(() => {
    if (figures.length > 0) return;

    const newFigures: Figure[] = Array.from({ length: 10 }, (_, i) => {
      // Generate random border-radius

      return {
        id: i,
        color: getRandomColor(),
        borderRadius: getRandomBorderRadius(),
        height: getRandomSize(isMobile),
        width: getRandomSize(isMobile),
        ...getRandomPosition(),
      };
    });

    setFigures(newFigures);
  }, [figures, isMobile]);

  // Generate random figures on mount
  const { contextSafe } = useGSAP(
    () => {
      if (!figures) return generateRandomFigures();

      // Initialize Draggable for each figure
      figures.forEach(({ id }) => {
        const el = document.getElementById(`figure-${id}`);

        if (!el) return;

        Draggable.create(el, {
          bounds: boardRef.current,
          cursor: 'grab',
          activeCursor: 'grabbing',
        });
      });
    },
    { scope: boardRef, dependencies: [figures] }
  );

  const reposicionateElements = contextSafe(() => {
    if (!figures) return;

    figures.forEach(({ id }) => {
      const { xPercent, yPercent } = getRandomPosition();

      const el = document.getElementById(`figure-${id}`);

      if (!el) return;

      const draggableState: Draggable = Draggable.get(el);

      gsap.set(el, {
        willChange: 'left, top, width, height, border-radius, transform',
        transitionProperty: 'background, transform',
      });

      gsap.to(el, {
        height: getRandomSize(isMobile),
        width: getRandomSize(isMobile),
        left: xPercent,
        top: yPercent,
        borderRadius: getRandomBorderRadius(),
        duration: 1, // Duration for smooth transition
        ease: 'power2.out', // Ease for smooth transition
        backgroundColor: `hsl(var(--${getRandomColor()}))`,
        // Update draggable coords on complete to prevent overflow
        onComplete: () => {
          draggableState.update(true);

          // Await transition to end to unlock drag
          setTimeout(() => {
            gsap.set(el, { transitionProperty: 'background' });
          }, 500);
        },
      });
    });
  });

  useEffect(() => {
    generateRandomFigures();
  }, [generateRandomFigures]);

  useEffect(() => {
    const intervalId = setInterval(reposicionateElements, 10000); // 10 seconds

    // Cleanup interval when component unmounts
    return () => clearInterval(intervalId);
  }, [reposicionateElements]);

  return (
    <div
      className='absolute size-full inset-0 overflow-hidden z-10'
      ref={boardRef}
    >
      {figures.map(
        ({ id, height, width, xPercent, yPercent, color, borderRadius }) => (
          <div
            key={id}
            id={`figure-${id}`}
            className={`bg-${color} duration-500 ease-in-out absolute`}
            style={{
              width,
              height,
              left: xPercent,
              top: yPercent,
              borderRadius,
              boxShadow:
                '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            }}
          />
        )
      )}
    </div>
  );
};

export default FiguresBoard;
