import { type NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Best-effort per-IP throttle for the static CV PDFs. State lives in this
// proxy's Node.js process memory (proxy.ts always runs on the nodejs runtime,
// not edge), so it resets on cold starts and isn't shared across serverless
// instances — it stops a single client hammering the download, not a real
// distributed flood.
const CV_PDF_PATTERN = /^\/cv\/.*\.pdf$/;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_TRACKED_IPS = 1000;

const hitsByIp = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  if (hitsByIp.size > MAX_TRACKED_IPS) {
    for (const [key, entry] of hitsByIp) {
      if (now > entry.resetAt) hitsByIp.delete(key);
    }
  }

  const entry = hitsByIp.get(ip);

  if (!entry || now > entry.resetAt) {
    hitsByIp.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

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

export function proxy(request: NextRequest) {
  if (CV_PDF_PATTERN.test(request.nextUrl.pathname)) {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      'unknown';

    if (isRateLimited(ip)) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: { 'Retry-After': '60' },
      });
    }

    return NextResponse.next();
  }

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
  matcher: ['/((?!_next|.*\\..*).*)', '/cv/:path*.pdf'],
};
