import React, { useState, useEffect } from "react"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "./singleProject.module.css"
import { AnimatePresence, motion } from "motion/react"

const ZoomableImage = ({ image }) => {
  const [popUp, setPopUp] = useState(-1)

  useEffect(() => {
    if (popUp >= 0) {
      const scrollY = window.scrollY
      const body = document.body
      body.style.position = "fixed"
      body.style.top = `-${scrollY}px`
    } else {
      const body = document.body
      const scrollY = body.style.top
      body.style.position = ""
      body.style.top = ""
      window.scrollTo(0, parseInt(scrollY || "0") * -1)
    }
  }, [popUp])

  return (
    <motion.figure
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <button className={styles.enlargeBtn} onClick={() => setPopUp(1)}>
        <GatsbyImage
          image={image.image.gatsbyImageData}
          alt={image.image.description}
        ></GatsbyImage>
      </button>
      <figcaption>{image.caption}</figcaption>
      <AnimatePresence>
        {popUp >= 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            key="pop-up"
            className={styles.imagePopUpContainer}
          >
            <button
              className={styles.closePopUp}
              onClick={() => setPopUp(-1)}
              aria-label="close"
            >
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 31L31 1" stroke="black" />
                <path d="M1 1L31 31" stroke="black" />
              </svg>
            </button>
            <TransformWrapper initialScale={1} centerOnInit={true}>
              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <>
                  <TransformComponent
                    wrapperStyle={{
                      position: "relative",
                      height: "100vh",
                      width: "100vw",
                    }}
                  >
                    <GatsbyImage
                      image={image.image?.gatsbyImageData}
                      alt={image.image?.description}
                      className={styles.popUpImageImg}
                      style={{
                        height: "80vh",
                        width: `${
                          (image.image?.width * 80) / image.image?.height
                        }vh`,
                      }}
                    ></GatsbyImage>
                  </TransformComponent>
                  <div className={styles.popUpControls}>
                    <button
                      className={styles.popUpControlsBtn}
                      onClick={() => zoomOut()}
                      aria-label="zoom out"
                    >
                      <svg
                        viewBox="0 0 35 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="17.5" cy="17.5" r="16.5" stroke="black" />
                        <line
                          x1="7"
                          y1="17.5"
                          x2="28"
                          y2="17.5"
                          stroke="black"
                        />
                      </svg>
                    </button>
                    <button
                      className={styles.popUpControlsBtn}
                      onClick={() => zoomIn()}
                      aria-label="zoom in"
                    >
                      <svg
                        viewBox="0 0 35 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="17.5" cy="17.5" r="16.5" stroke="black" />
                        <line
                          x1="17.5"
                          y1="7"
                          x2="17.5"
                          y2="28"
                          stroke="black"
                        />
                        <line
                          x1="7"
                          y1="17.5"
                          x2="28"
                          y2="17.5"
                          stroke="black"
                        />
                      </svg>
                    </button>
                  </div>
                </>
              )}
            </TransformWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.figure>
  )
}

export default ZoomableImage
