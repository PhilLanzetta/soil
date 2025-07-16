import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import * as styles from "../components/singleWriting.module.css"
import { GatsbyImage } from "gatsby-plugin-image"
import VideoPlayer from "../components/videoPlayer"
import { motion } from "motion/react"
import ProjectTile from "../components/projectTile"

const SingleWriting = ({ data }) => {
  const { title, author, content, relatedContent } = data.contentfulWritingEntry
  const [activeVideo, setActiveVideo] = useState()
  return (
    <div className="margined-section">
      <h1 className={styles.title}>{title}</h1>
      <h2>{author}</h2>
      {content &&
        content.map((contentItem, index) => {
          if (contentItem.mediaRowId) {
            return (
              <div
                key={contentItem.mediaRowId}
                className={styles.mediaRow}
                style={{
                  gridTemplateColumns: `repeat(${contentItem.media.length}, 1fr)`,
                }}
              >
                {contentItem.media &&
                  contentItem.media.map(item => {
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
      author
      content {
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
          gatsbyImageData(layout: FULL_WIDTH)
        }
        country
      }
    }
  }
`

export default SingleWriting
