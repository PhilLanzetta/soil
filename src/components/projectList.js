import { Link } from "gatsby"
import React, { useState } from "react"
import useWindowSize from "../utils/useWindowSize"
import { PiCaretUpLight } from "react-icons/pi"
import { motion } from "motion/react"
import * as styles from "./projectList.module.css"

const ProjectList = ({ projects, setProjects }) => {
  const { width } = useWindowSize()
  const isMobile = width < 601
  const [projectToggle, setProjectToggle] = useState(false)
  const [sizeToggle, setSizeToggle] = useState(false)
  const [locationToggle, setLocationToggle] = useState(false)
  const [yearToggle, setYearToggle] = useState(true)
  const [activeSort, setActiveSort] = useState("year")

  const orderByProject = () => {
    let orderedProjects
    if (projectToggle === false) {
      orderedProjects = projects.sort((a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase()
          ? 1
          : b.title.toLowerCase() > a.title.toLowerCase()
          ? -1
          : 0
      )
    } else {
      orderedProjects = projects.sort((a, b) =>
        b.title.toLowerCase() > a.title.toLowerCase()
          ? 1
          : a.title.toLowerCase() > b.title.toLowerCase()
          ? -1
          : 0
      )
    }
    setProjects(orderedProjects)
    setProjectToggle(!projectToggle)
    setActiveSort("project")
    setSizeToggle(false)
    setYearToggle(false)
    setLocationToggle(false)
  }

  const orderBySize = () => {
    let orderedProjects
    if (sizeToggle === false) {
      orderedProjects = projects.sort((a, b) =>
        a.squareMeters > b.squareMeters
          ? 1
          : b.squareMeters > a.squareMeters
          ? -1
          : 0
      )
    } else {
      orderedProjects = projects.sort((a, b) =>
        b.squareMeters > a.squareMeters
          ? 1
          : a.squareMeters > b.squareMeters
          ? -1
          : 0
      )
    }
    setProjects(orderedProjects)
    setSizeToggle(!sizeToggle)
    setActiveSort("size")
    setProjectToggle(false)
    setYearToggle(false)
    setLocationToggle(false)
  }

  const orderByYear = () => {
    let orderedProjects
    if (yearToggle === true) {
      orderedProjects = projects.sort((a, b) => a.year - b.year)
    } else {
      orderedProjects = projects.sort((a, b) => b.year - a.year)
    }
    setProjects(orderedProjects)
    setYearToggle(!yearToggle)
    setActiveSort("year")
    setSizeToggle(false)
    setProjectToggle(false)
    setLocationToggle(false)
  }

  const orderByLocation = () => {
    let orderedProjects
    if (locationToggle === false) {
      orderedProjects = projects.sort((a, b) => {
        if (a.city && b.city) {
          return a.city > b.city ? 1 : b.city > a.city ? -1 : 0
        } else if (a.city === null && b.city) {
          return a.country > b.city ? 1 : b.city > a.country ? -1 : 0
        } else if (a.city && b.city === null) {
          return a.city > b.country ? 1 : b.country > a.city ? -1 : 0
        }
      })
    } else {
      orderedProjects = projects.sort((a, b) => {
        if (a.city && b.city) {
          return b.city > a.city ? 1 : a.city > b.city ? -1 : 0
        } else if (a.city === null && b.city) {
          return b.city > a.country ? 1 : a.country > b.city ? -1 : 0
        } else if (a.city && b.city === null) {
          return b.country > a.city ? 1 : a.city > b.country ? -1 : 0
        }
      })
    }
    setProjects(orderedProjects)
    setLocationToggle(!locationToggle)
    setActiveSort("location")
    setSizeToggle(false)
    setYearToggle(false)
    setProjectToggle(false)
  }

  return (
    <div className={styles.projectListContainer}>
      {!isMobile && (
        <>
          <div className={styles.projectListHeader}>
            <button onClick={orderByProject}>
              Project{" "}
              {activeSort === "project" && (
                <PiCaretUpLight
                  className={projectToggle ? "" : styles.toggleDown}
                ></PiCaretUpLight>
              )}
            </button>
            <button onClick={orderByLocation}>
              Location{" "}
              {activeSort === "location" && (
                <PiCaretUpLight
                  className={locationToggle ? "" : styles.toggleDown}
                ></PiCaretUpLight>
              )}
            </button>
            <button onClick={orderByYear}>
              Status{" "}
              {activeSort === "year" && (
                <PiCaretUpLight
                  className={yearToggle ? "" : styles.toggleDown}
                ></PiCaretUpLight>
              )}
            </button>
            <button onClick={orderBySize}>
              Area{" "}
              {activeSort === "size" && (
                <PiCaretUpLight
                  className={sizeToggle ? "" : styles.toggleDown}
                ></PiCaretUpLight>
              )}
            </button>
            <div className="list-button">Objectives </div>
          </div>
          <div className="list-items-container">
            {projects.map(project => {
              return (
                <div key={project.id}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className={styles.projectRow}
                  >
                    <Link
                      to={`/work/${project.slug}`}
                      className={styles.projectLink}
                    >
                      <p className={styles.title}>{project.title}</p>
                      <p>
                        {project.city && <span>{project.city},</span>}{" "}
                        {project.country}
                      </p>
                      <p>
                        {project.status}{" "}
                        {project.status !== "In Progress" && (
                          <span>{project.year}</span>
                        )}
                      </p>
                      <p>
                        {project.squareMeters && (
                          <span>
                            {project.squareMeters} m<sup>2</sup> /{" "}
                          </span>
                        )}
                        {project.squareFeet && (
                          <span>{project.squareFeet} sf</span>
                        )}
                      </p>
                    </Link>
                    <div className={styles.tagContainer}>
                      {project.objectives &&
                        project.objectives.map(objective => (
                          <Link
                            to={`/objective/${objective.slug}`}
                            className={styles.tagBtn}
                          >
                            {objective.title}
                          </Link>
                        ))}
                    </div>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

export default ProjectList
