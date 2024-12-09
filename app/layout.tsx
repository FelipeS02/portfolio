import type { Metadata } from 'next';
import localFont from 'next/font/local';
import SchemeProvider from '@/components/providers/SchemeProvider';
import RandomThemeProvider from '@/components/providers/RandomThemeProvider';
import LoadingScreen from '@/components/LoadingScreen';
import { gsap } from 'gsap/gsap-core';
import { useGSAP } from '@gsap/react';
import LenisProvider from '@/components/providers/LenisProvider';
import AnimationsProvider from '@/components/providers/AnimationsProvider';
import { Archivo } from 'next/font/google';
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
};

gsap.registerPlugin(useGSAP);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LenisProvider>
      <html
        lang='es-ES'
        suppressHydrationWarning
        translate='no'
        className='notranslate h-full max-h-full'
      >
        <body
          className={`${ppNeueMontreal.variable} ${archivo.variable} h-full text-foreground bg-background font-neue antialiased md:transition-colors`}
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
