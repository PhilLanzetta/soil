import React from "react"
import { graphql, Link } from "gatsby"
import { motion } from "motion/react"
import * as styles from "../components/publications.module.css"
import { GatsbyImage } from "gatsby-plugin-image"

const Publications = ({ data }) => {
  const publications = data.allContentfulPublicationEntry.nodes
  return (
    <div className="margined-section">
      <h1 className={styles.title}>Publications</h1>
      <div className={styles.projectGrid}>
        {publications.map(entry => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link to={`/publications/${entry.slug}`}>
              <div className={styles.tileImageContainer}>
                <GatsbyImage
                  image={entry.tileImage?.gatsbyImageData}
                  alt={entry.tileImage?.description}
                  className={styles.tileImage}
                ></GatsbyImage>
              </div>
              <div className={styles.tileText}>{entry.title}</div>
            </Link>
            {/* <div className={styles.tagContainer}>
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
            </div> */}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export const query = graphql`
  query {
    allContentfulPublicationEntry {
      nodes {
        id
        slug
        tileImage {
          description
          gatsbyImageData(layout: FULL_WIDTH)
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

export default Publications
