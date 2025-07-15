import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import * as styles from "./projectGrid.module.css"
import { motion } from "motion/react"

const ProjectTile = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={styles.projectTile}
    >
      <Link to={`/work/${project.slug}`}>
        <div className={styles.tileImageContainer}>
          <GatsbyImage
            image={project.tileImage?.gatsbyImageData}
            alt={project.tileImage?.description}
            className={styles.tileImage}
            imgStyle={{ objectFit: "cover" }}
          ></GatsbyImage>
        </div>
        <div className={styles.projectInfo}>
          {project.title && `${project.title}, `}
          {project.city && `${project.city}, `}
          {project.country}
        </div>
      </Link>
      <div className={styles.tagContainer}>
        {project.objectives &&
          project.objectives.map(objective => (
            <Link to={`/objective/${objective.slug}`} className={styles.tagBtn}>
              {objective.title}
            </Link>
          ))}
      </div>
    </motion.div>
  )
}

export default ProjectTile
