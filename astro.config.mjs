// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Absolute URLs (canonicals, sitemap, RSS) are built from this.
  site: 'https://eduardpaul.work',

  integrations: [mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});
