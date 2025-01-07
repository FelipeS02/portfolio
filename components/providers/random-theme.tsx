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

interface ThemeState extends Theme {
  loading: boolean;
  fullfiled: boolean;
}

export const themeInitialState: ThemeState = {
  hexCode: '',
  palette: initialPalette,
  fullfiled: false,
  loading: false,
};

export const RandomThemeContext = createContext<
  ThemeState & { getNewTheme?: () => Promise<void> }
>(themeInitialState);

const CustomPaletteProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  const [theme, setTheme] = useState<ThemeState>(themeInitialState);

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

      // Apply the theme into CSS variables
      applyPaletteIntoCSS(newTheme.palette.hsl);

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

  // Initial theme loading
  useEffect(() => {
    if (!mounted) return setMounted(true);

    getNewTheme();
  }, [mounted, getNewTheme]);

  const memoizedValue = useMemo(
    () => ({ ...theme, getNewTheme }),
    [getNewTheme, theme],
  );

  return (
    <RandomThemeContext.Provider value={memoizedValue}>
      {children}
    </RandomThemeContext.Provider>
  );
};

export default CustomPaletteProvider;
