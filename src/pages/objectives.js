import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../components/about.module.css"
import { motion } from "motion/react"

const Objectives = ({ data }) => {
  const objectives = data.allContentfulObjective.nodes
  const { introText, objectiveImage } = data.contentfulObjectivesPage
  return (
    <div className="margined-section">
      <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        dangerouslySetInnerHTML={{ __html: introText.childMarkdownRemark.html }}
        className={styles.objectiveIntroText}
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <GatsbyImage
          image={objectiveImage.gatsbyImageData}
          alt={objectiveImage.description}
        ></GatsbyImage>
      </motion.div>
    </div>
  )
}

export const query = graphql`
  query {
    allContentfulObjective {
      nodes {
        id
        title
        slug
      }
    }
    contentfulObjectivesPage {
      objectiveImage {
        description
        gatsbyImageData(layout: FULL_WIDTH)
      }
      introText {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`

export default Objectives
