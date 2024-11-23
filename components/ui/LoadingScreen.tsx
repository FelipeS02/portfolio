'use client';

import useHandleLoadingAnimations from '@/hooks/useHandleLoadingAnimations';
import { useTheme } from '@/hooks/theme';
import { cn } from '@/lib/utils';
import { TransitionEvent, useEffect, useState } from 'react';

const BASE_STYLES =
  'col-span-1 transition-loading h-screen min-w-full group-data-[loading=false]/container:h-0 ease-in-out duration-350 will-change-auto';

const LoadingScreen = () => {
  const { onPageLoading } = useHandleLoadingAnimations();

  const {
    fullfiled: isThemeFullfiled,
    loading: isThemeLoading,
    photo: { resolvedSrc },
  } = useTheme();

  const [isLoaded, setIsLoaded] = useState({
    themeImage: false,
  });

  const [isTransitionEnded, setIsTransitionEnded] = useState(false);

  const handleBackgroundTransition = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName === 'background-color')
      setIsTransitionEnded((prev) => !prev);
  };

  useEffect(() => {
    if (!resolvedSrc) return;

    // Verify theme image loading state
    const img = new Image();
    img.src = resolvedSrc;

    img.onload = () => {
      setIsLoaded((prev) => ({ ...prev, themeImage: true }));
    };

    img.onerror = () => {
      setIsLoaded((prev) => ({ ...prev, themeImage: false }));
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [resolvedSrc]);

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
      className='fixed w-full h-fit grid grid-cols-9 inset-0 z-50 group/container'
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
    </div>
  );
};

export default LoadingScreen;
