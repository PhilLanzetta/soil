import React from "react"
import * as styles from "./projectGrid.module.css"
import ProjectTile from "./projectTile"

const ProjectGrid = ({ projects }) => {
  return (
    <div className={styles.projectGrid}>
      {projects.map(project => (
        <ProjectTile key={project.id} project={project}></ProjectTile>
      ))}
    </div>
  )
}

export default ProjectGrid
