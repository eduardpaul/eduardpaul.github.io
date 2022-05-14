import * as React from "react"
import { Link, graphql } from "gatsby"

import Seo from "../components/seo"
import PageLayout from "../components/pageLayout"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const author = data.site.siteMetadata?.author
  const { previous, next } = data

  return (
    <PageLayout location={location} title={siteTitle}>

      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />

      <article class="">
        <div class="w-full text-center py-2">
          <p class="text-xs font-semibold tracking-wider uppercase">#POST</p>
          <h1 class="text-4xl font-bold leading-tight md:text-5xl">{post.frontmatter.title}</h1>
          <p class="text-sm text-coolGray-400 py-2"><span>by </span>
            <Link to="/about"><span>{author.name}</span></Link> on
            <time datetime={post.frontmatter.date}> {post.frontmatter.date} </time>
            <hr class="m-2" />
          </p>
        </div>
        <div class="text-coolGray-100">
          <section
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </article>

      <nav className="p-2 lg:p-12 mx-auto">
        <div class="w-full flex mx-auto text-center">
          <div class="w-1/2 text-left">
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                <strong> ← Previous post</strong>
              </Link>
            )}
          </div>
          <div class="w-1/2 text-right" >
            {next && (
              <Link to={next.fields.slug} rel="next">
                <strong>Next post → </strong>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </PageLayout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
