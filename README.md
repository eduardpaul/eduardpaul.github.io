# Eduard Paul Lakida

Personal portfolio, CV, and technical blog: [eduardpaul.work](https://eduardpaul.work).

The site is a statically generated Gatsby application built with React, Tailwind CSS, and MDX. Profile and career information is maintained in Manfred-format JSON; blog articles are Markdown/MDX files.

## Development

Requirements: Node.js 24 and npm.

```sh
npm ci
npm run develop
```

Gatsby serves the site at [http://localhost:8000](http://localhost:8000).

Useful commands:

```sh
npm run build     # create the production site in public/
npm run serve     # serve the production build at http://localhost:9000
npm run clean     # clear Gatsby's cache and generated output
npm run format    # format JavaScript, JSON, and Markdown files
```

Run `npm run clean` after changing Gatsby configuration or plugins if the development server or build behaves unexpectedly.

## Content

- `content/cv/cv.json` contains the profile, experience, education, skills, and contact details used across the site.
- `content/blog/` contains blog posts as `.mdx` files. Each post needs `title`, `date`, and `description` frontmatter. Posts can include images stored alongside the MDX file and referenced with a relative path.
- `src/pages/` contains the site's fixed pages; `src/templates/blog-post.js` renders generated article pages.
- `static/` contains files copied directly to the published site, including stable-URL assets and the embedded DeepInfant demo.

## Deployment

GitHub Actions builds and deploys the site to GitHub Pages when changes are pushed to `main`. The workflow installs dependencies with `npm ci`, runs the Gatsby production build, and publishes `public/`. It can also be run manually from the repository's Actions tab.

For a manual deployment, run:

```sh
npm run deploy
```

This builds the site and publishes `public/` using `gh-pages`.
