'use client';

import { useGSAP } from '@gsap/react';
import { Draggable, gsap } from 'gsap/all';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import Figures from './Figures';
import figuresPatterns, { backupStyles } from '@/lib/figuresPatterns';
import { removeByIndex, timeout } from '@/lib/utils';
import { useTheme } from '@/hooks/theme';
import { Palette, PaletteShade } from '@/models/theme';
import { FiguresPatterns } from '@/models/figuresPatterns';
import SelectableElement from './SelectableElement';
import useVisibilityChecker from '@/hooks/useVisibilityChecker';

gsap.registerPlugin(Draggable);

export const DESIGN_SECTION_HERO_ID = 'design-section-hero';

const SectionText = memo(function SectionText({
  selectedElement,
}: {
  selectedElement?: string;
}) {
  return (
    <SelectableElement
      className='flex flex-col gap-2 p-4 z-20 mix-blend-plus-darker dark:mix-blend-plus-lighter'
      selected={selectedElement === DESIGN_SECTION_HERO_ID}
      id={DESIGN_SECTION_HERO_ID}
    >
      <h4 className='text-5xl md:text-8xl font-semibold'>Diseño web</h4>
      <p className='text-xl tracking-wider md:max-w-[480px] font-medium text-foreground'>
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
  palette: Palette['hex']
) => {
  return {
    ...styles,
    // Resolve palette background color
    backgroundColor: getPaletteValue(palette, styles?.paletteBackground),
  };
};

const FiguresBoard = () => {
  const {
    // Extract palette hex values from the theme
    palette: { hex: pallete },
  } = useTheme();

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
      const sectionHero = document.getElementById(DESIGN_SECTION_HERO_ID);
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
        })
      );

      // Only storing figure elements to disable before animations
      draggableElements.current = draggableList; // Store draggable instances
    },
    {
      scope: boardRef, // Scope for GSAP hooks
    }
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
    if (patternsRef.current.length === 0) {
      patternsRef.current = figuresPatterns; // Reset patterns if exhausted
    }

    const randomIndex = Math.floor(Math.random() * patternsRef.current.length);
    const randomPositions = patternsRef.current[randomIndex];

    // Remove the used pattern from the list
    patternsRef.current = removeByIndex<FiguresPatterns[]>(
      patternsRef.current,
      randomIndex
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
      console.log("entre")
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
            willChange: 'transform',
          });
          gsap.set(figureElement, {
            clearProps: 'all',
            willChange: 'height, backgroundColor',
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
              '<'
            );
        });

        // Store the new timeline
        figuresTimeline.current = newTimeline;
        // Play to sincronize all changes
        newTimeline.play();
      });
    },
    [pallete]
  );

  // Set random positions and styles for figure elements
  const setElementsRandomPosition = useCallback(async () => {
    if (!figureElementsList.current || !boardRef.current) return;

    alternateDraggables('disable'); // Disable draggables during animation
    setSelectedElement(''); // Clear the selected element

    if (figuresTimeline.current)
      await cleanExistentTimeline(figuresTimeline.current);

    const randomPattern = getRandomPattern();

    await applyNewFigurePatterns(randomPattern);

    // Re-enable draggables after animation
    alternateDraggables('enable');
  }, [
    getRandomPattern,
    alternateDraggables,
    applyNewFigurePatterns,
    cleanExistentTimeline,
  ]);

  // Effect to handle automatic updates every 10 seconds
  useEffect(() => {
    if (!isSectionVisible) return;

    let isCancelled = false;

    const executeWithDelay = async () => {
      if (isCancelled) return;

      await setElementsRandomPosition();

      if (isCancelled) return;

      setTimeout(executeWithDelay, 10000); // Repeat after 10 seconds
    };

    executeWithDelay();

    return () => {
      isCancelled = true; // Prevent further executions on unmount
    };
  }, [setElementsRandomPosition, isSectionVisible]);

  return (
    <div
      className='flex flex-col absolute items-center justify-center size-full inset-0 p-4 z-10'
      ref={boardRef}
    >
      <SectionText selectedElement={selectedElement} />
      <Figures ref={loadFiguresRef} selectedElement={selectedElement} />
    </div>
  );
};

export default FiguresBoard;
