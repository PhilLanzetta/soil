import React, { useCallback, useState } from "react"
import {
  AdvancedMarker,
  InfoWindow,
  OverlayView,
} from "@vis.gl/react-google-maps"
import { Link } from "gatsby"
import * as styles from "./mapView.module.css"
import { AnimatePresence, motion } from "motion/react"
import { GatsbyImage } from "gatsby-plugin-image"

/**
 * Wrapper Component for an AdvancedMarker for a single tree.
 */
export const ProjectMarker = props => {
  const { project, setMarkerRef, clickedProject, setClickedMarker } = props

  const ref = useCallback(
    marker => setMarkerRef(marker, project.id),
    [setMarkerRef, project.id]
  )

  const handleClick = projectId => {
    if (clickedProject && projectId === clickedProject.id) {
      setClickedMarker(null)
    } else setClickedMarker(projectId)
  }

  return (
    <>
      <AdvancedMarker
        position={{
          lat: project.exactLocation.lat,
          lng: project.exactLocation.lon,
        }}
        ref={ref}
        onClick={() => handleClick(project.id)}
      >
        <div
          style={{
            backgroundColor: "black",
            borderRadius: "50%",
            height: "15px",
            width: "15px",
            position: "relative",
          }}
        ></div>
        <div className={styles.hiddenInfo}>{project.id}</div>
      </AdvancedMarker>
      <AnimatePresence>
        {clickedProject && clickedProject.id === project.id && (
          <AdvancedMarker
            position={{
              lat: project.exactLocation.lat,
              lng: project.exactLocation.lon,
            }}
            zIndex={5000000}
            className={styles.hoveredMarker}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.hoverState}
            >
              <Link
                to={`/work/${clickedProject.slug}`}
                className={styles.marker}
              >
                <div className={styles.tileImageContainer}>
                  <GatsbyImage
                    image={clickedProject.tileImage?.gatsbyImageData}
                    alt={clickedProject.tileImage?.description}
                    className={styles.tileImage}
                  ></GatsbyImage>
                </div>
                {clickedProject.title && `${clickedProject.title}`}
                {clickedProject.city && `, ${clickedProject.city}`}
                {`, ${clickedProject.country}`} →
              </Link>
            </motion.div>
          </AdvancedMarker>
        )}
      </AnimatePresence>
    </>
  )
}
