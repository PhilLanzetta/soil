import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import * as styles from "../components/news.module.css"
import { AnimatePresence, motion } from "motion/react"
import { GatsbyImage } from "gatsby-plugin-image"
import Seo from "../components/seo"

const News = ({ data }) => {
  const [newsEntries, setNewsEntries] = useState(
    data.allContentfulNewsEntry.nodes
  )
  const [filter, setFilter] = useState("all")

  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index
  }

  const categories = ["Events", "Awards", "Press", "Project Updates"]

  return (
    <div className="margined-section">
      <h1 className={styles.title}>News</h1>
      <div className={styles.filterContainer}>
        <button
          onClick={() => {
            setFilter("all")
            setNewsEntries(data.allContentfulNewsEntry.nodes)
          }}
          className={filter === "all" ? styles.active : ""}
        >
          All
        </button>
        {categories.map(category => (
          <button
            onClick={() => {
              setNewsEntries(
                data.allContentfulNewsEntry.nodes.filter(entry =>
                  entry.category.includes(category)
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
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          key={newsEntries.length}
          className={styles.projectGrid}
        >
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
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
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
        category
        objectives {
          id
          slug
          title
        }
      }
    }
  }
`

export const Head = () => <Seo title="News" />

export default News
