import { globby } from 'globby';
import { writeFile } from 'fs/promises';
import path from 'path';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export async function generateSitemap(): Promise<string> {
  // Get all .tsx and .mdx pages except _app.tsx, _document.tsx, api/*, and 404.tsx
  const pages: string[] = await globby([
    'src/app/**/page.tsx',
    '!src/app/**/_*.tsx', // Exclude private pages
    '!src/app/api', // Exclude API routes
    '!src/app/**/error.tsx',
    '!src/app/**/loading.tsx',
    '!src/app/**/not-found.tsx',
  ]);

  const currentDate = formatDate(new Date());

  // Generate sitemap items
  const sitemapItems = pages
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

      const url = `${SITE_URL}${route}`;

      return `
    <url>
      <loc>${url}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${route === '' ? '1.0' : '0.8'}</priority>
    </url>`;
    })
    .filter(Boolean)
    .join('');

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemapItems}
</urlset>`;

  // Write sitemap to public directory
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  await writeFile(sitemapPath, sitemap);

  return sitemap;
} 