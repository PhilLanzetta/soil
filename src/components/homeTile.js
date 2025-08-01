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
  const yPosSlow = useTransform(scrollYProgress, [0, 1], [0, 200])
  const yPosFast = useTransform(scrollYProgress, [0, 1], [0, -300])

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
    <div className={styles.imageRow}>
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
    </div>
  )
}

export default HomeTile
