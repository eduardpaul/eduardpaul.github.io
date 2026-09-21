# CLAUDE.md — Eduard Paul Lakida's CV Site

## Project overview

Static portfolio/CV site for Eduard Paul Lakida. Deployed to GitHub Pages at `https://eduardpaul.work`.

Built with **Astro 7** (SSG), Tailwind CSS v4 and MDX. All professional profile data lives in `content/cv/cv.json` (Manfred format). Blog posts are MDX files in `content/blog/`. The site is fully static — no backend, no API calls at runtime, and **no UI framework**: there is no React, no hydration, no islands. Interactivity is a few hundred bytes of plain module script that Astro inlines into the page.

This replaced a Gatsby 5 + React 18 build. Where a decision looks unusual, it is usually because the Gatsby behaviour was deliberately preserved, or deliberately not.

---

## Commands

```bash
npm run dev       # dev server at http://localhost:4321
npm run build     # prebuild media → astro build → pagefind, output in dist/
npm run preview   # serve dist/ at http://localhost:4321
npm run check     # astro check — typechecks .astro templates and content schemas
```

There is no `clean` step and no build cache to invalidate; `dist/` and `.astro/` are regenerated every build.

**Search only works against a real build.** Pagefind indexes `dist/` *after* `astro build`, so `npm run dev` has no index. The search box detects this and says so rather than failing silently. To test search: `npm run build && npm run preview`.

---

## Architecture

### Data flow

```
content/cv/cv.json
  └─ src/data/cv.ts   (plain import — no GraphQL, no node layer)
        └─ components read it directly

content/blog/**/*.mdx
  └─ src/content.config.ts   (glob loader + Zod schema)
        └─ src/lib/posts.ts  (sorted newest-first, slug + date helpers)
              └─ src/pages/[...slug].astro renders each post

remote images referenced by cv.json
  └─ scripts/fetch-media.mjs  (prebuild)
        ├─ rasters → src/assets/cv-media/   → optimized by astro:assets
        └─ SVGs    → public/cv-media/       → served as-is
```

### Pages

| Route | File |
|-------|------|
| `/` | `src/pages/index.astro` |
| `/about` | `src/pages/about.astro` |
| `/activity` | `src/pages/activity.astro` |
| `/cv-print` | `src/pages/cv-print.astro` |
| `/deepinfant` | `src/pages/deepinfant.astro` (iframe embed) |
| `/[post-slug]` | `src/pages/[...slug].astro` |
| `/rss.xml` | `src/pages/rss.xml.js` |
| 404 | `src/pages/404.astro` |

### Key components

- `Layout` — shell: head, header, author card (non-root pages), footer
- `Seo` — every meta tag; also used by the pages that skip `Layout`
- `Analytics` — the gtag snippet; included by `Layout` **and** by each standalone page
- `Hero`, `Competencies`, `Certifications`, `Highlights`, `Experience` — CV sections
- `Activity` — post grid + search, used on the homepage
- `Search` — Pagefind-backed search wrapping a static list in its default slot
- `PostCard` — one post card, shared by `/` and `/activity`
- `AnimatedSection` — reveal-on-scroll wrapper
- `ReadMore` — mobile-only truncation
- `CvImage` — resolves a cv.json image object to a local optimized image or SVG
- `MarkdownParser` — renders cv.json's bullet-and-bold markdown subset
- `src/components/print/*` — the print CV's sub-components, inline-styled

---

## Directory conventions — these differ from Gatsby

```
public/   input:  copied to the output verbatim   (was static/)
dist/     output: the built site                  (was public/)
```

**Do not** put build output in `public/`, and **do not** gitignore it — it is tracked and holds the favicon, the manifest, the service worker and the DeepInfant demo app.

Three directories inside them are generated and gitignored: `src/assets/cv-media/`, `public/cv-media/` and `public/icons/`. They are produced by `scripts/fetch-media.mjs` on `prebuild`, so a fresh clone needs network access for its first build.

---

## cv.json data model (Manfred format)

Top-level keys: `$schema`, `settings`, `aboutMe`, `experience`, `knowledge`, `careerPreferences`, `manfredSpecificData`

```
aboutMe.profile.{name, surnames, title, description, avatar.{link, alt}, location.municipality}
aboutMe.interestingFacts[].{topic, fact}                → Competencies
aboutMe.relevantLinks[].{type, URL}                     → cv-print header
experience.jobs[].{organization.name, roles[].{name, startDate, finishDate?, challenges[].description}}  → Experience
experience.publicArtifacts[].{details.{name, description, URL, image}, relatedCompetences[], publishingDate}  → Highlights
knowledge.studies[].{studyType, name, startDate, institution.{name, URL, image}}  → Certifications
knowledge.{languages, softSkills}                       → cv-print sidebar
careerPreferences.contact.publicProfiles[].{type, URL}  → Footer
```

