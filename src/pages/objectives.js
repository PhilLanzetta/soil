import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../components/index.module.css"
import { motion } from "motion/react"

const Objectives = ({ data }) => {
  const objectives = data.allContentfulObjective.nodes
  return (
    <div className="margined-section extra-padding">
      <div className={styles.objectivesContainer}>
        {objectives.map(objective => (
          <motion.div
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              to={`/objective/${objective.slug}`}
              className={styles.objectiveLink}
            >
              <div className={styles.objectiveOverlay}>{objective.title}</div>
              <GatsbyImage
                image={objective.image?.gatsbyImageData}
                alt={objective.image?.description}
                className={styles.objectiveImage}
              ></GatsbyImage>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export const query = graphql`
  query {
    allContentfulObjective {
      nodes {
        id
        image {
          gatsbyImageData
          description
        }
        title
        slug
      }
    }
  }
`

export default Objectives
