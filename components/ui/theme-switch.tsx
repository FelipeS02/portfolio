'use client';

import { useEffect, useState } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLenis } from 'lenis/react';
import { Moon, Sun } from 'lucide-react';

import { mediaQueryMatches } from '@/lib/dom';
import { useScheme } from '@/hooks/theme';

import { HOME_ELEMENT_IDS } from '../sections/home/home';

const ICON_SIZE = 18;

const ThemeSwitch = () => {
  const lenis = useLenis();
  const { setTheme, resolvedTheme } = useScheme();
  const [isMounted, setIsMounted] = useState(false);

  const isDarkModeSelected = resolvedTheme === 'dark';

  const { contextSafe } = useGSAP();

  const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';

  const switchTheme = contextSafe(() => {
    // Disable animation on mobile for better performance
    if (mediaQueryMatches('(max-width: 768px)')) return setTheme(newTheme);

    const homeElement = document.getElementById(HOME_ELEMENT_IDS.SECTION);
    const homeOverlay = document.getElementById(HOME_ELEMENT_IDS.OVERLAY);

    lenis?.stop();

    gsap.set(homeOverlay, { display: 'block' });

    gsap
      .timeline()
      .to(homeOverlay, {
        backdropFilter: 'blur(1px)',
        duration: 0.3,
        ease: 'power2.out',
      })
      .to(
        homeElement,
        {
          scale: 0.98,
          duration: 0.3,
          ease: 'power2.out',
          onComplete: () => setTheme(newTheme),
        },
        '<',
      )
      .to(
        homeElement,
        {
          scale: 1,
          duration: 0.5,
          ease: 'back.inOut',
        },
        '>+=0.5',
      )
      .to(
        homeOverlay,
        {
          backdropFilter: 'blur(0px)',
          ease: 'back.inOut',
          duration: 0.5,
          onComplete: () => {
            lenis?.start();
            gsap.set(homeOverlay, { clearProps: 'all' });
          },
        },
        '<',
      );
  });

  // Ensure this only runs in the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <label
      htmlFor='theme-toggle'
      className='group border-foreground relative flex h-fit w-fit cursor-pointer gap-1.5 border p-1'
      data-toggled={isDarkModeSelected}
    >
      <span className='sr-only'>Toggle theme</span>
      <input
        id='theme-toggle'
        type='checkbox'
        checked={isDarkModeSelected}
        onChange={switchTheme}
        aria-label={`Switch to ${newTheme} mode`}
        className='hidden'
      />
      <span
        className='bg-foreground absolute z-auto aspect-square transition-all group-data-[toggled=false]:ml-0 group-data-[toggled=true]:ml-[48%]'
        style={{ height: ICON_SIZE }}
      />
      <Sun
        size={ICON_SIZE}
        className='dark:drop-shadow-current fill-yellow-500 text-yellow-500'
      />
      <Moon
        size={ICON_SIZE}
        className='light:drop-shadow-current fill-blue-500 text-blue-500'
      />
    </label>
  );
};

export default ThemeSwitch;
