import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ description, title, children, pathname, image, keywords: pageKeywords }) => {
  const { site, cvJson } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle: title
            defaultDescription: description
            title
            siteUrl
            defaultImage: image
            social {
              twitter
            }
          }
        }
        cvJson {
          aboutMe {
            profile {
              name
              surnames
              title
            }
          }
          knowledge {
            hardSkills {
              skill {
                name
              }
            }
          }
          manfredSpecificData {
            mainStackTechs {
              name
            }
          }
        }
      }
    `
  )

  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    defaultImage,
    social,
  } = site.siteMetadata

  const { name, surnames, title: jobTitle } = cvJson.aboutMe.profile
  const mainStack = cvJson.manfredSpecificData.mainStackTechs.map(t => t.name)
  const hardSkills = cvJson.knowledge.hardSkills.map(s => s.skill.name)

  // Deduplicated keyword list built from CV data: identity → role → technologies
  const defaultKeywords = [
    ...new Set([
      `${name} ${surnames}`,
      jobTitle,
      ...mainStack,
      ...hardSkills,
    ]),
  ].join(", ")

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname || ``}`,
    twitterUsername: social?.twitter || ``,
    keywords: pageKeywords || defaultKeywords,
  }

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="image" content={seo.image} />

      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={seo.twitterUsername} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      <link rel="canonical" href={seo.url} />

      {children}
    </>
  )
}

export default Seo
