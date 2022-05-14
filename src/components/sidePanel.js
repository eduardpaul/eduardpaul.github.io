import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedinIn, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faHome, faRss, faUser } from "@fortawesome/free-solid-svg-icons"
import { Link } from "gatsby"

const SidePanel = () => {
  const data = useStaticQuery(graphql`
     query BioQuery {
       site {
         siteMetadata {
           author {
             name
             summary
           }
           social {
             twitter
           }
         }
       }
     }
   `)

  const author = data.site.siteMetadata?.author

  return (
    <div class="flex flex-col dark:bg-gray-800 dark:border-gray-600">
      <h2 class="text-3xl font-semibold text-center text-gray-800 dark:text-white">{author.name}</h2>

      <div class="flex flex-col items-center mt-6">

        <StaticImage
          className="object-cover w-24 h-24 mx-2 rounded-full"
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          src="../images/profile-pic.png"
          width={100}
          height={100}
          quality={95}
          alt="Profile picture"
        />
        <h4 class="font-medium text-gray-800 text-center">Lead Solutions Architect <div>at <span class="text-gray-600 text-sm">NTT DATA Europe &amp; LATAM</span></div></h4>

        <div class="flex w-1/2 px-6 py-2 text-center justify-between">
          <a href="https://www.linkedin.com/in/eduardpaul">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
          <a href="https://github.com/eduardpaul/">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://twitter.com/eduapauldev">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </div>


        <div class="grid grid-cols-4 w-full text-center p-4 border-t-2 justify-between rounded-full divide-x-2">
          <Link to="/"><FontAwesomeIcon icon={faHome} /></Link>
          <Link to="/about"><FontAwesomeIcon icon={faUser} /></Link>
          <a href="/rss.xml"><FontAwesomeIcon icon={faRss} /></a>
          <a>
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default SidePanel
