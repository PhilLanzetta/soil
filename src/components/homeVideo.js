import React, { useState } from "react"
import ReactPlayer from "react-player"
import * as styles from "./videoPlayer.module.css"
import { AnimatePresence, motion } from "motion/react"
import { GatsbyImage } from "gatsby-plugin-image"

const HomeVideo = ({ videoLink, aspectRatio, image }) => {
  const [loading, setLoading] = useState(true)

  return (
    <div className={styles.videoPlayerContainer}>
      <div
        className={styles.videoPlayer}
        style={{
          aspectRatio: aspectRatio ? aspectRatio : "16 / 9",
        }}
      >
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="video-poster"
              className={styles.coverImageContainer}
            >
              <GatsbyImage
                image={image?.gatsbyImageData}
                alt={image?.description}
                className={styles.coverImage}
              ></GatsbyImage>
            </motion.div>
          )}
        </AnimatePresence>
        <ReactPlayer
          src={videoLink}
          width={"100%"}
          height={"100%"}
          className={styles.videoPlayerVideo}
          controls={false}
          playing={true}
          playsInline
          volume={0}
          muted={true}
          config={{
            vimeo: {
                autopause: false,
              },
          }}
          onPlaying={() => setLoading(false)}
          onError={() => setLoading(true)}
          loop
        ></ReactPlayer>
      </div>
    </div>
  )
}

export default HomeVideo
