'use client';

import { memo, useCallback, useMemo, useRef, useState } from 'react';

import { useGSAP } from '@gsap/react';
import { Draggable, gsap } from 'gsap/all';
import { useInterval } from 'usehooks-ts';

import figuresPatterns, { backupStyles } from '@/lib/figures-patterns';
import { removeByIndex, timeout } from '@/lib/utils';
import { useTheme } from '@/hooks/theme';
import useVisibilityChecker from '@/hooks/use-visibility-checker';
import { FiguresPatterns } from '@/models/figures-patterns';
import { Palette, PaletteShade } from '@/models/theme';

import { DESIGN_ELEMENTS_IDS } from '../design';
import Figures from './figures';
import SelectableElement from './selectable-element';

const SectionText = memo(function SectionText({
  selectedElement,
}: {
  selectedElement?: string;
}) {
  return (
    <SelectableElement
      className='z-20 flex flex-col p-4 uppercase'
      selected={selectedElement === DESIGN_ELEMENTS_IDS.HERO}
      id={DESIGN_ELEMENTS_IDS.HERO}
    >
      <h4 className='text-5xl font-semibold text-nowrap drop-shadow-md md:text-6xl'>
        Diseño web
      </h4>
      <p className='text-md text-foreground md:max-w-[480px]'>
        Creación de diseños visualmente impresionantes y centrados en el usuario
        que capturan la identidad y los valores de la marca.
      </p>
    </SelectableElement>
  );
});

// Utility function to get a palette value based on a shade
const getPaletteValue = (palette: Palette['hex'], value?: PaletteShade) => {
  // Return a default value if no shade is provided
  if (!value) return 'transparent';
  // Return the corresponding palette value
  return palette[value];
};

// Utility function to apply styles with a resolved palette background color
const applyStyles = (
  styles: FiguresPatterns['container'] | FiguresPatterns['figure'],
  palette: Palette['hex'],
) => {
  return {
    ...styles,
    // Resolve palette background color
    backgroundColor: getPaletteValue(palette, styles?.paletteBackground),
  };
};

