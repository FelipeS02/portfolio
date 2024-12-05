'use client';

import useHandleLoadingAnimations from '@/hooks/useHandleLoadingAnimations';
import { useTheme } from '@/hooks/theme';
import { cn } from '@/lib/utils';
import { TransitionEvent, useEffect, useState } from 'react';
import { useImageLoading } from '@/hooks/useImageLoading';
import { useLenis } from 'lenis/dist/lenis-react.js';

const BASE_STYLES =
  'col-span-1 transition-loading h-screen min-w-full group-data-[loading=false]/container:h-0 ease-in-out duration-350 will-change-auto';

const LoadingScreen = () => {
  const { onPageLoading } = useHandleLoadingAnimations();

  const {
    fullfiled: isThemeFullfiled,
    loading: isThemeLoading,
    photo: { resolvedSrc: themeImage },
  } = useTheme();

  const [isLoaded, setIsLoaded] = useState({
    themeImage: false,
  });

  useImageLoading(themeImage, (res) =>
    setIsLoaded((prev) => ({ ...prev, themeImage: res }))
  );

  const [isTransitionEnded, setIsTransitionEnded] = useState(false);

  const handleBackgroundTransition = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName === 'background-color')
      setIsTransitionEnded((prev) => !prev);
  };

  const isThemeReloading = isThemeFullfiled && isThemeLoading;

  useEffect(() => {
    if (isThemeReloading) {
      setIsTransitionEnded(false);
      setIsLoaded(() => ({ themeImage: false }));
    }
  }, [isThemeReloading]);

  const isPageLoading =
    isThemeLoading || !isTransitionEnded || !isLoaded.themeImage;

  if (!isPageLoading) onPageLoading();

  return (
    <div
      className='fixed w-full z-50 group/container grid grid-cols-9 inset-0 h-fit'
      data-loading={isPageLoading}
    >
      <div className={cn(BASE_STYLES, 'bg-palette-100 delay-100')} />
      <div className={cn(BASE_STYLES, 'bg-palette-200 delay-150')} />
      <div className={cn(BASE_STYLES, 'bg-palette-300 delay-200')} />
      <div className={cn(BASE_STYLES, 'bg-palette-400 delay-250')} />
      <div className={cn(BASE_STYLES, 'bg-palette-500 delay-300')} />
      <div className={cn(BASE_STYLES, 'bg-palette-600 delay-350')} />
      <div className={cn(BASE_STYLES, 'bg-palette-700 delay-400')} />
      <div className={cn(BASE_STYLES, 'bg-palette-800 delay-450')} />
      <div
        className={cn(BASE_STYLES, 'bg-palette-900 delay-500')}
        onTransitionEnd={handleBackgroundTransition}
      />
      <h3 className='fixed place-self-center text-neutral-500 lg:text-neutral-800 text-[4rem] md:text-[6rem] font-bold group-data-[loading=false]/container:opacity-0 mix-blend-luminosity duration-500'>
        FSARACHO
      </h3>
    </div>
  );
};

export default LoadingScreen;
