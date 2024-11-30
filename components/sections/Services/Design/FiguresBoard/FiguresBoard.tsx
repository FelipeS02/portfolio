'use client';

import { useGSAP } from '@gsap/react';
import { Draggable, gsap } from 'gsap/all';
import { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import Figures from './Figures';
import figurePositions, { backupStyles } from '@/lib/figuresPositions';
import { timeout } from '@/lib/utils';

gsap.registerPlugin(Draggable);

const FiguresBoard = () => {
  const boardRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);

  const figureElementsList: MutableRefObject<HTMLElement[] | null> = useRef<
    HTMLElement[] | null
  >(null);

  const tl: MutableRefObject<GSAPTimeline | null> = useRef<GSAPTimeline | null>(
    null
  );

  const loadFiguresRef = useCallback((node: HTMLDivElement) => {
    if (!node) return;

    const figures = node.getElementsByClassName('figure-container');

    if (!figures) return;

    figureElementsList.current = Array.from(figures) as HTMLElement[];
  }, []);

  const { contextSafe } = useGSAP(
    () => {
      if (!figureElementsList.current || !boardRef.current) return;
      figureElementsList.current.forEach((element) => {
        Draggable.create(element, {
          bounds: boardRef.current,
        });
      });
    },
    {
      scope: boardRef,
    }
  );

  const setElementsRandomPosition = contextSafe(async () => {
    if (!figureElementsList.current || !boardRef.current) return;

    const randomPositions =
      figurePositions[Math.floor(Math.random() * figurePositions.length)];

    if (!randomPositions) return;

    // If elements was animated previously, reverse animation to restore original styles and kill timeline
    if (tl.current) {
      await new Promise((resolve) => {
        gsap.to(figureElementsList.current, {
          x: 0,
          y: 0,
          onComplete: resolve,
        });
      });

      tl.current.reverse();

      await timeout(tl.current.duration() * 2000);

      tl.current.kill();
    }

    // Using promise to finish function execution when animation is over
    await new Promise((resolve) => {
      if (!figureElementsList.current) return;

      const timeline = gsap.timeline({ onComplete: resolve });

      timeline.pause();

      figureElementsList.current.forEach((figureContainer, index) => {
        const figureElement =
          figureContainer.getElementsByClassName('figure')[0];

        if (!figureElement) throw Error("Figure element doesn't exists");

        const styles = randomPositions[index];

        // Clear residual styles props
        gsap.set(figureContainer, { clearProps: 'all' });
        gsap.set(figureElement, { clearProps: 'all' });

        timeline
          .to(
            figureContainer,
            {
              ...styles?.container,
            },
            '<'
          )
          .to(
            figureElement,

            {
              ...(styles?.figure ?? backupStyles),
            },
            '<'
          );
      });

      tl.current = timeline;

      timeline.play();
    });
  });

  useEffect(() => {
    let isCancelled = false;

    const executeWithDelay = async () => {
      if (isCancelled) return;

      await setElementsRandomPosition(); // Espera a que la función termine
      if (isCancelled) return;

      setTimeout(executeWithDelay, 10000); // Programa la siguiente ejecución
    };

    executeWithDelay(); // Inicia el proceso

    return () => {
      isCancelled = true; // Cancela la ejecución si el componente se desmonta
    };
  }, [setElementsRandomPosition]);

  // useEffect(() => {
  //   setElementsRandomPosition();
  // }, [setElementsRandomPosition]);

  return (
    <div
      className='flex flex-col absolute items-center justify-center size-full inset-0 p-4 z-10'
      ref={boardRef}
    >
      <Figures ref={loadFiguresRef} />
    </div>
  );
};

export default FiguresBoard;
