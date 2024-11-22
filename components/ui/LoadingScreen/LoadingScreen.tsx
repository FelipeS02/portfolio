'use client';

import { useTheme } from '@/hooks/theme';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap/gsap-core';
import { useGSAP } from '@gsap/react';
import { Portal } from '@radix-ui/react-portal';
import { useEffect, useState } from 'react';

const BASE_STYLES =
  'col-span-1 transition-loading h-screen min-w-full group-data-[loading=false]/container:h-0 ease-in-out duration-350 will-change-auto';

gsap.registerPlugin(useGSAP);

const LoadingScreen = () => {
  const { fullfiled } = useTheme();

  const [transitionEnd, setTransitionEnd] = useState(false);

  const isLoading = !fullfiled || !transitionEnd;

  const handleTransitionEnd = () => {
    if (!fullfiled) return;
    setTransitionEnd(true);
  };

  useEffect(() => {
    if (!fullfiled) setTransitionEnd(false);
  }, [fullfiled]);

  return (
    <Portal
      className='w-full h-fit grid grid-cols-9 absolute inset-0 z-50 group/container'
      data-loading={isLoading}
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
        onTransitionEnd={handleTransitionEnd}
      />
    </Portal>
  );
};

export default LoadingScreen;
