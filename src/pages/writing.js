import React, { useState } from "react"
import * as styles from "../components/writing.module.css"
import { graphql, Link } from "gatsby"
import { motion } from "motion/react"

const Writing = ({ data }) => {
  const [writingEntries, setWritingEntries] = useState(
    data.allContentfulWritingEntry.nodes
  )

  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index
  }

  const [filter, setFilter] = useState("all")
  const categories = ["Form", "Theory", "Process"]

  return (
    <div className="margined-section">
      <h1 className={styles.title}>Writing</h1>
      <div className={styles.filterContainer}>
        <button
          onClick={() => {
            setFilter("all")
            setWritingEntries(data.allContentfulWritingEntry.nodes)
          }}
          className={filter === "all" ? styles.active : ""}
        >
          All
        </button>
        {categories.map(category => (
          <button
            onClick={() => {
              setWritingEntries(
                data.allContentfulWritingEntry.nodes.filter(entry =>
                  entry.category?.includes(category)
                )
              )
              setFilter(category)
            }}
            className={filter === category ? styles.active : ""}
          >
            {category}
          </button>
        ))}
      </div>
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
              {(entry.author || entry.publisher) && (
                <div className={styles.tileInfo}>
                  {entry.author && <div>{entry.author}</div>}
                  {entry.publisher && <div>{entry.publisher}</div>}
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
        author
        category
        publisher
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
