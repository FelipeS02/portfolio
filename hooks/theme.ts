import { useContext } from 'react';
import { useTheme as useNextThemes } from 'next-themes';

import { RandomThemeContext } from '@/components/providers/random-theme';

export const useTheme = () => {
  const context = useContext(RandomThemeContext);

  if (!context)
    throw Error('useTheme must be wrapped inside RandomThemeContext');

  return context;
};

// Declaring useTheme from next-themes as useSchemes to differenciate from app generated theme utility
export const useScheme = useNextThemes;
