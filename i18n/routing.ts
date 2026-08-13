import { defineRouting } from 'next-intl/routing';

export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';
// One year — the switcher is an explicit choice, it should outlive the session
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  // The locale never appears in the URL: it is resolved from the cookie, then
  // from `accept-language`. Trades per-language URLs (and their SEO) for a
  // switch that needs no navigation — see components/providers/locale-transition.tsx
  localePrefix: 'never',
  localeDetection: true,
  localeCookie: {
    name: LOCALE_COOKIE_NAME,
    maxAge: LOCALE_COOKIE_MAX_AGE,
  },
});

export type Locale = (typeof routing.locales)[number];
