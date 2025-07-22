import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../components/singleProject.module.css"
import VideoPlayer from "../components/videoPlayer"
import { motion } from "motion/react"
import ZoomableImage from "../components/zoomableImage"
import Seo from "../components/seo"

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
    teamText,
    collaboratorsText,
    objectives,
    related,
  } = data.contentfulProject
  const [activeVideo, setActiveVideo] = useState()

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
          {banner2Media.imageId && (
            <GatsbyImage
              image={banner2Media.image.gatsbyImageData}
              alt={banner2Media.image.description}
              className={styles.bannerOneImage}
            ></GatsbyImage>
          )}
          {banner2Media.videoId && (
            <VideoPlayer
              video={banner2Media}
              activeVideo={activeVideo}
              setActiveVideo={setActiveVideo}
              banner={true}
              videoId={`${banner2Media.videoId}-banner`}
            ></VideoPlayer>
          )}
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
            {mediaGallery.map(item => {
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
              } else if (item.twoImageId) {
                return (
                  <motion.div
                    initial={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className={styles.twoColumnImageContainer}
                  >
                    {item.images.map((image, index) => (
                      <figure key={index}>
                        <GatsbyImage
                          image={image.image.gatsbyImageData}
                          alt={image.image.description}
                        ></GatsbyImage>
                        <figcaption>{image.caption}</figcaption>
                      </figure>
                    ))}
                  </motion.div>
                )
              } else {
                return <div>Unknown Content</div>
              }
            })}
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
                {section.text && (
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
                )}
              </div>
              {section.media && (
                <div className={styles.secondaryGallery}>
                  <ZoomableImage images={section.media}></ZoomableImage>
                </div>
              )}
            </div>
          ))}
        {teamText && (
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
            <motion.div
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={styles.threeColumn}
              dangerouslySetInnerHTML={{
                __html: teamText.childMarkdownRemark.html.replace(
                  /\n/g,
                  "<br />"
                ),
              }}
            ></motion.div>
          </div>
        )}
        {collaboratorsText && (
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
            <motion.div
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={styles.threeColumn}
              dangerouslySetInnerHTML={{
                __html: collaboratorsText.childMarkdownRemark.html.replace(
                  /\n/g,
                  "<br />"
                ),
              }}
            ></motion.div>
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
                      {relatedProject.city && (
                        <span>{relatedProject.city}</span>
                      )}
                      {relatedProject.country && (
                        <span>{relatedProject.country}</span>
                      )}
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
        ... on ContentfulImageWrapper {
          imageId: id
          caption
          image {
            description
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        ... on ContentfulTwoColumnImage {
          twoImageId: id
          images {
            caption
            image {
              description
              gatsbyImageData(layout: FULL_WIDTH)
            }
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
          caption
          image {
            description
            gatsbyImageData
            height
            width
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
      teamText {
        childMarkdownRemark {
          html
        }
      }
      collaboratorsText {
        childMarkdownRemark {
          html
        }
      }
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

export const Head = ({ data }) => <Seo title={data.contentfulProject.title} />

export default SingleProject
