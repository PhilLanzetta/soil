import React, { useRef } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import { motion, useScroll, useTransform } from "motion/react"
import * as styles from "./index.module.css"

const HomeTile = ({ tile, index }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5])
  const even = index % 2 === 0
  const y = useTransform(scrollYProgress, [0.25, 0.75], [0, 200])
  const firstY = useTransform(scrollYProgress, [0.5, 1], [0, 200])

  let rowStyle
  if (tile.size === "Extra Large") {
    rowStyle = { width: "100%", position: "relative", zIndex: 50 }
  } else if (tile.size === "Large") {
    rowStyle = {
      width: "63%",
      position: "relative",
      zIndex: 50,
      justifySelf: even ? "flex-end" : "flex-start",
    }
  } else if (tile.size === "Medium") {
    rowStyle = {
      width: "38%",
      position: "relative",
      justifySelf: even ? "flex-end" : "flex-start",
      marginLeft: "12.5%",
      marginRight: "12.5%",
    }
  } else {
    rowStyle = {
      width: "25%",
      position: "relative",
      justifySelf: even ? "flex-end" : "flex-start",
      marginLeft: "12.5%",
      marginRight: "12.5%",
    }
  }
  return (
    <motion.div
      ref={ref}
      style={{
        y: index === 0 ? firstY : y,
        zIndex: tile.size === "Extra Large" || tile.size === "Large" ? 25 : 0,
      }}
      className={styles.imageRow}
    >
      <Link
        to={`/work/${tile.work.slug}`}
        className={styles.tileLink}
        style={rowStyle}
      >
        <p>{tile.work.title}</p>
        {(tile.size === "Medium" || tile.size === "Small") && (
          <motion.div ref={ref} style={{ opacity }}>
            <GatsbyImage image={tile.image.gatsbyImageData}></GatsbyImage>
          </motion.div>
        )}
        {(tile.size === "Extra Large" || tile.size === "Large") && (
          <GatsbyImage image={tile.image.gatsbyImageData}></GatsbyImage>
        )}
      </Link>
    </motion.div>
  )
}

export default HomeTile
