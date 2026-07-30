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
import { getNewThemeByHex, getRandomHex, initialPalette } from '@/lib/theme';
import { timeout } from '@/lib/utils';
import { Theme } from '@/models/theme';

export interface RandomThemeState extends Theme {
  loading: boolean;
  fullfiled: boolean;
}
export interface RandomThemeContextState extends RandomThemeState {
  getNewTheme?: (color?: string) => Promise<void>;
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
      setTheme((prev) => ({ ...prev, loading: true }));

      // Generation is synchronous now, so without yielding React would batch
      // this with the state below and never render the loading frame the
      // LoadingScreen needs to replay its lines animation
      await timeout(0);

      const newTheme = getNewThemeByHex(color || getRandomHex());

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

  // Initial theme loading (optionally preselected via ?theme=hexcode)
  useEffect(() => {
    if (!mounted) return setMounted(true);

    const presetHex = new URLSearchParams(window.location.search).get(
      'theme',
    );

    getNewTheme.current(presetHex ?? '');
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
