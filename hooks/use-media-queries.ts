import { useState } from 'react';

import { useIsomorphicLayoutEffect } from 'usehooks-ts';

type UseMediaQueriesOptions = {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
};

const IS_SERVER = typeof window === 'undefined';

export function useMediaQueries(
  queries: string[],
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueriesOptions = {},
): boolean[] {
  const getMatches = (queries: string[]): boolean[] => {
    if (IS_SERVER) {
      return queries.map(() => defaultValue);
    }
    return queries.map((query) => window.matchMedia(query).matches);
  };

  const [matches, setMatches] = useState<boolean[]>(() => {
    if (initializeWithValue) {
      return getMatches(queries);
    }
    return queries.map(() => defaultValue);
  });

  // Handles the change event for any media query
  const handleChange = (index: number) => {
    setMatches((prevMatches) => {
      const newMatches = [...prevMatches];
      newMatches[index] = window.matchMedia(queries[index]).matches;
      return newMatches;
    });
  };

  useIsomorphicLayoutEffect(() => {
    const mediaQueryLists = queries.map((query) => window.matchMedia(query));

    // Initial check for all queries
    setMatches(getMatches(queries));

    // Setup listeners for each query
    const listeners = mediaQueryLists.map((mql, index) => {
      const listener = () => handleChange(index);

      // Support for older Safari versions
      if (mql.addListener) {
        mql.addListener(listener);
      } else {
        mql.addEventListener('change', listener);
      }

      return { mql, listener };
    });

    // Cleanup function
    return () => {
      listeners.forEach(({ mql, listener }) => {
        if (mql.removeListener) {
          mql.removeListener(listener);
        } else {
          mql.removeEventListener('change', listener);
        }
      });
    };
  }, []); // Only re-run if queries array changes

  return matches;
}
