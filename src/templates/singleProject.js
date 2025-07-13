import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../components/singleProject.module.css"
import VideoPlayer from "../components/videoPlayer"

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
    state,
    status,
    typology,
    team,
    collaborators,
    objectives,
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
            ></VideoPlayer>
          )}
        </div>
      )}
      <div className="margined-section">
        <h1 className={styles.projectTitle}>
          <span>{title}</span>
          {city && <span>{city}</span>}
          {country && <span>{country}</span>}
        </h1>
        {primaryText && (
          <div
            className={styles.primaryText}
            dangerouslySetInnerHTML={{
              __html: primaryText.childMarkdownRemark.html,
            }}
          ></div>
        )}
        {objectives && (
          <div className={styles.tagContainer}>
            {objectives.map(objective => (
              <Link
                to={`/objective/${objective.slug}`}
                className={styles.tagBtn}
              >
                {objective.title}
              </Link>
            ))}
          </div>
        )}
      </div>
      {banner2Media && (
        <GatsbyImage
          image={banner2Media.image.gatsbyImageData}
          alt={banner2Media.image.description}
        ></GatsbyImage>
      )}
      <div className="margined-section">
        <div className={styles.secondaryInfoContainer}>
          <div className={styles.secondaryInfoLeft}>
            {client && (
              <div>
                Client:
                <br />
                {client}
              </div>
            )}
            {city && (
              <div>
                Location:
                <br />
                {city}, {state}
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
          </div>
          {secondaryText && (
            <div
              className={styles.secondaryInfoRight}
              dangerouslySetInnerHTML={{
                __html: secondaryText.childMarkdownRemark.html,
              }}
            ></div>
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
                  mediaRow.media.map(item => (
                    <figure>
                      <GatsbyImage
                        image={item.image.gatsbyImageData}
                        alt={item.image.description}
                      ></GatsbyImage>
                      <figcaption>{item.caption}</figcaption>
                    </figure>
                  ))}
              </div>
            ))}
          </div>
        )}
        {secondarySections &&
          secondarySections.map(section => (
            <div key={section.id} className={styles.secondarySection}>
              <div className={styles.secondarySectionHeading}>
                <p className={styles.secondaryHeading}>{section.heading}</p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: section.text.childMarkdownRemark.html,
                  }}
                  className={styles.secondaryText}
                ></div>
              </div>
              {section.media && (
                <div className={styles.galleryContainer}>
                  {section.media.map(mediaRow => (
                    <div key={mediaRow.id} className={styles.secondaryMediaRow}>
                      {mediaRow.media &&
                        mediaRow.media.map(item => (
                          <figure>
                            <GatsbyImage
                              image={item.image.gatsbyImageData}
                              alt={item.image.description}
                            ></GatsbyImage>
                            <figcaption>{item.caption}</figcaption>
                          </figure>
                        ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        {team && (
          <div className={styles.tertiarySectionHeading}>
            <p className={styles.secondaryHeading}>Team</p>
            <ul className={styles.threeColumn}>
              {team.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          </div>
        )}
        {collaborators && (
          <div className={styles.tertiarySectionHeading}>
            <p className={styles.secondaryHeading}>Collaborators</p>
            <ul className={styles.threeColumn}>
              {collaborators.map((member, index) => (
                <li key={index}>{member}</li>
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
          caption
          image {
            gatsbyImageData(layout: FULL_WIDTH)
            description
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
            caption
            id
            image {
              description
              gatsbyImageData(layout: FULL_WIDTH)
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
    }
  }
`

export default SingleProject
