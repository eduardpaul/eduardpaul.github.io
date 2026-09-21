/**
 * Stands in for Gatsby's `excerpt(pruneLength: 160)`, which has no equivalent
 * in astro:content. Used when a post omits `description`, so the post cards
 * and the meta description still say something.
 *
 * Deliberately crude: it strips the markdown/MDX syntax that would read badly
 * as prose rather than parsing the document, because the output is only ever
 * plain text.
 */
const PRUNE_LENGTH = 160;

export function excerpt(body: string | undefined, pruneLength = PRUNE_LENGTH): string {
  if (!body) return '';

  const text = body
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '') // frontmatter, if the raw file was passed
    .replace(/^\s*import\s.+$/gm, '') // MDX imports
    .replace(/^\s*export\s[\s\S]*?$/gm, '') // MDX exports
    .replace(/```[\s\S]*?```/g, '') // fenced code
    .replace(/<[^>]+>/g, '') // HTML/JSX tags
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links -> their text
    .replace(/^\s{0,3}#{1,6}\s+/gm, '') // headings
    .replace(/^\s{0,3}>\s?/gm, '') // blockquotes
    .replace(/^\s{0,3}([-*+]|\d+\.)\s+/gm, '') // list markers
    .replace(/(\*\*|__|\*|_|`)/g, '') // emphasis and inline code
    .replace(/\s+/g, ' ')
    .trim();

  if (text.length <= pruneLength) return text;

  // Cut on a word boundary rather than mid-word, the way Gatsby's prune did.
  const cut = text.slice(0, pruneLength);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[,.;:!?-]+$/, '')}…`;
}
