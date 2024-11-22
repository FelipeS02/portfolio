'use client';

import { useScheme } from '@/hooks/theme';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

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
      className='flex rounded-full border border-palette-500 h-fit w-fit gap-1.5 p-1 relative cursor-pointer group'
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
        className='aspect-square absolute bg-palette-400 rounded-full transition-all group-data-[toggled=false]:ml-0 group-data-[toggled=true]:ml-[48%] z-10'
        style={{ height: ICON_SIZE }}
      />
      <Sun
        size={ICON_SIZE}
        className='text-yellow-500 fill-yellow-500 dark:drop-shadow-current'
      />
      <Moon
        size={ICON_SIZE}
        className='text-blue-500 fill-blue-500 light:drop-shadow-current'
      />
    </label>
  );
};

export default ThemeSwitch;
