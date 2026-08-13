import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import OgImage from '@/public/assets/images/og_image.webp';

import { SITE_URL } from '@/lib/env';

import { routing } from '@/i18n/routing';

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

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    // Every locale is served from the same URL, so there is no alternate to
    // point at — the locale is negotiated per request, not addressable
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title,
      description,
      url: '/',
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

// Only what actually depends on the locale lives here — everything below this
// segment is remounted when the language changes, see app/layout.tsx
export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  const [t, messages] = await Promise.all([
    getTranslations({ locale, namespace: 'Metadata' }),
    getMessages(),
  ]);

  return (
    <>
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
        {children}
        <Analytics />
        <SpeedInsights />
      </NextIntlClientProvider>
    </>
  );
}
