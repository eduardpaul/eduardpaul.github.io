# eduardpaul.work

Personal CV and blog for Eduard Paul Lakida, built with [Astro](https://astro.build)
and deployed to GitHub Pages at <https://eduardpaul.work>.

Everything is static: no backend, no API calls at runtime, and no client-side
framework. The only JavaScript that ships is a few hundred bytes of inlined
module script for the header, the reveal-on-scroll animation and the
mobile-only "Read more" control, plus Pagefind — which is fetched only once a
visitor focuses a search box.

## Content

| What | Where |
|------|-------|
| Professional profile (Manfred format) | `content/cv/cv.json` |
| Blog posts | `content/blog/**/*.mdx` |
| Files served verbatim | `public/` |

Post URLs come from the filename: `content/blog/my-post.mdx` and
`content/blog/my-post/index.mdx` both publish at `/my-post/`.

Frontmatter is validated against a schema in `src/content.config.ts`, so a
missing title or malformed date fails the build rather than reaching the site.

```yaml
---
title: Post title
date: "2024-02-29T00:00:00.000Z"   # ISO 8601
description: "Shown in post cards and as the meta description."  # optional
external: https://medium.com/...   # optional, if cross-published
---
```

## Commands

```bash
npm install
npm run dev        # dev server at http://localhost:4321
npm run build      # prebuild media -> astro build -> pagefind, output in dist/
npm run preview    # serve dist/ locally
npm run check      # typecheck .astro templates and content schemas
```

Search only works against a real build (`npm run build && npm run preview`);
Pagefind indexes `dist/`, which `npm run dev` does not produce.

`npm run build` runs `scripts/fetch-media.mjs` first, which downloads the
images `cv.json` points at and generates the web manifest icons. Those land in
`src/assets/cv-media/`, `public/cv-media/` and `public/icons/`, all
gitignored and all rebuilt on demand, so the first build needs network access.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site
and publishes `dist/` to GitHub Pages. Pull requests run
`.github/workflows/ci.yml`, which installs, typechecks and builds without
deploying.

## Architecture notes

`CLAUDE.md` documents the conventions, the pitfalls specific to this codebase,
and why particular choices were made.
