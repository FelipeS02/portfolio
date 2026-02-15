'use client';

import {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import { applyPaletteIntoCSS, updateFavicon } from '@/lib/dom';
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
  const getNewTheme = useRef(async (color: string = '') => {
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

      updateFavicon(newTheme.hexCode);
    } catch (e) {
      console.log(e);
    } finally {
      setTheme((prev) => ({ ...prev, loading: false, fullfiled: true }));
    }
  });

  // Manually apply the theme into CSS variables
  const applyPalette = () => {
    applyPaletteIntoCSS(theme.palette.hsl);
    updateFavicon(theme.hexCode);
  };

  // Initial theme loading
  useEffect(() => {
    if (!mounted) return setMounted(true);

    getNewTheme.current();
  }, [mounted, getNewTheme]);

  return (
    <RandomThemeContext.Provider
      value={{ ...theme, getNewTheme: getNewTheme.current, applyPalette }}
    >
      {children}
    </RandomThemeContext.Provider>
  );
};

export default CustomPaletteProvider;
