import * as React from "react"
import { Link } from "gatsby"

import Header from "./header"
import Footer from "./footer"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1>
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link to="/">
        {title}
      </Link>
    )
  }

  return (
    <div data-is-root-path={isRootPath} className="bg-slate-50 text-slate-700 antialiased">
      <Header/>
      <main className="flex-grow">{children}</main>
 
 <Footer />

    </div>
  )
}

export default Layout