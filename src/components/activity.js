
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

  const [query, setQuery] = useState("")
  const results = useFlexSearch(query, index, store)

  const posts = query ? results : allMdx.nodes

  return (
    <section id="online-activity" class="py-12 bg-slate-50">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">My Online Activity</h2>
            <p className="mt-4 text-lg text-slate-600">A glimpse into my latest posts, shares, and insights.</p>
          </div>
        </AnimatedSection>

        <div class="max-w-md mx-auto mb-10">
          <div class="relative">
            <input
              type="text"
              placeholder="Search posts..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              class="w-full rounded-full border border-slate-300 py-2.5 px-5 pr-10 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-5 h-5 text-slate-400 absolute right-4 top-2.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
              />
            </svg>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => {
            const title = post.frontmatter?.title || post.title
            const slug = post.fields?.slug || post.slug
            const description = post.frontmatter?.description || post.excerpt
            const date = post.frontmatter?.date || post.date

            return (
              <Link to={slug} key={slug} className="block p-6 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
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

          <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-lg font-semibold text-slate-900">Building scalable SharePoint architectures</h3>
                <span class="text-xs bg-blue-100 text-blue-600 font-medium px-2 py-1 rounded-full">Post</span>
              </div>
              <p class="text-slate-600 text-sm mt-1">
                Shared insights on designing efficient document management structures using modern SharePoint.
              </p>
            </div>
            <a
              href="#"
              target="_blank"
              class="mt-4 inline-flex items-center text-blue-600 font-medium hover:underline"
            >
              Read more
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
            </a>
          </div>

          <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-lg font-semibold text-slate-900">Repost: Azure DevOps best practices</h3>
                <span class="text-xs bg-green-100 text-green-600 font-medium px-2 py-1 rounded-full">Repost</span>
              </div>
              <p class="text-slate-600 text-sm mt-1">
                Highlighting key automation and CI/CD principles from Microsoft’s latest DevOps updates.
              </p>
            </div>
            <a
              href="#"
              target="_blank"
              class="mt-4 inline-flex items-center text-blue-600 font-medium hover:underline"
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
            </a>
          </div>

          <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-lg font-semibold text-slate-900">GitHub: Power Automate templates</h3>
                <span class="text-xs bg-purple-100 text-purple-600 font-medium px-2 py-1 rounded-full">Project</span>
              </div>
              <p class="text-slate-600 text-sm mt-1">
                Open-source Power Automate flows for integrating SharePoint Online metadata updates.
              </p>
            </div>
            <a
              href="#"
              target="_blank"
              class="mt-4 inline-flex items-center text-blue-600 font-medium hover:underline"
            >
              Explore on GitHub
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
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Activity;