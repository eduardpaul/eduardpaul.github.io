import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"

const AllPosts = () => {
    const data = useStaticQuery(graphql`
    query {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          nodes {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
            }
          }
        }
      }
   `)

    const posts = data.allMarkdownRemark.nodes

    return (
        <section class="container">
            {posts.map(post => {
                const title = post.frontmatter.title || post.fields.slug

                return (
                    <Link to={post.fields.slug} itemProp="url" class="w-full block h-full">
                        <div class="flex flex-wrap lg:flex-nowrap pb-8" >
                            <div class="w-full flex lg:w-2/12 flex-col">
                                <span class="font-semibold title-font text-gray-700">CATEGORY</span>
                                <span class="text-gray-500 text-sm">{post.frontmatter.date}</span>
                            </div>
                            <div class="w-full lg:w-10/12">
                                <h2 class="text-2xl font-medium title-font">{title}</h2>
                                <p class="leading-relaxed" dangerouslySetInnerHTML={{
                                    __html: post.frontmatter.description || post.excerpt,
                                }}
                                    itemProp="description" />
                                <a class="inline-flex items-center ">Learn More
                                    <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </section>
    )
}

export default AllPosts
