import React, { useState } from "react"
import * as styles from "../components/writing.module.css"
import { graphql, Link } from "gatsby"
import { motion } from "motion/react"

const Writing = ({ data }) => {
  const [writingEntries, setWritingEntries] = useState(
    data.allContentfulWritingEntry.nodes
  )
  return (
    <div className="margined-section">
      <h1 className={styles.title}>Writing</h1>
      <div className={styles.projectGrid}>
        {writingEntries.map(entry => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link to={`/writing/${entry.slug}`}>
              {entry.tileTextLong && (
                <div className={styles.tileTextContainer}>
                  <div
                    className={styles.tileText}
                    dangerouslySetInnerHTML={{
                      __html: entry.tileTextLong.childMarkdownRemark.html,
                    }}
                  ></div>
                </div>
              )}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export const query = graphql`
  query {
    allContentfulWritingEntry(sort: { date: DESC }) {
      nodes {
        id
        slug
        tileTextLong {
          childMarkdownRemark {
            html
          }
        }
        title
        objectives {
          id
          slug
          title
        }
      }
    }
  }
`

export default Writing
