import React, { useState } from "react"
import * as styles from "./header.module.css"
import { Link, graphql, useStaticQuery } from "gatsby"
import { AnimatePresence, motion } from "motion/react"

const Header = ({ location }) => {
  const [menuOpen, setMenuOpen] = useState(location.pathname === "/")
  const isObjective = location.pathname.includes("objective")
  const data = useStaticQuery(graphql`
    query {
      allContentfulObjective {
        nodes {
          id
          slug
          title
        }
      }
    }
  `)
  const objectives = data.allContentfulObjective.nodes

  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              key="menu-open"
              className={styles.menuOpen}
            >
              <ul>
                <li>
                  <Link to="/">So–Il</Link>
                </li>
                <li>
                  <Link to="/work">Work</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/news">News</Link>
                </li>
                <li>
                  <Link to="/writing">Writing</Link>
                </li>
                <li>
                  <Link to="/publications">Publications</Link>
                </li>
                <li>
                  <Link to="/objectives">Objectives</Link>
                </li>
                <li>
                  <Link to="/search">Search</Link>
                </li>
                <li>
                  <button
                    className={styles.closeButton}
                    onClick={() => setMenuOpen(false)}
                    aria-label="close"
                  >
                    <span></span>
                    <span></span>
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
          {!menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              key="menu-closed"
              className={styles.menuClosed}
            >
              <button onClick={() => setMenuOpen(true)}>Menu</button>
            </motion.div>
          )}
          {isObjective && (
            <div>
              <h1 className={styles.title}>Objectives</h1>
              <div className={styles.subHeadingContainer}>
                {objectives.map(objective => (
                  <motion.div
                    initial={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      to={`/objective/${objective.slug}`}
                      className={styles.objectiveLink}
                      activeClassName={styles.activeObjective}
                    >
                      {objective.title}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header
