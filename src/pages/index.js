import React from "react"
import { graphql } from "gatsby"

import Seo from "../components/seo"
import Layout from "../components/layout"
import Hero from "../components/hero"
import Highlights from "../components/highlights"
import Activity from "../components/activity"

const HomePage = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata?.title || `Title`;

  return (
    <Layout location={location} title={siteTitle}>
        <Hero />
        <Activity/>
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
  }
`
