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
      <Link to="/">{title}</Link>
    )
  }

  return (
    <div data-is-root-path={isRootPath} className="bg-gray-50 text-gray-800 antialiased">

      <Header />

      <div className="min-h-screen bg-slate-50 text-slate-800">
        <main className="flex-grow">{children}</main>
      </div>
      
      <Footer />

    </div>
  )
}

export default Layout