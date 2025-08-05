import React, { useState } from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../components/about.module.css"
import VideoPlayer from "../components/videoPlayer"
import { motion } from "motion/react"
import Seo from "../components/seo"

const About = ({ data }) => {
  const {
    banner,
    introText,
    jingLiuHeadshot,
    florianIdenburgHeadshot,
    jingLiuBio,
    florianIdenburgBio,
    teamMembers,
    studioText,
    studioGallery,
    clients,
    recognitionPreface,
    awards,
    collections,
    careers,
    jobs,
    transparency,
  } = data.contentfulAboutPage
  const [activeVideo, setActiveVideo] = useState()
  return (
    <div className="margined-section">
      <h1 className={styles.title}>About</h1>
      <div className={styles.subHeadingContainer}>
        <a href="#team">Team</a>
        <a href="#studio">Studio</a>
        <a href="#clients">Clients</a>
        <a href="#recognition">Recognition</a>
        <a href="#transparency">Transparency</a>
        <a href="#careers">Careers</a>
      </div>
      {banner && (
        <motion.div
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={styles.banner}
        >
          {banner.imageId && (
            <GatsbyImage
              image={banner.image.gatsbyImageData}
              alt={banner.image.description}
              className={styles.bannerImage}
            ></GatsbyImage>
          )}
          {banner.videoId && (
            <VideoPlayer
              video={banner}
              activeVideo={activeVideo}
              setActiveVideo={setActiveVideo}
              banner={true}
              videoId={`${banner.videoId}-banner`}
            ></VideoPlayer>
          )}
        </motion.div>
      )}
      {introText && (
        <motion.div
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          dangerouslySetInnerHTML={{
            __html: introText.childMarkdownRemark.html,
          }}
          className={styles.introText}
        ></motion.div>
      )}
      <div className={styles.secondarySectionHeading} id="team">
        <motion.p
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={styles.secondaryHeading}
        >
          Team
        </motion.p>
        <div className={styles.founders}>
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <GatsbyImage
                image={jingLiuHeadshot.gatsbyImageData}
                alt={jingLiuHeadshot.description}
                className={styles.headshot}
              ></GatsbyImage>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              dangerouslySetInnerHTML={{
                __html: jingLiuBio.childMarkdownRemark.html,
              }}
            ></motion.div>
          </div>
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <GatsbyImage
                image={florianIdenburgHeadshot.gatsbyImageData}
                alt={florianIdenburgHeadshot.description}
                className={styles.headshot}
              ></GatsbyImage>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              dangerouslySetInnerHTML={{
                __html: florianIdenburgBio.childMarkdownRemark.html,
              }}
            ></motion.div>
          </div>
        </div>
        {teamMembers &&
          teamMembers.map(member => (
            <motion.div
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <GatsbyImage
                image={member.headshot.gatsbyImageData}
                alt={member.headshot.description}
              ></GatsbyImage>
              <div>{member.name}</div>
              <div>{member.title}</div>
            </motion.div>
          ))}
      </div>
      {studioText && (
        <motion.div
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          id="studio"
          className={styles.studioText}
          dangerouslySetInnerHTML={{
            __html: studioText.childMarkdownRemark.html,
          }}
        ></motion.div>
      )}
      {studioGallery && (
        <div className={styles.galleryContainer}>
          {studioGallery.map(item => {
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
      {clients && (
        <div className={styles.tertiarySectionHeading} id="clients">
          <motion.p
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={styles.secondaryHeading}
          >
            Clients
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={styles.threeColumn}
            dangerouslySetInnerHTML={{
              __html: clients.childMarkdownRemark.html.replace(/\n/g, "<br />"),
            }}
          ></motion.div>
        </div>
      )}
      {recognitionPreface && (
        <div className={styles.tertiarySectionHeading} id="recognition">
          <motion.p
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={styles.secondaryHeading}
          >
            Recognition
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={styles.awardsHeading}
          >
            Awards
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={styles.secondaryHeading}
            dangerouslySetInnerHTML={{
              __html: recognitionPreface.childMarkdownRemark.html,
            }}
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={styles.awardsHeadingMobile}
          >
            Awards
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={styles.threeColumnAward}
            dangerouslySetInnerHTML={{
              __html: awards.childMarkdownRemark.html,
            }}
          ></motion.div>
          {collections && (
            <motion.div
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={styles.secondColumn}
            >
              <p>Collections</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: collections.childMarkdownRemark.html,
                }}
              ></div>
            </motion.div>
          )}
        </div>
      )}
      {transparency && (
        <div className={styles.tertiarySectionHeading} id="transparency">
          <motion.p
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={styles.secondaryHeading}
          >
            Transparency
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={styles.threeColumnSpan}
            dangerouslySetInnerHTML={{
              __html: transparency.childMarkdownRemark.html,
            }}
          ></motion.div>
        </div>
      )}
      {careers && (
        <div className={styles.tertiarySectionHeading} id="careers">
          <motion.p
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={styles.secondaryHeading}
          >
            Careers
          </motion.p>
          <div className={jobs ? styles.twoColumns : styles.threeColumnSpan}>
            <motion.div
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              dangerouslySetInnerHTML={{
                __html: careers.childMarkdownRemark.html,
              }}
            ></motion.div>
            {jobs && (
              <div>
                <motion.p
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  Open Roles:
                </motion.p>
                {jobs.map(job => (
                  <a
                    href={job.pdfFile?.file.url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.jobLink}
                  >
                    {job.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export const query = graphql`
  query {
    contentfulAboutPage {
      banner {
        imageId: id
        image {
          gatsbyImageData(layout: FULL_WIDTH)
          description
        }
        caption
      }
      florianIdenburgBio {
        childMarkdownRemark {
          html
        }
      }
      florianIdenburgHeadshot {
        description
        gatsbyImageData(layout: FULL_WIDTH)
      }
      introText {
        childMarkdownRemark {
          html
        }
      }
      jingLiuBio {
        childMarkdownRemark {
          html
        }
      }
      jingLiuHeadshot {
        description
        gatsbyImageData(layout: FULL_WIDTH)
      }
      teamMembers {
        id
        headshot {
          description
          gatsbyImageData(layout: FULL_WIDTH)
        }
        name
        title
      }
      studioGallery {
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
      }
      studioText {
        childMarkdownRemark {
          html
        }
      }
      careers {
        childMarkdownRemark {
          html
        }
      }
      clients {
        childMarkdownRemark {
          html
        }
      }
      collections {
        childMarkdownRemark {
          html
        }
      }
      jobs {
        id
        title
        pdfFile {
          file {
            url
          }
        }
      }
      transparency {
        childMarkdownRemark {
          html
        }
      }
      recognitionPreface {
        childMarkdownRemark {
          html
        }
      }
      awards {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`

export const Head = () => <Seo title="About" />

export default About
