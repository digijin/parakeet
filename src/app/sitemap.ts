import { MetadataRoute } from 'next';
import { globby } from 'globby';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all .tsx pages except private pages and API routes
  const pages: string[] = await globby([
    'src/app/**/page.tsx',
    '!src/app/**/_*.tsx',
    '!src/app/api',
    '!src/app/**/error.tsx',
    '!src/app/**/loading.tsx',
    '!src/app/**/not-found.tsx',
  ]);

  // Convert file paths to URLs
  const routes = pages
    .map((page: string) => {
      // Remove src/app and page.tsx to get the route
      const route = page
        .replace('src/app', '')
        .replace('/page.tsx', '')
        .replace(/\/\(.*\)/, ''); // Remove route groups

      // Skip if it's a dynamic route with [param]
      if (route.includes('[') || route.includes(']')) {
        return null;
      }

      return {
        url: `${SITE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
      };
    })
    .filter(Boolean) as MetadataRoute.Sitemap;

  return routes;
} 