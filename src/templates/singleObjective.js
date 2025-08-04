import React from "react"
import { graphql, Link } from "gatsby"
import * as styles from "../components/objectives.module.css"
import ProjectTile from "../components/projectTile"
import { motion } from "motion/react"
import Seo from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image"

const Objective = ({ data }) => {
  const { title, description, project, writing_entry } =
    data.contentfulObjective
  const objectives = data.allContentfulObjective.nodes
  return (
    <div className="margined-section">
      <div
        dangerouslySetInnerHTML={{
          __html: description.childMarkdownRemark.html,
        }}
        className={styles.description}
      ></div>
      {project && project.length > 0 && (
        <div className={styles.categoryContainer}>
          <h2>Work</h2>
          <div className={styles.itemsContainer}>
            {project.map(item => (
              <ProjectTile key={item.id} project={item}></ProjectTile>
            ))}
          </div>
        </div>
      )}
      {writing_entry && writing_entry.length > 0 && (
        <div className={styles.categoryContainer}>
          <h2>Writing</h2>
          <div className={styles.itemsContainer}>
            {writing_entry.map(entry => (
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
        id
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
    allContentfulObjective {
      nodes {
        id
        slug
        title
      }
    }
  }
`
export const Head = ({ data }) => <Seo title={data.contentfulObjective.title} />

export default Objective
