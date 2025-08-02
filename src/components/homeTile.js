import React, { useRef } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import { motion, useScroll, useTransform } from "motion/react"
import * as styles from "./index.module.css"

const HomeTile = ({ tile, index }) => {
  const ref = useRef(null)
  const { scrollYProgress, scrollY } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.5, 0.9, 1],
    [0, 0.25, 1, 0.25, 0]
  )
  const opacityBig = useTransform(
    scrollYProgress,
    [0, 0.1, 0.5, 0.9, 1],
    [0, 1, 1, 1, 0]
  )
  const even = index % 2 === 0
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, 300])
  const yFirst = useTransform(scrollYProgress, [0.5, 1], [0, 400])
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -300])
  const yMedium = useTransform(scrollYProgress, [0, 1], [0, 100])

  let yFormat
  let bottomPadding

  if (index === 0) {
    yFormat = yFirst
    bottomPadding = "200px"
  } else if ((index + 1) % 4 === 1) {
    yFormat = ySlow
    bottomPadding = "200px"
  } else if ((index + 1) % 4 === 2) {
    yFormat = yFast
    bottomPadding = "20px"
  } else if ((index + 1) % 4 === 3) {
    yFormat = yFast
    bottomPadding = "20px"
  } else if ((index + 1) % 4 === 0) {
    yFormat = undefined
    bottomPadding = "200px"
  }

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
        y: yFormat,
        zIndex: tile.size === "Extra Large" || tile.size === "Large" ? 25 : 0,
        paddingBottom: bottomPadding,
      }}
      className={styles.imageRow}
    >
      <Link
        to={`/work/${tile.work.slug}`}
        className={styles.tileLink}
        style={rowStyle}
      >
        <p>
          {tile.work.title && `${tile.work.title}, `}
          {tile.work.city && `${tile.work.city}, `}
          {tile.work.country}
        </p>
        {(tile.size === "Medium" || tile.size === "Small") && (
          <motion.div style={{ opacity }}>
            <GatsbyImage image={tile.image.gatsbyImageData}></GatsbyImage>
          </motion.div>
        )}
        {(tile.size === "Extra Large" || tile.size === "Large") && (
          <motion.div style={{ opacity: opacityBig }}>
            <GatsbyImage image={tile.image.gatsbyImageData}></GatsbyImage>
          </motion.div>
        )}
      </Link>
    </motion.div>
  )
}

export default HomeTile
