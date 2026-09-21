import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Replaces gatsby-source-filesystem + gatsby-plugin-mdx. The loader reads the
// same content/blog directory, and the schema is what gatsby-node.js never
// had: frontmatter is validated at build time, so a typo'd or missing date
// fails the build instead of shipping `null` into the page.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    // Optional, as under Gatsby: an excerpt is derived from the body when a
    // post omits it. See src/lib/excerpt.ts.
    description: z.string().optional(),
    // Set when the post is cross-published; the post page links out to the
    // original and this site keeps the canonical copy.
    external: z.string().url().optional(),
  }),
});

export const collections = { blog };
