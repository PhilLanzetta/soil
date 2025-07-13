import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import * as styles from "./projectGrid.module.css"

const ProjectTile = ({ project }) => {
  return (
    <div className={styles.projectTile}>
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
    </div>
  )
}

export default ProjectTile
