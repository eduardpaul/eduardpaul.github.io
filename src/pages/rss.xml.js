import rss from '@astrojs/rss';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import mdxRenderer from '@astrojs/mdx/server.js';
import { render } from 'astro:content';
import { getPosts, postPath } from '../lib/posts';
import { excerpt } from '../lib/excerpt';
import { SITE } from '../config';

export async function GET(context) {
  const posts = await getPosts();

  // gatsby-plugin-feed put `node.body` -- the raw MDX source -- into
  // content:encoded, so the live feed ships markdown syntax to readers that
  // expect HTML. Rendering each post through the container gives them the
  // real article instead.
  const container = await AstroContainer.create();
  container.addServerRenderer({ name: '@astrojs/mdx', renderer: mdxRenderer });

  const items = await Promise.all(
    posts.map(async (post) => {
      const { Content } = await render(post);
      return {
        title: post.data.title,
        description: post.data.description || excerpt(post.body),
        pubDate: post.data.date,
        link: postPath(post),
        content: await container.renderToString(Content),
      };
    }),
  );

  return rss({
    title: `${SITE.title}'s RSS Feed`,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items,
  });
}
