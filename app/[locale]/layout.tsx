import type { Metadata } from 'next';
import { Archivo } from 'next/font/google';
import localFont from 'next/font/local';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import LoadingScreen from '@/components/common/loading-screen/loading-screen';
import { EngineProvider } from '@/components/providers/engine';
import LenisProvider from '@/components/providers/lenis';
import RandomThemeProvider from '@/components/providers/random-theme';
import SchemeProvider from '@/components/providers/scheme';
import OgImage from '@/public/assets/images/og_image.webp';

import { SITE_URL } from '@/lib/env';

import { routing } from '@/i18n/routing';

import '../globals.css';

const ppNeueMontreal = localFont({
  src: [
    {
      path: '../fonts/ppneuemontreal-thin.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/ppneuemontreal-book.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/ppneuemontreal-medium.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/ppneuemontreal-bold.otf',
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  const title = t('title');
  const description = t('description');
  const path = locale === routing.defaultLocale ? '/' : `/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        'es-ES': '/',
        'en-US': '/en',
      },
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: 'Felipe Saracho',
      locale: locale === 'en' ? 'en_US' : 'es_ES',
      type: 'website',
      images: [{ url: OgImage.src, width: OgImage.width, height: OgImage.height }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OgImage.src],
    },
    keywords: t.raw('keywords') as string[],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'CDjgJ2k6nqoiYJk-q4pDS0CzBZ_nN8y9fJfzTTwETIQ',
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  const [cookieStore, t, messages] = await Promise.all([
    cookies(),
    getTranslations({ locale, namespace: 'Metadata' }),
    getMessages(),
  ]);
  const engine = (cookieStore.get('engine')?.value as any) ?? 'unknown';

  return (
    <LenisProvider>
      {/* <ScanProvider /> */}
      <html
        lang={locale}
        translate='no'
        className='notranslate size-screen'
        suppressHydrationWarning
      >
        <head>
          <link rel='icon' href='/favicon-light.svg' media='(prefers-color-scheme: light)' />
          <link rel='icon' href='/favicon-dark.svg' media='(prefers-color-scheme: dark)' />
          <link rel='icon' id='favicon-link'/>
        </head>
        <body
          className={`${ppNeueMontreal.variable} ${archivo.variable} bg-background font-neue text-foreground h-full antialiased transition-[background-color] duration-300`}
          suppressHydrationWarning
        >
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: 'Felipe Saracho',
                url: SITE_URL,
                jobTitle: t('jobTitle'),
                image: `${SITE_URL}${OgImage.src}`,
              }),
            }}
          />
          <NextIntlClientProvider messages={messages}>
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
            <Analytics />
            <SpeedInsights />
          </NextIntlClientProvider>
        </body>
      </html>
    </LenisProvider>
  );
}
