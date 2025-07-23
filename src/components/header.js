import React, { useState } from "react"
import * as styles from "./header.module.css"
import { Link } from "gatsby"
import { AnimatePresence, motion } from "motion/react"

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
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
                  <Link to="/">News</Link>
                </li>
                <li>
                  <Link to="/writing">Writing</Link>
                </li>
                <li>
                  <Link to="/">Publications</Link>
                </li>
                <li>
                  <Link to="/">Objectives</Link>
                </li>
                <li>
                  <Link to="/">Search</Link>
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
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header
