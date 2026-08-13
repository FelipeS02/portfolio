import { Archivo } from 'next/font/google';
import localFont from 'next/font/local';
import { cookies } from 'next/headers';
import { getLocale } from 'next-intl/server';

import LoadingScreen from '@/components/common/loading-screen/loading-screen';
import { EngineProvider } from '@/components/providers/engine';
import LenisProvider from '@/components/providers/lenis';
import LocaleTransitionProvider from '@/components/providers/locale-transition';
import RandomThemeProvider from '@/components/providers/random-theme';
import SchemeProvider from '@/components/providers/scheme';

import { Locale } from '@/i18n/routing';

import './globals.css';

const ppNeueMontreal = localFont({
  src: [
    {
      path: './fonts/ppneuemontreal-thin.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/ppneuemontreal-book.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/ppneuemontreal-medium.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/ppneuemontreal-bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-neue',
});

const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
});

/**
 * Everything locale-independent lives here, above the `[locale]` segment.
 *
 * Two App Router rules shape this split. The root layout is the only one that
 * survives a client-side navigation, and React remounts every subtree below a
 * dynamic segment whose value changed. So the random theme, the loading screen
 * and the locale transition all have to sit above `[locale]` — otherwise
 * switching the language would reroll the palette and restart the animation
 * they are supposed to be playing.
 */
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [locale, cookieStore] = await Promise.all([getLocale(), cookies()]);

  const engine = (cookieStore.get('engine')?.value as any) ?? 'unknown';

  return (
    <html
      lang={locale}
      translate='no'
      className='notranslate size-screen'
      suppressHydrationWarning
    >
      <head>
        <link
          rel='icon'
          href='/favicon-light.svg'
          media='(prefers-color-scheme: light)'
        />
        <link
          rel='icon'
          href='/favicon-dark.svg'
          media='(prefers-color-scheme: dark)'
        />
        <link rel='icon' id='favicon-link' />
      </head>
      <body
        className={`${ppNeueMontreal.variable} ${archivo.variable} bg-background font-neue text-foreground h-full antialiased transition-[background-color] duration-300`}
        suppressHydrationWarning
      >
        <LenisProvider>
          <LocaleTransitionProvider locale={locale as Locale}>
            <EngineProvider engine={engine}>
              <SchemeProvider
                attribute='class'
                defaultTheme='system'
                enableSystem
              >
                <RandomThemeProvider>
                  <LoadingScreen />
                  {children}
                </RandomThemeProvider>
              </SchemeProvider>
            </EngineProvider>
          </LocaleTransitionProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
