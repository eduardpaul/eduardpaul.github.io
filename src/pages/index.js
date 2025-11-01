import React from "react"
import { graphql } from "gatsby"

import Seo from "../components/seo"
import Layout from "../components/layout"
import Hero from "../components/hero"
import Certifications from "../components/certifications"
import Experience from "../components/experience"
import Highlights from "../components/highlights"

const HomePage = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata?.title || `Title`;

  return (
    <Layout location={location} title={siteTitle}>
        <Hero />
        <Certifications/>
        <Experience/>
        <Highlights/>
    </Layout>
  )
}

export default HomePage

export const Head = ({ location }) => <Seo title="Eduard Paul Lakida - Hi! 👋" pathname={location.pathname} />

export const pageQuery = graphql`
  {
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