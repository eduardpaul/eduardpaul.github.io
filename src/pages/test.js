// import React, { useState } from "react"
// import { Link, graphql } from "gatsby"
// import { useFlexSearch } from "react-use-flexsearch"
// 
// import Bio from "../components/bio"
// import Layout from "../components/layout"
// import Seo from "../components/seo"
// import Header from "../components/header"
// 
// const BlogIndex = ({ data, location }) => {
//   const siteTitle = data.site.siteMetadata?.title || `Title`;
//   const { localSearchPages } = data;
//   const { index, store } = localSearchPages;
//   const [query, setQuery] = useState("");
//   const results = useFlexSearch(query, index, store);
// 
//   const posts = query ? results : data.allMdx.nodes;
// 
//   if (posts.length === 0) {
//     return (
//       <Layout location={location} title={siteTitle}>
//         <Bio />
// 
//         <p>
//           No blog posts found. Add markdown posts to "content/blog" (or the
//           directory you specified for the "gatsby-source-filesystem" plugin in
//           gatsby-config.js).
//         </p>
// 
//       </Layout>
//     )
//   }
// 
//   return (
//     <Layout location={location} title={siteTitle}>
// <div className="flex flex-col min-h-screen">
//       <Header />
//       <main className="flex-grow">
// 
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28 py-20 sm:py-28">
// 
//         </div>
//       </main>
// 
//     </div>
// 
//       <Bio />
//       <input
//         id="search"
//         type="search"
//         placeholder="Search all posts..."
//         value={query}
//         onChange={e => setQuery(e.target.value)}
//       />
//       <ol>
//         {posts.map(post => {
//           const title = post.frontmatter?.title || post.title
//           const slug = post.fields?.slug || post.slug
// 
//           return (
//             <li key={slug}>
//               <article
//                 itemScope
//                 itemType="http://schema.org/Article"
//               >
//                 <header>
//                   <h2>
//                     <Link to={post.fields?.slug || post.slug} itemProp="url">
//                       <span itemProp="headline">{title}</span>
//                     </Link>
//                   </h2>
//                   <small>{post.frontmatter?.date || post.date}</small>
//                 </header>
//                 <section>
//                   <p
//                     dangerouslySetInnerHTML={{
//                       __html: post.frontmatter?.description || post.excerpt,
//                     }}
//                     itemProp="description"
//                   />
//                 </section>
//               </article>
//             </li>
//           )
//         })}
//       </ol>
//     </Layout>
//   )
// }
// 
// export default BlogIndex
// 
// export const Head = ({ location }) => <Seo title="All posts" pathname={location.pathname} />
// 
// export const pageQuery = graphql`
//   {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//     localSearchPages {
//       index
//       store
//     }
//     allMdx(sort: { frontmatter: { date: DESC } }) {
//       nodes {
//         excerpt
//         fields {
//           slug
//         }
//         frontmatter {
//           date(formatString: "MMMM DD, YYYY")
//           title
//           description
//         }
//       }
//     }
//   }
// `