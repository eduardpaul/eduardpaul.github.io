// Replaces gatsby-node.js's createRemoteFileNode: pull every image referenced
// by cv.json into the repo before the build, so nothing is fetched
// cross-origin at runtime and every asset is optimizable locally.
//
// Rasters land in src/assets/ so astro:assets can process them -- it reads the
// real intrinsic size off the file, which is what keeps aspect ratios correct
// and the width/height attributes honest. SVGs land in public/ instead,
// because sharp cannot process them and they are served as-is.
//
// Runs from `prebuild`, so `npm run build` always has what it needs.
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

// Vite emits every file matched by the glob in CvImage.astro whether or not a
// page renders it, so the cached source is normalized rather than kept as-is:
// the largest badge is a 2532x3192 PNG and nothing is displayed above 400px
// wide. WebP at 800px keeps 2x headroom and takes the cache from 701KB to
// 269KB, which is what ends up mirrored into dist/.
const MAX_EDGE = 800;
const QUALITY = 82;

const CV = new URL('../content/cv/cv.json', import.meta.url);
const RASTER_DIR = new URL('../src/assets/cv-media/', import.meta.url);
const SVG_DIR = new URL('../public/cv-media/', import.meta.url);

const cv = JSON.parse(await readFile(CV, 'utf8'));

const urls = new Set();
const walk = (node) => {
  if (Array.isArray(node)) return node.forEach(walk);
  if (!node || typeof node !== 'object') return;
  if (typeof node.link === 'string') urls.add(node.link);
  Object.values(node).forEach(walk);
};
walk(cv);

await mkdir(RASTER_DIR, { recursive: true });
await mkdir(SVG_DIR, { recursive: true });

/** cv.json's `link` ends in the source filename; that is the cache key. */
export const cacheName = (url) => {
  const file = url.split('/').pop();
  return url.toLowerCase().endsWith('.svg') ? file : `${file.replace(/\.[^.]+$/, '')}.webp`;
};

let downloaded = 0;
let cached = 0;

for (const url of urls) {
  const isSvg = url.toLowerCase().endsWith('.svg');
  const dest = new URL(cacheName(url), isSvg ? SVG_DIR : RASTER_DIR);

  if (existsSync(dest)) {
    cached++;
    continue;
  }

  const res = await fetch(url);
  if (!res.ok) {
    // Failing loudly beats shipping a page with broken images.
    // createRemoteFileNode behaved the same way.
    throw new Error(`fetch-media: ${res.status} ${res.statusText} for ${url}`);
  }

  const body = Buffer.from(await res.arrayBuffer());

  if (isSvg) {
    await writeFile(dest, body);
  } else {
    // `withoutEnlargement` leaves anything already under the cap untouched.
    await sharp(body)
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(fileURLToPath(dest));
  }

  downloaded++;
}

console.log(`fetch-media: ${urls.size} image(s) ready (${downloaded} downloaded, ${cached} cached)`);

// gatsby-plugin-manifest rasterized the favicon into a set of PNG icons.
// Nothing in Astro does that, so generate the two sizes the install prompt
// actually asks for; the SVG in site.webmanifest covers every other case.
const ICON_SIZES = [192, 512];
const ICON_SRC = new URL('../public/favicon.svg', import.meta.url);
const ICON_DIR = new URL('../public/icons/', import.meta.url);

await mkdir(ICON_DIR, { recursive: true });

for (const size of ICON_SIZES) {
  const dest = new URL(`icon-${size}x${size}.png`, ICON_DIR);
  if (existsSync(dest)) continue;
  await sharp(fileURLToPath(ICON_SRC), { density: 384 })
    .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(fileURLToPath(dest));
}

console.log(`icons: ${ICON_SIZES.length} manifest icon(s) ready`);
