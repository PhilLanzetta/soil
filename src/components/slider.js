import React, { useRef } from "react"
import { motion, useMotionValue, useTransform } from "motion/react"
import SliderScrollBar from "./sliderScrollBar"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../components/about.module.css"
import useWindowSize from "../utils/useWindowSize"

function Slider({ images, gallery }) {
  const { width, height } = useWindowSize()
  const containerWidth = width - 30
  const sliderWidth = gallery
    ? images
        .map(
          item =>
            ((item.image?.width * 60) / item.image?.height) * (height / 100)
        )
        .reduce((a, b) => a + b) +
      images.length * 20
    : images.length * (15 * (width / 100)) + images.length * 20
  const thumbWidth = 50

  console.log(sliderWidth)
  const x = useMotionValue(0)

  const offset = useTransform(
    x,
    [0, containerWidth - sliderWidth],
    [0, containerWidth - thumbWidth]
  )

  const scrollBarRef = useRef(null)

  return (
    <div
      className="overflow-hidden"
      style={{
        width: containerWidth,
        overflow: "hidden",
      }}
    >
      <motion.div style={{ x }}>
        <div style={{ width: sliderWidth }}>
          <div
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
            {images.map((item, index) => {
              const imgWidth = (item.image?.width * 60) / item.image?.height
              return (
                <motion.figure
                  initial={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  key={index}
                  className={gallery ? "" : styles.featuredTileImageContainer}
                >
                  <GatsbyImage
                    image={item.image.gatsbyImageData}
                    alt={item.image.description}
                    className={styles.galleryImage}
                    style={
                      gallery
                        ? {
                            height: "60vh",
                            width: `${imgWidth}vh`,
                          }
                        : {}
                    }
                  ></GatsbyImage>
                  <figcaption>{item.caption}</figcaption>
                </motion.figure>
              )
            })}
          </div>
        </div>
      </motion.div>

      <div ref={scrollBarRef} style={{ marginTop: "1rem" }}>
        <SliderScrollBar
          containerWidth={containerWidth}
          sliderWidth={sliderWidth}
          thumbWidth={thumbWidth}
          x={x}
          offset={offset}
          scrollBarRef={scrollBarRef}
          gallery={gallery}
        />
      </div>
    </div>
  )
}

export default Slider