There is one CV object. The old `CvJson` vs `CvJsonEnhanced` split is gone — every image on it is already local by the time a component reads it.

`roles[].finishDate` is **absent** on a current role, not null. TypeScript narrows the union, so read it as `'finishDate' in role ? role.finishDate : null`.

---

## Images

Always render cv.json images through `CvImage`. Never write `<img src={imageObject.link}>`: the link points at an S3 bucket, and going back to it means a cross-origin request on every page view.

```astro
<CvImage imageObject={cert.institution.image} alt={cert.institution.name} width={200} class="h-24 object-contain" />
```

`CvImage` resolves the filename at the end of the `link` against what `fetch-media.mjs` downloaded:

1. raster → `<Image>` from `astro:assets`, which emits WebP with correct intrinsic `width`/`height`
2. `.svg` → `<img src="/cv-media/…">`, because sharp cannot process SVG
3. neither on disk → it throws, naming the file and telling you to run the prebuild

**Pass `alt` explicitly.** `imageObject.alt` in cv.json is often the source filename (`avatar.jpg`), which is worse than nothing.

**Do not pass `width` to a remote `<Image>` with `inferSize`.** It overrides the width but keeps the inferred height, silently squashing the image — a 422×563 avatar came out 100×563. This is why every image is downloaded locally first.

Images inside posts use relative paths (`./banner.png`) and are optimized automatically.

For the OG/Twitter social image, put the file in `public/` and reference it as `/filename.svg`.

---

## Astro rules — these are where the React habits bite

### `class`, not `className`; kebab-case SVG attributes

Astro templates are HTML, not JSX. Use `class`, `stroke-width`, `fill-rule`, `stroke-linecap`. JSX spellings are silently dropped.

### No `key` on `.map()`

There is no reconciler. `{items.map((item) => <Card item={item} />)}` is complete.

### `set:html`, not `dangerouslySetInnerHTML`

### `style` accepts an object

`style={{ fontSize: '9px' }}` serializes to `font-size:9px`. This is how the print CV keeps its inline styles.

### Component `<script>` is a module, runs once per page, and is not scoped

A `<script>` in a component is hoisted, deduplicated, bundled and inlined once per page — **not** once per instance. Write it to find its own elements:

```js
for (const root of document.querySelectorAll('.search-root')) { /* … */ }
```

Component scripts do not see the component's props. Use `define:vars` (which forces `is:inline`) or a `data-` attribute.

### `is:inline` for anything Vite must not touch

`Search.astro` imports `/pagefind/pagefind.js`, which does not exist until Pagefind runs over `dist/`. Letting Vite process that import fails the build (`UNRESOLVED_IMPORT`, then `__VITE_PRELOAD__ is not defined`). The analytics snippet is inline for the same reason — it must run immediately, not deferred as a module.

### Files starting with `_` in `src/pages/` are not routed

Useful for scratch pages; confusing when you forget.

---

## Tailwind CSS v4

Wired through `@tailwindcss/vite` (not PostCSS). There is no `tailwind.config.js` and no `postcss.config.js`; `@plugin "@tailwindcss/typography"` in `src/styles/global.css` is how the `prose` class gets in.

### Never toggle two utilities of the same property from JS

This has caused a real bug twice in this codebase. `hidden` and `grid` are both `display`; `max-h-24` and `max-h-none` are both `max-height`. Which one wins depends on stylesheet order, not on the order you added the classes — so search results and the full post list rendered on top of each other.

**Drive the winning value inline instead:**

```js
list.style.display = 'none';          // beats any utility class
content.style.maxHeight = '320px';
```

Static, non-conflicting responsive variants are fine: `max-h-40 md:max-h-none` is how `ReadMore` unclamps on desktop with no JS at all.

Also avoid conflicting utilities on one element in markup (`max-w-none max-w-3xl` — one of them is dead).

---

## Reveal-on-scroll

`.anim` is real CSS in `global.css`, not toggled utilities, so the hidden state has exactly one owner. `AnimatedSection`'s script adds `.is-visible` on intersection and unobserves.

It honours `prefers-reduced-motion`, and `Layout` carries a `<noscript>` rule that reveals everything — without it, a visitor with JS disabled sees a blank page.

**When testing the reveal, assert the `.is-visible` class, not `opacity`.** The transition is 1s, so an element mid-fade reads `0.999` and looks like a failure.

