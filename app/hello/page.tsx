import type { Metadata } from 'next';

import Hello from '@/components/sections/hello/hello';

export const metadata: Metadata = {
  title: 'FELIPE SARACHO — Tarjeta',
  description: 'Tarjeta de presentación de Felipe Saracho, desarrollador full-stack.',
  // Only reached by scanning a printed card, and it duplicates the home page.
  // noindex (not robots.txt) is what actually keeps it out of results when
  // someone links to it.
  robots: { index: false, follow: false },
};

export default function HelloPage() {
  return <Hello />;
}
