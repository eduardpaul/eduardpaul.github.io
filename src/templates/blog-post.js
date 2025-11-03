import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import CvImage from "../components/core/cvimage"

const BlogPostTemplate = ({
  data: { previous, next, site, mdx: post, cvJsonEnhanced: { aboutMe: { profile } } },
  children,
  location,
}) => {
  return (
    <Layout location={location}>

      <section id="blog-post" class="py-16 bg-slate-50">
        <div class="container mx-auto px-6">

          <header class="mb-10 text-center">
            <h1 class="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
              {post.frontmatter.title}
            </h1>
            <div class="flex items-center justify-center mt-4 text-sm text-slate-500 space-x-3">
              <CvImage imageObject={profile.avatar} className="w-10 h-10 rounded-full object-cover shadow-sm" />
              <span>By <span class="font-semibold text-blue-700">{profile.name} {profile.surnames}</span></span>
              <span>•</span>
              <span>{post.frontmatter.date}</span>
            </div>
          </header>

          {post.frontmatter.external && (
            <div class="mb-8 bg-blue-50 border border-blue-100 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">
              <div class="mb-3 sm:mb-0">
                <h2 class="text-lg font-semibold text-blue-800">Also read on</h2>
                <p class="text-slate-700 text-sm">This article is also available on my external publication platform.</p>
              </div>
              <a href={post.frontmatter.external} target="_blank" rel="noopener noreferrer" class="inline-block bg-blue-600 text-white font-semibold px-5 py-2 rounded-full hover:bg-blue-700 transition">
                Read on External Site
              </a>
            </div>
          )}

          <article class="prose max-w-none mx-auto max-w-3xl">
            {children}
          </article>

          <nav className="flex items-center justify-between border-t border-gray-200 mt-12 pt-6">
            {previous && (
              <Link
                to={previous.fields.slug}
                rel="prev"
                className="flex items-center max-w-[45%] sm:max-w-[40%] text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-shrink-0 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="truncate sm:whitespace-normal sm:line-clamp-2">
                  {previous.frontmatter.title}
                </span>
              </Link>
            )}

            {next && (
              <Link
                to={next.fields.slug}
                rel="next"
                className="flex items-center justify-end text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base max-w-[45%] sm:max-w-[40%] ml-auto text-right"
              >
                <span className="truncate sm:whitespace-normal sm:line-clamp-2 mr-2">
                  {next.frontmatter.title}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            )}
          </nav>
        </div>
      </section>

    </Layout>
  )
}

export const Head = ({ data: { mdx: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    cvJsonEnhanced {
      aboutMe {
        profile {
          name
          surnames
          title
          avatar {
            alt
            link
            localFile {
              id
              childImageSharp {
                gatsbyImageData(width: 40, placeholder: BLURRED)
              }
            }
          }
        }
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        external
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`