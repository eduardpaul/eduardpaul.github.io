import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/**
 * Every post, newest first -- the order the activity listings use.
 *
 * `content/blog/<name>/index.mdx` and `content/blog/<name>.mdx` both yield the
 * slug `<name>`, which is what Gatsby's createFilePath produced, so existing
 * URLs are preserved.
 */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog');
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const postPath = (post: Post) => `/${post.id}/`;

export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    // The dates in frontmatter are UTC instants; formatting them in whatever
    // zone the build machine happens to use would shift some of them a day.
    timeZone: 'UTC',
  });
