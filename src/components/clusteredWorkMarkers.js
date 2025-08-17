import { useMap, AdvancedMarker } from "@vis.gl/react-google-maps"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import {
  MarkerClusterer,
  SuperClusterAlgorithm,
} from "@googlemaps/markerclusterer"
import { ProjectMarker } from "./projectMarker"
import { AnimatePresence, motion } from "motion/react"
import { Link } from "gatsby"
import * as styles from "./mapView.module.css"

/**
 * The ClusteredTreeMarkers component is responsible for integrating the
 * markers with the markerclusterer.
 */
export const ClusteredWorkMarkers = ({
  projects,
  clickedMarker,
  setClickedMarker,
  showClusterInfo,
  setShowClusterInfo,
  handleClusterClick,
}) => {
  const [markers, setMarkers] = useState({})

  // create the markerClusterer once the map is available and update it when
  // the markers are changed
  const map = useMap()
  const clusterer = useMemo(() => {
    if (!map) return null

    return new MarkerClusterer({
      map,
      algorithm: new SuperClusterAlgorithm({ minPoints: 5 }),
      onClusterClick: handleClusterClick,
    })
  }, [map])

  useEffect(() => {
    if (!clusterer) return

    clusterer.clearMarkers()
    clusterer.addMarkers(Object.values(markers))
  }, [clusterer, markers])

  const clickedProject =
    clickedMarker && projects.filter(project => project.id === clickedMarker)[0]

  // this callback will effectively get passed as ref to the markers to keep
  // tracks of markers currently on the map
  const setMarkerRef = useCallback((marker, key) => {
    setMarkers(markers => {
      if ((marker && markers[key]) || (!marker && !markers[key])) return markers

      if (marker) {
        return { ...markers, [key]: marker }
      } else {
        const { [key]: _, ...newMarkers } = markers

        return newMarkers
      }
    })
  }, [])

  return (
    <>
      {projects.map(project => (
        <ProjectMarker
          key={project.id}
          project={project}
          setMarkerRef={setMarkerRef}
          setClickedMarker={setClickedMarker}
          clickedProject={clickedProject}
          setShowClusterInfo={setShowClusterInfo}
        />
      ))}
      <AnimatePresence>
        {showClusterInfo && showClusterInfo.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.clusterContainer}
          >
            <div className={styles.clusterHeading}>
              {showClusterInfo.length} Projects Near {showClusterInfo[0].city},{" "}
              {showClusterInfo[0].country}{" "}
            </div>
            {showClusterInfo.map(project => (
              <Link
                to={`/work/${project.slug}`}
                className={styles.clusterListItem}
              >
                {project.title && `${project.title}`}
                {project.city && `, ${project.city}`}
                {`, ${project.country}`} →
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
