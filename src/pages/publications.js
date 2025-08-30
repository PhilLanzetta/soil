import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import { AnimatePresence, motion } from "motion/react"
import * as styles from "../components/publications.module.css"
import { GatsbyImage } from "gatsby-plugin-image"
import useWindowSize from "../utils/useWindowSize"
import { PiCaretUpLight } from "react-icons/pi"
import Seo from "../components/seo"

const Publications = ({ data }) => {
  const [pubEntries, setPubEntries] = useState(
    data.allContentfulPublicationEntry.nodes
  )
  const [view, setView] = useState()
  const [activeSort, setActiveSort] = useState("date")
  const [titleToggle, setTitleToggle] = useState(false)
  const [dateToggle, setDateToggle] = useState(true)
  const { width } = useWindowSize()
  const isMobile = width < 900

  useEffect(() => {
    if (sessionStorage.getItem("pubView")) {
      setView(sessionStorage.getItem("pubView"))
    } else {
      setView("grid")
    }
  }, [])

  const orderByTitle = () => {
    let orderedPub
    if (titleToggle === false) {
      orderedPub = pubEntries.sort((a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase()
          ? 1
          : b.title.toLowerCase() > a.title.toLowerCase()
          ? -1
          : 0
      )
    } else {
      orderedPub = pubEntries.sort((a, b) =>
        b.title.toLowerCase() > a.title.toLowerCase()
          ? 1
          : a.title.toLowerCase() > b.title.toLowerCase()
          ? -1
          : 0
      )
    }
    setPubEntries(orderedPub)
    setTitleToggle(!titleToggle)
    setActiveSort("title")
    setDateToggle(false)
  }

  const orderByDate = () => {
    let orderedPub
    if (dateToggle === true) {
      orderedPub = pubEntries.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      )
    } else {
      orderedPub = pubEntries.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      )
    }
    setPubEntries(orderedPub)
    setDateToggle(!dateToggle)
    setActiveSort("date")
    setTitleToggle(false)
  }

  return (
    <div className="margined-section">
      <h1 className={styles.title}>Publications</h1>
      <div className={styles.subHeading}>
        <div className={styles.viewContainer}>
          <button
            className={styles.viewBtn}
            onClick={() => {
              sessionStorage.setItem("pubView", "grid")
              setView("grid")
            }}
          >
            <svg
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
              sessionStorage.setItem("pubView", "list")
              setView("list")
            }}
          >
            <svg
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
        </div>
      </div>
      <AnimatePresence>
        {view === "grid" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            key={pubEntries.length}
            className={styles.projectGrid}
          >
            {pubEntries.map(entry => (
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
          </motion.div>
        )}
        {view === "list" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            key={pubEntries.length}
            className={styles.newsList}
          ></motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const query = graphql`
  query {
    allContentfulPublicationEntry(sort: { date: DESC }) {
      nodes {
        id
        slug
        tileImage {
          description
          gatsbyImageData(layout: FULL_WIDTH)
        }
        title
        date(locale: "America/New_York")
        objectives {
          id
          slug
          title
        }
      }
    }
  }
`

export const Head = () => <Seo title="Publications" />

export default Publications
