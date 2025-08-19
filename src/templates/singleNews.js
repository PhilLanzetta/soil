import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import * as styles from "../components/singleWriting.module.css"
import { GatsbyImage } from "gatsby-plugin-image"
import { motion } from "motion/react"
import VideoPlayer from "../components/videoPlayer"
import ProjectTile from "../components/projectTile"

const SingleNews = ({ data }) => {
  const {
    title,
    date,
    bannerMedia,
    content,
    relatedContent,
    externalLink,
    externalLinkLabel,
    pdfDownload,
  } = data.contentfulNewsEntry
  const [activeVideo, setActiveVideo] = useState()
  return (
    <div className="margined-section">
      <h1 className={styles.title}>{title}</h1>
      {bannerMedia && (
        <div className={styles.bannerOneMedia}>
          {bannerMedia.imageId && (
            <GatsbyImage
              image={bannerMedia.image.gatsbyImageData}
              alt={bannerMedia.image.description}
              className={styles.bannerOneImage}
            ></GatsbyImage>
          )}
        </div>
      )}
      {date && <div className={styles.date}>{date}</div>}
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
                    image={contentItem.image.gatsbyImageData}
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
                        image={image.image.gatsbyImageData}
                        alt={image.image.description}
                      ></GatsbyImage>
                      <figcaption>{image.caption}</figcaption>
                    </figure>
                  ))}
                </motion.div>
              )
            } else if (contentItem.textId) {
              return (
                <div
                  key={index}
                  className={`${styles.textModuleNews} ${
                    contentItem.margin === "Full Width" ? "" : styles.wideMarginNews
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
      {externalLink && (
        <a href={externalLink} target="_blank" rel="noreferrer">
          {externalLinkLabel} &rarr;
        </a>
      )}
      {pdfDownload && (
        <a href={pdfDownload.file.url} target="_blank" rel="noreferrer">
          {externalLinkLabel} &darr;
        </a>
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
                        <div className={styles.outLink}> → </div>
                        {relatedItem.tileImage && (
                          <div>
                            <div className={styles.tileImageContainer}>
                              <GatsbyImage
                                image={relatedItem.tileImage.gatsbyImageData}
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
                                image={relatedItem.tileImage.gatsbyImageData}
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
                      </Link>
                    )}
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
  query getSingleNews($slug: String) {
    contentfulNewsEntry(slug: { eq: $slug }) {
      bannerMedia {
        caption
        imageId: id
        image {
          description
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
      content {
        textId: id
        margin
        text {
          childMarkdownRemark {
            html
          }
        }
      }
      date(locale: "America/New_York")
      externalLink
      externalLinkLabel
      pdfDownload {
        file {
          url
        }
      }
      relatedContent {
        ... on ContentfulNewsEntry {
          newsId: id
          tileImage {
            description
            gatsbyImageData(layout: FULL_WIDTH)
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
        ... on ContentfulProject {
          projectId: id
          city
          country
          tileImage {
            description
            gatsbyImageData(layout: FULL_WIDTH)
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
      title
    }
  }
`

export default SingleNews
