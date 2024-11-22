'use client';

import { useScheme } from '@/hooks/theme';
import {
  applyPaletteIntoCSS,
  applyThemeImage,
  initialPalette,
} from '@/lib/theme';
import { ApiResponse } from '@/models/api';
import { Photo } from '@/models/photos';
import { Theme } from '@/models/theme';
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

interface ThemeState extends Theme {
  fullfiled: boolean;
}

export const photoInitialState: Photo = {
  alt: '',
  avg_color: '',
  width: 0,
  height: 0,
  id: 0,
  liked: false,
  photographer: '',
  photographer_id: 0,
  photographer_url: '',
  src: {
    landscape: '',
    large: '',
    large2x: '',
    medium: '',
    original: '',
    portrait: '',
    small: '',
    tiny: '',
  },
  url: '',
};

export const themeInitialState: ThemeState = {
  hexCode: '',
  palette: initialPalette,
  photo: photoInitialState,
  fullfiled: false,
};

export const RandomThemeContext = createContext<ThemeState>(themeInitialState);

function userPrefersDarkMode(
  userScheme: string | undefined
): userScheme is 'dark' {
  if (!userScheme) return false;

  return userScheme === 'dark';
}

const CustomPaletteProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { resolvedTheme: userScheme } = useScheme();

  const [mounted, setMounted] = useState(false);

  const [theme, setTheme] = useState<ThemeState>(themeInitialState);

  const isDarkModeActive = userPrefersDarkMode(userScheme);

  //@region Random theme generation
  const getNewTheme = useCallback(async () => {
    try {
      // Get theme from API
      const res = await fetch('api/theme');
      const { data }: ApiResponse<{ theme: Theme }> = await res.json();

      if (!data?.theme) return;

      const newTheme = data.theme;

      // Apply the theme into CSS variables
      applyPaletteIntoCSS(newTheme.palette);
      applyThemeImage(newTheme.photo);

      setTheme(() => ({ ...newTheme, fullfiled: true }));
    } catch (e) {
      console.log(e);
    }
  }, []);

  const loadInitialTheme = useCallback(async () => {
    if (theme.fullfiled) return;

    getNewTheme();
  }, [theme, getNewTheme]);

  useEffect(() => {
    if (!mounted) return setMounted(true);

    loadInitialTheme();
  }, [loadInitialTheme, mounted]);
  //@endregion

  //@region Handle user scheme change
  // Change theme in dark - light mode change

  // useEffect(() => {
  //   if (!theme.fullfiled) return;

  //   const paletteByScheme = isDarkModeActive
  //     ? theme.darkPalette
  //     : theme.lightPalette;

  //   applyPaletteIntoCSS(paletteByScheme);
  // }, [isDarkModeActive, theme]);
  //@endregion

  return (
    <RandomThemeContext.Provider value={theme}>
      {children}
    </RandomThemeContext.Provider>
  );
};

export default CustomPaletteProvider;
