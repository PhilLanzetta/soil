import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { AiOutlinePlus } from "react-icons/ai"
import { HiArrowUpRight } from "react-icons/hi2"
import ProjectTile from "./projectTile"
import { motion } from "motion/react"
import * as styles from "./searchResult.module.css"

const Hit = ({ hit }) => {
  const {
    tileImage,
    title,
    slug,
    searchCategory,
    externalLink,
    objectives,
    linkOutFromTile,
    tileText,
    tileTextLong,
    author,
    publisher,
  } = hit

  return (
    <>
      {searchCategory && (
        <div>
          {searchCategory === "Work" && (
            <ProjectTile project={hit}></ProjectTile>
          )}{" "}
          {searchCategory === "News" && (
            <motion.div
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={styles.tileContainer}
            >
              {linkOutFromTile ? (
                <a
                  href={externalLink}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.externalContainer}
                >
                  {tileImage && (
                    <div>
                      <div className={styles.tileImageContainer}>
                        <GatsbyImage
                          image={tileImage?.localFile?.childImageSharp?.gatsbyImageData}
                          alt={tileImage.description}
                          className={styles.tileImage}
                          imgStyle={{ objectFit: "cover" }}
                        ></GatsbyImage>
                      </div>
                      <p className={styles.tileText}>{title}</p>
                    </div>
                  )}
                  {tileText && (
                    <div className={styles.tileTextContainer}>
                      <div
                        className={styles.tileText}
                        dangerouslySetInnerHTML={{
                          __html: tileText.childMarkdownRemark.html,
                        }}
                      ></div>
                    </div>
                  )}
                </a>
              ) : (
                <Link to={`/news/${slug}`}>
                  {tileImage && (
                    <div>
                      <div className={styles.tileImageContainer}>
                        <GatsbyImage
                          image={tileImage?.localFile?.childImageSharp?.gatsbyImageData}
                          alt={tileImage.description}
                          className={styles.tileImage}
                          imgStyle={{ objectFit: "cover" }}
                        ></GatsbyImage>
                      </div>
                      <p className={styles.tileText}>{title}</p>
                    </div>
                  )}
                  {tileText && (
                    <div className={styles.tileTextContainer}>
                      <div
                        className={styles.tileText}
                        dangerouslySetInnerHTML={{
                          __html: tileText.childMarkdownRemark.html,
                        }}
                      ></div>
                    </div>
                  )}
                </Link>
              )}
            </motion.div>
          )}
          {searchCategory === "Writing" && (
            <motion.div
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={styles.tileContainer}
            >
              <Link to={`/writing/${slug}`}>
                {tileTextLong && (
                  <div className={styles.tileTextContainer}>
                    <div
                      className={styles.tileText}
                      dangerouslySetInnerHTML={{
                        __html: tileTextLong.childMarkdownRemark.html,
                      }}
                    ></div>
                  </div>
                )}
                {(author || publisher) && (
                  <div className={styles.tileInfo}>
                    {author && <div>{author}</div>}
                    {publisher && <div>{publisher}</div>}
                  </div>
                )}
              </Link>
            </motion.div>
          )}
          {searchCategory === "Publication" && (
            <motion.div
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={styles.tileContainer}
            >
              <Link to={`/publications/${slug}`}>
                <div className={styles.tileImageContainer}>
                  <GatsbyImage
                    image={tileImage?.localFile?.childImageSharp?.gatsbyImageData}
                    alt={tileImage?.description}
                    className={styles.tileImage}
                  ></GatsbyImage>
                </div>
                <div className={styles.tileText}>{title}</div>
              </Link>
            </motion.div>
          )}
        </div>
      )}
    </>
  )
}

export default Hit
