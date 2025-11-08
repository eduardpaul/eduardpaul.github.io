
import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from 'gatsby'
import { useFlexSearch } from "react-use-flexsearch"
import AnimatedSection from './ui/AnimatedSection';

const Activity = () => {
  let { localSearchPages: { index, store }, allMdx } = useStaticQuery(
    graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    localSearchPages {
      index
      store
    }
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          external
        }
      }
    }
  }
`)

  const [query, setQuery] = useState("")
  const results = useFlexSearch(query, index, store)

  const posts = query ? results : allMdx.nodes

  return (
    <section id="online-activity" class="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">My Online Activity</h2>
            <p className="mt-4 text-lg text-gray-600">A glimpse into my latest posts, shares, and insights.</p>
          </div>
    
          <div class="max-w-md mx-auto mb-12">
            <div class="relative">
              <input
                type="text"
                placeholder="Search posts..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                class="w-full rounded-full border border-gray-300 py-3 px-6 pr-12 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 shadow-sm"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-5 h-5 text-gray-400 absolute right-5 top-3.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                />
              </svg>
            </div>
          </div>
        </AnimatedSection>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => {
            const title = post.frontmatter?.title || post.title
            const slug = post.fields?.slug || post.slug
            const description = post.frontmatter?.description || post.description
            const date = post.frontmatter?.date || post.date

            return (
              <AnimatedSection>
                <Link to={slug} key={slug} className="block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                  <article itemScope itemType="http://schema.org/Article" className="flex flex-col h-full">
                    <header>
                      <h2 className="text-xl font-semibold text-gray-800 group-hover:text-primary-600" itemProp="headline">
                        {title}
                      </h2>
                      <small className="text-gray-500">{date}</small>
                    </header>
                    <section className="flex-grow mt-2">
                      <p
                        className="text-gray-600"
                        dangerouslySetInnerHTML={{ __html: description }}
                        itemProp="description"
                      />
                    </section>
                    <footer class="mt-4">
                      <div
                        class="inline-flex items-center text-primary-600 font-medium hover:underline"
                      >
                        View post
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="currentColor"
                          class="w-4 h-4 ml-1"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                      </div>
                    </footer>
                  </article>
                </Link>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default Activity;
