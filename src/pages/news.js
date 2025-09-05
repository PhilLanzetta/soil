import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import * as styles from "../components/news.module.css"
import { AnimatePresence, motion } from "motion/react"
import { GatsbyImage } from "gatsby-plugin-image"
import Seo from "../components/seo"
import useWindowSize from "../utils/useWindowSize"
import { PiCaretUpLight } from "react-icons/pi"

const News = ({ data, location }) => {
  const [newsEntries, setNewsEntries] = useState(
    location.state && location.state.filter
      ? data.allContentfulNewsEntry.nodes.filter(item =>
          item.category.includes("Press")
        )
      : data.allContentfulNewsEntry.nodes
  )
  const [filter, setFilter] = useState(location.state && location.state.filter ? "Press" : "all")
  const [view, setView] = useState()
  const [activeSort, setActiveSort] = useState("date")
  const [titleToggle, setTitleToggle] = useState(false)
  const [dateToggle, setDateToggle] = useState(true)
  const { width } = useWindowSize()
  const isMobile = width < 900

  const categories = ["Press", "Awards", "Events"]

  useEffect(() => {
    if (sessionStorage.getItem("newsView")) {
      setView(sessionStorage.getItem("newsView"))
    } else {
      setView("grid")
    }
  }, [])

  const orderByTitle = () => {
    let orderedNews
    if (titleToggle === false) {
      orderedNews = newsEntries.sort((a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase()
          ? 1
          : b.title.toLowerCase() > a.title.toLowerCase()
          ? -1
          : 0
      )
    } else {
      orderedNews = newsEntries.sort((a, b) =>
        b.title.toLowerCase() > a.title.toLowerCase()
          ? 1
          : a.title.toLowerCase() > b.title.toLowerCase()
          ? -1
          : 0
      )
    }
    setNewsEntries(orderedNews)
    setTitleToggle(!titleToggle)
    setActiveSort("title")
    setDateToggle(false)
  }

  const orderByDate = () => {
    let orderedNews
    if (dateToggle === true) {
      orderedNews = newsEntries.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      )
    } else {
      orderedNews = newsEntries.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      )
    }
    setNewsEntries(orderedNews)
    setDateToggle(!dateToggle)
    setActiveSort("date")
    setTitleToggle(false)
  }

  return (
    <div className="margined-section">
      <div className={styles.headingContainer}>
        <h1 className={styles.title}>News</h1>
        <div className={styles.viewMobileContainer}>
          <button
            className={styles.viewBtn}
            onClick={() => {
              sessionStorage.setItem("newsView", "grid")
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
              sessionStorage.setItem("newsView", "list")
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
              setNewsEntries(data.allContentfulNewsEntry.nodes)
            }}
            className={filter === "all" ? styles.active : ""}
          >
            All
          </button>
          {categories.map(category => (
            <button
              onClick={() => {
                setNewsEntries(
                  data.allContentfulNewsEntry.nodes.filter(entry =>
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
              sessionStorage.setItem("newsView", "grid")
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
              sessionStorage.setItem("newsView", "list")
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
            key={newsEntries.length}
            className={styles.projectGrid}
          >
            {newsEntries.map(entry => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0 }}
                transition={{ duration: 1 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className={entry.isFeatured ? styles.featured : ""}
              >
                {entry.linkOutFromTile ? (
                  <a
                    href={entry.externalLink}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.externalContainer}
                  >
                    {entry.tileImage && (
                      <div>
                        <div
                          className={
                            entry.isFeatured
                              ? styles.featuredImageContainer
                              : styles.tileImageContainer
                          }
                        >
                          <GatsbyImage
                            image={entry.tileImage.gatsbyImageData}
                            alt={entry.tileImage.description}
                            className={styles.tileImage}
                            imgStyle={{ objectFit: "cover" }}
                          ></GatsbyImage>
                        </div>
                        <p>{entry.title}</p>
                      </div>
                    )}
                    {entry.tileText && (
                      <div className={styles.tileTextContainer}>
                        <div
                          className={styles.tileText}
                          dangerouslySetInnerHTML={{
                            __html: entry.tileText.childMarkdownRemark.html,
                          }}
                        ></div>
                      </div>
                    )}
                  </a>
                ) : (
                  <Link to={`/news/${entry.slug}`}>
                    {entry.tileImage && (
                      <div>
                        <div
                          className={
                            entry.isFeatured
                              ? styles.featuredImageContainer
                              : styles.tileImageContainer
                          }
                        >
                          <GatsbyImage
                            image={entry.tileImage.gatsbyImageData}
                            alt={entry.tileImage.description}
                            className={styles.tileImage}
                            imgStyle={{ objectFit: "cover" }}
                          ></GatsbyImage>
                        </div>
                        <p>{entry.title}</p>
                      </div>
                    )}
                    {entry.tileText && (
                      <div className={styles.tileTextContainer}>
                        <div
                          className={styles.tileText}
                          dangerouslySetInnerHTML={{
                            __html: entry.tileText.childMarkdownRemark.html,
                          }}
                        ></div>
                      </div>
                    )}
                  </Link>
                )}
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
            key={newsEntries.length}
            className={styles.newsList}
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
            {newsEntries.map(entry => (
              <motion.div
                initial={{ opacity: 0 }}
                transition={{ duration: 1 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className={styles.newsRow}
                key={entry.id}
              >
                {entry.linkOutFromTile ? (
                  <a
                    href={entry.externalLink}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.newsRowContent}
                  >
                    <div className={styles.listTitle}>{entry.title}</div>
                    <div className={styles.listDate}>{entry.date}</div>
                  </a>
                ) : (
                  <Link
                    className={styles.newsRowContent}
                    to={`/news/${entry.slug}`}
                  >
                    <div className={styles.listTitle}>{entry.title}</div>
                    <div className={styles.listDate}>{entry.date}</div>
                  </Link>
                )}
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
    allContentfulNewsEntry(sort: { date: DESC }) {
      nodes {
        id
        slug
        tileImage {
          description
          gatsbyImageData(layout: FULL_WIDTH)
        }
        tileText {
          childMarkdownRemark {
            html
          }
        }
        title
        linkOutFromTile
        date(locale: "America/New_York")
        isFeatured
        externalLink
        category
        objectives {
          id
          slug
          title
        }
      }
    }
  }
`

export const Head = () => <Seo title="News" />

export default News
