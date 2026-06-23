import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kyochichoolaimedu.com';

/**
 * Dynamic robots.txt generation via Next.js App Router.
 * This file takes precedence over any static robots.txt in the app directory.
 * Ref: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin_kycdu/',
          '/_next/',
          '/static/',
        ],
      },
      {
        // Block AI model training dataset scrapers (keeps search assistants active)
        userAgent: [
          'CCBot',
          'Omgilibot',
          'Omgili',
          'FacebookBot',
        ],
        disallow: ['/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
