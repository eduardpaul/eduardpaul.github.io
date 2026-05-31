import React from "react"
import { Link } from "gatsby"
import { Printer } from "lucide-react"

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
            <Link
                to="/cv-print"
                aria-label="Print / Export CV"
                className="fixed bottom-8 right-8 z-50 inline-flex items-center gap-2 rounded-full bg-blue-600 text-white text-sm font-semibold px-5 py-3 shadow-lg hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
                <Printer size={16} strokeWidth={2.5} />
                Print CV
            </Link>
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