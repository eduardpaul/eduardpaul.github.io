import * as React from "react"
import Seo from "../components/seo"
import PageLayout from "../components/pageLayout"
import { StaticImage } from "gatsby-plugin-image"

const About = ({ location }) => {

    return (
        <PageLayout location={location}>
            <Seo title="About Eduard Paul Lakida" />

            <article class="">
                <div class="w-full text-center py-2">
                    <p class="text-xs font-semibold tracking-wider uppercase">#About</p>
                    <h1 class="text-4xl font-bold leading-tight md:text-5xl">Hey there, I'm Eduard!</h1>
                    <hr class="m-2" />
                </div>
                <div>
                <div class="animate-wave w-14 h-14 float-right">👋</div>
                    My name is Eduard and I'm SharePoint &amp; Microsoft 365 developer and consultant working with SharePoint and related technologies for more than 10 years.
                </div>
                <div class="grid grid-cols-3 justify-evenly place-items-center gap-4 py-6">
                    <a href="https://www.credly.com/badges/440ae803-d2a3-4d4e-83eb-a64428cd7d4a/public_url">
                        <StaticImage
                            layout="fixed"
                            formats={["auto", "webp", "avif"]}
                            src="../images/professional-scrum-master-i-psm-i.png"
                            width={80}
                            height={80}
                            quality={95}
                            alt="professional scrum master i psm i"
                        />
                    </a>
                    <a href="https://www.credly.com/badges/6384ab17-2af6-440e-8804-b57bf6f91936/public_url">
                        <StaticImage
                            layout="fixed"
                            formats={["auto", "webp", "avif"]}
                            src="../images/microsoft-certified-azure-developer-associate.png"
                            width={80}
                            height={80}
                            quality={95}
                            alt="microsoft certified azure developer associate"
                        />
                    </a>
                    <a href="https://www.credly.com/badges/c6b1b25b-617c-452c-bc5f-594fc42b1e39/public_url">
                        <StaticImage
                            layout="fixed"
                            formats={["auto", "webp", "avif"]}
                            src="../images/microsoft-365-certified-developer-associate.png"
                            width={80}
                            height={80}
                            quality={95}
                            alt="microsoft 365 certified developer associate"
                        />
                    </a>
                    <a href="https://www.credly.com/badges/81215d2e-3450-4b5e-9fd6-6379fbb6a6b3/public_url">
                        <StaticImage
                            layout="fixed"
                            formats={["auto", "webp", "avif"]}
                            src="../images/microsoft-certified-security-compliance-and-identity-fundamentals.png"
                            width={80}
                            height={80}
                            quality={95}
                            alt="microsoft certified security compliance and identity fundamentals"
                        />
                    </a>
                    <a href="https://www.credly.com/badges/1efae251-f0ab-4b68-94fa-52ada9a8057b/public_url">
                        <StaticImage
                            layout="fixed"
                            formats={["auto", "webp", "avif"]}
                            src="../images/microsoft-certified-azure-ai-fundamentals.png"
                            width={80}
                            height={80}
                            quality={95}
                            alt="microsoft certified azure ai fundamentals"
                        />
                    </a>
                    <a href="https://www.credly.com/badges/f7b5b5fc-a22f-46c3-ad34-16d6a2f4ecef/public_url">
                        <StaticImage
                            layout="fixed"
                            formats={["auto", "webp", "avif"]}
                            src="../images/mcsd-app-builder-certified-2016.png"
                            width={80}
                            height={80}
                            quality={95}
                            alt="mcsd app builder certified 2016"
                        />
                    </a>
                </div>
                <div >
                    <StaticImage
                        layout="fixed"
                        formats={["auto", "webp", "avif"]}
                        src="../images/mcsa-web-applications-certified-2016.png"
                        width={80}
                        height={80}
                        quality={80}
                        alt="mcsa web applications certified 2016"
                    />
                    <a href="https://www.credly.com/badges/a168a12c-0a55-4ae7-9416-6199ec588d82/public_url">
                        <StaticImage
                            layout="fixed"
                            formats={["auto", "webp", "avif"]}
                            src="../images/microsoft-certified-azure-fundamentals.png"
                            width={80}
                            height={80}
                            quality={80}
                            alt="microsoft certified azure fundamentals"
                        />
                    </a>
                    <a href="https://www.credly.com/badges/bdcf8383-61cc-4148-9126-00d98913e786/public_url">
                        <StaticImage
                            layout="fixed"
                            formats={["auto", "webp", "avif"]}
                            src="../images/microsoft-365-certified-fundamentals.png"
                            width={80}
                            height={80}
                            quality={80}
                            alt="microsoft 365 certified fundamentals"
                        /></a>
                </div>

            </article>


        </PageLayout>
    )
}

export default About
