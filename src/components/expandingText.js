import React, { useState } from "react"
import { motion } from "motion/react"
import * as styles from "./expandingText.module.css"

const ExpandingText = ({ text, principal }) => {
  const [open, setIsOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={styles.expandingContainer}
    >
      <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={
          principal
            ? open
              ? styles.principalOpen
              : styles.principalClosed
            : open
            ? styles.open
            : styles.closed
        }
        dangerouslySetInnerHTML={{
          __html: text.childMarkdownRemark.html,
        }}
      ></motion.div>
      {open ? (
        <motion.button
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          onClick={() => setIsOpen(false)}
        >
          Show less -
        </motion.button>
      ) : (
        <motion.button
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          onClick={() => setIsOpen(true)}
        >
          Read more +
        </motion.button>
      )}
    </motion.div>
  )
}

export default ExpandingText
