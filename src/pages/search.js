import React, { useMemo, useState, useRef, useEffect } from "react"
import { liteClient } from "algoliasearch/lite"
import { graphql, Link } from "gatsby"
import {
  InstantSearch,
  SearchBox,
  Hits,
  Pagination,
  useInstantSearch,
  Configure,
  useStats,
  RefinementList,
  useSortBy,
  useHits,
} from "react-instantsearch-hooks-web"
import Hit from "../components/searchResult"
import Seo from "../components/seo"
import { BsArrowRight, BsArrowLeft, BsFilterLeft } from "react-icons/bs"
import { GrFormClose } from "react-icons/gr"
import * as styles from "../components/search.module.css"
import { GatsbyImage } from "gatsby-plugin-image"

function NoResultsBoundary({ children, fallback }) {
  const { results } = useInstantSearch()

  // The `__isArtificial` flag makes sure not to display the No Results message
  // when no hits have been returned yet.
  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    )
  }

  return children
}

function NoResults() {
  const { indexUiState } = useInstantSearch()

  return (
    <div>
      <p>
        No results for <q>{indexUiState.query}</q>.
      </p>
    </div>
  )
}

function QueryHeading({ setSearched }) {
  const { indexUiState } = useInstantSearch()

  return (
    <button onClick={() => setSearched(false)} className={styles.searchQuery}>
      <h1 className={styles.title}>
        {indexUiState.query}
        <sup className={styles.closeSearch}>&times;</sup>
      </h1>
    </button>
  )
}

function EmptyQueryBoundary({ children, fallback, setSearched }) {
  const { indexUiState } = useInstantSearch()

  if (!indexUiState.query) {
    setSearched(false)
    return fallback
  }

  return children
}

function CustomStats() {
  const { nbHits } = useStats()

  return <span>All results &#40;{nbHits.toLocaleString()}&#41;</span>
}

const shuffleData = array => {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

const Search = ({ data, location }) => {
  const searchClient = useMemo(
    () =>
      liteClient(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
      ),
    []
  )
  const [filterOpen, setFilterOpen] = useState(false)
  const [searched, setSearched] = useState(location.search ? true : false)
  const [view, setView] = useState("grid")
  const backgroundImages = shuffleData(data.allContentfulProject.nodes)
  const objectives = data.allContentfulObjective.nodes

  useEffect(() => {
    if (!searched) {
      const scrollY = window.scrollY
      const body = document.body
      body.style.position = "fixed"
      body.style.top = "0"
    } else {
      const body = document.body
      const scrollY = body.style.top
      body.style.position = ""
      body.style.top = ""
    }
  }, [searched])

  return (
    <div className={styles.searchPageContainer}>
      <InstantSearch
        searchClient={searchClient}
        indexName="Pages"
        routing={true}
      >
        <div
          className={`${styles.searchLanding} ${
            searched ? styles.hide : styles.show
          }`}
        >
          {backgroundImages.map((image, index) => (
            <div key={index} className={styles.backgroundContainer}>
              <GatsbyImage
                image={image.tileImage.gatsbyImageData}
                className={styles.backgroundImage}
              ></GatsbyImage>
            </div>
          ))}
          <div className={styles.searchBoxContainer}>
            <p className={styles.searchSearch}>Search</p>
            <SearchBox
              placeholder="Type here"
              id="search-box"
              searchAsYouType={false}
              autoFocus={!searched}
              classNames={{
                root: searched ? styles.searchBoxSearched : styles.searchBox,
                form: styles.searchBoxForm,
                input: styles.searchBoxInput,
                reset: styles.searchBoxReset,
                submit: styles.searchBoxSubmit,
                submitIcon: styles.searchBoxIcon,
                resetIcon: styles.searchBoxIcon,
              }}
              submitIconComponent={({ classNames }) => (
                <div className={classNames.submitIcon}>→</div>
              )}
              resetIconComponent={({ classNames }) => (
                <div className={classNames.resetIcon}></div>
              )}
              onSubmit={() => setSearched(true)}
            />
            <div className={styles.objectives}>
              <p>Explore Objectives</p>
              <div className={styles.tagContainer}>
                {objectives.map((objective, index) => (
                  <Link
                    key={index}
                    to={`/objective/${objective.slug}`}
                    className={styles.tagBtn}
                  >
                    {objective.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        {searched && (
          <EmptyQueryBoundary fallback={null} setSearched={setSearched}>
            <NoResultsBoundary fallback={<NoResults />}>
              <div
                className={`margined-section ${
                  searched ? styles.searchResultPage : ""
                }`}
              >
                <div className={styles.searchHeading}>
                  <QueryHeading setSearched={setSearched}></QueryHeading>
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
                      <span
                        className={view === "grid" ? styles.activeView : ""}
                      >
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
                      <span
                        className={view === "list" ? styles.activeView : ""}
                      >
                        List
                      </span>
                    </button>
                  </div>
                </div>
                {view === "grid" && (
                  <Hits
                    hitComponent={Hit}
                    classNames={{ root: styles.hitsContainer }}
                  />
                )}
              </div>
            </NoResultsBoundary>
          </EmptyQueryBoundary>
        )}
      </InstantSearch>
    </div>
  )
}

export const query = graphql`
  query {
    allContentfulProject {
      nodes {
        tileImage {
          gatsbyImageData(width: 400)
        }
      }
    }
    allContentfulObjective {
      nodes {
        title
        slug
      }
    }
  }
`

export const Head = () => <Seo title="Search" />

export default Search
