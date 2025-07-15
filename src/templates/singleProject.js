import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../components/singleProject.module.css"
import VideoPlayer from "../components/videoPlayer"
import { motion } from "motion/react"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"

const SingleProject = ({ data }) => {
  const {
    title,
    bannerMedia,
    banner2Media,
    primaryText,
    city,
    country,
    client,
    squareFeet,
    squareMeters,
    mediaGallery,
    secondarySections,
    secondaryText,
    status,
    typology,
    team,
    collaborators,
    objectives,
    related,
  } = data.contentfulProject
  const [activeVideo, setActiveVideo] = useState()
  const [popUp, setPopUp] = useState(-1)

  useEffect(() => {
    if (popUp >= 0) {
      const scrollY = window.scrollY
      const body = document.body
      body.style.position = "fixed"
      body.style.top = `-${scrollY}px`
    } else {
      const body = document.body
      const scrollY = body.style.top
      body.style.position = ""
      body.style.top = ""
      window.scrollTo(0, parseInt(scrollY || "0") * -1)
    }
  }, [popUp])

  return (
    <>
      {bannerMedia && (
        <div className={styles.bannerOneMedia}>
          {bannerMedia.imageId && (
            <GatsbyImage
              image={bannerMedia.image.gatsbyImageData}
              alt={bannerMedia.image.description}
              className={styles.bannerOneImage}
            ></GatsbyImage>
          )}
          {bannerMedia.videoId && (
            <VideoPlayer
              video={bannerMedia}
              activeVideo={activeVideo}
              setActiveVideo={setActiveVideo}
              banner={true}
              videoId={`${bannerMedia.videoId}-banner`}
            ></VideoPlayer>
          )}
        </div>
      )}
      <div className="margined-section">
        <motion.h1
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={styles.projectTitle}
        >
          <span>{title}</span>
          {city && <span>{city}</span>}
          {country && <span>{country}</span>}
        </motion.h1>
        {primaryText && (
          <motion.div
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={styles.primaryText}
            dangerouslySetInnerHTML={{
              __html: primaryText.childMarkdownRemark.html,
            }}
          ></motion.div>
        )}
        {objectives && (
          <div className={styles.tagContainer}>
            {objectives.map(objective => (
              <motion.div
                initial={{ opacity: 0 }}
                transition={{ duration: 1 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/objective/${objective.slug}`}
                  className={styles.tagBtn}
                >
                  {objective.title}
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      {banner2Media && (
        <motion.div
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <GatsbyImage
            image={banner2Media.image.gatsbyImageData}
            alt={banner2Media.image.description}
          ></GatsbyImage>
        </motion.div>
      )}
      <div className="margined-section">
        <div className={styles.secondaryInfoContainer}>
          <motion.div
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={styles.secondaryInfoLeft}
          >
            {client && (
              <div>
                Client:
                <br />
                {client}
              </div>
            )}
            {(city || country) && (
              <div className={styles.locationContainer}>
                Location:
                <br />
                {city && <span>{city}</span>}
                {country && <span>{country}</span>}
              </div>
            )}
            {typology && (
              <div>
                Program:
                <br />
                {typology.join(", ")}
              </div>
            )}
            {(squareMeters || squareFeet) && (
              <div>
                Area:
                <br />
                {squareMeters && (
                  <span>
                    {squareMeters} m<sup>2</sup>
                  </span>
                )}
                {squareMeters && squareFeet && <span> / </span>}
                {squareFeet && <span>{squareFeet} sf</span>}
              </div>
            )}
            {status && (
              <div>
                Status:
                <br />
                {status}
              </div>
            )}
          </motion.div>
          {secondaryText && (
            <motion.div
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={styles.secondaryInfoRight}
              dangerouslySetInnerHTML={{
                __html: secondaryText.childMarkdownRemark.html,
              }}
            ></motion.div>
          )}
        </div>
        {mediaGallery && (
          <div className={styles.galleryContainer}>
            {mediaGallery.map(mediaRow => (
              <div
                key={mediaRow.id}
                className={styles.mediaRow}
                style={{
                  gridTemplateColumns: `repeat(${mediaRow.media.length}, 1fr)`,
                }}
              >
                {mediaRow.media &&
                  mediaRow.media.map(item => {
                    if (item.imageId) {
                      return (
                        <motion.figure
                          initial={{ opacity: 0 }}
                          transition={{ duration: 1 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                        >
                          <GatsbyImage
                            image={item.image.gatsbyImageData}
                            alt={item.image.description}
                          ></GatsbyImage>
                          <figcaption>{item.caption}</figcaption>
                        </motion.figure>
                      )
                    } else if (item.videoId) {
                      return (
                        <motion.figure
                          initial={{ opacity: 0 }}
                          transition={{ duration: 1 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                        >
                          <VideoPlayer
                            video={item}
                            activeVideo={activeVideo}
                            setActiveVideo={setActiveVideo}
                            videoId={item.videoId}
                          ></VideoPlayer>
                          <figcaption>{item.caption}</figcaption>
                        </motion.figure>
                      )
                    } else {
                      return <div>Unknown Content</div>
                    }
                  })}
              </div>
            ))}
          </div>
        )}
        {secondarySections &&
          secondarySections.map(section => (
            <div key={section.id} className={styles.secondarySection}>
              <div className={styles.secondarySectionHeading}>
                <motion.p
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className={styles.secondaryHeading}
                >
                  {section.heading}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  dangerouslySetInnerHTML={{
                    __html: section.text.childMarkdownRemark.html,
                  }}
                  className={styles.secondaryText}
                ></motion.div>
              </div>
              {section.media && (
                <div className={styles.galleryContainer}>
                  {section.media.map(mediaRow => (
                    <div key={mediaRow.id} className={styles.secondaryMediaRow}>
                      {mediaRow.media &&
                        mediaRow.media.map((item, index) => (
                          <motion.figure
                            initial={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                          >
                            <button
                              className={styles.enlargeBtn}
                              onClick={() => setPopUp(index)}
                            >
                              <GatsbyImage
                                image={item.image.gatsbyImageData}
                                alt={item.image.description}
                              ></GatsbyImage>
                            </button>
                            <figcaption>{item.caption}</figcaption>
                          </motion.figure>
                        ))}
                      {popUp >= 0 && (
                        <div className={styles.imagePopUpContainer}>
                          <button
                            className={styles.closePopUp}
                            onClick={() => setPopUp(-1)}
                          >
                            <svg
                              viewBox="0 0 32 32"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M1 31L31 1" stroke="black" />
                              <path d="M1 1L31 31" stroke="black" />
                            </svg>
                          </button>
                          <TransformWrapper
                            initialScale={1}
                            centerOnInit={true}
                          >
                            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                              <>
                                <TransformComponent
                                  wrapperStyle={{
                                    position: "relative",
                                    height: "100vh",
                                    width: "100vw",
                                  }}
                                >
                                  <GatsbyImage
                                    image={
                                      mediaRow.media[popUp].image
                                        ?.gatsbyImageData
                                    }
                                    alt={
                                      mediaRow.media[popUp].image?.description
                                    }
                                    className={styles.popUpImageImg}
                                    style={{
                                      height: "80vh",
                                      width: `${
                                        (mediaRow.media[popUp].image?.width *
                                          80) /
                                        mediaRow.media[popUp].image?.height
                                      }vh`,
                                    }}
                                  ></GatsbyImage>
                                </TransformComponent>
                                <div className={styles.popUpControls}>
                                  <button
                                    className={styles.popUpControlsBtn}
                                    onClick={() => zoomOut()}
                                  >
                                    <svg
                                      viewBox="0 0 35 35"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <circle
                                        cx="17.5"
                                        cy="17.5"
                                        r="16.5"
                                        stroke="black"
                                      />
                                      <line
                                        x1="7"
                                        y1="17.5"
                                        x2="28"
                                        y2="17.5"
                                        stroke="black"
                                      />
                                    </svg>
                                  </button>
                                  <button
                                    className={styles.popUpControlsBtn}
                                    onClick={() => zoomIn()}
                                  >
                                    <svg
                                      viewBox="0 0 35 35"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <circle
                                        cx="17.5"
                                        cy="17.5"
                                        r="16.5"
                                        stroke="black"
                                      />
                                      <line
                                        x1="17.5"
                                        y1="7"
                                        x2="17.5"
                                        y2="28"
                                        stroke="black"
                                      />
                                      <line
                                        x1="7"
                                        y1="17.5"
                                        x2="28"
                                        y2="17.5"
                                        stroke="black"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </>
                            )}
                          </TransformWrapper>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        {team && (
          <div className={styles.tertiarySectionHeading}>
            <motion.p
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={styles.secondaryHeading}
            >
              Team
            </motion.p>
            <ul className={styles.threeColumn}>
              {team.map((member, index) => (
                <motion.li
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  key={index}
                >
                  {member}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
        {collaborators && (
          <div className={styles.tertiarySectionHeading}>
            <motion.p
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={styles.secondaryHeading}
            >
              Collaborators
            </motion.p>
            <ul className={styles.threeColumn}>
              {collaborators.map((member, index) => (
                <motion.li
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  key={index}
                >
                  {member}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
        {related && (
          <div className={styles.tertiarySectionHeading}>
            <motion.p
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={styles.secondaryHeading}
            >
              Related
            </motion.p>
            <ul className={styles.threeColumnList}>
              {related.map(relatedProject => (
                <motion.div
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  key={relatedProject.id}
                  className={styles.relatedProject}
                >
                  <Link
                    key={relatedProject.id}
                    to={`/work/${relatedProject.slug}`}
                  >
                    <h2 className={styles.relatedHeading}>
                      {relatedProject.title}
                    </h2>
                    <div className={styles.locationContainer}>
                      {city && <span>{city}</span>}
                      {country && <span>{country}</span>}
                    </div>
                  </Link>
                  {relatedProject.objectives && (
                    <div className={styles.relatedTagContainer}>
                      {relatedProject.objectives.map(objective => (
                        <Link
                          key={objective.id}
                          to={`/objective/${objective.slug}`}
                          className={styles.tagBtn}
                        >
                          {objective.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export const query = graphql`
  query getSingleProject($slug: String) {
    contentfulProject(slug: { eq: $slug }) {
      banner2Media {
        caption
        id
        image {
          gatsbyImageData(layout: FULL_WIDTH)
          description
        }
      }
      bannerMedia {
        ... on ContentfulImageWrapper {
          imageId: id
          caption
          image {
            description
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        ... on ContentfulVideoWrapper {
          videoId: id
          aspectRatio
          posterImage {
            description
            gatsbyImageData(layout: FULL_WIDTH)
          }
          videoLink
        }
      }
      city
      client
      country
      squareFeet
      squareMeters
      id
      objectives {
        id
        slug
        title
      }
      mediaGallery {
        id
        media {
          ... on ContentfulImageWrapper {
            imageId: id
            caption
            image {
              description
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
          ... on ContentfulVideoWrapper {
            videoId: id
            aspectRatio
            posterImage {
              description
              gatsbyImageData(layout: FULL_WIDTH)
            }
            videoLink
            caption
          }
        }
      }
      primaryText {
        childMarkdownRemark {
          html
        }
      }
      region
      secondarySections {
        id
        heading
        text {
          childMarkdownRemark {
            html
          }
        }
        media {
          id
          media {
            ... on ContentfulImageWrapper {
              imageId: id
              caption
              image {
                description
                gatsbyImageData(layout: FULL_WIDTH)
                height
                width
              }
            }
            ... on ContentfulVideoWrapper {
              videoId: id
              aspectRatio
              posterImage {
                description
                gatsbyImageData(layout: FULL_WIDTH)
              }
              videoLink
              caption
            }
          }
        }
      }
      secondaryText {
        childMarkdownRemark {
          html
        }
      }
      state
      status
      title
      typology
      team
      collaborators
      related {
        city
        id
        objectives {
          id
          slug
          title
        }
        slug
        title
        country
      }
    }
  }
`

export default SingleProject
