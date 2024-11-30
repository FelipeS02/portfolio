import { useState } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export type MobileBreakpoint = 'sm';
export type DesktopBreakpoint = 'md' | 'lg' | 'xl';

export type Breakpoint = MobileBreakpoint | DesktopBreakpoint;

export type Matches = Record<Breakpoint, boolean>;

export type Queries = Record<DesktopBreakpoint, string>;

const useBreakpoints = () => {
  const queries: Queries = {
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
  };

  const [matches, setMatches] = useState<Matches>({
    sm: true,
    md: false,
    lg: false,
    xl: false,
  });

  useIsomorphicLayoutEffect(() => {
    const mediaQueryLists = Object.entries(queries).map(([key, query]) => ({
      key,
      mediaQueryList: window.matchMedia(query),
    }));

    const updateMatches = () => {
      const updatedMatches = {} as Matches;

      mediaQueryLists.forEach(({ key, mediaQueryList }) => {
        updatedMatches[key as Breakpoint] = mediaQueryList.matches;
      });

      setMatches(updatedMatches);
    };

    updateMatches();

    mediaQueryLists.forEach(({ mediaQueryList }) =>
      mediaQueryList.addEventListener('change', updateMatches)
    );

    return () => {
      mediaQueryLists.forEach(({ mediaQueryList }) =>
        mediaQueryList.removeEventListener('change', updateMatches)
      );
    };
  }, []);

  return matches;
};

export default useBreakpoints;
