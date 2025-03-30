'use client';

import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { applyPaletteIntoCSS } from '@/lib/dom';
import { hexIsValid, initialPalette } from '@/lib/theme';
import { ApiResponse } from '@/models/api';
import { Theme } from '@/models/theme';

export interface RandomThemeState extends Theme {
  loading: boolean;
  fullfiled: boolean;
}
export interface RandomThemeContextState extends RandomThemeState {
  getNewTheme?: () => Promise<void>;
  applyPalette?: VoidFunction;
}

export const themeInitialState: RandomThemeState = {
  hexCode: '',
  palette: initialPalette,
  fullfiled: false,
  loading: false,
};

export const RandomThemeContext =
  createContext<RandomThemeContextState>(themeInitialState);

const CustomPaletteProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  const [theme, setTheme] = useState<RandomThemeState>(themeInitialState);

  //@region Random theme generation
  const getNewTheme = useCallback(async (color: string = '') => {
    try {
      if (color && !hexIsValid(color)) throw Error('Hex color is invalid');

      setTheme((prev) => ({ ...prev, loading: true }));

      // Get theme from API
      const res = await fetch(
        `api/theme${color ? `?color=${color.replace('#', '')}` : ''}`,
      );

      const { data }: ApiResponse<{ theme: Theme }> = await res.json();

      if (!data?.theme) throw new Error('Failed to get theme');

      const newTheme = data.theme;

      setTheme((prev) => ({
        ...prev,
        ...newTheme,
        fullfiled: true,
      }));
    } catch (e) {
      console.log(e);
    } finally {
      setTheme((prev) => ({ ...prev, loading: false, fullfiled: true }));
    }
  }, []);

  // Manually apply the theme into CSS variables
  const applyPalette = useCallback(() => {
    applyPaletteIntoCSS(theme.palette.hsl);
  }, [theme]);

  // Initial theme loading
  useEffect(() => {
    if (!mounted) return setMounted(true);

    getNewTheme();
  }, [mounted, getNewTheme]);

  const memoizedValue = useMemo(
    () => ({ ...theme, getNewTheme, applyPalette }),
    [getNewTheme, theme, applyPalette],
  );

  return (
    <RandomThemeContext.Provider value={memoizedValue}>
      {children}
    </RandomThemeContext.Provider>
  );
};

export default CustomPaletteProvider;
