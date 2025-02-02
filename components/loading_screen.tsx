'use client';

import { useCallback, useEffect, useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { initialPalette } from '@/lib/theme';
import { useTheme } from '@/hooks/theme';
import useHandleLoadingAnimations from '@/hooks/use-handle-loading-animations';
import { PaletteShade } from '@/models/theme';

const LoadingScreen = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const loadingLines = useRef<HTMLElement[] | null>(null);

  const { onPageLoading } = useHandleLoadingAnimations();

  const tl = useRef<GSAPTimeline>(gsap.timeline());

  const {
    fullfiled: isThemeFullfiled,
    loading: isThemeLoading,
    palette: { hex: palette },
    applyPalette,
  } = useTheme();

  const isThemeReloading = isThemeFullfiled && isThemeLoading;

  const { contextSafe } = useGSAP({ scope: container });

  const onLoaded = contextSafe(() => {
    const isDefaultPalette = palette[100] === initialPalette.hex[100];

    if (isDefaultPalette) return;

    const linesTl = gsap.timeline({
      onStart: () => {
        if (applyPalette) applyPalette();
      },
    });

    // Build colors switch animation
    loadingLines.current?.forEach((line, index) => {
      const linePosition = index + 1;

      // Shade must be between 100 and 900
      if (linePosition <= 0 || linePosition > 9) return;

      const paletteShade = (linePosition * 100).toString() as PaletteShade;

      const timelinePositionByIndex =
        linePosition === 1 ? undefined : '>-=0.15';

      linesTl.to(
        line,
        {
          backgroundColor: palette[paletteShade],
          duration: 0.2,
        },
        timelinePositionByIndex,
      );
    });

    // Add to timeline
    tl.current.add(linesTl, '>');

    // On switch colors end, hide lines and logo
    tl.current.add(
      gsap.to(loadingLines.current, {
        yPercent: -100,
        stagger: 0.05,
        duration: 0.2,
        delay: 0.5,
        translateZ: 0,
        onStart: () => {
          gsap.to('#loading-logo', {
            opacity: 0,
            duration: 0.3,
            ease: 'circ.inOut',
          });
        },
        onComplete: () => {
          gsap.set(container.current, {
            display: 'none',
          });
        },
      }),
      '>',
    );

    // 0.5s before line animation end, show onLoading animations
    tl.current.add(onPageLoading(), '>-=0.5');
  });

  const onLoading = contextSafe(() => {
    tl.current.add(
      gsap.to(loadingLines.current, {
        yPercent: 0,
        stagger: 0.05,
        duration: 0.2,

        onStart: () => {
          gsap.to('#loading-logo', {
            opacity: 1,
            duration: 0.2,
            ease: 'back.inOut',
          });
          gsap.set(container.current, { display: 'grid' });
        },
      }),
      '>',
    );
  });

  useEffect(() => {
    if (!loadingLines?.current || !container?.current) return;

    if (!isThemeLoading) return onLoaded();
  }, [onLoaded, isThemeLoading]);

  useEffect(() => {
    if (isThemeReloading) onLoading();
  }, [isThemeReloading, onLoading]);

  const loadElements = useCallback((node: HTMLDivElement) => {
    if (!node) return;

    container.current = node;

    // Get loading lines
    const newLines = Array.from(
      node.getElementsByClassName('loading-line'),
    ) as HTMLElement[];

    if (newLines.length === 0) return;

    loadingLines.current = newLines;
  }, []);

  const initialColorValues = Object.values(initialPalette.hex);

  return (
    <div
      className='fixed inset-0 z-50 grid h-fit w-full grid-cols-9 items-center justify-center gap-[-1px]'
      ref={loadElements}
    >
      {initialColorValues.map((color, index) => {
        if (index === 0 || index > 9) return null;
        return (
          <div
            // Using 101% width to prevent visual bug when apply will change
            className='loading-line col-span-1 h-screen w-[101%] will-change-[transform,background]'
            style={{ backgroundColor: color }}
            key={`loading-line-${color}`}
          />
        );
      })}

      <h3
        className='absolute justify-self-center text-[4rem] font-bold text-white drop-shadow-lg md:text-[6rem]'
        id='loading-logo'
      >
        FSARACHO
      </h3>
    </div>
  );
};

export default LoadingScreen;
