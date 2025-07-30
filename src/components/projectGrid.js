import React from "react"
import * as styles from "./projectGrid.module.css"
import ProjectTile from "./projectTile"

const ProjectGrid = ({ projects }) => {
  return (
    <div className={styles.projectGrid}>
      {projects.map((project, index) => (
        <ProjectTile
          key={project.id}
          project={project}
          index={index}
        ></ProjectTile>
      ))}
    </div>
  )
}

export default ProjectGrid
