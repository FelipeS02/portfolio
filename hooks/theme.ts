import { useContext, useEffect, useRef } from 'react';
import { useTheme as useNextThemes } from 'next-themes';

import {
  RandomThemeContext,
  RandomThemeContextState,
} from '@/components/providers/random-theme';

export type useThemeProps = {
  onThemeChange?: (value: string) => unknown | Promise<unknown>;
};

export function useTheme({
  onThemeChange = () => undefined,
}: useThemeProps = {}): RandomThemeContextState {
  const currentHex = useRef<string>('');
  const context = useContext(RandomThemeContext);

  if (!context)
    throw Error('useTheme must be wrapped inside RandomThemeContext');

  useEffect(() => {
    if (currentHex.current !== context.hexCode) {
      onThemeChange(context.hexCode);
      currentHex.current = context.hexCode;
    }
  }, [context.hexCode, onThemeChange]);

  return context;
}

// Declaring useTheme from next-themes as useSchemes to differenciate from app generated theme utility
export const useScheme = useNextThemes;
