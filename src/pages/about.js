import React from "react"

import Seo from "../components/seo"
import Layout from "../components/layout"
import Hero from "../components/hero"
import Certifications from "../components/certifications"
import Experience from "../components/experience"
import Highlights from "../components/highlights"
import Competencies from "../components/competencies"

const AboutPage = ({ location }) => {
    return (
        <Layout location={location} >
            <Hero />
            <Competencies />
            <Certifications />
            <Highlights />
            <Experience />
        </Layout>
    )
}

export default AboutPage

export const Head = ({ location }) => <Seo title="Eduard Paul Lakida - Hi! 👋" pathname={location.pathname} />