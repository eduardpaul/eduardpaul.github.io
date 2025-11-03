import * as React from "react"

import Header from "./header"
import Footer from "./footer"
import { useStaticQuery, graphql } from 'gatsby';
import CvImage from "./core/cvimage";

const Layout = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  const { site, cvJsonEnhanced: { aboutMe: { profile } } } = useStaticQuery(
    graphql`
query {
  site {
    siteMetadata {
      description
    }
  }
  cvJsonEnhanced {
    aboutMe {
      profile {
        name
        surnames
        title
        avatar {
          alt
          link
          localFile {
            id
            childImageSharp {
              gatsbyImageData(width: 100, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
}
`)


  return (
    <div data-is-root-path={isRootPath} className="min-h-screen flex flex-col bg-gray-50 text-gray-800 antialiased">

      <Header />

      <div className="flex-1 bg-slate-50 text-slate-800">
        <main>{children}</main>
      </div>

      {isRootPath ? null : (
        <section class="bg-white shadow-sm rounded-xl mx-auto max-w-6xl my-6 px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div class="flex flex-col sm:flex-row sm:items-center gap-4">
            <CvImage imageObject={profile.avatar} alt={`${profile.name} ${profile.surnames}`} className="w-24 h-24 rounded-full shadow-md object-cover mx-auto sm:mx-0" />
            <div class="text-center sm:text-left">
              <h1 class="text-xl font-bold text-gray-900">{profile.name} {profile.surnames}</h1>
              <p class="text-blue-600 font-medium text-sm">{profile.title}</p>
              <p class="text-gray-600 text-sm mt-2">
              {site.siteMetadata.description}
              </p>
            </div>
          </div>

          <div class="flex justify-center md:justify-end">
            <a href="/about"
              class="bg-blue-600 text-white font-semibold px-5 py-2 rounded-full hover:bg-blue-700 transition">
              Learn more
            </a>
          </div>
        </section>
      )}

      <Footer />

    </div>
  )
}

export default Layout