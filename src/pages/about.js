import React, { useState } from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../components/about.module.css"
import { motion } from "motion/react"
import Seo from "../components/seo"
import ExpandingText from "../components/expandingText"

const About = ({ data }) => {
  const {
    jingLiuHeadshot,
    florianIdenburgHeadshot,
    jingLiuBio,
    florianIdenburgBio,
    teamMembers,
    contact,
    studioGallery,
    clients,
    recognitionPreface,
    awards,
    collections,
    careers,
    jobs,
    studioHeroImage,
    leadership,
    studioText,
    transparency,
  } = data.contentfulAboutPage
  const [activeVideo, setActiveVideo] = useState()
  return (
    <div className="margined-section">
      <h1 className={styles.title}>About</h1>
      <div className={styles.subHeadingContainer}>
        <a href="#studio" className={styles.studioAnchor}>
          Studio
        </a>
        <a href="#team">Team</a>
        <a href="#clients">Clients</a>
        <a href="#recognition">Recognition</a>
        <a href="#transparency">Transparency</a>
        <a href="#careers">Careers</a>
        <a href="#contact">Contact</a>
      </div>
      {studioText && (
        <motion.div
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          dangerouslySetInnerHTML={{
            __html: studioText.childMarkdownRemark.html,
          }}
          className={styles.introText}
          id="studio"
        ></motion.div>
      )}
      {studioHeroImage && (
        <motion.div
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={styles.banner}
        >
          <GatsbyImage
            image={studioHeroImage.image.gatsbyImageData}
            alt={studioHeroImage.image.description}
            className={styles.bannerImage}
          ></GatsbyImage>
        </motion.div>
      )}

      {studioGallery && (
        <div className={styles.galleryContainer}>
          {studioGallery.map(item => {
            const imgWidth = (item.image?.width * 60) / item.image?.height
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
                  className={styles.galleryImage}
                  style={{ height: "60vh", width: `${imgWidth}vh` }}
                ></GatsbyImage>
                <figcaption>{item.caption}</figcaption>
              </motion.figure>
            )
          })}
        </div>
      )}
      <motion.p
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={styles.secondaryBigHeading}
      >
        Team
      </motion.p>
      <div className={styles.secondarySectionHeading} id="team">
        <motion.p
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={styles.secondaryHeading}
        >
          Principals
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
            <ExpandingText text={jingLiuBio} principal={true}></ExpandingText>
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
            <ExpandingText
              text={florianIdenburgBio}
              principal={true}
            ></ExpandingText>
          </div>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={styles.secondaryHeading}
        >
          Leadership
        </motion.p>
        {leadership &&
          leadership.map(member => (
            <motion.div
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <GatsbyImage
                image={member.headshot.gatsbyImageData}
                alt={member.headshot.description}
                className={styles.teamImage}
              ></GatsbyImage>
              <div>{member.name}</div>
              <div>{member.title}</div>
              <ExpandingText text={member.bio}></ExpandingText>
            </motion.div>
          ))}
        <motion.p
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={styles.secondaryHeading}
        >
          Staff
        </motion.p>
        {teamMembers && (
          <div className={styles.staffContainer}>
            {teamMembers.map(member => (
              <motion.div
                initial={{ opacity: 0 }}
                transition={{ duration: 1 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <GatsbyImage
                  image={member.headshot.gatsbyImageData}
                  alt={member.headshot.description}
                  className={styles.teamImage}
                ></GatsbyImage>
                <div>{member.name}</div>
                <div>{member.title}</div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      {clients && (
        <div className={styles.tertiarySectionHeading} id="clients">
          <motion.p
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={styles.secondaryBigHeading}
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
            className={styles.secondaryBigHeading}
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
        </div>
      )}
      {collections && (
        <div className={styles.tertiarySectionHeading}>
          <motion.p
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={styles.secondaryBigHeading}
          >
            Collections
          </motion.p>
          <div
            className={styles.threeColumnSpan}
            dangerouslySetInnerHTML={{
              __html: collections.childMarkdownRemark.html,
            }}
          ></div>
        </div>
      )}

      {transparency && (
        <div className={styles.tertiarySectionHeading} id="transparency">
          <motion.p
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={styles.secondaryBigHeading}
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
            className={styles.secondaryBigHeading}
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
                <ol>
                  {jobs.map((job, index) => (
                    <li key={index}>
                      <a
                        href={job.pdfFile?.file.url}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.jobLink}
                      >
                        {job.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      )}
      {contact && (
        <div className={styles.tertiarySectionHeading} id="contact">
          <motion.p
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={styles.secondaryBigHeading}
          >
            Contact
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={styles.contactInfo}
            dangerouslySetInnerHTML={{
              __html: contact.childMarkdownRemark.html,
            }}
          ></motion.div>
        </div>
      )}
    </div>
  )
}

export const query = graphql`
  query {
    contentfulAboutPage {
      florianIdenburgBio {
        childMarkdownRemark {
          html
        }
      }
      florianIdenburgHeadshot {
        description
        gatsbyImageData(layout: FULL_WIDTH)
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
      leadership {
        id
        headshot {
          description
          gatsbyImageData(layout: FULL_WIDTH)
        }
        name
        title
        bio {
          childMarkdownRemark {
            html
          }
        }
      }
      studioGallery {
        id
        caption
        image {
          description
          gatsbyImageData(layout: FULL_WIDTH)
          height
          width
        }
      }
      studioHeroImage {
        id
        caption
        image {
          description
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
      contact {
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
      studioText {
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
