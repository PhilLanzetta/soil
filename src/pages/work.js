import React, { useState, useEffect } from "react"
import * as styles from "../components/work.module.css"
import { AnimatePresence, motion } from "motion/react"
import { GrFormClose } from "react-icons/gr"
import { graphql } from "gatsby"
import ProjectGrid from "../components/projectGrid"

const Work = ({ data, location }) => {
  const allProjects = data.allContentfulProject.nodes
  const [filterOpen, setFilterOpen] = useState(false)
  const [projects, setProjects] = useState(allProjects)
  const [view, setView] = useState()
  const [typologyFilter, setTypologyFilter] = useState(
    location.state?.typologyFilter || []
  )
  const [regionFilter, setRegionFilter] = useState(
    location.state?.regionFilter || []
  )
  const [statusFilter, setStatusFilter] = useState(
    location.state?.statusFilter || []
  )

  const url = new URL(process.env.GATSBY_SITE_URL)
  const searchParams = new URLSearchParams(location.search)

  useEffect(() => {
    for (const [key, value] of searchParams.entries()) {
      if (key === "status") {
        setStatusFilter(prev => [...prev, value])
      } else if (key === "location") {
        setRegionFilter(prev => [...prev, value])
      } else if (key === "typology") {
        setTypologyFilter(prev => [...prev, value])
      }
    }
  }, [])

  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index
  }

  const typologies = allProjects
    .map(project => project.typology)
    .reduce((a, b) => a.concat(b), [])
    .filter(onlyUnique)
    .sort()

  const handleTypeFilter = type => {
    if (typologyFilter.includes(type)) {
      setTypologyFilter(typologyFilter.filter(item => item !== type))
    } else {
      setTypologyFilter([...typologyFilter, type])
    }
  }

  const filterByType = array => {
    return [
      ...array,
      typologyFilter
        .map(term => array.filter(item => item.typology.includes(term)))
        .reduce((a, b) => a.concat(b), []),
    ]
  }

  const locations = allProjects
    .map(project => project.region)
    .filter(onlyUnique)
    .sort()

  const handleLocaleFilter = locale => {
    if (regionFilter.includes(locale)) {
      setRegionFilter(regionFilter.filter(item => item !== locale))
    } else {
      setRegionFilter([...regionFilter, locale])
    }
  }

  const filterByRegion = array => {
    return [
      ...array,
      regionFilter
        .map(term => array.filter(item => item.region === term))
        .reduce((a, b) => a.concat(b), []),
    ]
  }

  const handleStatusFilter = status => {
    if (statusFilter.includes(status)) {
      setStatusFilter(statusFilter.filter(item => item !== status))
    } else {
      setStatusFilter([...statusFilter, status])
    }
  }

  const filterSelectedStatus = array => {
    return [
      statusFilter
        .map(term => array.filter(item => item.status === term))
        .reduce((a, b) => a.concat(b), []),
    ]
  }

  useEffect(() => {
    if (localStorage.getItem("view")) {
      setView(localStorage.getItem("view"))
    } else {
      setView("grid")
    }
  }, [])

  const isDisabled =
    !statusFilter.length && !typologyFilter.length && !regionFilter.length

  const updateURL = () => {
    const params = new URLSearchParams({})
    const obj = {
      status: statusFilter,
      typology: typologyFilter,
      location: regionFilter,
    }
    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        for (const value of obj[key]) {
          params.append(key, value)
        }
      } else {
        params.append(key, obj[key])
      }
    }
    let keysForDel = []
    params.forEach((value, key) => {
      if (value == "" || value == "null") {
        keysForDel.push(key)
      }
    })
    keysForDel.forEach(key => {
      params.delete(key)
    })
    const new_url = `${url}?${params}`
    window.history.pushState({}, "", new_url)
  }

  const handleClearAll = () => {
    setStatusFilter([])
    setTypologyFilter([])
    setRegionFilter([])
    setProjects(allProjects)
    const new_url = `${url}`
    window.history.pushState({}, "", new_url)
  }

  const handleFilter = () => {
    let result = allProjects
    if (statusFilter.length) {
      result = filterSelectedStatus(result)
      result = result
        .filter(item => item.length)
        .reduce((a, b) => a.concat(b), [])
        .filter(onlyUnique)
    }
    if (typologyFilter.length) {
      result = filterByType(result)
      result = result
        .filter(item => item.length)
        .reduce((a, b) => a.concat(b), [])
        .filter(onlyUnique)
    }
    if (regionFilter.length) {
      result = filterByRegion(result)
      result = result
        .filter(item => item.length)
        .reduce((a, b) => a.concat(b), [])
        .filter(onlyUnique)
    }
    setProjects(result)
  }

  useEffect(() => {
    if (isDisabled) {
      setProjects(allProjects)
      window.history.pushState({}, "", url)
    } else if (filterOpen) {
      return
    } else {
      handleFilter()
      updateURL()
    }
  }, [typologyFilter, regionFilter, statusFilter])

  return (
    <div className={styles.workPage}>
      <div className="extra-padding">
        <motion.h1
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Work
        </motion.h1>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={styles.optionsContainer}
      >
        <div className={styles.filterContainer}>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className={styles.filterBtn}
          >
            Filter {filterOpen ? "-" : "+"}
          </button>
          {!isDisabled && (
            <div className={styles.currentFilters}>
              {statusFilter.length > 0 && (
                <>
                  {statusFilter.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleStatusFilter(item)}
                    >
                      {item}
                      <GrFormClose></GrFormClose>
                    </button>
                  ))}
                </>
              )}
              {typologyFilter.length > 0 && (
                <>
                  {typologyFilter.map((item, index) => (
                    <button key={index} onClick={() => handleTypeFilter(item)}>
                      {item}
                      <GrFormClose></GrFormClose>
                    </button>
                  ))}
                </>
              )}
              {regionFilter.length > 0 && (
                <>
                  {regionFilter.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleLocaleFilter(item)}
                    >
                      {item}
                      <GrFormClose></GrFormClose>
                    </button>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
        <div className={styles.viewContainer}>
          <button
            className={styles.viewBtn}
            onClick={() => {
              localStorage.setItem("view", "grid")
              setView("grid")
            }}
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="12" width="9" height="9" fill="black" />
              <rect width="9" height="9" fill="black" />
              <rect x="12" y="12" width="9" height="9" fill="black" />
              <rect y="12" width="9" height="9" fill="black" />
            </svg>
            <span className={view === "grid" ? styles.activeView : ""}>
              Grid
            </span>
          </button>
          <button
            className={styles.viewBtn}
            onClick={() => {
              localStorage.setItem("view", "list")
              setView("list")
            }}
          >
            <svg
              width="24"
              height="21"
              viewBox="0 0 24 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="16.5"
                width="23"
                height="4"
                fill="black"
                stroke="black"
              />
              <rect
                x="0.5"
                y="8.5"
                width="23"
                height="4"
                fill="black"
                stroke="black"
              />
              <rect
                x="0.5"
                y="0.5"
                width="23"
                height="4"
                fill="black"
                stroke="black"
              />
            </svg>
            <span className={view === "list" ? styles.activeView : ""}>
              List
            </span>
          </button>
          <button
            className={styles.viewBtn}
            onClick={() => {
              localStorage.setItem("view", "map")
              setView("map")
            }}
          >
            <svg
              width="15"
              height="22"
              viewBox="0 0 15 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_3676_9198)">
                <path
                  d="M7.5 0C3.3581 0 0 3.6939 0 8.25C0 10.044 0.534667 11.6903 1.42343 13.0385C1.43933 13.0707 1.4419 13.1069 1.46 13.1378L6.46 21.3878C6.69191 21.7704 7.08248 22 7.5 22C7.91752 22 8.3081 21.7704 8.54 21.3878L13.54 13.1378C13.5585 13.1069 13.5607 13.0707 13.5766 13.0385C14.4653 11.6903 15 10.044 15 8.25C15 3.6939 11.6419 0 7.5 0ZM7.5 11.873C5.68095 11.873 4.20638 10.251 4.20638 8.25C4.20638 6.24905 5.68095 4.62702 7.5 4.62702C9.31905 4.62702 10.7936 6.24905 10.7936 8.25C10.7936 10.251 9.31905 11.873 7.5 11.873Z"
                  fill="#0F0F0F"
                />
              </g>
              <defs>
                <clipPath id="clip0_3676_9198">
                  <rect width="15" height="22" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className={view === "map" ? styles.activeView : ""}>Map</span>
          </button>
        </div>
        <AnimatePresence>
          {filterOpen && (
            <motion.div
              key="filter-menu"
              initial={{ maxHeight: "0px", opacity: 0 }}
              exit={{ maxHeight: "0px", opacity: 0 }}
              animate={{ maxHeight: "500px", opacity: 1 }}
              className={styles.filterOptionsContainer}
            >
              <div>
                <p>Typology:</p>
                {typologies.map((type, index) => (
                  <button key={index} onClick={() => handleTypeFilter(type)}>
                    <div
                      className={`${styles.option} ${
                        typologyFilter.includes(type) ? styles.selected : ""
                      }`}
                    >
                      {type}
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <p>Location:</p>
                {locations.map((locale, index) => (
                  <button
                    key={index}
                    onClick={() => handleLocaleFilter(locale)}
                  >
                    <div
                      className={`${styles.option} ${
                        regionFilter.includes(locale) ? styles.selected : ""
                      }`}
                    >
                      {locale}
                    </div>
                  </button>
                ))}
              </div>
              <div>
                <p>Status:</p>
                <button onClick={() => handleStatusFilter("In Progress")}>
                  <div
                    className={`${styles.option} ${
                      statusFilter.includes("In Progress")
                        ? styles.selected
                        : ""
                    }`}
                  >
                    In Progress
                  </div>
                </button>
                <button onClick={() => handleStatusFilter("Completed")}>
                  <div
                    className={`${styles.option} ${
                      statusFilter.includes("Completed") ? styles.selected : ""
                    }`}
                  >
                    Completed
                  </div>
                </button>
                <button onClick={() => handleStatusFilter("Competition")}>
                  <div
                    className={`${styles.option} ${
                      statusFilter.includes("Competition")
                        ? styles.selected
                        : ""
                    }`}
                  >
                    Competition
                  </div>
                </button>
              </div>
              <div>
                <button
                  disabled={isDisabled}
                  onClick={() => {
                    handleFilter()
                    updateURL()
                    setFilterOpen(false)
                  }}
                >
                  Apply{" "}
                  <svg
                    width="18"
                    height="16"
                    viewBox="0 0 18 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.7071 8.70711C18.0976 8.31658 18.0976 7.68342 17.7071 7.29289L11.3431 0.928932C10.9526 0.538408 10.3195 0.538408 9.92893 0.928932C9.53841 1.31946 9.53841 1.95262 9.92893 2.34315L15.5858 8L9.92893 13.6569C9.53841 14.0474 9.53841 14.6805 9.92893 15.0711C10.3195 15.4616 10.9526 15.4616 11.3431 15.0711L17.7071 8.70711ZM0 8V9H17V8V7H0V8Z"
                      fill="black"
                    />
                  </svg>
                </button>
                <button onClick={() => handleClearAll()}>
                  Clear All{" "}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="10.6055"
                      y1="0.707107"
                      x2="0.706049"
                      y2="10.6066"
                      stroke="black"
                      stroke-width="2"
                    />
                    <line
                      x1="10.6054"
                      y1="10.6055"
                      x2="0.705898"
                      y2="0.70605"
                      stroke="black"
                      stroke-width="2"
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {view === "grid" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            key={projects.length}
            className={styles.gridContainer}
          >
            {filterOpen && <div className={styles.filterOverlay}></div>}
            <ProjectGrid projects={projects}></ProjectGrid>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const query = graphql`
  query {
    allContentfulProject(sort: { year: DESC }) {
      nodes {
        slug
        region
        typology
        status
        tileImage {
          description
          gatsbyImageData(layout: FULL_WIDTH)
        }
        city
        country
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

export default Work
