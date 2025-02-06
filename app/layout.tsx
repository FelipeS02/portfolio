import type { Metadata } from 'next';
import { Archivo } from 'next/font/google';
import localFont from 'next/font/local';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import LoadingScreen from '@/components/ui/loading-screen/loading_screen';
import LenisProvider from '@/components/providers/lenis';
import RandomThemeProvider from '@/components/providers/random-theme';
import SchemeProvider from '@/components/providers/scheme';
import OgImage from '@/public/assets/images/og_image.webp';

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
  variable: '--font-ppNeueMontreal',
});

const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
});

export const metadata: Metadata = {
  title: 'FELIPE SARACHO',
  description:
    'Desarrollador Full-Stack con +3 años de experiencia. Mi objetivo es crear productos que no solo sigan las tendencias actuales, sino que también sean atemporales y perduren en el tiempo',
  openGraph: { images: OgImage.src },
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
  },
  verification: {
    google: 'CDjgJ2k6nqoiYJk-q4pDS0CzBZ_nN8y9fJfzTTwETIQ',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LenisProvider>
      {/* <ScanProvider /> */}
      <html
        lang='es-ES'
        translate='no'
        className='notranslate size-screen'
        suppressHydrationWarning
      >
        <body
          className={`${ppNeueMontreal.variable} ${archivo.variable} h-full bg-background font-neue text-foreground antialiased transition-[background-color] duration-300`}
          suppressHydrationWarning
        >
          <SchemeProvider attribute='class' defaultTheme='system' enableSystem>
            <RandomThemeProvider>
              <LoadingScreen />

              {children}
            </RandomThemeProvider>
          </SchemeProvider>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </LenisProvider>
  );
}
