import { useMap, AdvancedMarker } from "@vis.gl/react-google-maps"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { MarkerClusterer } from "@googlemaps/markerclusterer"
import { ProjectMarker } from "./projectMarker"

/**
 * The ClusteredTreeMarkers component is responsible for integrating the
 * markers with the markerclusterer.
 */
export const ClusteredWorkMarkers = ({ projects }) => {
  const [markers, setMarkers] = useState({})

  // create the markerClusterer once the map is available and update it when
  // the markers are changed
  const map = useMap()
  const clusterer = useMemo(() => {
    if (!map) return null

    return new MarkerClusterer({
      map,
    })
  }, [map])

  useEffect(() => {
    if (!clusterer) return

    clusterer.clearMarkers()
    clusterer.addMarkers(Object.values(markers))
  }, [clusterer, markers])

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
        />
      ))}
    </>
  )
}
