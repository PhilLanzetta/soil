/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import Footer from "./footer"
import Header from "./header"
import "./layout.css"
import "./global.css"

const Layout = ({ children }) => {
  return (
    <>
      <Header/>
        <main>{children}</main>
        <Footer />
    </>
  )
}

export default Layout
