import type { Metadata } from 'next';
import { Archivo } from 'next/font/google';
import localFont from 'next/font/local';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap/gsap-core';

import LoadingScreen from '@/components/loading_screen';
import AnimationsProvider from '@/components/providers/animations';
import LenisProvider from '@/components/providers/lenis_provider';
import RandomThemeProvider from '@/components/providers/random_theme';
import ScanProvider from '@/components/providers/scan';
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
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
});

export const metadata: Metadata = {
  title: 'FELIPE SARACHO',
  description: 'Desarrollador Full-Stack',
  openGraph: { images: OgImage.src,  },
};

gsap.registerPlugin(useGSAP);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LenisProvider>
      <ScanProvider />
      <html
        lang='es-ES'
        suppressHydrationWarning
        translate='no'
        className='notranslate h-full max-h-full'
      >
        <body
          className={`${ppNeueMontreal.variable} ${archivo.variable} h-full bg-background font-neue text-foreground antialiased md:transition-colors`}
          suppressHydrationWarning
        >
          <SchemeProvider attribute='class' defaultTheme='system' enableSystem>
            <RandomThemeProvider>
              <LoadingScreen />
              <AnimationsProvider />
              {children}
            </RandomThemeProvider>
          </SchemeProvider>
        </body>
      </html>
    </LenisProvider>
  );
}
