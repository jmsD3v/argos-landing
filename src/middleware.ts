import { defineMiddleware } from 'astro:middleware';
import { createHash } from 'node:crypto';

/**
 * Security headers for every response, including prerendered/static pages
 * (the @astrojs/node adapter runs middleware for those too, not just the
 * on-demand /api/* routes).
 *
 * script-src and style-src stay strict ('self' + per-response hashes) rather
 * than 'unsafe-inline': Astro inlines a few small per-page <script> bodies
 * directly into the built HTML (nav toggle, terminal demo, etc.), and in dev
 * mode Vite additionally injects the *entire* Tailwind stylesheet as a
 * literal inline <style data-vite-dev-id> tag (production builds instead
 * link an external hashed CSS file, so this only shows up in `astro dev`).
 * Rather than fight either bundling decision, every inline <script>/<style>
 * body in a given response is hashed on the fly and added to the matching
 * CSP directive. Content is fully static/build-controlled (no user input
 * ever reaches these blocks), so this is safe and avoids 'unsafe-inline'.
 */
const inlineScriptRe = /<script(?![^>]*\bsrc=)[^>]*type="module"[^>]*>([\s\S]*?)<\/script>/g;
const inlineStyleRe = /<style(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/style>/g;

function hashInline(content: string): string {
  return `'sha256-${createHash('sha256').update(content, 'utf8').digest('base64')}'`;
}

function buildCsp(scriptHashes: Iterable<string>, styleHashes: Iterable<string>): string {
  const directives = [
    `default-src 'self'`,
    `script-src 'self' ${[...scriptHashes].join(' ')}`.trim(),
    `style-src 'self' https://fonts.googleapis.com ${[...styleHashes].join(' ')}`.trim(),
    `font-src 'self' https://fonts.gstatic.com`,
    `img-src 'self' data:`,
    `connect-src 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
    `base-uri 'self'`,
    `object-src 'none'`,
  ];
  return directives.join('; ');
}

export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  const headers = new Headers(response.headers);

  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'geolocation=(), camera=(), microphone=(), payment=(), usb=()');
  headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains');
  headers.delete('X-Powered-By');

  const contentType = headers.get('content-type') ?? '';
  if (!contentType.includes('text/html')) {
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  const html = await response.text();
  const scriptHashes = new Set<string>();
  for (const match of html.matchAll(inlineScriptRe)) {
    scriptHashes.add(hashInline(match[1]));
  }
  const styleHashes = new Set<string>();
  for (const match of html.matchAll(inlineStyleRe)) {
    styleHashes.add(hashInline(match[1]));
  }

  headers.set('Content-Security-Policy', buildCsp(scriptHashes, styleHashes));
  headers.set('Content-Length', String(Buffer.byteLength(html, 'utf8')));

  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});
