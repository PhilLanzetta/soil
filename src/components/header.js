import React, { useState } from "react"
import * as styles from "./header.module.css"
import { Link } from "gatsby"
import { AnimatePresence, motion } from "motion/react"

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>
        )}
        {!menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