---

## Search — Pagefind

Query `/activity` and the homepage both mount `Search.astro` around a static post list.

- Posts are indexed via `data-pagefind-body` on the `<article>` in `[...slug].astro`. Because *some* page carries that attribute, Pagefind indexes **only** pages that do — so the CV pages stay out of the index.
- Pagefind takes `title` from the page's `<h1>` automatically. `date` is tagged with `data-pagefind-meta="date"` on the existing `<time>` element, so result cards show the same string as the static cards.
- Result snippets are Pagefind's excerpts, which `<mark>` the matched terms.
- **Nothing is fetched until the box is focused.** Keep it that way: the previous FlexSearch index was a single blob inlined into page data at ~40× the size of the content it indexed, and because `/activity` is in the header nav, Gatsby prefetched it from every page on the site.
- Keystroke responses are sequenced so a slow early query cannot overwrite a newer one.

---

## Blog posts

Frontmatter is validated by the Zod schema in `src/content.config.ts`. `title` and `date` are required; a malformed date fails the build naming the file and field.

`description` is optional. When it is missing, `src/lib/excerpt.ts` derives one from the body — this stands in for Gatsby's `excerpt(pruneLength: 160)`, which has no astro:content equivalent.

Slugs come from the file path and must not change: `content/blog/hello-world/index.mdx` → `/hello-world/`. Renaming a post file changes its public URL.

Code blocks are highlighted at build time and the colours are inlined. There is no theme stylesheet to import.

`previous` is the **older** post and `next` the **newer** one, matching the arrow directions.

---

## SEO

`Seo.astro` emits title, description, keywords, OG tags, Twitter card tags and the canonical link. `Layout` includes it; the pages that skip `Layout` include it themselves.

`pathname` is optional. Omitting it canonicalises the page to itself via `Astro.url.pathname`, rather than collapsing onto the site root the way the Gatsby component did when a page forgot to pass it.

**Keywords** are derived from cv.json (name + job title + main stack + hard skills, deduplicated). Pass a `keywords` prop to override per page; update `cv.json` rather than hardcoding.

Keep one `<h1>` per page. The author card in `Layout` uses a styled `<p>` for exactly this reason.

---

## Analytics

`Analytics.astro` carries the gtag snippet and must be included by every page, including the ones that skip `Layout`.

It deliberately does **not** set `send_page_view: false`. The Gatsby plugin did, because Gatsby is a single-page app that reported views itself on route change. Here every navigation is a real page load, so turning it off would stop page views being recorded at all.

---

## `public/sw.js` — do not delete yet

The Gatsby site registered a Workbox service worker at `/sw.js`. Returning visitors still have it installed, and if the path 404'd they could keep being served the cached Gatsby site. `public/sw.js` is now a self-destroying worker: it clears every cache, unregisters itself, and reloads open tabs.

Safe to remove once enough time has passed that no visitor is still carrying the old worker.

---

## Deployment

Push to `main` → `.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages. Node 24, `npm ci`, so **`package-lock.json` must stay in sync with `package.json`** — a desync fails the deploy before the build starts.

Pull requests → `.github/workflows/ci.yml` runs install, `npm run check` and `npm run build` without deploying. The two are separate because the deploy workflow holds `pages: write` and sits in the shared `pages` concurrency group.

The custom domain is configured in the repository's Pages settings; the root `CNAME` file is not part of the build artifact and never was.

---

## Known, pre-existing

- `/cv-print` overflows a phone viewport by ~80px. It is a fixed 794px A4 preview and the Gatsby page had identical widths.
- `content/blog/hello-world/index.mdx` references `https://via.placeholder.com/…`, a third-party service that has shut down. The image 404s on the live site too.
- The homepage lists **every** post. Fine at two; worth capping before the archive grows.
- `gatsby-remark-responsive-iframe` has no replacement. No post currently embeds an iframe; one that does will need a wrapper.

---

## Things to avoid

- **Do not** use `className`, `key`, or JSX-cased SVG attributes in `.astro` files
- **Do not** toggle two utilities of the same CSS property from JavaScript — set the value inline
- **Do not** assume a component `<script>` runs per instance, or can see props
- **Do not** let the search index load before the box is focused
- **Do not** pass `width` to a remote `<Image>` with `inferSize` — download it locally instead
- **Do not** render a cv.json image without an explicit `alt`
- **Do not** rename a post file without accepting that its public URL changes
- **Do not** put build output in `public/` — that directory is build *input*
- **Do not** reintroduce a UI framework for something a dozen lines of script can do
