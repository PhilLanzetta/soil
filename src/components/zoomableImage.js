import React, { useState, useEffect } from "react"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "./singleProject.module.css"
import { AnimatePresence, motion } from "motion/react"
import useWindowSize from "../utils/useWindowSize"

const ZoomableImage = ({ images }) => {
  const [popUp, setPopUp] = useState(-1)
  const [popUpOpen, setPopUpOpen] = useState(false)
  const { height, width } = useWindowSize()
  const isMobile = height > width

  const handleForward = () => {
    if (popUp === images.length - 1) {
      setPopUp(0)
    } else {
      setPopUp(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (popUp === 0) {
      setPopUp(images.length - 1)
    } else {
      setPopUp(prev => prev - 1)
    }
  }

  useEffect(() => {
    if (popUpOpen) {
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
  }, [popUpOpen])

  return (
    <div className={styles.secondaryMediaRow}>
      {images.map((image, index) => (
        <motion.figure
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          key={index}
        >
          <button
            className={styles.enlargeBtn}
            onClick={() => {
              setPopUpOpen(true)
              setPopUp(index)
            }}
          >
            <GatsbyImage
              image={image.image.gatsbyImageData}
              alt={image.image.description}
              className={styles.imageBorder}
            ></GatsbyImage>
          </button>
          <figcaption>{image.caption}</figcaption>
          <AnimatePresence>
            {popUpOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key="pop-up"
              >
                <div className={styles.imagePopUpContainer}>
                  <button
                    className={styles.closeButton}
                    onClick={() => setPopUpOpen(false)}
                    aria-label="close"
                  >
                    <span></span>
                    <span></span>
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
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key={popUp}
                          >
                            <GatsbyImage
                              image={images[popUp].image?.gatsbyImageData}
                              alt={images[popUp].image?.description}
                              className={styles.popUpImageImg}
                              style={{
                                height: isMobile ? "auto" : "80vh",
                                marginLeft: isMobile ? "15px" : "0",
                                width: isMobile
                                  ? "calc(100% - 30px)"
                                  : `${
                                      (images[popUp].image?.width * 80) /
                                      images[popUp].image?.height
                                    }vh`,
                              }}
                            ></GatsbyImage>
                          </motion.div>
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
                              <circle
                                cx="17.5"
                                cy="17.5"
                                r="16.5"
                                stroke="black"
                              />
                              <line
                                x1="7"
                                y1="17.5"
                                x2="28"
                                y2="17.5"
                                stroke="black"
                                strokeWidth={3}
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
                              <circle
                                cx="17.5"
                                cy="17.5"
                                r="16.5"
                                stroke="black"
                              />
                              <line
                                x1="17.5"
                                y1="7"
                                x2="17.5"
                                y2="28"
                                stroke="black"
                                strokeWidth={3}
                              />
                              <line
                                x1="7"
                                y1="17.5"
                                x2="28"
                                y2="17.5"
                                stroke="black"
                                strokeWidth={3}
                              />
                            </svg>
                          </button>
                        </div>
                        <button className={styles.backBtn} onClick={handleBack}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 13.047 28.672"
                          >
                            <path
                              id="Polygon_4"
                              data-name="Polygon 4"
                              d="M0,12.009,14.011,0,28.021,12.009"
                              transform="translate(0.659 28.346) rotate(-90)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={3}
                            />
                          </svg>
                        </button>
                        <button
                          className={styles.forwardBtn}
                          onClick={handleForward}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 13.047 28.672"
                          >
                            <path
                              id="Polygon_3"
                              data-name="Polygon 3"
                              d="M0,12.009,14.011,0,28.021,12.009"
                              transform="translate(12.389 0.325) rotate(90)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={3}
                            />
                          </svg>
                        </button>
                      </>
                    )}
                  </TransformWrapper>
                </div>
              </motion.div>
            )}
            {popUpOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={popUp}
                className={styles.slideshowBackground}
              ></motion.div>
            )}
          </AnimatePresence>
        </motion.figure>
      ))}
    </div>
  )
}

export default ZoomableImage
