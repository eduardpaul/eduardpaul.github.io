import React, { useState } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import useSearchIndex from "../components/hooks/useSearchIndex"
import FlexSearchResults from "../components/core/flexsearchresults"

const ActivityPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { publicIndexURL, publicStoreURL } = data.localSearchPages
  const [query, setQuery] = useState("")
  const [searchData, loadSearchIndex] = useSearchIndex(publicIndexURL, publicStoreURL)

  const isSearching = Boolean(query) && Boolean(searchData)

  const cardClass = "block p-6 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300"

  const renderGrid = posts =>
    posts.length === 0 ? (
      <p className="text-center text-slate-500">
        No posts found. Try a different search term.
      </p>
    ) : (
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => {
          const title = post.frontmatter?.title || post.title
          const slug = post.fields?.slug || post.slug
          const description = post.frontmatter?.description || post.excerpt
          const date = post.frontmatter?.date || post.date

          return (
            <Link key={slug} to={slug} className={cardClass}>
              <article itemScope itemType="http://schema.org/Article">
                <header>
                  <h2 className="text-xl font-semibold text-slate-800 hover:text-indigo-600" itemProp="headline">
                    {title}
                  </h2>
                  <small className="text-slate-500">{date}</small>
                </header>
                <section>
                  <p
                    className="mt-2 text-slate-600"
                    dangerouslySetInnerHTML={{ __html: description }}
                    itemProp="description"
                  />
                </section>
              </article>
            </Link>
          )
        })}
      </div>
    )

  return (
    <Layout location={location} title={siteTitle}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            All Posts
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-slate-600">
            Explore my thoughts, tutorials, and discoveries.
          </p>
        </div>

        <div className="mb-8 max-w-lg mx-auto">
          <input
            id="search"
            type="search"
            placeholder="Search all posts..."
            value={query}
            onFocus={loadSearchIndex}
            onChange={e => {
              loadSearchIndex()
              setQuery(e.target.value)
            }}
            className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        {isSearching ? (
          <FlexSearchResults query={query} index={searchData.index} store={searchData.store}>
            {results => renderGrid(results)}
          </FlexSearchResults>
        ) : (
          renderGrid(data.allMdx.nodes)
        )}
      </div>
    </Layout>
  )
}

export default ActivityPage

export const Head = ({ location }) => <Seo title="All activity" pathname={location.pathname} />

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    localSearchPages {
      publicIndexURL
      publicStoreURL
    }
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        id
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
`
