import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

function detectEngine(ua: string) {
  if (!ua) return 'unknown';

  // Blink (Chrome, Edge, Opera)
  if (ua.includes('Chrome') || ua.includes('Chromium') || ua.includes('Edg')) {
    return 'blink';
  }

  // WebKit (Safari)
  if (ua.includes('Safari') && !ua.includes('Chrome')) {
    return 'webkit';
  }

  // Gecko (Firefox)
  if (ua.includes('Firefox')) {
    return 'gecko';
  }

  return 'unknown';
}

export function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  const ua = request.headers.get('user-agent') || '';
  const engine = detectEngine(ua);

  response.cookies.set('engine', engine, {
    path: '/',
    sameSite: 'lax',
  });

  return response;
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
