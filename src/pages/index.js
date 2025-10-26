import React, { useState } from "react"
import { graphql } from "gatsby"

import Seo from "../components/seo"
import Layout from "../components/layout"
import Certifications from "../components/certifications"

const HomePage = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata?.title || `Title`;

  return (
    <Layout location={location} title={siteTitle}>
        <Certifications/>
    </Layout>
  )
}

export default HomePage

export const Head = ({ location }) => <Seo title="All posts" pathname={location.pathname} />

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