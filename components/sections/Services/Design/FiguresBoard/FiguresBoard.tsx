'use client';

import { useGSAP } from '@gsap/react';
import { Draggable, gsap } from 'gsap/all';
import { MutableRefObject, useCallback, useEffect, useRef } from 'react';

import Figures from './Figures';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import {
  backupStyles,
  desktopPositions,
  mobilePositions,
} from '@/lib/figuresPositions';

gsap.registerPlugin(Draggable);

const FiguresBoard = () => {
  const boardRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);

  const figureElementsList: MutableRefObject<Element[] | null> = useRef<
    Element[] | null
  >(null);

  const isMobile = useMediaQuery('(max-width: 768px)');

  const loadFiguresRef = useCallback((node: HTMLDivElement) => {
    if (!node) return;

    const figures = node.getElementsByClassName('figure-container');

    if (!figures) return;

    figureElementsList.current = Array.from(figures);
  }, []);

  const { contextSafe } = useGSAP(undefined, {
    scope: boardRef,
    dependencies: [isMobile],
  });

  const setElementsRandomPosition = contextSafe(() => {
    if (!figureElementsList.current || !boardRef.current) return;

    const allPositionsByDevice = isMobile ? mobilePositions : desktopPositions;

    const randomPositions =
      allPositionsByDevice[
        Math.floor(Math.random() * allPositionsByDevice.length)
      ];

    if (!randomPositions) return;

    figureElementsList.current.forEach((figureContainer, index) => {
      const figureElement = figureContainer.getElementsByClassName('figure')[0];

      if (!figureElement) throw Error("Figure element doesn't exists");

      const styles = randomPositions[index];

      gsap.set(figureContainer, { clearProps: 'all' });
      gsap.set(figureElement, { clearProps: 'all' });

      gsap.to(figureContainer, {
        ease: 'circ.inOut',
        ...styles?.container,
      });
      gsap.to(figureElement, {
        ease: 'circ.inOut',
        ...(styles?.figure ?? backupStyles),
      });
    });
  });

  useEffect(() => {
    const switchPositionsInterval = setInterval(
      setElementsRandomPosition,
      3000
    );

    return () => {
      clearInterval(switchPositionsInterval)
    }

  }, [setElementsRandomPosition]);

  return (
    <div
      className='flex flex-col absolute items-center justify-center size-full inset-0 z-10 p-4'
      ref={boardRef}
    >
      {/* <BoardAreas breakpoint={currentBreakpoint} /> */}
      <Figures ref={loadFiguresRef} />
    </div>
  );
};

export default FiguresBoard;
