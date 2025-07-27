import React, { useState } from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../components/about.module.css"
import VideoPlayer from "../components/videoPlayer"
import { motion } from "motion/react"

const About = ({ data }) => {
  const {
    banner,
    introText,
    jingLiuHeadshot,
    florianIdenburgHeadshot,
    jingLiuBio,
    florianIdenburgBio,
    teamMembers,
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
    }
  }
`

export default About
