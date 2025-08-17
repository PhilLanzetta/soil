import React from "react"
import * as styles from "../components/contact.module.css"
import { motion } from "motion/react"
import Seo from "../components/seo"

const Contact = () => {
  return (
    <div className="margined-section">
      <h1 className={styles.title}>Contact</h1>
      <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={styles.infoGrid}
      >
        <motion.div
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={styles.column}
        >
          <p>Solid Objectives Idenburg Liu</p>
          <p>
            New York
            <br /> <a href="tel:17186246666">718 624 6666</a>
            <br />
            <a
              href="https://maps.app.goo.gl/5srGVMNrxpvagUTs5"
              target="_blank"
              rel="noreferrer"
            >
              42 Adelphi St
              <br />
              Brooklyn, NY 11205
            </a>
          </p>
          <p>
            Amsterdam
            <br />
            <a href="tel:234 234 5698">234 234 5698</a>
            <br />
            <a
              href="https://maps.app.goo.gl/TP6SZtRyZpz5zeN77"
              target="_blank"
              rel="noreferrer"
            >
              Anne Frankstraat
              <br />
              234 1018 BZ
            </a>
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={styles.column}
        >
          <p>
            General
            <br />
            <a href="mailto:office@so-il.org">office@so-il.org</a>
          </p>
          <p>
            Press <br />
            <a href="mailto:press@so-il.org">press@so-il.org</a>
          </p>
          <p>
            New Business <br />
            <a href="mailto:collaborate@so-il.org">collaborate@so-il.org</a>
          </p>
          <p>
            Employment Inquiries
            <br />
            <a href="mailto:work@so-il.org">work@so-il.org</a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export const Head = () => <Seo title="Contact" />

export default Contact
