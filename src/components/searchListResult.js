import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { AiOutlinePlus } from "react-icons/ai"
import { HiArrowUpRight } from "react-icons/hi2"
import ProjectTile from "./projectTile"
import { motion } from "motion/react"
import * as styles from "./searchResult.module.css"

const ListHit = ({ hit }) => {
  const {
    title,
    slug,
    searchCategory,
    externalLink,
    linkOutFromTile,
    date,
    year,
  } = hit

  return (
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
          className={styles.listResult}
        >
          <div className={styles.listTitle}>{title}</div>
          <div>{searchCategory}</div>
          <div className={styles.listDate}>{date}</div>
        </a>
      ) : (
        <Link
          to={
            searchCategory === "Publication"
              ? `/publications/${slug}`
              : `/${searchCategory?.toLowerCase()}/${slug}`
          }
          className={styles.listResult}
        >
          <div className={styles.listTitle}>{title}</div>
          <div>{searchCategory}</div>
          <div className={styles.listDate}>{date || year}</div>
        </Link>
      )}
    </motion.div>
  )
}

export default ListHit
