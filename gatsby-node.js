/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { createRemoteFileNode } = require("gatsby-source-filesystem");
const crypto = require("crypto");

// Define the template for blog post
const blogPost = path.resolve(`./src/templates/blog-post.js`)

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      allMdx(sort: { frontmatter: { date: ASC } }, limit: 1000) {
        nodes {
          id
          fields {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMdx.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: `${blogPost}?__contentFilePath=${post.internal.contentFilePath}`,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = async ({ node, actions, createNodeId, store, cache, getCache, getNode, reporter }) => {
  const { createNode, createNodeField, deleteNode } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }

  // Check if the node is the cv.json data
  if (node.internal.type === 'CvJson') {

    const newNode = JSON.parse(JSON.stringify(node)); // deep clone (breaks immutability)

    // Helper function to process external images
    const processExternalImageLink = async (imageObject, parentNodeId) => {
      if (imageObject && imageObject.link) {
        try {
          console.log(`Downloading image ${imageObject.link}`);
          const fileNode = await createRemoteFileNode({
            url: imageObject.link,
            parentNodeId: parentNodeId,
            createNode,
            createNodeId,
            cache,
            store,
            reporter,
          });
          // If the file was created successfully, link it to the original node.
          if (fileNode) {
            reporter.info(`image ${imageObject.link} downloaded ${fileNode.id}`);
            // createNodeField({ node, name: "localFile_" + fileNode.id, value: fileNode })
            // Use the '___NODE' convention to create a link between nodes
            imageObject.localFile___NODE = fileNode.id;
          }
        } catch (err) {
          reporter.warn(`Failed to download image ${imageObject.link} with error: ${err}`);
        }
      }
    };

    // Recursively walk any nested structure to find objects with a 'link' key
    const walk = async (obj, parentId) => {
      if (Array.isArray(obj)) {
        await Promise.all(obj.map((v) => walk(v, parentId)));
      } else if (obj && typeof obj === "object") {
        if (obj.link && typeof obj.link === "string") {
          await processExternalImageLink(obj, parentId);
        }
        for (const key of Object.keys(obj)) {
          await walk(obj[key], parentId);
        }
      }
    };

    await walk(newNode, node.id);

    // deleteNode({ node });
    createNode({
      ...newNode,
      id: createNodeId(`${node.id} >>> CvJsonEnhanced`),
      parent: node.id,
      children: [],
      internal: {
        type: "CvJsonEnhanced",
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(newNode))
          .digest(`hex`),
      },
    });
    reporter.info(`CvJson node updated with image relationships`);
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
      description: String
    }

    type Author {
      name: String
      summary: String
      position: String
    }

    type Social {
      twitter: String
    }

    type Mdx implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      external: String
    }

    type Fields {
      slug: String
    }
  `)
}