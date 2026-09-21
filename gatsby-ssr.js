/**
 * Implement Gatsby's SSR APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

/**
 * Gatsby's default html.js renders <html> with no lang attribute, which screen
 * readers and search engines both rely on. Set it for every pre-rendered page.
 *
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
exports.onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: `en` })
}
