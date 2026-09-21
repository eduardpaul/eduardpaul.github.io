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

    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          // Astro marks every MDX entry with a `use astro:head-inject`
          // directive and Rollup then reports one MODULE_LEVEL_DIRECTIVE
          // warning per post. It is Astro's own internal marker, not
          // something a post can fix, and it would bury real warnings once
          // the archive grows. Everything else still surfaces.
          if (
            warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
            warning.message.includes('astro:head-inject')
          ) {
            return;
          }
          warn(warning);
        },
      },
    },
  },
});
