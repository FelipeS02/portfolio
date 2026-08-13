import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/env';

// A single entry: the locale is negotiated per request from a cookie, so there
// is no per-language URL to list — see i18n/routing.ts
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
