import * as React from "react"

import Header from "./header"
import Footer from "./footer"

const Layout = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

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