const FiguresBoard = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const {
    // Extract palette hex values from the theme
    palette: { hex: pallete },
    fullfiled: isPaletteFullfiled,
  } = useTheme({
    onThemeChange: () => (isMounted ? setIsMounted(false) : undefined),
  });

  // Refs to manage DOM elements and GSAP-related data
  const boardRef = useRef<HTMLDivElement>(null);
  const figureElementsList = useRef<HTMLElement[] | null>(null);
  const figuresTimeline = useRef<GSAPTimeline | null>(null);
  const draggableElements = useRef<Draggable[] | null>(null);
  // Reference to manage patterns
  const patternsRef = useRef<FiguresPatterns[][]>(figuresPatterns);

  const isSectionVisible = useVisibilityChecker(boardRef.current as Element, {
    threshold: 0.15,
  });

  // State to track the selected element ID
  const [selectedElement, setSelectedElement] = useState<string>('');

  // Handle selection of draggable elements by their ID
  const handleDraggableSelection = useCallback((elementId: string) => {
    if (!elementId) throw Error('Element id not defined'); // Ensure the element ID is valid
    setSelectedElement(elementId); // Update the selected element state
  }, []);

  // Load figure elements from a given node reference
  const loadFiguresRef = useCallback((node: HTMLDivElement) => {
    if (!node) return;

    const figures = node.getElementsByClassName('figure-container');
    if (!figures) return;

    figureElementsList.current = Array.from(figures) as HTMLElement[]; // Store figure elements in the ref
  }, []);

  // Initialize GSAP Draggable instances and assign them to elements
  useGSAP(
    () => {
      const sectionHero = document.getElementById(DESIGN_ELEMENTS_IDS.HERO);
      if (!figureElementsList.current || !boardRef.current || !sectionHero)
        return;

      const draggableList: Draggable[] = [];

      // Create draggable for the section hero element
      Draggable.create(sectionHero, {
        bounds: boardRef.current,
        onPress: () => handleDraggableSelection(sectionHero.id), // Handle selection on press
      });

      // Create draggable for figure elements
      draggableList.push(
        ...Draggable.create(figureElementsList.current, {
          bounds: boardRef.current,
          onPress: function () {
            handleDraggableSelection(this?.target?.id); // Handle selection for this target
          },
        }),
      );

      // Only storing figure elements to disable before animations
      draggableElements.current = draggableList; // Store draggable instances
    },
    {
      scope: boardRef, // Scope for GSAP hooks
    },
  );

  // Enable or disable draggable elements
  const alternateDraggables = useCallback((action: 'disable' | 'enable') => {
    if (!['disable', 'enable'].includes(action)) {
      throw Error('New state must be enable or disable'); // Validate the action
    }

    draggableElements.current?.forEach((draggable) => draggable[action]()); // Apply the action to each draggable
  }, []);

  // Get a random pattern and remove it from the patterns list
  const getRandomPattern = useCallback(() => {
    // Reset pattenrs list when all patterns are used
    if (patternsRef.current.length === 0) patternsRef.current = figuresPatterns;

    const randomIndex = Math.floor(Math.random() * patternsRef.current.length);
    const randomPositions = patternsRef.current[randomIndex];

    // Remove the used pattern from the list
    patternsRef.current = removeByIndex<FiguresPatterns[]>(
      patternsRef.current,
      randomIndex,
    );

    return randomPositions;
  }, []);

  // Reverse previous animations if any
  const cleanExistentTimeline = useCallback(async (timeline: GSAPTimeline) => {
    // Clear transform from draggable if exists
    await new Promise<void>((resolve) => {
      gsap.to(figureElementsList.current, {
        x: 0,
        y: 0,
        onComplete: resolve,
      });
    });

    timeline.reverse(); // Reverse the timeline
    await timeout(timeline.duration() * 2000);
    timeline.kill(); // Kill the timeline to reset
  }, []);

  const applyNewFigurePatterns = useCallback(
    async (pattern: FiguresPatterns[]) => {
      if (!pattern) throw Error('Pattern is not defined');

      // Animate elements to new positions based on random pattern
      await new Promise<void>((resolve) => {
        if (!figureElementsList.current)
          throw Error('Figures ref are not defined');

        // Initialize new timeline
        const newTimeline = gsap.timeline({
          onComplete: resolve,
        });
        newTimeline.pause();

        figureElementsList.current.forEach((figureContainer, index) => {
          const figureElement =
            figureContainer.getElementsByClassName('figure')[0];

          if (!figureElement) throw Error("Figure element doesn't exist");

          const styles = pattern[index];

          // Reset styles to avoid conflicts
          gsap.set(figureContainer, {
            clearProps: 'all',
          });
          gsap.set(figureElement, {
            clearProps: 'all',
          });

          // Apply animations for container and figure elements
          newTimeline
            .to(figureContainer, applyStyles(styles?.container, pallete), '<')
            .to(
              figureElement,
              {
                ease: 'power4.out',
                ...applyStyles(styles?.figure ?? backupStyles, pallete),
              },
              '<',
            );
        });

        // Store the new timeline
        figuresTimeline.current = newTimeline;
        // Play to sincronize all changes
        newTimeline.play();
      });
    },
    [pallete],
  );

  // Set random positions and styles for figure elements
  const setElementsRandomPosition = useCallback(async () => {
    if (!figureElementsList.current || !boardRef.current) return;

    // Pause interval replay until animations finish
    setIsPlaying(true);

    alternateDraggables('disable'); // Disable draggables during animation
    setSelectedElement(''); // Clear the selected element

    if (figuresTimeline.current)
      await cleanExistentTimeline(figuresTimeline.current);

    const randomPattern = getRandomPattern();

    await applyNewFigurePatterns(randomPattern);

    // Re-enable draggables after animation
    alternateDraggables('enable');

    if (!isMounted) setIsMounted(true);

    setIsPlaying(false);
  }, [
    getRandomPattern,
    alternateDraggables,
    applyNewFigurePatterns,
    cleanExistentTimeline,
    isMounted,
  ]);

  const intervalDelay = useMemo(() => {
    // If palette is not loaded or animations are playing STOP THE COUNT 🦅🦅🦅
    if (!isPaletteFullfiled || isPlaying) return null;

    // On first render
    if (!isMounted && isSectionVisible) return 500;

    // Interval of 10 seconds when section is visible
    return isSectionVisible ? 10000 : null;
  }, [isMounted, isSectionVisible, isPaletteFullfiled, isPlaying]);

  useInterval(() => setElementsRandomPosition(), intervalDelay);

  return (
    <div
      className='absolute inset-0 z-10 flex size-full max-h-full max-w-full flex-col items-center justify-center overflow-hidden p-4'
      ref={boardRef}
    >
      <SectionText selectedElement={selectedElement} />
      <Figures ref={loadFiguresRef} selectedElement={selectedElement} />
    </div>
  );
};

export default FiguresBoard;
