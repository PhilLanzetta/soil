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
import { motion, AnimatePresence } from "motion/react"

const Layout = ({ children, location }) => {
  const container = {
    out: { opacity: 0, transition: { duration: 0.5 } },
    in: { opacity: 1, transition: { duration: 2 } },
    start: { opacity: 0 },
  }

  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={container}
          initial="start"
          animate="in"
          exit="out"
        >
          {children}
          <Footer location={location} />
        </motion.main>
      </AnimatePresence>
    </>
  )
}

export default Layout
