import { notFound } from 'next/navigation';

import { CvDocument } from '@/cv/components/cv-document';
import en from '@/cv/content/en';
import es from '@/cv/content/es';
import { CvContent } from '@/cv/content/types';
import { CvThemeName, cvThemes } from '@/cv/themes';

import '@/cv/styles.css';

const CONTENT_BY_LOCALE: Record<string, CvContent> = { es, en };

/**
 * Hot-reloading CV layout preview — dev only. Reuses the exact same
 * components cv/generate.tsx feeds to Puppeteer; only the font/background
 * wiring differs (real next/font values here vs. embedded data URIs there).
 */
export default async function CvPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ theme?: string }>;
}) {
  if (process.env.NODE_ENV !== 'development') notFound();

  const { locale } = await params;
  const { theme: themeParam } = await searchParams;

  const content = CONTENT_BY_LOCALE[locale] ?? es;
  const themeName: CvThemeName = themeParam === 'dark' ? 'dark' : 'light';
  const theme = cvThemes[themeName];

  return (
    <div
      className='font-archivo text-[13.5px] leading-[1.3] text-(--cv-text)'
      style={
        {
          '--cv-text': theme.text,
          '--cv-muted': theme.muted,
          backgroundColor: theme.background,
          backgroundImage: `linear-gradient(to top, ${theme.background} 0%, ${theme.background} 95%, ${theme.gradientAccent} 100%)`,
          backgroundRepeat: 'no-repeat',
        } as React.CSSProperties
      }
    >
      <CvDocument content={content} />
    </div>
  );
}
