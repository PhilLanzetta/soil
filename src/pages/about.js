import React, { useState, useRef, useEffect } from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../components/about.module.css"
import { motion } from "motion/react"
import Seo from "../components/seo"
import ExpandingText from "../components/expandingText"
import useWindowSize from "../utils/useWindowSize"

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
    featuredProjects,
    featuredProjects2,
    studioHeroImage,
    leadership,
    studioText,
    transparency,
  } = data.contentfulAboutPage
  const studioRef = useRef(null)
  const teamRef = useRef(null)
  const clientsRef = useRef(null)
  const collectionsRef = useRef(null)
  const recognitionRef = useRef(null)
  const transparencyRef = useRef(null)
  const careersRef = useRef(null)
  const contactRef = useRef(null)
  const navRef = useRef(null)
  const [activeSection, setActiveSection] = useState("studio")
  const [isFixed, setIsFixed] = useState(false)
  const { height, width } = useWindowSize()
  const isMobile = height > width

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-50% 0px" }
    )

    // Observe each section
    if (studioRef.current) observer.observe(studioRef.current)
    if (clientsRef.current) observer.observe(clientsRef.current)
    if (collectionsRef.current) observer.observe(collectionsRef.current)
    if (recognitionRef.current) observer.observe(recognitionRef.current)
    if (transparencyRef.current) observer.observe(transparencyRef.current)
    if (careersRef.current) observer.observe(careersRef.current)
    if (contactRef.current) observer.observe(contactRef.current)
    if (teamRef.current) observer.observe(teamRef.current)
    // ... observe other sections

    // Cleanup function to disconnect the observer when the component unmounts
    return () => observer.disconnect()
  }, [
    studioRef,
    teamRef,
    clientsRef,
    collectionsRef,
    recognitionRef,
    transparencyRef,
    careersRef,
    contactRef,
  ])

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect()
        // Check if the top of the div has reached or passed the top of the viewport
        setIsFixed(rect.top <= 35)
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="margined-section">
      <div>
        <h1 className={styles.title}>About</h1>
        <div ref={navRef}></div>
        {isFixed && isMobile && (
          <div
            className={styles.subHeadingContainer}
            style={{
              opacity: 0,
            }}
          >
            <a
              href="#studio"
              className={activeSection === "studio" ? styles.studioAnchor : ""}
            >
              Studio
            </a>
            <a
              href="#team"
              className={activeSection === "team" ? styles.studioAnchor : ""}
            >
              Team
            </a>
            <a
              href="#clients"
              className={activeSection === "clients" ? styles.studioAnchor : ""}
            >
              Clients
            </a>
            <a
              href="#collections"
              className={
                activeSection === "collections" ? styles.studioAnchor : ""
              }
            >
              Collections
            </a>
            <a
              href="#recognition"
              className={
                activeSection === "recognition" ? styles.studioAnchor : ""
              }
            >
              Recognition
            </a>
            <a
              href="#transparency"
              className={
                activeSection === "transparency" ? styles.studioAnchor : ""
              }
            >
              Transparency
            </a>
            <a
              href="#careers"
              className={activeSection === "careers" ? styles.studioAnchor : ""}
            >
              Careers
            </a>
            <a
              href="#contact"
              className={activeSection === "contact" ? styles.studioAnchor : ""}
            >
              Contact
            </a>
          </div>
        )}
        <div
          className={
            isFixed && isMobile
              ? styles.fixedSubHeader
              : styles.subHeadingContainer
          }
        >
          <a
            href="#studio"
            onClick={() => setActiveSection("studio")}
            className={activeSection === "studio" ? styles.studioAnchor : ""}
          >
            Studio
          </a>
          <a
            href="#team"
            onClick={() => setActiveSection("team")}
            className={activeSection === "team" ? styles.studioAnchor : ""}
          >
            Team
          </a>
          <a
            href="#clients"
            onClick={() => setActiveSection("clients")}
            className={activeSection === "clients" ? styles.studioAnchor : ""}
          >
            Clients
          </a>
          <a
            href="#collections"
            onClick={() => setActiveSection("collections")}
            className={
              activeSection === "collections" ? styles.studioAnchor : ""
            }
          >
            Collections
          </a>
          <a
            href="#recognition"
            onClick={() => setActiveSection("recognition")}
            className={
              activeSection === "recognition" ? styles.studioAnchor : ""
            }
          >
            Recognition
          </a>
          <a
            href="#transparency"
            onClick={() => setActiveSection("transparency")}
            className={
              activeSection === "transparency" ? styles.studioAnchor : ""
            }
          >
            Transparency
          </a>
          <a
            href="#careers"
            onClick={() => setActiveSection("careers")}
            className={activeSection === "careers" ? styles.studioAnchor : ""}
          >
            Careers
          </a>
          <a
            href="#contact"
            onClick={() => setActiveSection("contact")}
            className={activeSection === "contact" ? styles.studioAnchor : ""}
          >
            Contact
          </a>
        </div>
      </div>
      <div id="studio" ref={studioRef} className={styles.anchorSection}>
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
            {studioGallery.map((item, index) => {
              const imgWidth = isMobile
                ? (item.image?.width * 30) / item.image?.height
                : (item.image?.width * 60) / item.image?.height
              return (
                <motion.figure
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  key={index}
                >
                  <GatsbyImage
                    image={item.image.gatsbyImageData}
                    alt={item.image.description}
                    className={styles.galleryImage}
                    style={{
                      height: isMobile ? "30vh" : "60vh",
                      width: `${imgWidth}vh`,
                    }}
                  ></GatsbyImage>
                  <figcaption>{item.caption}</figcaption>
                </motion.figure>
              )
            })}
          </div>
        )}
      </div>
      <div id="team" ref={teamRef} className={styles.anchorSection}>
        <motion.p
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={styles.secondaryBigHeading}
        >
          Team
        </motion.p>
        <div className={styles.secondarySectionHeading}>
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
            leadership.map((member, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                transition={{ duration: 1 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                key={index}
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
              {teamMembers.map((member, index) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  key={index}
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
      </div>
      {clients && (
        <div
          className={styles.tertiarySectionHeading}
          id="clients"
          ref={clientsRef}
        >
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
      {collections && (
        <div
          className={styles.tertiarySectionHeading}
          id="collections"
          ref={collectionsRef}
        >
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
      {featuredProjects && (
        <div className={styles.featuredContainer}>
          {featuredProjects.map(project => (
            <motion.figure
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              key={project.id}
              className={styles.featuredTileContainer}
            >
              <div className={styles.featuredTileImageContainer}>
                <GatsbyImage
                  image={project.image.gatsbyImageData}
                  alt={project.image.description}
                  className={styles.featuredTile}
                ></GatsbyImage>
              </div>
              <figcaption>{project.caption}</figcaption>
            </motion.figure>
          ))}
        </div>
      )}
      {recognitionPreface && (
        <div
          className={styles.tertiarySectionHeading}
          id="recognition"
          ref={recognitionRef}
        >
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
      {featuredProjects2 && (
        <div className={styles.featuredContainer}>
          {featuredProjects2.map(project => (
            <motion.figure
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              key={project.id}
              className={styles.featuredTileContainer}
            >
              <div className={styles.featuredTileImageContainer}>
                <GatsbyImage
                  image={project.image.gatsbyImageData}
                  alt={project.image.description}
                  className={styles.featuredTile}
                ></GatsbyImage>
              </div>
              <figcaption>{project.caption}</figcaption>
            </motion.figure>
          ))}
        </div>
      )}

      {transparency && (
        <div
          className={styles.tertiarySectionHeading}
          id="transparency"
          ref={transparencyRef}
        >
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
        <div
          className={styles.tertiarySectionHeading}
          id="careers"
          ref={careersRef}
        >
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
        <div
          className={styles.tertiarySectionHeading}
          id="contact"
          ref={contactRef}
        >
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
      featuredProjects {
        caption
        image {
          description
          gatsbyImageData(width: 600)
          height
          width
        }
        id
      }
      featuredProjects2 {
        caption
        image {
          description
          gatsbyImageData(width: 600)
          height
          width
        }
        id
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
