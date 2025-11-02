/**
 * @type {import('gatsby').GatsbyConfig}
 */

import { dirname } from "path"
import { fileURLToPath } from "url"

// import remarkFrontmatter from 'remark-frontmatter'
// import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
// import remarkGfm from 'remark-gfm'
// import remarkParse from 'remark-parse'
// import remarkRehype from 'remark-rehype'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default {
  siteMetadata: {
    title: `Eduard Paul Lakida`,
    author: {
      name: `Eduard Paul Lakida`,
      summary: `who lives and works in the Philippines building useful things.`,
    },
    description: `A starter blog demonstrating what Gatsby can do.`,
    siteUrl: `https://eduardpaul.work`,
    image: `/src/images/icon.png`,
    social: {
      twitter: `@eduapauldev`,
    },
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/cv/cv.json`,
        name: `cv`,
      },
    },
    `gatsby-transformer-json`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          `gatsby-remark-responsive-iframe`,
          `gatsby-remark-prismjs`, // It needs to be the last one
        ],
        // // When you provide mdxOptions, you override the defaults.
        // // You must include plugins for frontmatter and GFM.
        // mdxOptions: {
        //   remarkPlugins: [
        //     remarkFrontmatter, remarkMdxFrontmatter
        //   ]
        // }
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt, // You might want to use node.body here for MDX
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `{
              allMdx(sort: {frontmatter: {date: DESC}}) {
                nodes {
                  excerpt
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }`,
            output: "/rss.xml",
            title: "Eduard Paul Lakida's RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Eduard Paul Lakida`,
        short_name: `Eduard Paul Lakida`,
        start_url: `/`,
        background_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "GTM-NVH7BJBQ",
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'pages',
        engine: 'flexsearch',
        engineOptions: {
          encode: "icase", // Ignore case
          tokenize: "forward", // Search for prefixes, e.g., "prog" matches "progress"
          // resolution: 9,
          minlength: 1, // Search for queries of at least this length
        },
        query: `
          {
            allMdx {
              nodes {
                id
                frontmatter {
                  title
                  date(formatString: "MMMM DD, YYYY")
                  description
                }
                excerpt
                fields {
                  slug
                }
              }
            }
          }
        `,

        // Field used as the reference value for each document.
        // Default: 'id'.
        ref: 'id',

        // List of keys to index. The values of the keys are taken from the
        // normalizer function below.
        // Default: all fields
        index: ['title', 'excerpt'],

        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields.
        store: ['id', 'fields', 'frontmatter', 'excerpt'],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. The objects must contain the `ref`
        // field above (default: 'id'). This is required.
        normalizer: ({ data }) =>
          data.allMdx.nodes.map(node => ({
            id: node.id, // from GraphQL
            fields: { slug: node.fields.slug }, // Mimic GraphQL structure
            frontmatter: { // Mimic GraphQL structure
              title: node.frontmatter.title,
              description: node.frontmatter.description,
              date: node.frontmatter.date,
            },
            excerpt: node.excerpt
          })),
      },
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-offline`, // This should be the last plugin.
  ],
}
