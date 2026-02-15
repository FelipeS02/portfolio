import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

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
  const ua = request.headers.get('user-agent') || '';
  const engine = detectEngine(ua);

  const response = NextResponse.next();

  response.cookies.set('engine', engine, {
    path: '/',
    sameSite: 'lax',
  });

  return response;
}
