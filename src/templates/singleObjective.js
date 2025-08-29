import React from "react"
import { graphql, Link } from "gatsby"
import * as styles from "../components/objectives.module.css"
import ProjectTile from "../components/projectTile"
import { motion } from "motion/react"
import Seo from "../components/seo"

const Objective = ({ data }) => {
  const { description, project, writing_entry } = data.contentfulObjective

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

  const content = shuffleData(project.concat(writing_entry)).filter(
    item => item !== null
  )

  console.log(content)

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
                    </Link>
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
        objectives {
          id
          slug
          title
        }
        slug
      }
      writing_entry {
        writingId: id
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
export const Head = ({ data }) => <Seo title={data.contentfulObjective.title} />

export default Objective
