import React, { useState } from "react"
import * as styles from "../components/writing.module.css"
import { graphql, Link } from "gatsby"
import { motion } from "motion/react"
import { GatsbyImage } from "gatsby-plugin-image"

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
              {entry.tileImage && (
                <div>
                  <div className={styles.tileImageContainer}>
                    <GatsbyImage
                      image={entry.tileImage.gatsbyImageData}
                      alt={entry.tileImage.description}
                      className={styles.tileImage}
                      imgStyle={{ objectFit: "cover" }}
                    ></GatsbyImage>
                  </div>
                  <p className={styles.tileText}>{entry.title}</p>
                </div>
              )}
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
            <div className={styles.tagContainer}>
              {entry.objectives &&
                entry.objectives.map(objective => (
                  <Link
                    to={`/objective/${objective.slug}`}
                    className={styles.tagBtn}
                    key={objective.id}
                  >
                    {objective.title}
                  </Link>
                ))}
            </div>
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
        tileImage {
          description
          gatsbyImageData(layout: FULL_WIDTH)
        }
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
