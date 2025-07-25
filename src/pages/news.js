import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import * as styles from "../components/news.module.css"
import { motion } from "motion/react"
import { GatsbyImage } from "gatsby-plugin-image"

const News = ({ data }) => {
  const [newsEntries, setNewsEntries] = useState(
    data.allContentfulNewsEntry.nodes
  )
  return (
    <div className="margined-section">
      <h1 className={styles.title}>News</h1>
      <div className={styles.projectGrid}>
        {newsEntries.map(entry => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {entry.linkOutFromTile ? (
              <a
                href={entry.externalLink}
                target="_blank"
                rel="noreferrer"
                className={styles.externalContainer}
              >
                <div className={styles.outLink}> → </div>
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
                {entry.tileText && (
                  <div className={styles.tileTextContainer}>
                    <div
                      className={styles.tileText}
                      dangerouslySetInnerHTML={{
                        __html: entry.tileText.childMarkdownRemark.html,
                      }}
                    ></div>
                  </div>
                )}
              </a>
            ) : (
              <Link to={`/news/${entry.slug}`}>
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
                {entry.tileText && (
                  <div className={styles.tileTextContainer}>
                    <div
                      className={styles.tileText}
                      dangerouslySetInnerHTML={{
                        __html: entry.tileText.childMarkdownRemark.html,
                      }}
                    ></div>
                  </div>
                )}
              </Link>
            )}
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
    allContentfulNewsEntry(sort: { date: DESC }) {
      nodes {
        id
        slug
        tileImage {
          description
          gatsbyImageData(layout: FULL_WIDTH)
        }
        tileText {
          childMarkdownRemark {
            html
          }
        }
        title
        linkOutFromTile
        externalLink
        objectives {
          id
          slug
          title
        }
      }
    }
  }
`

export default News
