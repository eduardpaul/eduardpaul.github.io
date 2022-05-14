import * as React from "react"
import Seo from "../components/seo"
import PageLayout from "../components/pageLayout"
import AllPosts from "../components/allPosts"

const BlogIndex = ({ location }) => {

  return (
    <PageLayout location={location}>
      <Seo title="All posts" />
      <article class="">
        <div class="w-full text-center py-2">
          <p class="text-xs font-semibold tracking-wider uppercase">#All posts</p>
          <h1 class="text-4xl font-bold leading-tight md:text-5xl"> Wellcome </h1>
          <hr class="m-2" />
        </div>
        <AllPosts />
      </article>

    </PageLayout>
  )
}

export default BlogIndex
