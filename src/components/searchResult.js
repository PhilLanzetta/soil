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
            >
              {linkOutFromTile ? (
                <a
                  href={externalLink}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.externalContainer}
                >
                  <div className={styles.outLink}> → </div>
                  {tileImage && (
                    <div>
                      <div className={styles.tileImageContainer}>
                        <GatsbyImage
                          image={tileImage.gatsbyImageData}
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
                          image={tileImage.gatsbyImageData}
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
              <div className={styles.tagContainer}>
                {objectives &&
                  objectives.map(objective => (
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
          )}
          {searchCategory === "Writing" && (
            <motion.div
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link to={`/writing/${slug}`}>
                {tileImage && (
                  <div>
                    <div className={styles.tileImageContainer}>
                      <GatsbyImage
                        image={tileImage.gatsbyImageData}
                        alt={tileImage.description}
                        className={styles.tileImage}
                      ></GatsbyImage>
                    </div>
                    <p className={styles.tileText}>{title}</p>
                  </div>
                )}
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
              </Link>
              <div className={styles.tagContainer}>
                {objectives &&
                  objectives.map(objective => (
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
          )}
        </div>
      )}
    </>
  )
}

export default Hit
