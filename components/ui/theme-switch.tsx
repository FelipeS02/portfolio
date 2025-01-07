'use client';

import { useEffect, useState } from 'react';

import { Moon, Sun } from 'lucide-react';

import { useScheme } from '@/hooks/theme';

const ICON_SIZE = 18;

const ThemeSwitch = () => {
  const { setTheme, resolvedTheme } = useScheme();
  const [isMounted, setIsMounted] = useState(false);

  const isDarkModeSelected = resolvedTheme === 'dark';
  const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';

  const switchTheme = () => setTheme(newTheme);

  // Ensure this only runs in the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <label
      htmlFor='theme-toggle'
      className='group relative flex h-fit w-fit cursor-pointer gap-1.5 rounded-full border border-foreground p-1'
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
        className='absolute z-auto aspect-square rounded-full bg-foreground transition-all group-data-[toggled=false]:ml-0 group-data-[toggled=true]:ml-[48%]'
        style={{ height: ICON_SIZE }}
      />
      <Sun
        size={ICON_SIZE}
        className='fill-yellow-500 text-yellow-500 dark:drop-shadow-current'
      />
      <Moon
        size={ICON_SIZE}
        className='light:drop-shadow-current fill-blue-500 text-blue-500'
      />
    </label>
  );
};

export default ThemeSwitch;
