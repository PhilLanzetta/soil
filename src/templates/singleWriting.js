import React, { useState } from "react"
import { graphql } from "gatsby"
import * as styles from "../components/singleWriting.module.css"
import { GatsbyImage } from "gatsby-plugin-image"
import VideoPlayer from "../components/videoPlayer"
import { motion } from "motion/react"
import ProjectTile from "../components/projectTile"
import Seo from "../components/seo"

const SingleWriting = ({ data }) => {
  const { title, author, content, relatedContent, publisher, date, subtitle } =
    data.contentfulWritingEntry
  const [activeVideo, setActiveVideo] = useState()
  return (
    <div className="margined-section">
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}
      <h2>
        {author && <span>{author}</span>}
        {author && <span> – </span>}
        {publisher && <span>{publisher}</span>}
        {publisher && date && <span>, </span>}
        {date && <span>{date}</span>}
      </h2>
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
                      <figcaption>{image.caption}</figcaption>
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
            {relatedContent.map(relatedProject => (
              <ProjectTile
                key={relatedProject.id}
                project={relatedProject}
              ></ProjectTile>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export const query = graphql`
  query getSingleWriting($slug: String) {
    contentfulWritingEntry(slug: { eq: $slug }) {
      title
      subtitle
      author
      publisher
      date(locale: "America/New_York")
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
        city
        id
        objectives {
          id
          slug
          title
        }
        slug
        title
        tileImage {
          description
          localFile {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
        country
      }
    }
  }
`

export const Head = ({ data }) => (
  <Seo title={data.contentfulWritingEntry.title} />
)

export default SingleWriting
