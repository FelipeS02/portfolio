'use client';

import { TransitionEvent, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/theme';
import useHandleLoadingAnimations from '@/hooks/use-handle-loading-animations';

const BASE_STYLES =
  'col-span-1 transition-loading h-screen min-w-full group-data-[loading=false]/container:h-0 ease-in-out duration-350 will-change-auto';

const LoadingScreen = () => {
  const { onPageLoading } = useHandleLoadingAnimations();

  const { fullfiled: isThemeFullfiled, loading: isThemeLoading } = useTheme();

  const [isTransitionEnded, setIsTransitionEnded] = useState(false);

  const handleBackgroundTransition = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName === 'background-color')
      setIsTransitionEnded((prev) => !prev);
  };

  const isThemeReloading = isThemeFullfiled && isThemeLoading;

  useEffect(() => {
    if (isThemeReloading) {
      setIsTransitionEnded(false);
    }
  }, [isThemeReloading]);

  const isPageLoading = isThemeLoading || !isTransitionEnded;

  if (!isPageLoading) onPageLoading();

  return (
    <div
      className='group/container fixed inset-0 z-50 grid h-fit w-full grid-cols-9'
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
      <h3 className='fixed place-self-center text-[4rem] font-bold text-foreground mix-blend-luminosity duration-500 group-data-[loading=false]/container:opacity-0 md:text-[6rem]'>
        FSARACHO
      </h3>
    </div>
  );
};

export default LoadingScreen;
