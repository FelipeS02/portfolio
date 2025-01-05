import { RandomThemeContext } from '@/components/providers/random_theme';
import { useContext } from 'react';
import { useTheme as useNextThemes } from 'next-themes';

export const useTheme = () => useContext(RandomThemeContext);

// Declaring useTheme from next-themes as useSchemes to differenciate from app generated theme utility
export const useScheme = useNextThemes;
