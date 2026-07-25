// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  // Server (not static) output: the @astrojs/node standalone server serves
  // prerendered static files directly from disk, bypassing src/middleware.ts
  // entirely - the security headers (CSP, HSTS, X-Frame-Options, etc.) would
  // never reach an actual page. Rendering every route on-demand routes all of
  // them through the same middleware. Fine for this site's traffic - no page
  // does meaningful work beyond templating.
  output: 'server',

  adapter: node({
    mode: 'standalone'
  })
});