import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import Hello from '@/components/sections/hello/hello';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HelloMetadata' });

  return {
    title: t('title'),
    description: t('description'),
    // Only reached by scanning a printed card, and it duplicates the home page.
    // noindex (not robots.txt) is what actually keeps it out of results when
    // someone links to it.
    robots: { index: false, follow: false },
  };
}

export default async function HelloPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <Hello />;
}
