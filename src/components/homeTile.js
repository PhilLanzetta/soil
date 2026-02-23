import React, { useRef } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import { motion, useScroll, useTransform } from "motion/react"
import * as styles from "./index.module.css"
import HomeVideo from "./homeVideo"
import useWindowSize from "../utils/useWindowSize"

const HomeTile = ({ tile, index }) => {
  const ref = useRef(null)
  const { width, height } = useWindowSize()
  const isMobile = width < height
  const { scrollYProgress } = useScroll({
    layoutEffect: false,
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
  const ySlowMobile = useTransform(scrollYProgress, [0, 1], [0, 100])
  const yFirst = useTransform(scrollYProgress, [0.5, 1], [0, 400])
  const yFirstMobile = useTransform(scrollYProgress, [0.5, 1], [0, 100])
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -300])
  const yFastMobile = useTransform(scrollYProgress, [0, 1], [0, -200])
  const yFast2Mobile = useTransform(scrollYProgress, [0, 1], [0, -300])

  let yFormat
  let bottomPadding

  if (index === 0) {
    yFormat = isMobile ? yFirstMobile : yFirst
    bottomPadding = "200px"
  } else if ((index + 1) % 4 === 1) {
    yFormat = isMobile ? ySlowMobile : ySlow
    bottomPadding = "200px"
  } else if ((index + 1) % 4 === 2) {
    yFormat = isMobile ? yFastMobile : yFast
    bottomPadding = "20px"
  } else if ((index + 1) % 4 === 3) {
    yFormat = isMobile ? yFast2Mobile : yFast
    bottomPadding = isMobile ? "0px" : "20px"
  } else if ((index + 1) % 4 === 0) {
    yFormat = undefined
    bottomPadding = isMobile ? "100px" : "200px"
  }

  let rowStyle
  if (tile.size === "Extra Large") {
    rowStyle = {
      width: "100%",
      position: "relative",
      y: yFormat,
      paddingBottom: bottomPadding,
    }
  } else if (tile.size === "Large") {
    rowStyle = {
      width: isMobile ? "80%" : "63%",
      position: "relative",
      marginLeft: isMobile ? (even ? "20%" : "0") : even ? "37%" : "0",
      y: yFormat,
      paddingBottom: bottomPadding,
    }
  } else if (tile.size === "Medium") {
    rowStyle = {
      width: isMobile ? "55%" : "38%",
      position: "relative",
      marginLeft: isMobile ? (even ? "45%" : "0") : even ? "49.5%" : "12.5%",
      y: yFormat,
      zIndex: 50,
      paddingBottom: bottomPadding,
    }
  } else {
    rowStyle = {
      width: isMobile ? "45%" : "25%",
      position: "relative",
      marginLeft: isMobile ? (even ? "40%" : "15%") : even ? "60%" : "15%",
      y: yFormat,
      zIndex: 50,
      paddingBottom: bottomPadding,
    }
  }
  return (
    <motion.div ref={ref} className={styles.imageRow} style={rowStyle}>
      <Link
        to={
          tile.work
            ? `/work/${tile.work.slug}`
            : tile.nonProjectInternalLink
            ? tile.nonProjectInternalLink
            : "/"
        }
        className={styles.tileLink}
      >
        {(tile.size === "Medium" || tile.size === "Small") && (
          <motion.div style={{ opacity }}>
            {tile.videoLink ? (
              <HomeVideo
                videoLink={tile.videoLink}
                aspectRatio={tile.videoAspectRatio}
                image={tile.image}
              ></HomeVideo>
            ) : (
              <GatsbyImage image={tile.image?.localFile?.childImageSharp?.gatsbyImageData}></GatsbyImage>
            )}
          </motion.div>
        )}
        {(tile.size === "Extra Large" || tile.size === "Large") && (
          <motion.div style={{ opacity: opacityBig }}>
            {tile.videoLink ? (
              <HomeVideo
                videoLink={tile.videoLink}
                aspectRatio={tile.videoAspectRatio}
                image={tile.image}
              ></HomeVideo>
            ) : (
              <GatsbyImage image={tile.image?.localFile?.childImageSharp?.gatsbyImageData}></GatsbyImage>
            )}
          </motion.div>
        )}
      </Link>
    </motion.div>
  )
}

export default HomeTile
