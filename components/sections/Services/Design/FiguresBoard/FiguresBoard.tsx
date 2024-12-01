'use client';

import { useGSAP } from '@gsap/react';
import { Draggable, gsap } from 'gsap/all';
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Figures from './Figures';
import figuresPatterns, { backupStyles } from '@/lib/figuresPatterns';
import { removeByIndex, timeout } from '@/lib/utils';
import { useTheme } from '@/hooks/theme';
import { Palette, PaletteShade } from '@/models/theme';
import { FiguresPatterns } from '@/models/figuresPatterns';

gsap.registerPlugin(Draggable);

const getPaletteValue = (palette: Palette['hex'], value?: PaletteShade) => {
  if (!value) return 'initial';

  return palette[value];
};

const FiguresBoard = () => {
  const [mounted, setMounted] = useState(false);

  const {
    palette: { hex: pallete },
  } = useTheme();

  const boardRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null);

  const figureElementsList: MutableRefObject<HTMLElement[] | null> = useRef<
    HTMLElement[] | null
  >(null);

  const figuresTimeline: MutableRefObject<GSAPTimeline | null> =
    useRef<GSAPTimeline | null>(null);

  const patternsRef = useRef(figuresPatterns);

  const loadFiguresRef = useCallback((node: HTMLDivElement) => {
    if (!node) return;

    const figures = node.getElementsByClassName('figure-container');

    if (!figures) return;

    figureElementsList.current = Array.from(figures) as HTMLElement[];
  }, []);

  useGSAP(
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

  const getRandomPattern = useCallback(() => {
    if (patternsRef.current.length === 0) {
      patternsRef.current = figuresPatterns;
    }

    const randomIndex = Math.floor(Math.random() * patternsRef.current.length);

    const randomPositions = patternsRef.current[randomIndex];

    patternsRef.current = removeByIndex<FiguresPatterns[]>(
      patternsRef.current,
      randomIndex
    );

    return randomPositions;
  }, []);

  const setElementsRandomPosition = useCallback(async () => {
    if (!figureElementsList.current || !boardRef.current) return;

    const randomPattern = getRandomPattern();

    // If elements was animated previously, reverse animation to restore original styles and kill timeline
    if (figuresTimeline.current) {
      // Await to restore position modified by draggable
      await new Promise((resolve) => {
        gsap.to(figureElementsList.current, {
          x: 0,
          y: 0,
          onComplete: resolve,
        });
      });

      figuresTimeline.current.reverse();

      await timeout(figuresTimeline.current.duration() * 4000);

      figuresTimeline.current.kill();
    }

    // Using promise to resolve function execution when animation is over
    await new Promise((resolve) => {
      if (!figureElementsList.current) return;

      const newTimeline = gsap.timeline({ onComplete: resolve });

      newTimeline.pause();

      figureElementsList.current.forEach((figureContainer, index) => {
        const figureElement =
          figureContainer.getElementsByClassName('figure')[0];

        if (!figureElement) throw Error("Figure element doesn't exists");

        const styles = randomPattern[index];

        // Clear residual styles props
        gsap.set(figureContainer, { clearProps: 'all', willChange: 'auto' });
        gsap.set(figureElement, { clearProps: 'all', willChange: 'auto' });

        newTimeline
          .to(
            figureContainer,
            {
              ...styles?.container,
              backgroundColor: getPaletteValue(
                pallete,
                styles?.container?.paletteBackground
              ),
            },
            '<'
          )
          .to(
            figureElement,
            {
              ease: 'power4.out',
              ...(styles?.figure ?? backupStyles),
              backgroundColor: getPaletteValue(
                pallete,
                styles?.figure?.paletteBackground
              ),
            },
            '<'
          );
      });

      figuresTimeline.current = newTimeline;

      newTimeline.play();
    });
  }, [pallete, getRandomPattern]);

  useEffect(() => {
    if (!mounted) return setMounted(true);

    let isCancelled = false;

    const executeWithDelay = async () => {
      if (isCancelled) return;

      await setElementsRandomPosition();

      if (isCancelled) return;

      setTimeout(executeWithDelay, 10000);
    };

    executeWithDelay();

    return () => {
      // Cancel next ejecution on unmount
      isCancelled = true;
    };
  }, [setElementsRandomPosition, mounted]);

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
