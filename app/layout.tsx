import type { Metadata } from 'next';
import { Archivo } from 'next/font/google';
import localFont from 'next/font/local';
import { cookies } from 'next/headers';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import LoadingScreen from '@/components/common/loading-screen/loading-screen';
import { EngineProvider } from '@/components/providers/engine';
import LenisProvider from '@/components/providers/lenis';
import RandomThemeProvider from '@/components/providers/random-theme';
import SchemeProvider from '@/components/providers/scheme';
import OgImage from '@/public/assets/images/og_image.webp';

import { SITE_URL } from '@/lib/env';

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

const title = 'FELIPE SARACHO';
const description =
  'Desarrollador Full-Stack con +3 años de experiencia. Mi objetivo es crear productos que no solo sigan las tendencias actuales, sino que también sean atemporales y perduren en el tiempo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'Felipe Saracho',
    locale: 'es_ES',
    type: 'website',
    images: [{ url: OgImage.src, width: OgImage.width, height: OgImage.height }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [OgImage.src],
  },
  keywords: [
    'Desarrollador Full-Stack',
    'Back-End Developer',
    'Front-End Developer',
    'React',
    'Next.js',
    'JavaScript',
    'TypeScript',
    'Redux',
    'Node.js',
    'Express',
    'PostgreSQL',
    'MySQL',
    'SCRUM',
    'Kanban',
    'UX/UI',
    'Figma',
    'ChakraUI',
    'Bootstrap',
    'TailwindCSS',
    'SASS',
    'LESS',
    'Jest',
    'Atomic Design',
    'SOLID',
    'Docker',
    'Prisma',
    'Diseño web',
    'Desarrollo web',
    'Programación',
    'Software',
    'Ingeniería Informática',
    'LILAB',
    'FinTech',
    'E-Commerce',
  ],
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const engine = (cookieStore.get('engine')?.value as any) ?? 'unknown';

  return (
    <LenisProvider>
      {/* <ScanProvider /> */}
      <html
        lang='es-ES'
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
                jobTitle: 'Desarrollador Full-Stack',
                image: `${SITE_URL}${OgImage.src}`,
              }),
            }}
          />
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
        </body>
      </html>
    </LenisProvider>
  );
}
