'use client';

import { applyPaletteIntoCSS, applyThemeImage } from '@/lib/dom';
import { getThemeImageByDevice, hexIsValid, initialPalette } from '@/lib/theme';
import { ApiResponse } from '@/models/api';
import { Photo } from '@/models/photos';
import { Theme } from '@/models/theme';
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface ThemeState extends Omit<Theme, 'photo'> {
  loading: boolean;
  fullfiled: boolean;
  photo: {
    info: Photo;
    resolvedSrc: string;
  };
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
  photo: { resolvedSrc: '', info: photoInitialState },
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
      const res = await fetch(`api/theme?color=${color.replace('#', '')}`);

      const { data }: ApiResponse<{ theme: Theme }> = await res.json();

      if (!data?.theme) throw new Error('Failed to get theme');

      const newTheme = data.theme;

      const resolvedSrc = getThemeImageByDevice(newTheme.photo);

      // Apply the theme into CSS variables
      applyPaletteIntoCSS(newTheme.palette);
      applyThemeImage(resolvedSrc);

      setTheme((prev) => ({
        ...prev,
        ...newTheme,
        photo: { info: newTheme.photo, resolvedSrc },
        fullfiled: true,
      }));
    } catch (e) {
      console.log(e);
    } finally {
      setTheme((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  // Initial theme loading
  useEffect(() => {
    if (!mounted) return setMounted(true);

    getNewTheme();
  }, [mounted, getNewTheme]);

  const memoizedValue = useMemo(
    () => ({ ...theme, getNewTheme }),
    [getNewTheme, theme]
  );

  return (
    <RandomThemeContext.Provider value={memoizedValue}>
      {children}
    </RandomThemeContext.Provider>
  );
};

export default CustomPaletteProvider;
