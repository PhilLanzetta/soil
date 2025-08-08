import React, { useCallback, useState } from "react"
import { AdvancedMarker } from "@vis.gl/react-google-maps"
import { Link } from "gatsby"
import * as styles from "./mapView.module.css"
import { AnimatePresence, motion } from "motion/react"

/**
 * Wrapper Component for an AdvancedMarker for a single tree.
 */
export const ProjectMarker = props => {
  const { project, setMarkerRef } = props
  const [hovered, setHovered] = useState(false)

  const ref = useCallback(
    marker => setMarkerRef(marker, project.id),
    [setMarkerRef, project.id]
  )

  return (
    <AdvancedMarker
      position={{
        lat: project.exactLocation.lat,
        lng: project.exactLocation.lon,
      }}
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/work/${project.slug}`} className={styles.marker}>
        <div
          style={{
            backgroundColor: "black",
            borderRadius: "50%",
            height: "15px",
            width: "15px",
            position: "relative",
          }}
        ></div>
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.hoverState}
            >
              {project.title && `${project.title}`}
              {project.city && `, ${project.city}`}
              {`, ${project.country}`} →
            </motion.div>
          )}
        </AnimatePresence>
      </Link>
    </AdvancedMarker>
  )
}
