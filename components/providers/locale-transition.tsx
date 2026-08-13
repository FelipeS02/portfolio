'use client';

import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useTransition,
} from 'react';
import { useRouter } from 'next/navigation';

import { LOADING_SCREEN_COVERED } from '@/components/common/loading-screen/loading-screen';

import {
  Locale,
  LOCALE_COOKIE_MAX_AGE,
  LOCALE_COOKIE_NAME,
} from '@/i18n/routing';

// Ceiling for the wait on the loading screen. It only matters when the screen
// never reports back — the switch has to happen either way
const COVER_TIMEOUT_MS = 1500;

export type LocaleTransitionState = {
  /** True from the click until the server sent the tree in the new locale */
  switching: boolean;
  switchLocale: (next: Locale) => void;
};

export const LocaleTransitionContext = createContext<LocaleTransitionState>({
  switching: false,
  switchLocale: () => undefined,
});

// Writes the same cookie the next-intl proxy reads, so the next request for
// this URL is rewritten to the other locale's segment
const persistLocale = (locale: Locale) => {
  document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
};

/**
 * Locale switching without navigation: the locale lives in a cookie, so
 * changing it means re-rendering the current URL rather than moving to another
 * one. `router.refresh()` re-runs the whole server tree — including the root
 * layout, which a client-side navigation would never re-render.
 *
 * Lives in the root layout, above the `[locale]` segment: React remounts
 * everything below a segment whose value changed, and this provider has to
 * outlive the switch it is driving. Hence `locale` as a prop — `useLocale()`
 * is only available further down, under `NextIntlClientProvider`.
 *
 * That remount is also why the refresh waits: rebuilding the page subtree
 * blocks the main thread for ~200ms, which is a visible stutter if it lands
 * while the loading screen is still animating its way in. Covering first and
 * refreshing after costs some latency and buys a clean animation.
 */
const LocaleTransitionProvider: FC<{ locale: Locale; children: ReactNode }> = ({
  locale,
  children,
}) => {
  const router = useRouter();
  const [requested, setRequested] = useState<Locale | null>(null);
  const [refreshing, startTransition] = useTransition();

  const switching = requested !== null || refreshing;

  const switchLocale = (next: Locale) => {
    if (next === locale || switching) return;

    // Only raises the loading screen. The switch itself waits for it to land
    setRequested(next);
  };

  useEffect(() => {
    if (!requested) return;

    let done = false;

    const apply = () => {
      if (done) return;
      done = true;

      persistLocale(requested);
      startTransition(() => router.refresh());
      setRequested(null);
    };

    window.addEventListener(LOADING_SCREEN_COVERED, apply);
    const fallback = window.setTimeout(apply, COVER_TIMEOUT_MS);

    return () => {
      window.removeEventListener(LOADING_SCREEN_COVERED, apply);
      window.clearTimeout(fallback);
    };
  }, [requested, router]);

  return (
    <LocaleTransitionContext.Provider value={{ switching, switchLocale }}>
      {children}
    </LocaleTransitionContext.Provider>
  );
};

export const useLocaleTransition = () => useContext(LocaleTransitionContext);

export default LocaleTransitionProvider;
