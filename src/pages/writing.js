import React, { useState, useEffect } from "react"
import * as styles from "../components/writing.module.css"
import { graphql, Link } from "gatsby"
import { AnimatePresence, motion } from "motion/react"
import useWindowSize from "../utils/useWindowSize"
import { PiCaretUpLight } from "react-icons/pi"

const Writing = ({ data }) => {
  const [writingEntries, setWritingEntries] = useState(
    data.allContentfulWritingEntry.nodes
  )

  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index
  }

  const [filter, setFilter] = useState("all")
  const categories = ["on SO-IL", "by SO-IL"]
  const [view, setView] = useState()
  const [activeSort, setActiveSort] = useState("date")
  const [titleToggle, setTitleToggle] = useState(false)
  const [authorToggle, setAuthorToggle] = useState(false)
  const [pubToggle, setPubToggle] = useState(false)
  const [dateToggle, setDateToggle] = useState(true)
  const { width } = useWindowSize()
  const isMobile = width < 900

  useEffect(() => {
    if (sessionStorage.getItem("writingView")) {
      setView(sessionStorage.getItem("writingView"))
    } else {
      setView("grid")
    }
  }, [])

  const orderByTitle = () => {
    let orderedWriting
    if (titleToggle === false) {
      orderedWriting = writingEntries.sort((a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase()
          ? 1
          : b.title.toLowerCase() > a.title.toLowerCase()
          ? -1
          : 0
      )
    } else {
      orderedWriting = writingEntries.sort((a, b) =>
        b.title.toLowerCase() > a.title.toLowerCase()
          ? 1
          : a.title.toLowerCase() > b.title.toLowerCase()
          ? -1
          : 0
      )
    }
    setWritingEntries(orderedWriting)
    setTitleToggle(!titleToggle)
    setActiveSort("title")
    setDateToggle(false)
    setAuthorToggle(false)
    setPubToggle(false)
  }

  const orderByAuthor = () => {
    let orderedWriting
    if (authorToggle === false) {
      orderedWriting = writingEntries.sort((a, b) =>
        a.author
          ? a.author?.toLowerCase() > b.author?.toLowerCase()
            ? 1
            : b.author?.toLowerCase() > a.author?.toLowerCase()
            ? -1
            : 0
          : 1
      )
    } else {
      orderedWriting = writingEntries.sort((a, b) =>
        b.author
          ? b.author?.toLowerCase() > a.author?.toLowerCase()
            ? 1
            : a.author?.toLowerCase() > b.author?.toLowerCase()
            ? -1
            : 0
          : 1
      )
    }
    setWritingEntries(orderedWriting)
    setAuthorToggle(!authorToggle)
    setActiveSort("author")
    setDateToggle(false)
    setTitleToggle(false)
    setPubToggle(false)
  }

  const orderByPub = () => {
    let orderedWriting
    if (pubToggle === false) {
      orderedWriting = writingEntries.sort((a, b) =>
        a.publisher
          ? a.publisher?.toLowerCase() > b.publisher?.toLowerCase()
            ? 1
            : b.publisher?.toLowerCase() > a.publisher?.toLowerCase()
            ? -1
            : 0
          : 1
      )
    } else {
      orderedWriting = writingEntries.sort((a, b) =>
        b.publisher
          ? b.publisher?.toLowerCase() > a.publisher?.toLowerCase()
            ? 1
            : a.publisher?.toLowerCase() > b.publisher?.toLowerCase()
            ? -1
            : 0
          : 1
      )
    }
    setWritingEntries(orderedWriting)
    setPubToggle(!pubToggle)
    setActiveSort("pub")
    setDateToggle(false)
    setTitleToggle(false)
    setAuthorToggle(false)
  }

  const orderByDate = () => {
    let orderedWriting
    if (dateToggle === true) {
      orderedWriting = writingEntries.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      )
    } else {
      orderedWriting = writingEntries.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      )
    }
    setWritingEntries(orderedWriting)
    setDateToggle(!dateToggle)
    setActiveSort("date")
    setTitleToggle(false)
    setPubToggle(false)
    setAuthorToggle(false)
  }

  return (
    <div className="margined-section">
      <div className={styles.headingContainer}>
        <h1 className={styles.title}>Writing</h1>
        <div className={styles.viewMobileContainer}>
          <button
            className={styles.viewBtn}
            onClick={() => {
              sessionStorage.setItem("writingView", "grid")
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
              sessionStorage.setItem("writingView", "list")
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
      <div className={styles.subHeading}>
        <div className={styles.filterContainer}>
          <button
            onClick={() => {
              setFilter("all")
              setWritingEntries(data.allContentfulWritingEntry.nodes)
            }}
            className={filter === "all" ? styles.active : ""}
          >
            All
          </button>
          {categories.map(category => (
            <button
              onClick={() => {
                setWritingEntries(
                  data.allContentfulWritingEntry.nodes.filter(entry =>
                    entry.category?.includes(category)
                  )
                )
                setFilter(category)
              }}
              className={filter === category ? styles.active : ""}
            >
              {category}
            </button>
          ))}
        </div>
        <div className={styles.viewContainer}>
          <button
            className={styles.viewBtn}
            onClick={() => {
              sessionStorage.setItem("writingView", "grid")
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
              sessionStorage.setItem("writingView", "list")
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
            key={writingEntries.length}
            className={styles.projectGrid}
          >
            {writingEntries.map(entry => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0 }}
                transition={{ duration: 1 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <Link to={`/writing/${entry.slug}`}>
                  {entry.tileTextLong && (
                    <div className={styles.tileTextContainer}>
                      <div
                        className={styles.tileText}
                        dangerouslySetInnerHTML={{
                          __html: entry.tileTextLong.childMarkdownRemark.html,
                        }}
                      ></div>
                    </div>
                  )}
                  {(entry.author || entry.publisher) && (
                    <div className={styles.tileInfo}>
                      {entry.author && <div>{entry.author}</div>}
                      {entry.publisher && <div>{entry.publisher}</div>}
                    </div>
                  )}
                </Link>
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
            key={writingEntries.length}
            className={styles.writingList}
          >
            {!isMobile && (
              <div className={styles.projectListHeader}>
                <button onClick={orderByTitle}>
                  Title{" "}
                  {activeSort === "title" && (
                    <PiCaretUpLight
                      className={titleToggle ? "" : styles.toggleDown}
                    ></PiCaretUpLight>
                  )}
                </button>
                <button onClick={orderByAuthor}>
                  Author{" "}
                  {activeSort === "author" && (
                    <PiCaretUpLight
                      className={authorToggle ? "" : styles.toggleDown}
                    ></PiCaretUpLight>
                  )}
                </button>
                <button onClick={orderByPub}>
                  Publisher{" "}
                  {activeSort === "pub" && (
                    <PiCaretUpLight
                      className={pubToggle ? "" : styles.toggleDown}
                    ></PiCaretUpLight>
                  )}
                </button>
                <button onClick={orderByDate}>
                  Date{" "}
                  {activeSort === "date" && (
                    <PiCaretUpLight
                      className={dateToggle ? "" : styles.toggleDown}
                    ></PiCaretUpLight>
                  )}
                </button>
              </div>
            )}
            {writingEntries.map(entry => (
              <motion.div
                initial={{ opacity: 0 }}
                transition={{ duration: 1 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className={styles.writingRow}
                key={entry.id}
              >
                <Link
                  to={`/writing/${entry.slug}`}
                  className={styles.writingRowContent}
                >
                  <div className={styles.listTitle}>{entry.title}</div>
                  <div>{entry.author}</div>
                  <div>{entry.publisher}</div>
                  <div className={styles.date}>{entry.date}</div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const query = graphql`
  query {
    allContentfulWritingEntry(sort: { date: DESC }) {
      nodes {
        id
        slug
        tileTextLong {
          childMarkdownRemark {
            html
          }
        }
        title
        author
        category
        date(locale: "America/New_York")
        publisher
        objectives {
          id
          slug
          title
        }
      }
    }
  }
`

export default Writing
