import React, { useState } from "react"
import * as styles from "./header.module.css"
import { Link, graphql, useStaticQuery } from "gatsby"
import { AnimatePresence, motion } from "motion/react"
import useWindowSize from "../utils/useWindowSize"

const Header = ({ location }) => {
  const { width } = useWindowSize()
  const isMobile = width < 800
  const [menuOpen, setMenuOpen] = useState(
    isMobile ? false : location.pathname === "/"
  )
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        duration: 0.7,
        delay: 0.25, // Stagger children by 0.1 seconds
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <>
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
                {isMobile ? (
                  <ul className={styles.mobileContainer}>
                    <div className={styles.mobileHeading}>
                      <li>
                        <Link to="/" onClick={() => setMenuOpen(false)}>
                          So–Il
                        </Link>
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
                    </div>
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.div variants={itemVariants}>
                        <li>
                          <Link to="/work" onClick={() => setMenuOpen(false)}>
                            Work
                          </Link>
                        </li>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <li>
                          <Link to="/about" onClick={() => setMenuOpen(false)}>
                            About
                          </Link>
                        </li>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <li>
                          <Link to="/news" onClick={() => setMenuOpen(false)}>
                            News
                          </Link>
                        </li>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <li>
                          <Link
                            to="/writing"
                            onClick={() => setMenuOpen(false)}
                          >
                            Writing
                          </Link>
                        </li>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <li>
                          <Link
                            to="/publications"
                            onClick={() => setMenuOpen(false)}
                          >
                            Publications
                          </Link>
                        </li>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <li>
                          <Link
                            to="/objectives"
                            onClick={() => setMenuOpen(false)}
                          >
                            Objectives
                          </Link>
                        </li>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <li>
                          <Link to="/search" onClick={() => setMenuOpen(false)}>
                            Search
                          </Link>
                        </li>
                      </motion.div>
                    </motion.div>
                  </ul>
                ) : (
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
                )}
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
          </AnimatePresence>
        </div>
      </header>
      {isObjective && (
        <div className={styles.objectiveContainer}>
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
    </>
  )
}

export default Header
