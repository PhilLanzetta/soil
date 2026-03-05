import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../components/objectives.module.css"
import ProjectTile from "../components/projectTile"
import { motion } from "motion/react"
import Seo from "../components/seo"

const Objective = ({ data }) => {
  const { description, project, writing_entry, news_entry, publication_entry } =
    data.contentfulObjective

  const combinedData = [project, writing_entry, news_entry, publication_entry]
    .filter(item => item !== null)
    .flat()

  console.log(combinedData)

  const shuffleData = array => {
    let currentIndex = array.length,
      randomIndex

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      // And swap it with the current element.
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
    }

    return array
  }

  const content = shuffleData(combinedData)

  return (
    <div className="margined-section">
      <div
        dangerouslySetInnerHTML={{
          __html: description.childMarkdownRemark.html,
        }}
        className={styles.description}
      ></div>
      {content && content.length > 0 && (
        <div className={styles.categoryContainer}>
          <div className={styles.itemsContainer}>
            {content.map(item => {
              if (item.projectId) {
                return (
                  <ProjectTile
                    key={item.projectId}
                    project={item}
                  ></ProjectTile>
                )
              } else if (item.writingId) {
                return (
                  <motion.div
                    key={item.writingId}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className={styles.writingEntry}
                  >
                    <Link to={`/writing/${item.slug}`}>
                      {item.tileTextLong && (
                        <div className={styles.tileTextContainer}>
                          <div
                            className={styles.tileText}
                            dangerouslySetInnerHTML={{
                              __html:
                                item.tileTextLong.childMarkdownRemark.html,
                            }}
                          ></div>
                        </div>
                      )}
                      {(item.author || item.publisher) && (
                        <div className={styles.tileInfo}>
                          {item.author && <div>{item.author}</div>}
                          {item.publisher && <div>{item.publisher}</div>}
                        </div>
                      )}
                    </Link>
                  </motion.div>
                )
              } else if (item.pubId) {
                return (
                  <motion.div
                    key={item.pubId}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <Link to={`/publications/${item.slug}`}>
                      <div className={styles.tileImageContainer}>
                        <GatsbyImage
                          image={item.tileImage?.gatsbyImageData}
                          alt={item.tileImage?.description}
                          className={styles.tileImage}
                        ></GatsbyImage>
                      </div>
                      <div className={styles.tileText}>{item.title}</div>
                    </Link>
                  </motion.div>
                )
              } else if (item.newsId) {
                return (
                  <motion.div
                    key={item.newsId}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    {item.linkOutFromTile ? (
                      <a
                        href={item.externalLink}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.externalContainer}
                      >
                        {item.tileImage && (
                          <div>
                            <div className={styles.tileImageContainer}>
                              <GatsbyImage
                                image={item.tileImage.gatsbyImageData}
                                alt={item.tileImage.description}
                                className={styles.tileImage}
                                imgStyle={{ objectFit: "cover" }}
                              ></GatsbyImage>
                            </div>
                            <p className={styles.tileText}>{item.title}</p>
                          </div>
                        )}
                        {item.tileText && (
                          <div className={styles.tileTextContainer}>
                            <div
                              className={styles.tileText}
                              dangerouslySetInnerHTML={{
                                __html: item.tileText.childMarkdownRemark.html,
                              }}
                            ></div>
                          </div>
                        )}
                      </a>
                    ) : (
                      <Link to={`/news/${item.slug}`}>
                        {item.tileImage && (
                          <div>
                            <div className={styles.tileImageContainer}>
                              <GatsbyImage
                                image={item.tileImage.gatsbyImageData}
                                alt={item.tileImage.description}
                                className={styles.tileImage}
                                imgStyle={{ objectFit: "cover" }}
                              ></GatsbyImage>
                            </div>
                            <p className={styles.tileText}>{item.title}</p>
                          </div>
                        )}
                        {item.tileText && (
                          <div className={styles.tileTextContainer}>
                            <div
                              className={styles.tileText}
                              dangerouslySetInnerHTML={{
                                __html: item.tileText.childMarkdownRemark.html,
                              }}
                            ></div>
                          </div>
                        )}
                      </Link>
                    )}
                  </motion.div>
                )
              } else {
                return null
              }
            })}
          </div>
        </div>
      )}
      <div className={styles.paddingDiv}></div>
    </div>
  )
}

export const query = graphql`
  query getSingleObjective($slug: String) {
    contentfulObjective(slug: { eq: $slug }) {
      title
      description {
        childMarkdownRemark {
          html
        }
      }
      project {
        projectId: id
        tileImage {
          description
          gatsbyImageData
        }
        title
        country
        city
        slug
      }
      writing_entry {
        writingId: id
        slug
        author
        publisher
        tileTextLong {
          childMarkdownRemark {
            html
          }
        }
        title
      }
      publication_entry {
        pubId: id
        title
        tileImage {
          description
          gatsbyImageData
        }
        slug
      }
      news_entry {
        newsId: id
        date
        externalLink
        linkOutFromTile
        slug
        tileImage {
          description
          gatsbyImageData
        }
        tileText {
          childMarkdownRemark {
            html
          }
        }
        title
      }
    }
  }
`
export const Head = ({ data }) => <Seo title={data.contentfulObjective.title} />

export default Objective
