import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import * as styles from "../components/singleWriting.module.css"
import { GatsbyImage } from "gatsby-plugin-image"
import VideoPlayer from "../components/videoPlayer"
import { motion } from "motion/react"
import ProjectTile from "../components/projectTile"
import Seo from "../components/seo"

const SinglePublication = ({ data }) => {
  const { title, author, content, relatedContent } =
    data.contentfulPublicationEntry
  const [activeVideo, setActiveVideo] = useState()
  return (
    <div className="margined-section">
      <h1 className={styles.title}>{title}</h1>
      <h2>{author}</h2>
      {content && (
        <div className={styles.contentContainer}>
          {content.map((contentItem, index) => {
            if (contentItem.imageId) {
              return (
                <motion.figure
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  key={contentItem.imageId}
                >
                  <GatsbyImage
                    image={contentItem.image?.localFile?.childImageSharp?.gatsbyImageData}
                    alt={contentItem.image.description}
                  ></GatsbyImage>
                  <figcaption>{contentItem.caption}</figcaption>
                </motion.figure>
              )
            } else if (contentItem.videoId) {
              return (
                <motion.figure
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  key={contentItem.videoId}
                >
                  <VideoPlayer
                    video={contentItem}
                    activeVideo={activeVideo}
                    setActiveVideo={setActiveVideo}
                    videoId={contentItem.videoId}
                  ></VideoPlayer>
                  <figcaption>{contentItem.caption}</figcaption>
                </motion.figure>
              )
            } else if (contentItem.twoImageId) {
              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className={styles.twoColumnImageContainer}
                  key={contentItem.twoImageId}
                >
                  {contentItem.images.map((image, index) => (
                    <figure key={index}>
                      <GatsbyImage
                        image={image.image?.localFile?.childImageSharp?.gatsbyImageData}
                        alt={image.image.description}
                      ></GatsbyImage>
                      {image.caption && (
                        <figcaption>{image.caption}</figcaption>
                      )}
                    </figure>
                  ))}
                </motion.div>
              )
            } else if (contentItem.textId) {
              return (
                <div
                  key={index}
                  className={`${styles.textModule} ${
                    contentItem.margin === "Full Width" ? "" : styles.wideMargin
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: contentItem.text.childMarkdownRemark.html,
                  }}
                ></div>
              )
            } else {
              return <div key={index}>Unknown Content</div>
            }
          })}
        </div>
      )}
      {relatedContent && (
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
            {relatedContent.map((relatedItem, index) => {
              if (relatedItem.projectId) {
                return (
                  <ProjectTile
                    key={relatedItem.projectId}
                    project={relatedItem}
                  ></ProjectTile>
                )
              } else {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    {relatedItem.linkOutFromTile ? (
                      <a
                        href={relatedItem.externalLink}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.externalContainer}
                      >
                        {relatedItem.tileImage && (
                          <div>
                            <div className={styles.tileImageContainer}>
                              <GatsbyImage
                                image={relatedItem.tileImage?.localFile?.childImageSharp?.gatsbyImageData}
                                alt={relatedItem.tileImage.description}
                                className={styles.tileImage}
                                imgStyle={{ objectFit: "cover" }}
                              ></GatsbyImage>
                            </div>
                            <p className={styles.tileText}>
                              {relatedItem.title}
                            </p>
                          </div>
                        )}
                        {relatedItem.tileText && (
                          <div className={styles.tileTextContainer}>
                            <div
                              className={styles.tileText}
                              dangerouslySetInnerHTML={{
                                __html:
                                  relatedItem.tileText.childMarkdownRemark.html,
                              }}
                            ></div>
                          </div>
                        )}
                      </a>
                    ) : (
                      <Link
                        to={
                          relatedItem.newsId
                            ? `/news/${relatedItem.slug}`
                            : `/writing/${relatedItem.slug}`
                        }
                      >
                        {relatedItem.tileImage && (
                          <div>
                            <div className={styles.tileImageContainer}>
                              <GatsbyImage
                                image={relatedItem.tileImage?.localFile?.childImageSharp?.gatsbyImageData}
                                alt={relatedItem.tileImage.description}
                                className={styles.tileImage}
                                imgStyle={{ objectFit: "cover" }}
                              ></GatsbyImage>
                            </div>
                            <p className={styles.tileText}>
                              {relatedItem.title}
                            </p>
                          </div>
                        )}
                        {relatedItem.tileText && (
                          <div className={styles.tileTextContainer}>
                            <div
                              className={styles.tileText}
                              dangerouslySetInnerHTML={{
                                __html:
                                  relatedItem.tileText.childMarkdownRemark.html,
                              }}
                            ></div>
                          </div>
                        )}
                        {relatedItem.tileTextLong && (
                          <div className={styles.tileTextContainer}>
                            <div
                              className={styles.tileText}
                              dangerouslySetInnerHTML={{
                                __html:
                                  relatedItem.tileTextLong.childMarkdownRemark
                                    .html,
                              }}
                            ></div>
                          </div>
                        )}
                      </Link>
                    )}
                    <div className={styles.tagContainer}>
                      {relatedItem.objectives &&
                        relatedItem.objectives.map(objective => (
                          <Link
                            to={`/objective/${objective.slug}`}
                            className={styles.tagBtn}
                            key={objective.id}
                          >
                            {objective.title}
                          </Link>
                        ))}
                    </div>
                  </motion.div>
                )
              }
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export const query = graphql`
  query getSinglePublication($slug: String) {
    contentfulPublicationEntry(slug: { eq: $slug }) {
      title
      content {
        ... on ContentfulImageWrapper {
          imageId: id
          caption
          image {
            description
            localFile {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
        }
        ... on ContentfulTwoColumnImage {
          twoImageId: id
          images {
            caption
            image {
              description
              localFile {
                childImageSharp {
                  gatsbyImageData(layout: FULL_WIDTH)
                }
              }
            }
          }
        }
        ... on ContentfulTextModule {
          textId: id
          text {
            childMarkdownRemark {
              html
            }
          }
          margin
        }
      }
      relatedContent {
        ... on ContentfulNewsEntry {
          newsId: id
          tileImage {
            description
            localFile {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
          tileText {
            childMarkdownRemark {
              html
            }
          }
          objectives {
            id
            slug
            title
          }
          slug
          title
          linkOutFromTile
          externalLink
        }
        ... on ContentfulWritingEntry {
          writingId: id
          tileTextLong {
            childMarkdownRemark {
              html
            }
          }
          objectives {
            id
            slug
            title
          }
          slug
          title
        }
        ... on ContentfulProject {
          projectId: id
          city
          country
          tileImage {
            description
            localFile {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH)
              }
            }
          }
          objectives {
            id
            slug
            title
          }
          slug
          title
        }
      }
    }
  }
`

export const Head = ({ data }) => (
  <Seo title={data.contentfulPublicationEntry.title} />
)

export default SinglePublication
